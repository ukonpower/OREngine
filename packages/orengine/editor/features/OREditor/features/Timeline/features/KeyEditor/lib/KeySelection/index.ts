import * as MXP from 'maxpower';

// 選んでいるキーの集まり。キーは "<カーブ ID>:<番号>" の文字列で持つ。
// カーブで持つので、同じカーブを使う行（共有）では同じキーがそろって選ばれる
export type KeySelection = Set<string>;

export const keyRef = ( curveId: string, index: number ) => {

	return curveId + ":" + index;

};

export const parseKeyRef = ( ref: string ) => {

	const separator = ref.lastIndexOf( ":" );

	return { curveId: ref.slice( 0, separator ), index: Number( ref.slice( separator + 1 ) ) };

};

// 選んだキーをカーブごとの番号の並びにまとめる。表に無いカーブ・範囲外の番号は外す
export const groupSelection = ( selection: KeySelection, curves: MXP.CurveTable ) => {

	const groups = new Map<string, number[]>();

	for ( const ref of selection ) {

		const { curveId, index } = parseKeyRef( ref );
		const curve = curves[ curveId ];

		if ( ! curve || index >= curve.k.length ) continue;

		let indices = groups.get( curveId );

		if ( ! indices ) {

			indices = [];
			groups.set( curveId, indices );

		}

		indices.push( index );

	}

	return groups;

};

// refs がすべて選ばれているか
export const isAllSelected = ( selection: KeySelection, refs: string[] ) => {

	for ( const ref of refs ) {

		if ( ! selection.has( ref ) ) return false;

	}

	return refs.length > 0;

};

// 要素（とその祖先）に付いた data-refs から、印が表すキーを読む。キーの印でなければ null
export const readRefs = ( target: EventTarget | null ) => {

	if ( ! ( target instanceof Element ) ) return null;

	const element = target.closest( "[data-refs]" );

	if ( ! element ) return null;

	const refs = element.getAttribute( "data-refs" );

	if ( ! refs ) return null;

	return refs.split( " " );

};

// root の中で、画面上の矩形 rect に掛かるキーの印が表すキー（矩形選択）
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
