import { useLayoutEffect, useRef, useState } from "react";

// 浮かせる要素の寄せ先。DOMRect をそのまま渡せる形にしてある
export type AnchorRect = {
	left: number;
	top: number;
	right: number;
	bottom: number;
};

// ポインタ座標のような点を寄せ先にする
export const pointAnchor = ( x: number, y: number ): AnchorRect => {

	return { left: x, top: y, right: x, bottom: y };

};

// 画面端からこれだけ内側に収める(px)
const VIEWPORT_MARGIN = 8;

// 1軸ぶんの配置。まず preferred に置き、はみ出すなら flipped が収まるときだけ反転する。
// どちらも収まらない（要素が画面より大きい等）ときは画面内へ寄せる
const placeAxis = ( preferred: number, flipped: number, size: number, viewportSize: number ) => {

	let pos = preferred;

	if ( pos + size > viewportSize - VIEWPORT_MARGIN && flipped >= VIEWPORT_MARGIN ) {

		pos = flipped;

	}

	pos = Math.min( pos, viewportSize - VIEWPORT_MARGIN - size );
	pos = Math.max( pos, VIEWPORT_MARGIN );

	return pos;

};

// 要素を anchor の右側・上端揃えに置く。右にはみ出せば左側へ、下にはみ出せば下端揃えへ反転する。
// 点を anchor にすると OS のコンテキストメニューと同じ「右下に出て、端では折り返す」動きになる
const placeNearAnchor = ( anchor: AnchorRect, width: number, height: number ) => {

	const left = placeAxis( anchor.right, anchor.left - width, width, window.innerWidth );
	const top = placeAxis( anchor.top, anchor.bottom - height, height, window.innerHeight );

	return { left, top };

};

// 要素を anchor のそばに fixed 配置するためのフック。返した ref を要素に付け、style を当てる。
// 位置は要素がマウントされた時点の大きさで1回だけ決める（中身が後から伸びても追わない）
export const useAnchoredPosition = ( anchor: AnchorRect | undefined ) => {

	const ref = useRef<HTMLDivElement>( null );
	const [ position, setPosition ] = useState<{ left: number, top: number } | null>( null );

	const left = anchor?.left;
	const top = anchor?.top;
	const right = anchor?.right;
	const bottom = anchor?.bottom;

	useLayoutEffect( () => {

		const elm = ref.current;

		if ( left === undefined || top === undefined || right === undefined || bottom === undefined || ! elm ) {

			setPosition( null );
			return;

		}

		const rect = elm.getBoundingClientRect();

		setPosition( placeNearAnchor( { left, top, right, bottom }, rect.width, rect.height ) );

	}, [ left, top, right, bottom ] );

	let style: React.CSSProperties | undefined = undefined;

	if ( anchor ) {

		if ( position ) {

			style = { position: "fixed", left: position.left, top: position.top };

		} else {

			// 大きさを測るまでの1回目は見せない
			style = { position: "fixed", left: 0, top: 0, visibility: "hidden" };

		}

	}

	return { ref, style };

};
