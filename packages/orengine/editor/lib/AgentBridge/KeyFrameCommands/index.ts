import * as MXP from 'maxpower';

import { AnimationLink } from '../../../../builtin/Components/Utility/Animation';
import { Engine } from '../../../../core/Engine';
import { Command } from '../../CommandManager';
import { GroupCommand } from '../../Commands/GroupCommand';
import { SetFieldCommand } from '../../Commands/SetFieldCommand';
import { decodeCurve, EditKey, encodeCurve, findKeyFrame, KEYFRAME_HANDLE_TYPES, KeyFrameHandleType, recalcHandles } from '../../KeyFrameCurve';
import { buildCurveLinkSettings, buildDeleteKeys, buildInsertKeys, buildPasteCurve, buildUnlinkCurve, getCurveLinkInfo, getKeyFrameElementCount, getLinks, isKeyFrameField, keyFrameKindOf, snapKeyFrameTime } from '../../KeyFrameField';
import { AgentCommandError, AgentCommandInput, errorMessage, requireArg } from '../Command';
import { componentName, entityPath, resolveEntity } from '../EntityQuery';
import { assertEditableComponent, parseFieldValue, resolveAttachedComponent } from '../WriteCommands';

import type { AgentCommandContext, AgentCommandTable } from '../Command';

// キーフレームの観測と編集。フィールドとカーブの結びつきを変える操作（キーの挿入・削除、カーブの共有）はコマンドで、
// カーブの形（キーの時刻・値・補間・ハンドル）は curve-get / curve-set の JSON で扱う。
// 書き込みは KeyFrameField の build*（GUI の I / Alt+I・右クリックメニューと同じコマンド）か EditorAPI.setCurves（タイムラインと同じ）を通す。
// タブの再生時刻は変えない（GUI の I はキーの時刻へシークするが、CLI はシークしない）

// キーの時刻の単位（秒×60。BLidge v2 の k と Animation の timeCodeFrame に合わせている）
const FRAMES_PER_SECOND = 60;

// 秒×60 を秒にする
const toSeconds = ( frame: number ) => frame / FRAMES_PER_SECOND;

/*-------------------------------
	Field
-------------------------------*/

// キーフレームの操作対象。element は数値配列の要素（<path>/<番号> で指したとき）。指していなければ null
type KeyTarget = {
	target: MXP.Serializable;
	path: string;
	element: number | null;
	// 応答に出す対象の名前（例: root/Box Light）
	label: string;
};

// キーを打てるフィールドの path（フォルダの見出し行を除く）
const keyablePaths = ( target: MXP.Serializable ) => {

	const paths: string[] = [];

	for ( const path of Object.keys( target.serialize( { mode: 'view' } ) ) ) {

		const opt = target.getFieldOpt( path ) ?? {};

		if ( opt.isFolder ) continue;

		if ( ! isKeyFrameField( { target, path } ) ) continue;

		paths.push( path );

	}

	return paths;

};

// path を「フィールドの path」と「数値配列の要素」に分ける。フィールドの path 自体に / が入るので、
// そのままフィールドとして引けなかったときだけ、末尾の /<番号> を要素とみなす
const resolveKeyPath = ( target: MXP.Serializable, raw: string, label: string ) => {

	const paths = keyablePaths( target );

	if ( paths.includes( raw ) ) {

		return { path: raw, element: null };

	}

	const slash = raw.lastIndexOf( '/' );
	const base = raw.slice( 0, slash );
	const index = raw.slice( slash + 1 );

	if ( slash > 0 && paths.includes( base ) && /^\d+$/.test( index ) ) {

		if ( ! Array.isArray( target.getField( base ) ) ) {

			throw new AgentCommandError( `${base} は数値配列のフィールドではないので要素を指定できません（${label}）` );

		}

		const element = Number( index );
		const count = getKeyFrameElementCount( { target, path: base } );

		if ( element >= count ) {

			throw new AgentCommandError( `${base} の要素は 0〜${count - 1} です: ${raw}（${label}）` );

		}

		return { path: base, element };

	}

	throw new AgentCommandError( `キーを打てるフィールドではありません: ${raw}（${label}）。数値配列の要素1つは <path>/<番号>（position/1 = y）で指します`, paths );

};

