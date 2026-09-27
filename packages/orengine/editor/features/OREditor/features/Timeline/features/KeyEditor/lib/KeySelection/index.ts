import * as MXP from 'maxpower';
import { type KeyFrameHandleRef, type KeyFrameHandleSide } from 'orengine/editor';

// 選んでいるキーとハンドルの集まり。キーは "<カーブ ID>:<番号>"、ハンドルはそれに側を足した "<カーブ ID>:<番号>:<left|right>" の文字列で持つ。
// カーブで持つので、同じカーブを使う行（共有）では同じキーがそろって選ばれる。キーを選ぶと、そのキーの両側のハンドルも選ばれたものとして扱う
export type KeySelection = Set<string>;

export const keyRef = ( curveId: string, index: number ) => {

	return curveId + ":" + index;

};

export const handleRef = ( curveId: string, index: number, side: KeyFrameHandleSide ) => {

	return keyRef( curveId, index ) + ":" + side;

};

// ref を読む。ハンドルでなければ side は null
export const parseRef = ( ref: string ) => {

	let rest = ref;
	let side: KeyFrameHandleSide | null = null;

	if ( ref.endsWith( ":left" ) || ref.endsWith( ":right" ) ) {

		const separator = ref.lastIndexOf( ":" );

		side = ref.slice( separator + 1 ) as KeyFrameHandleSide;
		rest = ref.slice( 0, separator );

	}

	const separator = rest.lastIndexOf( ":" );

	return { curveId: rest.slice( 0, separator ), index: Number( rest.slice( separator + 1 ) ), side };

};

// 選んだキーをカーブごとの番号の並びにまとめる。ハンドルだけを選んだキーも入れる
// （削除・コピー・補間とハンドルの種類の変更は、Blender と同じくキーのどこかが選ばれていれば対象にする）。表に無いカーブ・範囲外の番号は外す
export const groupSelection = ( selection: KeySelection, curves: MXP.CurveTable ) => {

	const groups = new Map<string, number[]>();

	for ( const ref of selection ) {

		const { curveId, index } = parseRef( ref );
		const curve = curves[ curveId ];

		if ( ! curve || index >= curve.k.length ) continue;

		let indices = groups.get( curveId );

		if ( ! indices ) {

			indices = [];
			groups.set( curveId, indices );

		}

		if ( indices.indexOf( index ) < 0 ) indices.push( index );

	}

	return groups;

};

// 動かすキーとハンドルをカーブごとにまとめる（ドラッグ・G / R / S）。ハンドルは、キーごと選んでいるものは入れない（キーと一緒に動く）
export const groupTransformSelection = ( selection: KeySelection, curves: MXP.CurveTable ) => {

	const keys = new Map<string, number[]>();
	const handles = new Map<string, KeyFrameHandleRef[]>();

	for ( const ref of selection ) {

		const { curveId, index, side } = parseRef( ref );
		const curve = curves[ curveId ];

		if ( ! curve || index >= curve.k.length ) continue;

		if ( ! side ) {

			let indices = keys.get( curveId );

			if ( ! indices ) {

				indices = [];
				keys.set( curveId, indices );

			}

			indices.push( index );

			continue;

		}

		if ( selection.has( keyRef( curveId, index ) ) ) continue;

		let curveHandles = handles.get( curveId );

		if ( ! curveHandles ) {

			curveHandles = [];
			handles.set( curveId, curveHandles );

		}

		curveHandles.push( { index, side } );

	}

	return { keys, handles };

};

// ハンドルが選ばれているか（そのキーを選んでいれば選ばれている）
export const isHandleSelected = ( selection: KeySelection, curveId: string, index: number, side: KeyFrameHandleSide ) => {

	return selection.has( keyRef( curveId, index ) ) || selection.has( handleRef( curveId, index, side ) );

};

// キーか、そのキーのどちらかのハンドルが選ばれているか。key はキーの ref
export const includesKey = ( selection: KeySelection, key: string ) => {

	const { curveId, index } = parseRef( key );

	return selection.has( key ) || selection.has( handleRef( curveId, index, "left" ) ) || selection.has( handleRef( curveId, index, "right" ) );

};

// refs（キー・ハンドル）が指すキーがちょうど1つなら、そのキーの ref。ハンドルはその持ち主のキーとして数える。
// 共有カーブの行はそろって同じ ref になるので1つに数え、複数のカーブを束ねた行（配列の親の行）の印は null になる
export const singleKey = ( refs: string[] ) => {

	const keys = new Set<string>();

	for ( const ref of refs ) {

		const { curveId, index } = parseRef( ref );

		keys.add( keyRef( curveId, index ) );

	}

	if ( keys.size != 1 ) return null;

	return Array.from( keys )[ 0 ];

};

// refs がすべて選ばれているか
export const isAllSelected = ( selection: KeySelection, refs: string[] ) => {

	for ( const ref of refs ) {

		if ( ! selection.has( ref ) ) return false;

	}

	return refs.length > 0;

};

// 要素（とその祖先）に付いた data-refs から、印が表すキー・ハンドルを読む。印でなければ null
export const readRefs = ( target: EventTarget | null ) => {

	if ( ! ( target instanceof Element ) ) return null;

	const element = target.closest( "[data-refs]" );

	if ( ! element ) return null;

	const refs = element.getAttribute( "data-refs" );

	if ( ! refs ) return null;

	return refs.split( " " );

};

// root の中で、画面上の矩形 rect に掛かる印が表すキー・ハンドル（矩形選択）
export const readRefsInRect = ( root: HTMLElement, rect: { left: number, top: number, right: number, bottom: number } ) => {

	const refs: string[] = [];

	for ( const element of root.querySelectorAll( "[data-refs]" ) ) {

		const box = element.getBoundingClientRect();

		if ( box.right < rect.left || box.left > rect.right || box.bottom < rect.top || box.top > rect.bottom ) continue;

		for ( const ref of ( element.getAttribute( "data-refs" ) || "" ).split( " " ) ) {

			refs.push( ref );

		}

	}

	return refs;

};
