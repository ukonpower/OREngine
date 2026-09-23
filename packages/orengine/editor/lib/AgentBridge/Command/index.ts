import type { Engine } from '../../../../core/Engine';
import type { Editor } from '../../Editor';
import type { AgentOptions } from '../Protocol';

// コマンドから見えるエディタの状態
export type AgentCommandContext = {
	editor: Editor;
	engine: Engine;
	tabId: string;
	// 開いているシーンのファイル名（scenes/<name>.json の name）。ページがシーンを持たないときは null
	sceneName: string | null;
	// 最後の保存（または読み込み）以降に EditorAPI 経由の変更があったか
	unsaved: boolean;
};

export type AgentCommandInput = {
	args: string[];
	options: AgentOptions;
};

// 戻り値は JSON にして CLI へ返す
export type AgentCommand = ( ctx: AgentCommandContext, input: AgentCommandInput ) => unknown | Promise<unknown>;

export type AgentCommandTable = { [ name: string ]: AgentCommand };

// CLI へ理由付きで返す失敗。candidates は「どれのことか」を選び直させたいときの候補
export class AgentCommandError extends Error {

	public candidates?: unknown;

	constructor( message: string, candidates?: unknown ) {

		super( message );

		this.candidates = candidates;

	}

}

// 位置引数を1つ取り出す。無ければ使い方付きで失敗させる
export const requireArg = ( input: AgentCommandInput, index: number, usage: string ) => {

	const value = input.args[ index ];

	if ( value === undefined ) {

		throw new AgentCommandError( `引数が足りません。使い方: ${usage}` );

	}

	return value;

};

// 投げられた値を CLI に返すメッセージにする
export const errorMessage = ( e: unknown ) => {

	if ( e instanceof Error ) {

		return e.message;

	}

	return String( e );

};