// 位置引数の先頭 `<entity> [<component>] <path>` をキーフレームの操作対象にする。
// trailing はフィールドの指定の後ろに続く位置引数の数（curve-paste の <curveId> 等）
const resolveKeyTarget = ( ctx: AgentCommandContext, input: AgentCommandInput, usage: string, trailing: number ): KeyTarget => {

	const fieldArgs = input.args.length - trailing;

	if ( fieldArgs !== 2 && fieldArgs !== 3 ) {

		throw new AgentCommandError( `引数の数が合いません。使い方: ${usage}` );

	}

	const entity = resolveEntity( ctx.engine, input.args[ 0 ] );

	let target: MXP.Serializable = entity;
	let label = entityPath( entity );

	if ( fieldArgs === 3 ) {

		const { component } = resolveAttachedComponent( entity, input.args[ 1 ] );

		assertEditableComponent( component, 'キーフレームの編集' );

		target = component;
		label = `${label} ${componentName( component )}`;

	}

	const { path, element } = resolveKeyPath( target, input.args[ fieldArgs - 1 ], label );

	return { target, path, element, label };

};

// カーブの共有は要素1つ単位（GUI の右クリックメニューと同じ）。数値配列では要素の指定を必須にする
const requireElement = ( key: KeyTarget ) => {

	if ( key.element !== null ) return key.element;

	if ( Array.isArray( key.target.getField( key.path ) ) ) {

		throw new AgentCommandError( `${key.path} は数値配列なので、要素を <path>/<番号>（${key.path}/0 等）で指定してください（${key.label}）` );

	}

	return 0;

};

// 応答に出す path。要素を指していれば <path>/<番号>
const keyPathLabel = ( key: KeyTarget ) => {

	if ( key.element === null ) return key.path;

	return `${key.path}/${key.element}`;

};

// build* が投げた Error を CLI に返す失敗にする
const runBuild = <T>( build: () => T ) => {

	try {

		return build();

	} catch ( e ) {

		throw new AgentCommandError( errorMessage( e ) );

	}

};

/*-------------------------------
	Links
-------------------------------*/

// リンク1本を使っている側。path はコマンドにそのまま渡せる形（数値配列は <path>/<番号>）
type CurveUser = {
	entity: string;
	uuid: string;
	component?: string;
	path: string;
	scale: number;
	offset: number;
};

// シーン全体で、カーブ ID ごとにそれを指しているリンクを集める
const collectCurveUsers = ( engine: Engine ) => {

	const users = new Map<string, CurveUser[]>();

	const add = ( id: string, user: CurveUser ) => {

		let list = users.get( id );

		if ( ! list ) {

			list = [];
			users.set( id, list );

		}

		list.push( user );

	};

	engine.root.traverseEditable( ( entity ) => {

		const links = getLinks( entity );

		for ( const linkKey of Object.keys( links ) ) {

			// Animation と同じく、最初の : より前がコンポーネント名
			const separator = linkKey.indexOf( ':' );

			let component: string | undefined;
			let path = linkKey;

			if ( separator >= 0 ) {

				component = linkKey.slice( 0, separator );
				path = linkKey.slice( separator + 1 );

			}

			const link = links[ linkKey ];

			if ( typeof link[ 0 ] === 'string' ) {

				const single = link as AnimationLink;

				add( single[ 0 ], { entity: entityPath( entity ), uuid: entity.uuid, component, path, scale: single[ 1 ], offset: single[ 2 ] } );

				continue;

			}

			const elementLinks = link as ( AnimationLink | null )[];

			for ( let i = 0; i < elementLinks.length; i ++ ) {

				const elementLink = elementLinks[ i ];

				if ( ! elementLink ) continue;

				add( elementLink[ 0 ], { entity: entityPath( entity ), uuid: entity.uuid, component, path: `${path}/${i}`, scale: elementLink[ 1 ], offset: elementLink[ 2 ] } );

			}

		}

	} );

	return users;

};

