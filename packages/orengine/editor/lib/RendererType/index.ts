import { createLiteRenderer, createRenderer } from '@or-renderer';

import { Engine } from '../../../core/Engine';

import type { OREngineProjectData } from '../../../core/ProjectSerializer';

// シーンごとのレンダラーの種類。シーンのファイルの rendererType に書き、書かれていなければ deferred（ふつうのレンダラー）。
// lite は軽量レンダラー（maxpower の LiteRenderer）。webgl にしか無く、他のバックエンドではふつうのレンダラーで描く
export type RendererType = 'deferred' | 'lite';

export const RENDERER_TYPES: RendererType[] = [ 'deferred', 'lite' ];

const RENDERER_TYPE_KEY = 'rendererType';

// エンジンをどの種類で作ったか。ランタイムのエンジンは自分の種類を持たないので、エディタ側で覚えておく
const engineTypes = new WeakMap<Engine, RendererType>();

export const rendererTypeOfProject = ( project: OREngineProjectData | undefined ): RendererType => {

	if ( project && project[ RENDERER_TYPE_KEY ] === 'lite' ) {

		return 'lite';

	}

	return 'deferred';

};

export const rendererTypeOfEngine = ( engine: Engine ): RendererType => {

	return engineTypes.get( engine ) ?? 'deferred';

};

// シーンのデータにレンダラーの種類を書く。deferred は既定なので書かない（既存のシーンのファイルを変えないため）
export const writeRendererType = ( project: OREngineProjectData, type: RendererType ) => {

	if ( type === 'lite' ) {

		project[ RENDERER_TYPE_KEY ] = type;

	} else {

		delete project[ RENDERER_TYPE_KEY ];

	}

};

// 読み込んだシーンの renderer の設定。今のレンダラーが持たない項目（軽量レンダラーにとってのパイプラインの設定など）は
// エンジンの書き出しに出てこないので、読み込んだ値を覚えておいて書き出しへ戻す。
// 戻さないと、種類を切り替えて元に戻したときや、軽量レンダラーのまま保存したときに、その項目が既定値に戻ってしまう
const loadedRendererSettings = new WeakMap<Engine, { [ key: string ]: unknown }>();

const RENDERER_SETTINGS_KEY = 'renderer';

// シーンをエンジンへ読み込むときに呼ぶ
export const rememberRendererSettings = ( engine: Engine, project: OREngineProjectData | undefined ) => {

	let settings: { [ key: string ]: unknown } = {};

	if ( project && project[ RENDERER_SETTINGS_KEY ] ) {

		settings = project[ RENDERER_SETTINGS_KEY ] as { [ key: string ]: unknown };

	}

	loadedRendererSettings.set( engine, settings );

};

// エンジンが書き出したシーンのデータに、エディタだけが知っていること（レンダラーの種類と、今のレンダラーが持たない設定）を足す
export const completeExportedProject = ( engine: Engine, project: OREngineProjectData ) => {

	const loaded = loadedRendererSettings.get( engine ) ?? {};
	const exported = ( project[ RENDERER_SETTINGS_KEY ] ?? {} ) as { [ key: string ]: unknown };

	project[ RENDERER_SETTINGS_KEY ] = { ...loaded, ...exported };

	writeRendererType( project, rendererTypeOfEngine( engine ) );

};

// エディタは offscreen のビューを canvas へ blit して出すので、canvas の MSAA は切る
const createEditorLiteRenderer = ( engine: Parameters<typeof createLiteRenderer>[ 0 ] ) => {

	return createLiteRenderer( engine, { antialias: false } );

};

export const createEngine = ( type: RendererType ): Engine => {

	let engine: Engine;

	if ( type === 'lite' ) {

		// Engine の型は @or-renderer の Renderer に固定されている。エディタが触るのは両方のレンダラーに共通の口だけなので、型だけ合わせる
		engine = new Engine( createEditorLiteRenderer as unknown as typeof createRenderer );

	} else {

		engine = new Engine( createRenderer );

	}

	engineTypes.set( engine, type );

	return engine;

};
