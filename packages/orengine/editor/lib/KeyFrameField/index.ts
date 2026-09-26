import * as MXP from 'maxpower';

import { Animation, AnimationLink, AnimationLinks } from '../../../builtin/Components/Utility/Animation';
import { Engine } from '../../../core/Engine';
import { Command } from '../CommandManager';
import { AddComponentCommand } from '../Commands/AddComponentCommand';
import { GroupCommand } from '../Commands/GroupCommand';
import { SetComponentFieldCommand } from '../Commands/SetComponentFieldCommand';
import { SetFieldCommand } from '../Commands/SetFieldCommand';
import { deleteKeyFrame, findKeyFrame, setKeyFrame } from '../KeyFrameCurve';

// キーを打つ対象のフィールド。target は Entity か Component
export type KeyFrameFieldRef = {
	target: MXP.Serializable;
	path: string;
};

// 行に示すキーの状態。keyed = 今の時刻にキーがある / changed = フィールドの値がカーブの値から手で変えられている
export type KeyFrameState = {
	keyed: boolean;
	changed: boolean;
};

// フィールドの値の種類ごとのキーの打ち方。event は関数のフィールドで、値を持たない時刻だけのキー
export type KeyFrameKind = "number" | "array" | "boolean" | "select" | "event";

type ResolvedField = {
	entity: MXP.Entity;
	// Animation のリンクの対象。エンティティのフィールドはパスのまま、コンポーネントは <コンポーネント名>:<パス>
	linkKey: string;
	kind: KeyFrameKind;
	// カーブに打つ値（倍率・足し算で逆算する前）。数値配列は要素ごと、それ以外は1要素
	values: number[];
	opt: MXP.SerializableFieldOpt;
};

// フィールドの値が倍率・足し算をかけたカーブの値と食い違っているとみなす差
const CHANGED_TOLERANCE = 0.0001;

// 今の時刻を timeline/fps のコマに揃えた時刻（秒×60）。Editor.stepFrame と同じ丸め方・同じ式で、
// コマ送りで止まった時刻と浮動小数まで一致させる
export const keyFrameTime = ( engine: Engine ) => {

	const fps = engine.frameSetting.fps;

	if ( fps <= 0 ) return engine.frame.current;

	return Math.round( engine.time.code * fps ) * 60 / fps;

};

/*-------------------------------
	Field
-------------------------------*/

// select の選択肢の値の並び
const selectValues = ( list: MXP.SelectList | ( () => MXP.SelectList ) ) => {

	let items = list;

	if ( typeof items == "function" ) items = items();

	const values: unknown[] = [];

	for ( const item of items ) {

		if ( typeof item == "object" ) {

			values.push( item.value );

		} else {

			values.push( item );

		}

	}

	return values;

};

// キーを打てるフィールドなら、打ち方とカーブに打つ値を返す。打てないフィールド（文字列・参照・setter の無いもの等）は null
const resolveField = ( field: KeyFrameFieldRef ): ResolvedField | null => {

	const target = field.target;

	let entity: MXP.Entity;
	let linkKey = field.path;

	if ( target instanceof MXP.Entity ) {

		entity = target;

	} else if ( target instanceof MXP.Component ) {

		entity = target.entity;
		linkKey = Engine.resources.getComponentName( target ) + ":" + field.path;

	} else {

		return null;

	}

	const value = target.getField( field.path );
	const opt = target.getFieldOpt( field.path ) || {};

	if ( typeof value == "function" ) {

		return { entity, linkKey, kind: "event", values: [ 0 ], opt };

	}

	if ( opt.readOnly ) return null;

	const format = opt.format;

	if ( format && format.type == "select" ) {

		const index = selectValues( format.list ).indexOf( value );

		if ( index < 0 ) return null;

		return { entity, linkKey, kind: "select", values: [ index ], opt };

	}

	// 参照・リソースの選択は数値のカーブで表せない
	if ( format && format.type != "vector" && format.type != "color" ) return null;

	if ( typeof value == "number" ) {

		return { entity, linkKey, kind: "number", values: [ value ], opt };

	}

	if ( typeof value == "boolean" ) {

		return { entity, linkKey, kind: "boolean", values: [ value ? 1 : 0 ], opt };

	}

	if ( Array.isArray( value ) && value.length > 0 ) {

		const values: number[] = [];

		for ( const item of value ) {

			if ( typeof item != "number" ) return null;

			values.push( item );

		}

		return { entity, linkKey, kind: "array", values, opt };

	}

	return null;

};