// 対象のフィールド（要素を指していればその要素）が今指しているカーブ ID
const linkedCurveIds = ( engine: Engine, key: KeyTarget ) => {

	const ids: string[] = [];
	const count = getKeyFrameElementCount( key );

	for ( let i = 0; i < count; i ++ ) {

		if ( key.element !== null && key.element !== i ) continue;

		const info = getCurveLinkInfo( engine, { target: key.target, path: key.path, element: i } );

		if ( info ) ids.push( info.curveId );

	}

	return ids;

};

// 対象のフィールドのカーブにあるキーの時刻（秒）。key-delete の候補に出す
const keyTimes = ( engine: Engine, key: KeyTarget ) => {

	const times: number[] = [];

	for ( const id of linkedCurveIds( engine, key ) ) {

		for ( const keyframe of MXP.decodeKeyFrames( engine.curves[ id ].k ) ) {

			const time = toSeconds( keyframe.coordinate.x );

			if ( ! times.includes( time ) ) times.push( time );

		}

	}

	times.sort( ( a, b ) => a - b );

	return times;

};

// カーブ ID を表から引く。無ければ候補付きで失敗させる
const resolveCurve = ( engine: Engine, id: string ) => {

	const curve = engine.curves[ id ];

	if ( ! curve ) {

		throw new AgentCommandError( `カーブがありません: ${id}（一覧は curves で確認できます）`, Object.keys( engine.curves ) );

	}

	return curve;

};

/*-------------------------------
	Curve JSON
-------------------------------*/

// curve-get / curve-set でやり取りするキー1つ。時刻とハンドルの x は秒で、ハンドルは絶対座標
type CurveKeyJson = {
	time: number;
	value: number;
	interpolation: MXP.FCurveInterpolation;
	handleType: KeyFrameHandleType;
	left?: [ number, number ];
	right?: [ number, number ];
};

type CurveJson = {
	name?: string;
	keys: CurveKeyJson[];
};

// カーブを curve-get の JSON にする。ハンドルは KeyEditor と同じく種類に従って置き直した位置を出す
const toCurveJson = ( curve: MXP.CurveData ): CurveJson => {

	const keys: CurveKeyJson[] = [];

	for ( const key of decodeCurve( curve ) ) {

		keys.push( {
			time: toSeconds( key.coordinate.x ),
			value: key.coordinate.y,
			interpolation: key.interpolation,
			handleType: key.handleType,
			left: [ toSeconds( key.handleLeft.x ), key.handleLeft.y ],
			right: [ toSeconds( key.handleRight.x ), key.handleRight.y ],
		} );

	}

	if ( curve.name === undefined ) return { keys };

	return { name: curve.name, keys };

};

// 秒を秒×60 に戻す。秒 / 60 と秒 × 60 は往復で一致しない（31 → 0.5166… → 30.999…）ので、
// curve-get で出した時刻がそのまま戻ってきたら元の値（frames のうち同じ秒になるもの）を使い、往復で値を変えない。
// 元に無い時刻は、同じ秒に戻る値のうち桁のいちばん短いものにする（0.5166… → 31）
const toFrame = ( seconds: number, frames: number[] ) => {

	for ( const frame of frames ) {

		if ( toSeconds( frame ) === seconds ) return frame;

	}

	const frame = seconds * FRAMES_PER_SECOND;

	for ( let digits = 1; digits <= 17; digits ++ ) {

		const candidate = Number( frame.toPrecision( digits ) );

		if ( toSeconds( candidate ) === seconds ) return candidate;

	}

	return frame;

};

// 自動で置き直す種類。left / right は省略でき、書いても使わない
const AUTO_HANDLE_TYPES: KeyFrameHandleType[] = [ 'AUTO_CLAMPED', 'AUTO', 'VECTOR' ];

const isFiniteNumber = ( value: unknown ): value is number => typeof value === 'number' && Number.isFinite( value );

// [ 秒, 値 ] のハンドルを読む。形が違えば失敗させる
const parseHandle = ( raw: unknown, label: string, frames: number[] ) => {

	if ( ! Array.isArray( raw ) || raw.length !== 2 || ! isFiniteNumber( raw[ 0 ] ) || ! isFiniteNumber( raw[ 1 ] ) ) {

		throw new AgentCommandError( `${label} は [ 秒, 値 ] で指定してください: ${JSON.stringify( raw )}` );

	}

	return { x: toFrame( raw[ 0 ], frames ), y: raw[ 1 ] };

};

