import { AGENT_BASELINE_ENDPOINT } from '../Protocol';

import type { OREngineDataEntity, OREngineProjectData } from '../../../../core/ProjectSerializer';
import type { AgentCommandContext, AgentCommandInput, AgentCommandTable } from '../Command';

// 「Claude（シーン CLI）が最後に書き込んでから、本人が画面で変えた値」を拾う。
// 基準（baseline）は dev サーバーがシーンごとに持つ（host/vite/plugins/AgentBridge）。CLI の書き込みでは、その前後で変わった値だけを基準に足す。
// 書き込みは本人の未保存の変更も一緒に保存するが、基準ごと今の状態にすると本人の変更が見えなくなるため

// シーンの REST（host/server/routes/scene.ts）。dev サーバーは URL の :name を見ないので固定値で埋める（scripts/cli と同じ）
const SCENE_API_BASE = '/api/projects/current';

// シーンを「キー → 値」に平らにしたもの。キーは uuid で作り、名前が変わっても同じものとして比べる。
// labels は表示用（エンティティの uuid → 名前パス、コンポーネントの uuid → 登録名）
export type FlatScene = {
	values: { [ key: string ]: unknown };
	labels: { [ uuid: string ]: string };
};

// 保存形式（ProjectSerializer）を平らにする。省略された pos / rot / scale は既定値で埋める（省略かどうかで差が出ないように）
export const flattenScene = ( data: OREngineProjectData ): FlatScene => {

	const values: FlatScene[ 'values' ] = {};
	const labels: FlatScene[ 'labels' ] = {};

	const walk = ( node: OREngineDataEntity, parentUuid: string | null, parentPath: string | null ) => {

		let path = node.name;

		if ( parentPath !== null ) path = `${parentPath}/${node.name}`;

		labels[ node.uuid ] = path;

		values[ `${node.uuid}|$entity` ] = true;
		values[ `${node.uuid}|name` ] = node.name;
		values[ `${node.uuid}|parent` ] = parentUuid;
		values[ `${node.uuid}|position` ] = node.pos ?? [ 0, 0, 0 ];
		values[ `${node.uuid}|euler` ] = node.rot ?? [ 0, 0, 0 ];
		values[ `${node.uuid}|scale` ] = node.scale ?? [ 1, 1, 1 ];

		for ( const component of node.components ?? [] ) {

			labels[ component.uuid ] = component.name;
			values[ `${node.uuid}|${component.uuid}|$component` ] = component.name;

			const props = component.props ?? {};

			for ( const key of Object.keys( props ) ) {

				values[ `${node.uuid}|${component.uuid}|${key}` ] = props[ key ];

			}

		}

		for ( const child of node.childs ?? [] ) {

			walk( child, node.uuid, path );

		}

	};

	if ( data.scene ) walk( data.scene, null, null );

	for ( const key of Object.keys( data ) ) {

		if ( key === 'name' || key === 'scene' ) continue;

		const value = data[ key ];

		if ( key === 'renderer' && typeof value === 'object' && value !== null ) {

			const renderer = value as { [ key: string ]: unknown };

			for ( const field of Object.keys( renderer ) ) {

				values[ `$renderer|${field}` ] = renderer[ field ];

			}

		} else if ( key === 'curves' && typeof value === 'object' && value !== null ) {

			const curves = value as { [ id: string ]: unknown };

			for ( const id of Object.keys( curves ) ) {

				values[ `$curves|${id}` ] = curves[ id ];

			}

		} else {

			values[ `$scene|${key}` ] = value;

		}

	}

	return { values, labels };

};

const same = ( a: unknown, b: unknown ) => JSON.stringify( a ) === JSON.stringify( b );

export type SceneChange = {
	target: string;
	component?: string;
	field?: string;
	change: 'changed' | 'added' | 'removed';
	before?: unknown;
	after?: unknown;
};