// キーを打てるフィールドか
export const isKeyFrameField = ( field: KeyFrameFieldRef ) => {

	return resolveField( field ) !== null;

};

/*-------------------------------
	Links
-------------------------------*/

// エンティティの Animation のリンク。Animation が無ければ空
export const getLinks = ( entity: MXP.Entity ): AnimationLinks => {

	const animation = entity.getComponent( Animation );

	if ( ! animation ) return {};

	return animation.getField<AnimationLinks>( "links" ) || {};

};

// 対象1つぶんのリンクを要素ごとの並びにする（数値配列以外は1要素）
const toElementLinks = ( link: AnimationLinks[string] | undefined, kind: KeyFrameKind ): ( AnimationLink | null )[] => {

	if ( ! link ) return [];

	const single = typeof link[ 0 ] == "string";

	// フィールドの型がコードの変更で変わったときは、合わないリンクを無いものとして扱う
	if ( kind == "array" ) {

		if ( single ) return [];

		return ( link as ( AnimationLink | null )[] ).slice();

	}

	if ( ! single ) return [];

	return [ link as AnimationLink ];

};

// toElementLinks の逆。リンクが1つも残らなければ undefined（対象ごと外す）
const fromElementLinks = ( elementLinks: ( AnimationLink | null )[], kind: KeyFrameKind ): AnimationLinks[string] | undefined => {

	let hasLink = false;

	for ( const link of elementLinks ) {

		if ( link ) hasLink = true;

	}

	if ( ! hasLink ) return undefined;

	if ( kind == "array" ) return elementLinks;

	return elementLinks[ 0 ]!;

};

// 表でまだ使われていない、いちばん小さい番号のカーブ ID
const newCurveId = ( curves: MXP.CurveTable ) => {

	let index = 1;

	while ( curves[ "c" + index ] ) {

		index ++;

	}

	return "c" + index;

};

// boolean・select・イベントは中間の値に意味が無いので、次のキーまで値を保つ
const interpolationOf = ( kind: KeyFrameKind ): MXP.FCurveInterpolation => {

	if ( kind == "number" || kind == "array" ) return "BEZIER";

	return "CONSTANT";

};

// エンティティごとに、編集後のリンクと、リンクを書き換えたかを持つ
type LinkEdit = {
	links: AnimationLinks;
	changed: boolean;
};

// エンティティの編集中のリンクを引く。まだ無ければ今のリンクを写して作る
const getLinkEdit = ( edits: Map<MXP.Entity, LinkEdit>, entity: MXP.Entity ) => {

	let edit = edits.get( entity );

	if ( ! edit ) {

		edit = { links: { ...getLinks( entity ) }, changed: false };
		edits.set( entity, edit );

	}

	return edit;

};

// カーブの表とリンクの書き換えを undo 1回ぶんのコマンドにまとめる。Animation が無いエンティティには先に足す
const buildCommand = ( engine: Engine, curves: MXP.CurveTable, edits: Map<MXP.Entity, LinkEdit> ): Command => {

	const commands: Command[] = [];

	for ( const [ entity, edit ] of edits ) {

		if ( edit.changed && ! entity.getComponent( Animation ) ) {

			commands.push( new AddComponentCommand( entity, Animation ) );

		}

	}

	commands.push( new SetFieldCommand( engine, "curves", engine.curves, curves ) );

	for ( const [ entity, edit ] of edits ) {

		if ( ! edit.changed ) continue;

		commands.push( new SetComponentFieldCommand( entity, Animation, "links", getLinks( entity ), edit.links ) );

	}

	return new GroupCommand( commands );

};

/*-------------------------------
	Insert / Delete
-------------------------------*/

// fields に frame のキーを打つコマンドを作る（数値配列は全要素）。打つ値は、リンクの倍率と足し算から逆算したカーブ側の値。
// リンクの無いフィールドには、カーブとリンクを新しく足す。打てないフィールドがあれば何もせず Error を投げる
export const buildInsertKeys = ( engine: Engine, fields: KeyFrameFieldRef[], frame: number ): Command => {

	const curves: MXP.CurveTable = { ...engine.curves };
	const edits = new Map<MXP.Entity, LinkEdit>();

	for ( const field of fields ) {

		const resolved = resolveField( field );

		if ( ! resolved ) throw new Error( `Cannot insert a keyframe on "${field.path}"` );

		const edit = getLinkEdit( edits, resolved.entity );
		const elementLinks = toElementLinks( edit.links[ resolved.linkKey ], resolved.kind );

		for ( let i = 0; i < resolved.values.length; i ++ ) {

			let link = elementLinks[ i ];

			if ( ! link ) {

				link = [ newCurveId( curves ), 1, 0 ];
				elementLinks[ i ] = link;
				edit.changed = true;

			}

			// 倍率が 0 だとカーブ側の値を逆算できない
			if ( link[ 1 ] == 0 ) throw new Error( `Cannot insert a keyframe on "${field.path}": the link scale is 0` );

			const value = ( resolved.values[ i ] - link[ 2 ] ) / link[ 1 ];

			curves[ link[ 0 ] ] = setKeyFrame( curves[ link[ 0 ] ], frame, value, interpolationOf( resolved.kind ) );

		}

		if ( edit.changed ) {

			edit.links[ resolved.linkKey ] = fromElementLinks( elementLinks, resolved.kind )!;

		}

	}

	return buildCommand( engine, curves, edits );

};