// curve-set の JSON を編集用のキーの列にする。frames は今のカーブの時刻とハンドルの x（往復で値を変えないため）
const parseCurveKey = ( raw: unknown, index: number, frames: number[] ): EditKey => {

	const label = `keys[${index}]`;

	if ( typeof raw !== 'object' || raw === null ) {

		throw new AgentCommandError( `${label} はオブジェクトで指定してください: ${JSON.stringify( raw )}` );

	}

	const key = raw as { [ name: string ]: unknown };

	if ( ! isFiniteNumber( key.time ) ) {

		throw new AgentCommandError( `${label}.time は秒の数値で指定してください: ${JSON.stringify( key.time )}` );

	}

	if ( ! isFiniteNumber( key.value ) ) {

		throw new AgentCommandError( `${label}.value は数値で指定してください: ${JSON.stringify( key.value )}` );

	}

	const interpolation = MXP.KEYFRAME_INTERPOLATIONS.find( ( item ) => item === key.interpolation );

	if ( ! interpolation ) {

		throw new AgentCommandError( `${label}.interpolation が不正です: ${JSON.stringify( key.interpolation )}`, MXP.KEYFRAME_INTERPOLATIONS );

	}

	const handleType = KEYFRAME_HANDLE_TYPES.find( ( item ) => item === key.handleType );

	if ( ! handleType ) {

		throw new AgentCommandError( `${label}.handleType が不正です: ${JSON.stringify( key.handleType )}`, KEYFRAME_HANDLE_TYPES );

	}

	const coordinate = { x: toFrame( key.time, frames ), y: key.value };

	// 自動系は recalcHandles が前後のキーから置き直すので、仮にキーの座標を入れておく
	if ( AUTO_HANDLE_TYPES.includes( handleType ) ) {

		return { coordinate, handleLeft: { ...coordinate }, handleRight: { ...coordinate }, interpolation, handleType };

	}

	if ( key.left === undefined || key.right === undefined ) {

		throw new AgentCommandError( `${label} は handleType が ${handleType} なので left / right（[ 秒, 値 ]）が必要です` );

	}

	const handleLeft = parseHandle( key.left, `${label}.left`, frames );
	const handleRight = parseHandle( key.right, `${label}.right`, frames );

	// KeyEditor と同じく、ハンドルはキーの反対側へは越えさせない
	handleLeft.x = Math.min( handleLeft.x, coordinate.x );
	handleRight.x = Math.max( handleRight.x, coordinate.x );

	return { coordinate, handleLeft, handleRight, interpolation, handleType };

};

// curve-set の JSON をカーブにする。キーを時刻順に並べ、ハンドルを種類に従って置き直す。時刻はコマに揃えない
// （BLidge 由来のコマから外れたキーを curve-get → curve-set の往復で動かさないため）
const parseCurveJson = ( raw: string, current: MXP.CurveData ): MXP.CurveData => {

	let json: unknown;

	try {

		json = JSON.parse( raw );

	} catch {

		throw new AgentCommandError( `カーブの JSON を読めません: ${raw}` );

	}

	if ( typeof json !== 'object' || json === null || ! Array.isArray( ( json as CurveJson ).keys ) ) {

		throw new AgentCommandError( `カーブは { "name"?: 名前, "keys": [ … ] } の形で指定してください（curve-get の出力と同じ形）: ${raw}` );

	}

	const data = json as { name?: unknown; keys: unknown[] };

	if ( data.name !== undefined && typeof data.name !== 'string' ) {

		throw new AgentCommandError( `name は文字列で指定してください: ${JSON.stringify( data.name )}` );

	}

	const frames: number[] = [];

	for ( const key of decodeCurve( current ) ) {

		frames.push( key.coordinate.x, key.handleLeft.x, key.handleRight.x );

	}

	const keys: EditKey[] = [];

	for ( let i = 0; i < data.keys.length; i ++ ) {

		keys.push( parseCurveKey( data.keys[ i ], i, frames ) );

	}

	keys.sort( ( a, b ) => a.coordinate.x - b.coordinate.x );

	for ( let i = 1; i < keys.length; i ++ ) {

		// 同じ時刻かどうかは、I で打つとき（setKeyFrame）と同じ幅で見る
		if ( findKeyFrame( [ keys[ i - 1 ] ], keys[ i ].coordinate.x ) >= 0 ) {

			throw new AgentCommandError( `同じ時刻のキーが2つあります: ${toSeconds( keys[ i ].coordinate.x )} 秒（1本のカーブの1つの時刻に置けるキーは1つ）` );

		}

	}

	recalcHandles( keys );

	// 中身ごと差し替えるので、name を書かなければ名前を外す
	let base: MXP.CurveData | undefined;
	const name = ( data.name ?? '' ).trim();

	if ( name !== '' ) base = { name, k: [] };

	return encodeCurve( keys, base );

};

