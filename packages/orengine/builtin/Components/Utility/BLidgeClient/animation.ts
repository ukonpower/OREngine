import { BLidge, BLidgeAnimationCurves, BLidger, Component, ComponentParams, Light } from 'maxpower';

import { Animation, AnimationLink, AnimationLinks } from '../Animation';

// BLidge のノードのアニメーションを、シーンのカーブの表（blidge: で始まる ID）へのリンクとして再生する Animation。
// BLidgeClient が sync のたびに付け直す。initiator が script なので保存されず、エディタはリンクもカーブも読み取り専用で扱う。
// ユーザーの Animation とはクラスが別なので、同じエンティティに両方付けられる
export class BLidgeAnimation extends Animation {

	constructor( params: ComponentParams ) {

		super( params );

		// ユーザーの Animation（-1）の後に値を入れ、Blender にカーブのある軸は Blender の値を勝たせる
		this.order = 0;

	}

	// BLidge が付けるコンポーネントは、player のコンポーネントの登録（シーン JSON に名前が載ったものだけ）に無いことがあるので、
	// 名前ではなくクラスで引く
	protected linkComponent( name: string ): Component | undefined {

		if ( name == "Light" ) return this.entity.getComponent( Light );

		if ( name == "BLidger" ) return this.entity.getComponent( BLidger );

		return undefined;

	}

}

// 軸ごとのカーブを、要素 offsets.length 個の数値配列へのリンクにする。offsets は要素ごとの足し算。
// カーブの無い軸は null（その要素は動かさない）。どの軸にもカーブが無ければ null
const vectorLinks = ( curves: BLidgeAnimationCurves, offsets: number[] ) => {

	const links: ( AnimationLink | null )[] = [];
	let hasLink = false;

	for ( let i = 0; i < offsets.length; i ++ ) {

		const id = curves[ i ];

		if ( id ) {

			links.push( [ id, 1, offsets[ i ] ] );
			hasLink = true;

		} else {

			links.push( null );

		}

	}

	if ( ! hasLink ) return null;

	return links;

};

// Blender のアニメーション1つを、リンクの対象とリンクにする。扱わないアニメーションは null。
// 対象の名前は配列の中の文字列で返す（player の terser はオブジェクトのキーを改名するので、links.position のようには書かない）
const animationLink = ( name: string, curves: BLidgeAnimationCurves, blidger: BLidger ): [ string, AnimationLinks[ string ] | null ] | null => {

	if ( name == "position" ) return [ "position", vectorLinks( curves, [ 0, 0, 0 ] ) ];

	// euler の順は BLidger が YZX に合わせてあるので、軸ごとにそのまま入れる。カメラの向きの補正は足し算で吸収する
	if ( name == "rotation" ) return [ "euler", vectorLinks( curves, [ blidger.rotationOffsetX, 0, 0 ] ) ];

	if ( name == "scale" ) return [ "scale", vectorLinks( curves, [ 0, 0, 0 ] ) ];

	if ( name == "color" ) return [ "Light:color", vectorLinks( curves, [ 0, 0, 0 ] ) ];

	// ここから下は1つの値のアニメーションで、x の軸のカーブだけを使う
	const id = curves[ 0 ];

	if ( ! id ) return null;

	// visible = 1 - hide。boolean は Animation が 0.5 より大きいかで決めるので、hide < 0.5 で見える
	if ( name == "hide" ) return [ "visible", [ id, - 1, 1 ]];

	if ( name == "power" ) return [ "Light:intensity", [ id, 1, 0 ]];

	return null;

};

// BLidger のノードのアニメーションと uniform から、BLidgeAnimation のリンクを作る
export const buildBLidgeLinks = ( blidge: BLidge, blidger: BLidger ) => {

	const node = blidger.node;
	const links: AnimationLinks = {};

	for ( const name of Object.keys( node.animations ) ) {

		const curves = blidge.animations[ node.animations[ name ] ];

		if ( ! curves ) continue;

		const entry = animationLink( name, curves, blidger );

		if ( entry && entry[ 1 ] ) links[ entry[ 0 ] ] = entry[ 1 ];

	}

	for ( const name of Object.keys( node.uniforms ) ) {

		const curves = blidge.animations[ node.uniforms[ name ] ];

		if ( ! curves ) continue;

		const link = vectorLinks( curves, [ 0, 0, 0, 0 ] );

		if ( link ) links[ "BLidger:uniforms/" + name ] = link;

	}

	return links;

};
