import * as MXP from 'maxpower';

import { AgentCommandError, AgentCommandInput, requireArg } from '../Command';
import { describeFields } from '../EntityQuery';
import { parseFieldValue, writablePaths } from '../WriteCommands';

import type { AgentCommandContext, AgentCommandTable } from '../Command';

// エンティティ・コンポーネント以外の設定（renderer / timeline / editor）の読み書き。
// 書き込みは set と同じく EditorAPI を通して undo を効かせる

type SettingTarget = {
	serializable: MXP.Serializable;
	// 保存先のファイル（プロジェクトディレクトリからの相対パス）。シーンのファイルを持たないページでは null
	file: string | null;
	// この対象として触らせる path か
	accepts: ( path: string ) => boolean;
};

const SETTING_NAMES = [ 'renderer', 'timeline', 'editor' ];

// editor（editor.json）のうち設定として扱う path。選択状態・エディタのカメラ・パネル配置などは
// タブの UI 状態なので、CLI からは触らせない（set 等と同じく選択・カメラを変えない方針）
const EDITOR_SETTING_PREFIXES = [ 'resolution/', 'frameLoop/' ];

// ビューポートの設定のうち、描画負荷に関わる解像度スケールだけは設定として触らせる
const VIEWPORT_SETTING_PATTERN = /^viewports\/[^/]+\/resolutionScale$/;

const sceneFile = ( ctx: AgentCommandContext ) => {

	if ( ctx.sceneName === null ) return null;

	return `scenes/${ctx.sceneName}.json`;

};

// 設定の名前から、書き換える Serializable と保存先を引く
const resolveSettingTarget = ( ctx: AgentCommandContext, name: string ): SettingTarget => {

	if ( name === 'renderer' ) {

		return { serializable: ctx.engine.renderer, file: sceneFile( ctx ), accepts: () => true };

	}

	// engine 自身の field には name / scene（エンティティ木）も並ぶので、timeline/ 配下に絞る
	if ( name === 'timeline' ) {

		return { serializable: ctx.engine, file: sceneFile( ctx ), accepts: ( path ) => path.startsWith( 'timeline/' ) };

	}

	if ( name === 'editor' ) {

		const accepts = ( path: string ) => {

			for ( const prefix of EDITOR_SETTING_PREFIXES ) {

				if ( path.startsWith( prefix ) ) return true;

			}

			return VIEWPORT_SETTING_PATTERN.test( path );

		};

		// resolution/* は作品としてコミットする editor.json、それ以外は editor.local.json（host/server/routes/scene.ts の SHARED_EDITOR_KEYS）
		return { serializable: ctx.editor, file: 'editor.json（resolution/*）/ editor.local.json（それ以外）', accepts };

	}

	throw new AgentCommandError( `設定の名前が違います: ${name}`, SETTING_NAMES );

};

// 対象の中で書き換えられる path
const settingPaths = ( target: SettingTarget ) => {

	const paths: string[] = [];

	for ( const path of writablePaths( target.serializable ) ) {

		if ( target.accepts( path ) ) {

			paths.push( path );

		}

	}

	return paths;

};

/*-------------------------------
	settings
-------------------------------*/

const SETTINGS_USAGE = 'settings [renderer|timeline|editor] [--field <path>] [--all]';

// 名前を省くと全部。fields は書き換えられる path だけで、既定は path → 値（--all で書式・選択肢・hidden も）。
// --field <path> はその値だけ（名前が要る）
const settings = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const all = input.options.all === true;
	const field = input.options.field;

	if ( field !== undefined ) {

		if ( typeof field !== 'string' || input.args[ 0 ] === undefined ) {

			throw new AgentCommandError( `--field は設定の名前と path を指定してください。使い方: ${SETTINGS_USAGE}` );

		}

		const target = resolveSettingTarget( ctx, input.args[ 0 ] );

		if ( ! settingPaths( target ).includes( field ) ) {

			throw new AgentCommandError( `設定にありません: ${field}（${input.args[ 0 ]}）`, settingPaths( target ) );

		}

		return target.serializable.getField( field );

	}

	let names = SETTING_NAMES;

	if ( input.args[ 0 ] !== undefined ) {

		names = [ input.args[ 0 ] ];

	}

	const result: { [ name: string ]: unknown } = {};

	for ( const name of names ) {

		const target = resolveSettingTarget( ctx, name );
		const paths = settingPaths( target );
		const details = [];
		const values: { [ path: string ]: unknown } = {};

		for ( const description of describeFields( target.serializable ) ) {

			if ( ! paths.includes( description.path ) ) continue;

			details.push( description );

			if ( ! description.hidden ) values[ description.path ] = description.value;

		}

		if ( all ) {

			result[ name ] = { file: target.file, fields: details };

		} else {

			result[ name ] = { file: target.file, fields: values };

		}

	}

	return result;

};

/*-------------------------------
	set-setting
-------------------------------*/

const SET_SETTING_USAGE = 'set-setting <renderer|timeline|editor> <path> <value>';

const setSetting = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const name = requireArg( input, 0, SET_SETTING_USAGE );
	const path = requireArg( input, 1, SET_SETTING_USAGE );
	const raw = requireArg( input, 2, SET_SETTING_USAGE );

	const target = resolveSettingTarget( ctx, name );
	const paths = settingPaths( target );

	if ( ! paths.includes( path ) ) {

		throw new AgentCommandError( `書き換えられる設定ではありません: ${path}（${name}）`, paths );

	}

	const serializable = target.serializable;

	// CLI の1コマンドは1操作なので、直前の変更とまとめず undo 1回ぶんにする
	ctx.editor.api.setField( serializable, path, parseFieldValue( ctx.engine, serializable, path, raw ), { merge: false } );

	return { target: name, file: target.file, path, value: serializable.getField( path ) };

};

export const settingObserveCommands: AgentCommandTable = {
	settings,
};

export const settingWriteCommands: AgentCommandTable = {
	'set-setting': setSetting,
};