/*-------------------------------
	Observe
-------------------------------*/

// カーブの一覧。使っていないカーブ（保存時に外れる）も表にある間は出す
const listCurves = ( ctx: AgentCommandContext ) => {

	const users = collectCurveUsers( ctx.engine );
	const curves = [];

	for ( const id of Object.keys( ctx.engine.curves ) ) {

		const curve = ctx.engine.curves[ id ];
		const curveUsers = users.get( id ) ?? [];

		curves.push( { id, name: curve.name ?? null, keys: curve.k.length, uses: curveUsers.length, users: curveUsers } );

	}

	return { curves };

};

const getCurve = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const id = requireArg( input, 0, 'curve-get <curveId>' );

	return toCurveJson( resolveCurve( ctx.engine, id ) );

};

/*-------------------------------
	Curve
-------------------------------*/

const CURVE_SET_USAGE = 'curve-set <curveId> <json>';

// カーブの中身を JSON で差し替える（KeyEditor の編集と同じく EditorAPI.setCurves を通す）。
// keys を空にすると、キーをすべて消したときと同じくそのカーブを指すリンクも外れる
const setCurve = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const id = requireArg( input, 0, CURVE_SET_USAGE );
	const raw = requireArg( input, 1, CURVE_SET_USAGE );
	const curve = parseCurveJson( raw, resolveCurve( ctx.engine, id ) );

	ctx.editor.api.setCurves( { ...ctx.engine.curves, [ id ]: curve } );

	return { id, curve: toCurveJson( curve ) };

};

/*-------------------------------
	Key
-------------------------------*/

const KEY_INSERT_USAGE = 'key-insert <entity> [<component>] <path> --time <秒> [--value <値>]';
const KEY_DELETE_USAGE = 'key-delete <entity> [<component>] <path> --time <秒>';

// --time（秒）を timeline/fps のコマに揃えた時刻（秒×60）にする
const parseKeyTime = ( ctx: AgentCommandContext, input: AgentCommandInput, usage: string ) => {

	const raw = input.options.time;
	const time = Number( raw );

	if ( typeof raw !== 'string' || raw.trim() === '' || ! Number.isFinite( time ) ) {

		throw new AgentCommandError( `--time に秒の数値を指定してください。使い方: ${usage}` );

	}

	return snapKeyFrameTime( time * FRAMES_PER_SECOND, ctx.engine.frameSetting.fps );

};

// --value を、フィールドに入れる値（フィールドと同じ形）にする。要素を指していれば、その要素だけを今の値から差し替える
const parseKeyValue = ( ctx: AgentCommandContext, key: KeyTarget, raw: string ): MXP.SerializeFieldValue => {

	if ( keyFrameKindOf( key ) === 'event' ) {

		throw new AgentCommandError( `${key.path} は関数（イベント）のフィールドなので --value は指定できません（${key.label}）` );

	}

	if ( key.element === null ) {

		return parseFieldValue( ctx.engine, key.target, key.path, raw );

	}

	const value = Number( raw );

	if ( raw.trim() === '' || ! Number.isFinite( value ) ) {

		throw new AgentCommandError( `${keyPathLabel( key )} は数値の要素です: ${raw}` );

	}

	const values = ( key.target.getField( key.path ) as number[] ).slice();

	values[ key.element ] = value;

	return values;

};

