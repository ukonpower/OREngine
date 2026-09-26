import * as MXP from 'maxpower';
import { Engine } from 'orengine';
import { decodeCurve, getLinks, keyFrameKindOf, type EditKey, type KeyFrameKind } from 'orengine/editor';

import { keyRef } from '../KeySelection';

// タイムラインの行（チャンネル）。エンティティ > フィールド > 要素 の3段で、数値配列だけが要素の行を持つ
export type KeyChannel = {
	// 行の識別子。フィールドはリンクの対象（position / Light:intensity）、要素は <対象>#<番号>。
	// キーの貼り付けは、コピーした行と同じ識別子の行へ入れる
	id: string;
	parentId: string | null;
	depth: number;
	// コンポーネントのフィールドなら、そのコンポーネント名（ラベルの前に添える）
	component: string | null;
	label: string;
	// この行に並ぶキーのカーブ。エンティティ・数値配列のフィールドの行は、配下の要素のカーブをまとめて持つ
	curveIds: string[];
	leaf: boolean;
	hasChildren: boolean;
	// キーの打ち方の種類。対象のコンポーネントが外れているなどで分からなければ null
	kind: KeyFrameKind | null;
	// 数値配列の要素の番号（カーブ表示の線の色に使う）
	element: number | null;
	// ほかのリンクと共有しているカーブなら、その表示名と使用数
	shared: { name: string, count: number } | null;
};

// 行に並ぶキーの印。同じ時刻にある複数のカーブのキーを1つにまとめる（エンティティ・フィールドの行）
export type KeyMark = {
	frame: number;
	refs: string[];
};

export const ENTITY_CHANNEL_ID = "#entity";

// 数値配列の要素のラベル
const VECTOR_LABELS = [ "x", "y", "z", "w" ];
const COLOR_LABELS = [ "r", "g", "b", "a" ];

// 同じ時刻とみなすキーの時刻の差（秒×60）。KeyFrameCurve の TIME_TOLERANCE と同じ
const TIME_TOLERANCE = 0.0001;

// リンクの対象（position / Light:intensity）が指す Serializable とパス。コンポーネントが外れていれば target は null
const resolveLinkTarget = ( entity: MXP.Entity, linkKey: string ) => {

	const separator = linkKey.indexOf( ":" );

	if ( separator < 0 ) {

		return { target: entity as MXP.Serializable, component: null, path: linkKey };

	}

	const component = linkKey.slice( 0, separator );
	const path = linkKey.slice( separator + 1 );
	const item = Engine.resources.getComponent( component );

	let target: MXP.Serializable | null = null;

	if ( item ) {

		target = entity.getComponent( item.component ) || null;

	}

	return { target, component, path };

};

const elementLabel = ( target: MXP.Serializable | null, path: string, index: number ) => {

	let labels = VECTOR_LABELS;

	if ( target ) {

		const opt = target.getFieldOpt( path );

		if ( opt && opt.format && opt.format.type == "color" ) labels = COLOR_LABELS;

	}

	if ( index < labels.length ) return labels[ index ];

	return String( index );

};

const sharedOf = ( id: string, curves: MXP.CurveTable, users: Map<string, number> ) => {

	const count = users.get( id ) || 0;

	if ( count < 2 ) return null;

	let name = id;

	const curve = curves[ id ];

	if ( curve && curve.name ) name = curve.name;

	return { name, count };

};

const addCurveId = ( channel: KeyChannel, id: string ) => {

	if ( channel.curveIds.indexOf( id ) < 0 ) channel.curveIds.push( id );

};

// エンティティの Animation のリンクから行を作る。users はシーン全体でのカーブの使用数（countCurveUsers）
export const buildChannels = ( entity: MXP.Entity, curves: MXP.CurveTable, users: Map<string, number> ) => {

	const links = getLinks( entity );
	const targets = Object.keys( links );

	const entityChannel: KeyChannel = {
		id: ENTITY_CHANNEL_ID,
		parentId: null,
		depth: 0,
		component: null,
		label: entity.name,
		curveIds: [],
		leaf: false,
		hasChildren: targets.length > 0,
		kind: null,
		element: null,
		shared: null,
	};

	const channels: KeyChannel[] = [ entityChannel ];

	for ( const linkKey of targets ) {

		const link = links[ linkKey ];
		const resolved = resolveLinkTarget( entity, linkKey );

		let kind: KeyFrameKind | null = null;

		if ( resolved.target ) {

			kind = keyFrameKindOf( { target: resolved.target, path: resolved.path } );

		}

		const fieldChannel: KeyChannel = {
			id: linkKey,
			parentId: ENTITY_CHANNEL_ID,
			depth: 1,
			component: resolved.component,
			label: resolved.path,
			curveIds: [],
			leaf: true,
			hasChildren: false,
			kind,
			element: null,
			shared: null,
		};

		channels.push( fieldChannel );

		if ( typeof link[ 0 ] == "string" ) {

			const id = link[ 0 ] as string;

			addCurveId( fieldChannel, id );
			addCurveId( entityChannel, id );
			fieldChannel.shared = sharedOf( id, curves, users );

			continue;

		}

		fieldChannel.leaf = false;
		fieldChannel.hasChildren = true;

		const elementLinks = link as ( [string, number, number] | null )[];

		for ( let i = 0; i < elementLinks.length; i ++ ) {

			const elementLink = elementLinks[ i ];

			if ( ! elementLink ) continue;

			const id = elementLink[ 0 ];

			channels.push( {
				id: linkKey + "#" + i,
				parentId: linkKey,
				depth: 2,
				component: null,
				label: elementLabel( resolved.target, resolved.path, i ),
				curveIds: [ id ],
				leaf: true,
				hasChildren: false,
				kind,
				element: i,
				shared: sharedOf( id, curves, users ),
			} );

			addCurveId( fieldChannel, id );
			addCurveId( entityChannel, id );

		}

	}

	return channels;

};

/*-------------------------------
	Keys
-------------------------------*/

// カーブを編集用のキーの列にしたもの。カーブは編集のたびに作り直される（書き換えない）ので、カーブそのものをキーにして使い回す
const keysCache = new WeakMap<MXP.CurveData, EditKey[]>();

export const getCurveKeys = ( curve: MXP.CurveData | undefined ) => {

	if ( ! curve ) return [];

	let keys = keysCache.get( curve );

	if ( ! keys ) {

		keys = decodeCurve( curve );
		keysCache.set( curve, keys );

	}

	return keys;

};

// 行に並べるキーの印。複数のカーブのキーは、同じ時刻のものを1つにまとめる。
// キーは timeline/fps のコマに揃っているので、時刻を TIME_TOLERANCE の刻みに丸めた値で引く
export const buildMarks = ( curves: MXP.CurveTable, curveIds: string[] ) => {

	const marks = new Map<number, KeyMark>();

	for ( const id of curveIds ) {

		const keys = getCurveKeys( curves[ id ] );

		for ( let i = 0; i < keys.length; i ++ ) {

			const frame = keys[ i ].coordinate.x;
			const slot = Math.round( frame / TIME_TOLERANCE );

			let mark = marks.get( slot );

			if ( ! mark ) {

				mark = { frame, refs: [] };
				marks.set( slot, mark );

			}

			mark.refs.push( keyRef( id, i ) );

		}

	}

	const result = Array.from( marks.values() );

	result.sort( ( a, b ) => a.frame - b.frame );

	return result;

};
