import * as MTP from 'mathpower';

/*-------------------------------
	SSAO の半球状のサンプル点

	乱数を使わず黄金比の列で決め打ちに並べ、ロードごと・バックエンドごとに見た目が変わらないようにする。
	向きの偏りは、シェーダーがピクセルごと・フレームごとにカーネルを法線まわりへ回してならす。
-------------------------------*/

// 黄金比の小数部と黄金角。i に掛けて並べると、どの本数でも [0,1) や円周上に偏りなく散る
const GOLDEN_RATIO_FRACT = ( Math.sqrt( 5 ) - 1 ) / 2;
const GOLDEN_ANGLE = Math.PI * ( 3 - Math.sqrt( 5 ) );

// 法線を z とする半球上の点を [ x, y, z ] × kernelSize で返す。長さは i に比例して 0.05〜1.0 で伸ばす
export const ssaoKernel = ( kernelSize: number ) => {

	const values: number[] = [];

	for ( let i = 0; i < kernelSize; i ++ ) {

		const scale = i / kernelSize * 0.95 + 0.05;

		// 円盤上の点を半球へ持ち上げる。長さと仰角が i で連動しないよう、半径は長さと別の列から取る
		const radius = Math.sqrt( ( i * GOLDEN_RATIO_FRACT + 0.5 ) % 1 );
		const theta = i * GOLDEN_ANGLE;
		const sample = new MTP.Vector( Math.cos( theta ) * radius, Math.sin( theta ) * radius, Math.sqrt( 1 - radius * radius ) );

		sample.multiply( scale );

		values.push( ...sample.getElm( 'vec3' ) );

	}

	return values;

};