// fields の frame のキーを消すコマンドを作る。最後のキーを消したフィールドは、リンクも外してアニメーションしていない状態に戻す。
// 消すキーが1つも無ければ null
export const buildDeleteKeys = ( engine: Engine, fields: KeyFrameFieldRef[], frame: number ): Command | null => {

	const curves: MXP.CurveTable = { ...engine.curves };
	const edits = new Map<MXP.Entity, LinkEdit>();

	let deleted = false;

	for ( const field of fields ) {

		const resolved = resolveField( field );

		if ( ! resolved ) continue;

		const edit = getLinkEdit( edits, resolved.entity );
		const elementLinks = toElementLinks( edit.links[ resolved.linkKey ], resolved.kind );

		for ( let i = 0; i < elementLinks.length; i ++ ) {

			const link = elementLinks[ i ];

			if ( ! link ) continue;

			const curve = curves[ link[ 0 ] ];

			if ( ! curve ) continue;

			const next = deleteKeyFrame( curve, frame );

			if ( ! next ) continue;

			curves[ link[ 0 ] ] = next;
			deleted = true;

			if ( next.k.length == 0 ) {

				elementLinks[ i ] = null;
				edit.changed = true;

			}

		}

		if ( edit.changed ) {

			const link = fromElementLinks( elementLinks, resolved.kind );

			if ( link ) {

				edit.links[ resolved.linkKey ] = link;

			} else {

				delete edit.links[ resolved.linkKey ];

			}

		}

	}

	if ( ! deleted ) return null;

	return buildCommand( engine, curves, edits );

};

/*-------------------------------
	State
-------------------------------*/

// キー列から作った FCurve。キー列は編集のたびに作り直される（書き換えない）ので、キー列そのものをキーにして使い回す
const fcurveCache = new WeakMap<MXP.KeyFrameData[], MXP.FCurve>();

const getFCurve = ( k: MXP.KeyFrameData[] ) => {

	let fcurve = fcurveCache.get( k );

	if ( ! fcurve ) {

		fcurve = new MXP.FCurve( MXP.decodeKeyFrames( k ) );
		fcurveCache.set( k, fcurve );

	}

	return fcurve;

};

// Animation が入れる値をフィールドの setter と同じく丸める（int / min / max）。丸めた後の値と比べないと、手で変えたと誤判定する
const normalizeNumber = ( value: number, opt: MXP.SerializableFieldOpt ) => {

	let result = value;

	if ( opt.int ) result = Math.round( result );
	if ( opt.min !== undefined ) result = Math.max( opt.min, result );
	if ( opt.max !== undefined ) result = Math.min( opt.max, result );

	return result;

};

// Animation が入れる値（カーブの値 × 倍率 + 足し算）を、フィールドの値と比べられる形にする
const expectedValue = ( link: AnimationLink, curve: MXP.CurveData, frame: number, resolved: ResolvedField ) => {

	const value = getFCurve( curve.k ).getValue( frame ) * link[ 1 ] + link[ 2 ];

	if ( resolved.kind == "boolean" ) {

		if ( value > 0.5 ) return 1;

		return 0;

	}

	if ( resolved.kind == "select" ) return value;

	return normalizeNumber( value, resolved.opt );

};

