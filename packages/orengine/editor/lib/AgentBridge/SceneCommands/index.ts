import { AgentCommandError, AgentCommandInput, requireArg } from '../Command';

import type { AgentCommandContext, AgentCommandTable, AgentSceneControl } from '../Command';

// シーンの作成・削除・切り替え。Scene パネルと同じ窓口（EditorPage の createScene 等）を呼ぶので、
// タブの一覧・表示と食い違わない。シーン操作は GUI と同じく undo 履歴に載らない。
// 一覧・中身の読み取りはファイルを読むだけなので、CLI が dev サーバーの REST を直接叩く（scripts/scene.ts）

// シーン名はファイル名になる。サーバーの isValidSceneName・Scene パネルの SceneWindow と同じ制限
const SCENE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;

const requireScenes = ( ctx: AgentCommandContext ) => {

	if ( ! ctx.scenes ) {

		throw new AgentCommandError( 'このページはシーンを切り替えられません（シーンを焼き込んだページです）' );

	}

	return ctx.scenes;

};

const requireExistingScene = ( scenes: AgentSceneControl, name: string ) => {

	if ( ! scenes.names.includes( name ) ) {

		throw new AgentCommandError( `シーンがありません: ${name}`, scenes.names );

	}

};

// タブの未保存の変更を黙って捨てないよう、シーンを差し替える前に止める
const assertNoUnsaved = ( ctx: AgentCommandContext ) => {

	if ( ctx.unsaved ) {

		throw new AgentCommandError( `開いているシーン（${ctx.sceneName}）に未保存の変更があります。タブで保存（Ctrl+S）するか破棄してから切り替えてください` );

	}

};

// シーンを開き、エンジンが読み込み終えるまで待つ。
// loaded はページの state 更新が反映された後（OREngineProvider の effect）で出るので、
// その時点で保存コールバックとシーン名も新しいシーンを指している（headless の保存がこれに頼る）
const openScene = async ( ctx: AgentCommandContext, scenes: AgentSceneControl, name: string ) => {

	let onLoaded: () => void = () => {};

	const loaded = new Promise<void>( ( resolve ) => {

		onLoaded = resolve;

	} );

	ctx.engine.once( 'loaded', onLoaded );

	try {

		await scenes.onSelect( name );

	} catch ( e ) {

		ctx.engine.off( 'loaded', onLoaded );
		throw e;

	}

	await loaded;

};

/*-------------------------------
	scene-create
-------------------------------*/

const SCENE_CREATE_USAGE = 'scene-create <name> [--from <scene>] [--open]';

const sceneCreate = async ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const scenes = requireScenes( ctx );
	const name = requireArg( input, 0, SCENE_CREATE_USAGE );

	if ( ! SCENE_NAME_PATTERN.test( name ) ) {

		throw new AgentCommandError( `シーン名に使えるのは英数字・-・_ だけです: ${name}` );

	}

	if ( scenes.names.includes( name ) ) {

		throw new AgentCommandError( `シーンはすでにあります: ${name}`, scenes.names );

	}

	let from: string | undefined = undefined;

	if ( input.options.from !== undefined ) {

		if ( typeof input.options.from !== 'string' ) {

			throw new AgentCommandError( `--from にシーン名がありません。使い方: ${SCENE_CREATE_USAGE}` );

		}

		requireExistingScene( scenes, input.options.from );

		from = input.options.from;

	}

	const open = input.options.open === true;

	// 作ってから未保存で止まると、作成だけ済んだ中途半端な状態になるので先に確かめる
	if ( open ) {

		assertNoUnsaved( ctx );

	}

	await scenes.onCreate( name, from );

	if ( open ) {

		await openScene( ctx, scenes, name );

	}

	return { scene: name, from: from ?? null, opened: open };

};

/*-------------------------------
	scene-delete
-------------------------------*/

const sceneDelete = async ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const scenes = requireScenes( ctx );
	const name = requireArg( input, 0, 'scene-delete <name>' );

	requireExistingScene( scenes, name );

	// 開いているシーンを消すとタブの編集内容の行き先が無くなる。先に別のシーンを開かせる
	if ( name === scenes.current ) {

		throw new AgentCommandError( `開いているシーンは削除できません: ${name}（scene-open で別のシーンを開いてから削除してください）` );

	}

	await scenes.onDelete( name );

	return { scene: name };

};

/*-------------------------------
	scene-open
-------------------------------*/

const sceneOpen = async ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const scenes = requireScenes( ctx );
	const name = requireArg( input, 0, 'scene-open <name>' );

	requireExistingScene( scenes, name );

	const previous = scenes.current;

	// 開き直すと未保存の変更が消えるだけなので、同じシーンは何もしない
	if ( name === previous ) {

		return { scene: name, previous, opened: false };

	}

	assertNoUnsaved( ctx );

	await openScene( ctx, scenes, name );

	return { scene: name, previous, opened: true };

};

export const sceneCommands: AgentCommandTable = {
	'scene-create': sceneCreate,
	'scene-delete': sceneDelete,
	'scene-open': sceneOpen,
};