// キーを打つ。--value があれば、フィールドへの set とキーの挿入を undo 1回にまとめる
const insertKey = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const key = resolveKeyTarget( ctx, input, KEY_INSERT_USAGE, 0 );
	const frame = parseKeyTime( ctx, input, KEY_INSERT_USAGE );

	let element: number | undefined;

	if ( key.element !== null ) element = key.element;

	let command: Command;

	if ( input.options.value === undefined ) {

		command = runBuild( () => buildInsertKeys( ctx.engine, [ { target: key.target, path: key.path, element } ], frame ) );

	} else {

		if ( typeof input.options.value !== 'string' ) {

			throw new AgentCommandError( `--value に値がありません。使い方: ${KEY_INSERT_USAGE}` );

		}

		const value = parseKeyValue( ctx, key, input.options.value );
		const insert = runBuild( () => buildInsertKeys( ctx.engine, [ { target: key.target, path: key.path, element, value } ], frame ) );
		const set = new SetFieldCommand( key.target, key.path, key.target.getField( key.path ) as MXP.SerializeFieldValue, value );

		command = new GroupCommand( [ set, insert ] );

	}

	ctx.editor.api.commandManager.execute( command, { merge: false } );

	return { target: key.label, path: keyPathLabel( key ), time: toSeconds( frame ), curves: linkedCurveIds( ctx.engine, key ) };

};

// キーを消す。最後のキーを消したフィールドはリンクも外れる（Alt+I と同じ）
const deleteKey = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const key = resolveKeyTarget( ctx, input, KEY_DELETE_USAGE, 0 );
	const frame = parseKeyTime( ctx, input, KEY_DELETE_USAGE );

	let element: number | undefined;

	if ( key.element !== null ) element = key.element;

	const command = runBuild( () => buildDeleteKeys( ctx.engine, [ { target: key.target, path: key.path, element } ], frame ) );

	if ( ! command ) {

		throw new AgentCommandError( `${toSeconds( frame )} 秒にキーがありません（${key.label} ${keyPathLabel( key )}）。候補はキーのある時刻（秒）です`, keyTimes( ctx.engine, key ) );

	}

	ctx.editor.api.commandManager.execute( command, { merge: false } );

	return { target: key.label, path: keyPathLabel( key ), time: toSeconds( frame ), curves: linkedCurveIds( ctx.engine, key ) };

};

/*-------------------------------
	Share
-------------------------------*/

const CURVE_PASTE_USAGE = 'curve-paste <entity> [<component>] <path> <curveId> --link | --copy';
const CURVE_UNLINK_USAGE = 'curve-unlink <entity> [<component>] <path>';
const CURVE_LINK_SETTINGS_USAGE = 'curve-link-settings <entity> [<component>] <path> [--scale <倍率>] [--offset <足し算>] [--name <カーブ名>]';

// 要素のリンクの今の状態を応答の形にする
const describeLink = ( ctx: AgentCommandContext, key: KeyTarget, element: number ) => {

	const info = getCurveLinkInfo( ctx.engine, { target: key.target, path: key.path, element } );

	if ( ! info ) return null;

	return { curveId: info.curveId, name: info.name ?? null, scale: info.scale, offset: info.offset, uses: info.uses };

};

// curveId のカーブを要素に貼り付ける。--link は同じカーブを共有し、--copy は複製して新しい ID を指す（GUI の Paste Curve (Link) / (Duplicate)）
const pasteCurve = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const key = resolveKeyTarget( ctx, input, CURVE_PASTE_USAGE, 1 );
	const element = requireElement( key );
	const curveId = input.args[ input.args.length - 1 ];

	resolveCurve( ctx.engine, curveId );

	const link = input.options.link === true;
	const copy = input.options.copy === true;

	if ( link === copy ) {

		throw new AgentCommandError( `--link か --copy のどちらか一方を指定してください。使い方: ${CURVE_PASTE_USAGE}` );

	}

	let mode: 'link' | 'duplicate' = 'link';

	if ( copy ) mode = 'duplicate';

	const command = runBuild( () => buildPasteCurve( ctx.engine, { target: key.target, path: key.path, element }, curveId, mode ) );

	// 既に同じカーブへリンクしていれば何もしない（GUI と同じ）
	if ( command ) {

		ctx.editor.api.commandManager.execute( command, { merge: false } );

	}

	return { target: key.label, path: `${key.path}/${element}`, changed: command !== null, link: describeLink( ctx, key, element ) };

};