// フィールドのキーの状態。アニメーションしていなければ null。
// keyFrame は今の時刻をコマに揃えた時刻（キーの有無）、frame は今の時刻（Animation が値を入れた時刻）
export const getKeyFrameState = ( engine: Engine, field: KeyFrameFieldRef, keyFrame: number, frame: number ): KeyFrameState | null => {

	const resolved = resolveField( field );

	if ( ! resolved ) return null;

	const elementLinks = toElementLinks( getLinks( resolved.entity )[ resolved.linkKey ], resolved.kind );

	let animated = false;
	let keyed = false;
	let changed = false;

	for ( let i = 0; i < elementLinks.length; i ++ ) {

		const link = elementLinks[ i ];

		if ( ! link ) continue;

		const curve = engine.curves[ link[ 0 ] ];

		if ( ! curve || curve.k.length == 0 ) continue;

		animated = true;

		if ( findKeyFrame( getFCurve( curve.k ).keyframes, keyFrame ) >= 0 ) keyed = true;

		// イベントは値を持たない。要素数が減った数値配列の、はみ出たリンクは比べない
		if ( resolved.kind == "event" || i >= resolved.values.length ) continue;

		if ( Math.abs( expectedValue( link, curve, frame, resolved ) - resolved.values[ i ] ) > CHANGED_TOLERANCE ) {

			changed = true;

		}

	}

	if ( ! animated ) return null;

	return { keyed, changed };

};

/*-------------------------------
	Timeline
-------------------------------*/

// 時刻（秒×60）を timeline/fps のコマに揃える。keyFrameTime・Editor.stepFrame と同じ式にして、打ったキーと浮動小数まで一致させる
export const snapKeyFrameTime = ( frame: number, fps: number ) => {

	if ( fps <= 0 ) return frame;

	return Math.round( frame * fps / 60 ) * 60 / fps;

};

// フィールドの値の種類。キーを打てないフィールドは null
export const keyFrameKindOf = ( field: KeyFrameFieldRef ) => {

	const resolved = resolveField( field );

	if ( ! resolved ) return null;

	return resolved.kind;

};

// シーン全体で、カーブ ID ごとにリンクされている数（共有の印に使う）
export const countCurveUsers = ( engine: Engine ) => {

	const users = new Map<string, number>();

	engine.root.traverse( ( entity ) => {

		const links = getLinks( entity );

		for ( const target of Object.keys( links ) ) {

			for ( const link of flattenLinks( links[ target ] ) ) {

				users.set( link[ 0 ], ( users.get( link[ 0 ] ) || 0 ) + 1 );

			}

		}

	} );

	return users;

};

// 対象1つぶんのリンクを、数値配列の要素ごとのリンクも含めた平らな並びにする（null は除く）
const flattenLinks = ( link: AnimationLinks[string] ) => {

	const result: AnimationLink[] = [];

	if ( typeof link[ 0 ] == "string" ) {

		result.push( link as AnimationLink );

		return result;

	}

	for ( const elementLink of link as ( AnimationLink | null )[] ) {

		if ( elementLink ) result.push( elementLink );

	}

	return result;

};

// カーブの表を curves に差し替えるコマンドを作る（タイムラインでの編集）。
// キーが1つも無くなったカーブを指すリンクは、I の Alt+I で最後のキーを消したときと同じく外す（共有していれば全部）
export const buildSetCurves = ( engine: Engine, curves: MXP.CurveTable ): Command => {

	const emptied = new Set<string>();

	for ( const id of Object.keys( curves ) ) {

		const before = engine.curves[ id ];

		if ( curves[ id ].k.length == 0 && before && before.k.length > 0 ) emptied.add( id );

	}

	const edits = new Map<MXP.Entity, LinkEdit>();

	if ( emptied.size > 0 ) {

		engine.root.traverse( ( entity ) => {

			const links = getLinks( entity );

			for ( const target of Object.keys( links ) ) {

				const link = removeLinksTo( links[ target ], emptied );

				if ( link === links[ target ] ) continue;

				const edit = getLinkEdit( edits, entity );

				edit.changed = true;

				if ( link ) {

					edit.links[ target ] = link;

				} else {

					delete edit.links[ target ];

				}

			}

		} );

	}

	return buildCommand( engine, curves, edits );

};

// ids のカーブを指すリンクを外した、対象1つぶんのリンク。外すものが無ければ link をそのまま、全部外れたら undefined
const removeLinksTo = ( link: AnimationLinks[string], ids: Set<string> ): AnimationLinks[string] | undefined => {

	if ( typeof link[ 0 ] == "string" ) {

		if ( ids.has( link[ 0 ] as string ) ) return undefined;

		return link;

	}

	const elementLinks = ( link as ( AnimationLink | null )[] ).slice();

	let removed = false;

	for ( let i = 0; i < elementLinks.length; i ++ ) {

		const elementLink = elementLinks[ i ];

		if ( elementLink && ids.has( elementLink[ 0 ] ) ) {

			elementLinks[ i ] = null;
			removed = true;

		}

	}

	if ( ! removed ) return link;

	return fromElementLinks( elementLinks, "array" );

};