// 基準から今への差分を、読める形（どのエンティティ・コンポーネントのどのフィールドか）にする。
// エンティティ・コンポーネントごと増えた / 消えたものは、そのフィールドを1つずつは並べない
export const diffScenes = ( base: FlatScene, current: FlatScene ) => {

	const keys = new Set( [ ...Object.keys( base.values ), ...Object.keys( current.values ) ] );
	const labels = { ...base.labels, ...current.labels };
	const whole = new Set<string>();
	const changes: SceneChange[] = [];

	// 増えた / 消えたエンティティ・コンポーネントを先に集める
	for ( const key of keys ) {

		if ( ! key.endsWith( '|$entity' ) && ! key.endsWith( '|$component' ) ) continue;

		const inBase = key in base.values;
		const inCurrent = key in current.values;

		if ( inBase === inCurrent ) continue;

		const owner = key.slice( 0, key.lastIndexOf( '|' ) );
		const parts = owner.split( '|' );
		let kind: SceneChange[ 'change' ] = 'removed';

		if ( inCurrent ) kind = 'added';

		const change: SceneChange = { target: labels[ parts[ 0 ] ] ?? parts[ 0 ], change: kind };

		if ( parts.length > 1 ) change.component = labels[ parts[ 1 ] ] ?? parts[ 1 ];

		changes.push( change );
		whole.add( owner );

	}

	for ( const key of keys ) {

		const before = base.values[ key ];
		const after = current.values[ key ];

		if ( same( before, after ) ) continue;

		const parts = key.split( '|' );
		const field = parts[ parts.length - 1 ];

		if ( field === '$entity' || field === '$component' ) continue;

		if ( parts[ 0 ] === '$renderer' || parts[ 0 ] === '$curves' || parts[ 0 ] === '$scene' ) {

			changes.push( { target: parts[ 0 ].slice( 1 ), field, change: 'changed', before, after } );
			continue;

		}

		if ( whole.has( parts[ 0 ] ) ) continue;

		const change: SceneChange = { target: labels[ parts[ 0 ] ] ?? parts[ 0 ], field, change: 'changed', before, after };

		if ( parts.length === 3 ) {

			if ( whole.has( `${parts[ 0 ]}|${parts[ 1 ]}` ) ) continue;

			change.component = labels[ parts[ 1 ] ] ?? parts[ 1 ];

		}

		// 親は uuid で持っているので、名前パスで見せる
		if ( field === 'parent' ) {

			change.before = labels[ before as string ] ?? before;
			change.after = labels[ after as string ] ?? after;

		}

		changes.push( change );

	}

	return changes;

};

/*-------------------------------
	Baseline
-------------------------------*/

const currentScene = ( ctx: AgentCommandContext ) => flattenScene( ctx.editor.exportEngine() );

// 基準を読む。CLI がまだ書き込んでいない（dev サーバーが持っていない）シーンは、ファイル（最後に保存した状態）を基準にする
const loadBaseline = async ( scene: string ): Promise<{ flat: FlatScene; since: string }> => {

	const res = await fetch( `${AGENT_BASELINE_ENDPOINT}/${encodeURIComponent( scene )}` );

	if ( res.ok ) {

		return { flat: await res.json() as FlatScene, since: 'シーン CLI の最後の書き込み' };

	}

	const file = await fetch( `${SCENE_API_BASE}/scenes/${encodeURIComponent( scene )}` );

	if ( ! file.ok ) {

		throw new Error( `基準にするシーンファイルを読めません: ${scene}（HTTP ${file.status}）` );

	}

	return { flat: flattenScene( await file.json() as OREngineProjectData ), since: 'ファイル（最後の保存）' };

};

const saveBaseline = async ( scene: string, flat: FlatScene ) => {

	await fetch( `${AGENT_BASELINE_ENDPOINT}/${encodeURIComponent( scene )}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify( flat ),
	} );

};

// 書き込み系コマンドを実行し、その前後で変わった値だけを基準に足す（本人の変更は基準に入れず、changes に残す）。
// シーンを切り替えるコマンド（scene-*）には使わない（前後で別のシーンになるため）
export const trackWrite = async <T>( ctx: AgentCommandContext, run: () => Promise<T> ): Promise<T> => {

	const scene = ctx.sceneName;

	if ( scene === null ) return run();

	const before = currentScene( ctx );
	const result = await run();
	const after = currentScene( ctx );
	const { flat } = await loadBaseline( scene );
	const keys = new Set( [ ...Object.keys( before.values ), ...Object.keys( after.values ) ] );

	for ( const key of keys ) {

		if ( same( before.values[ key ], after.values[ key ] ) ) continue;

		if ( key in after.values ) {

			flat.values[ key ] = after.values[ key ];

		} else {

			delete flat.values[ key ];

		}

	}

	Object.assign( flat.labels, after.labels );

	await saveBaseline( scene, flat );

	return result;

};

// status に出す件数。シーンを持たないページは null
export const countUserChanges = async ( ctx: AgentCommandContext ) => {

	if ( ctx.sceneName === null ) return null;

	const { flat } = await loadBaseline( ctx.sceneName );

	return diffScenes( flat, currentScene( ctx ) ).length;

};

/*-------------------------------
	changes
-------------------------------*/

// 基準から今までに本人が画面で変えた値。見たら基準を今の状態にする（--keep で残す）
const changes = async ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const scene = ctx.sceneName;

	if ( scene === null ) {

		return { scene: null, changes: [] };

	}

	const { flat, since } = await loadBaseline( scene );
	const current = currentScene( ctx );
	const list = diffScenes( flat, current );

	if ( input.options.keep !== true ) {

		await saveBaseline( scene, current );

	}

	return { scene, since, changes: list };

};

export const changeCommands: AgentCommandTable = {
	changes,
};
