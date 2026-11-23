import { AgentCommandError, errorMessage, requireArg } from '../Command';

import type { AgentCommand, AgentCommandContext, AgentCommandInput, AgentCommandTable } from '../Command';
import type { AgentOptions } from '../Protocol';

// 複数のコマンドを1回で実行する。途中で失敗したら、それまでの書き込みを undo で取り消してから失敗を返す。
// 成功したら書き込みを undo 1回ぶんにまとめる（保存は呼び出し側＝AgentBridge が最後に1回だけ行う）

export type BatchStep = {
	command: string;
	args: string[];
	options: AgentOptions;
};

// undo で取り消せないもの・入れ子になるものは batch に入れられない
const FORBIDDEN = new Set( [ 'batch', 'undo', 'redo', 'scene-create', 'scene-delete', 'scene-open' ] );

const BATCH_USAGE = 'batch <steps の JSON>';

const parseSteps = ( raw: string ): BatchStep[] => {

	let steps: unknown;

	try {

		steps = JSON.parse( raw );

	} catch {

		throw new AgentCommandError( `batch の手順を JSON として読めません。使い方: ${BATCH_USAGE}` );

	}

	if ( ! Array.isArray( steps ) || steps.length === 0 ) {

		throw new AgentCommandError( 'batch の手順が空です' );

	}

	return steps as BatchStep[];

};

type BatchTables = {
	commands: AgentCommandTable;
	mutatingCommands: AgentCommandTable;
};

export const batchCommands = ( tables: BatchTables ) => {

	const batchHasWrite = ( args: string[] ) => {

		try {

			for ( const step of parseSteps( args[ 0 ] ?? '' ) ) {

				if ( tables.mutatingCommands[ step.command ] !== undefined ) return true;

			}

		} catch {

			return false;

		}

		return false;

	};

	const batch: AgentCommand = async ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

		const steps = parseSteps( requireArg( input, 0, BATCH_USAGE ) );

		// 実行する前に全部の名前を確かめる。途中まで書き込んでから「不明なコマンド」で戻すより早く分かる
		for ( let i = 0; i < steps.length; i ++ ) {

			const name = steps[ i ].command;

			if ( FORBIDDEN.has( name ) ) {

				throw new AgentCommandError( `${i + 1} 番目の ${name} は batch に入れられません（undo で取り消せない・入れ子になるため）` );

			}

			if ( tables.commands[ name ] === undefined ) {

				throw new AgentCommandError( `${i + 1} 番目のコマンドが不明です: ${name}`, Object.keys( tables.commands ) );

			}

		}

		const history = ctx.editor.api.commandManager;
		const depth = history.depth;
		const results: unknown[] = [];

		for ( let i = 0; i < steps.length; i ++ ) {

			const step = steps[ i ];

			try {

				results.push( await tables.commands[ step.command ]( ctx, { args: step.args ?? [], options: step.options ?? {} } ) );

			} catch ( e ) {

				// 後から積んだものから戻す。GUI の操作が間に挟まっていればそれも戻るが、batch の実行は数十 ms なので気にしない
				while ( history.depth > depth ) {

					history.undo();

				}

				let candidates: unknown = undefined;

				if ( e instanceof AgentCommandError ) candidates = e.candidates;

				throw new AgentCommandError( `${i + 1} 番目（${step.command} ${( step.args ?? [] ).join( ' ' )}）で失敗したので、batch の書き込みをすべて取り消しました: ${errorMessage( e )}`, candidates );

			}

		}

		history.collapseSince( depth );

		return results;

	};

	return { batch, batchHasWrite };

};