// 要素が共有しているカーブを複製して指し直し、ほかのリンクから切り離す（GUI の Unlink Curve）
const unlinkCurve = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const key = resolveKeyTarget( ctx, input, CURVE_UNLINK_USAGE, 0 );
	const element = requireElement( key );
	const before = describeLink( ctx, key, element );

	if ( ! before ) {

		throw new AgentCommandError( `${key.label} ${key.path}/${element} にはカーブのリンクがありません` );

	}

	// GUI も共有しているときだけ Unlink Curve を出す
	if ( before.uses < 2 ) {

		throw new AgentCommandError( `${key.label} ${key.path}/${element} のカーブ ${before.curveId} はほかと共有していないので、解除するリンクがありません` );

	}

	ctx.editor.api.commandManager.execute( runBuild( () => buildUnlinkCurve( ctx.engine, { target: key.target, path: key.path, element } ) ), { merge: false } );

	return { target: key.label, path: `${key.path}/${element}`, from: before.curveId, link: describeLink( ctx, key, element ) };

};

// 数値のオプションを読む。無ければ undefined
const parseNumberOption = ( input: AgentCommandInput, name: string ) => {

	const raw = input.options[ name ];

	if ( raw === undefined ) return undefined;

	const value = Number( raw );

	if ( typeof raw !== 'string' || raw.trim() === '' || ! Number.isFinite( value ) ) {

		throw new AgentCommandError( `--${name} は数値で指定してください: ${raw}` );

	}

	return value;

};

// リンクの倍率・足し算と、リンク先のカーブの名前を書き換える（GUI の Link Settings）。指定しなかったものは今の値のまま
const setCurveLinkSettings = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const key = resolveKeyTarget( ctx, input, CURVE_LINK_SETTINGS_USAGE, 0 );
	const element = requireElement( key );
	const ref = { target: key.target, path: key.path, element };
	const info = getCurveLinkInfo( ctx.engine, ref );

	if ( ! info ) {

		throw new AgentCommandError( `${key.label} ${key.path}/${element} にはカーブのリンクがありません` );

	}

	const scale = parseNumberOption( input, 'scale' );
	const offset = parseNumberOption( input, 'offset' );
	const name = input.options.name;

	if ( typeof name === 'boolean' ) {

		throw new AgentCommandError( `--name に名前がありません（名前を外すときは --name ""）。使い方: ${CURVE_LINK_SETTINGS_USAGE}` );

	}

	if ( scale === undefined && offset === undefined && name === undefined ) {

		throw new AgentCommandError( `--scale / --offset / --name のどれかを指定してください。使い方: ${CURVE_LINK_SETTINGS_USAGE}` );

	}

	// select とイベントは倍率・足し算を 1 / 0 に固定している（GUI の設定にも出ない）
	if ( info.fixedScale && ( scale !== undefined || offset !== undefined ) ) {

		throw new AgentCommandError( `${key.path} は選択肢か関数（イベント）のフィールドなので、倍率・足し算は変えられません（--name だけ指定できます）` );

	}

	const settings = { name: info.name ?? '', scale: info.scale, offset: info.offset };

	if ( name !== undefined ) settings.name = name;
	if ( scale !== undefined ) settings.scale = scale;
	if ( offset !== undefined ) settings.offset = offset;

	const command = runBuild( () => buildCurveLinkSettings( ctx.engine, ref, settings ) );

	if ( command ) {

		ctx.editor.api.commandManager.execute( command, { merge: false } );

	}

	return { target: key.label, path: `${key.path}/${element}`, changed: command !== null, link: describeLink( ctx, key, element ) };

};

export const keyFrameObserveCommands: AgentCommandTable = {
	curves: listCurves,
	'curve-get': getCurve,
};

export const keyFrameWriteCommands: AgentCommandTable = {
	'curve-set': setCurve,
	'key-insert': insertKey,
	'key-delete': deleteKey,
	'curve-paste': pasteCurve,
	'curve-unlink': unlinkCurve,
	'curve-link-settings': setCurveLinkSettings,
};
