import * as MTP from 'mathpower';

import { ssaoKernel } from '../../../../core/utils/SSAOKernel';
import { sssKernel } from '../../../../core/utils/SSSKernel';

import bloomCompositeWgsl from './bloomComposite.wgsl';
import gaussBlurWgsl from './gaussBlur.wgsl';
import lightShaftBlurWgsl from './lightShaftBlur.wgsl';
import motionBlurWgsl from './motionBlur.wgsl';
import motionBlurTileWgsl from './motionBlurTile.wgsl';
import ssaoWgsl from './ssao.wgsl';
import ssaoBlurWgsl from './ssaoBlur.wgsl';
import sssWgsl from './sss.wgsl';

/*-------------------------------
	生成時に値が決まるポストプロセスのWGSL

	本体は各 .wgsl。ここでやるのは定数の差し込みだけ。

	GLSLでuniform配列だった重み・カーネルは、WGSLのuniformアドレス空間だと
	要素ストライドが16の倍数に制限されて素直に置けないため、
	定数としてWGSLへ焼き込む（値はどのみちパス生成時に決まる）。
-------------------------------*/

const wgslFloats = ( values: number[] ) => values.map( ( v ) => v.toFixed( 8 ) ).join( ', ' );

/*-------------------------------
	ssao
-------------------------------*/

// webgl 側 DeferredRenderer の SSAO_SAMPLES と一致させる
export const SSAO_SAMPLES = 16;

export const buildSsaoWgsl = () => {

	const kernel = ssaoKernel( SSAO_SAMPLES );
	const elements = [];

	for ( let i = 0; i < SSAO_SAMPLES; i ++ ) {

		elements.push( `vec3f( ${wgslFloats( kernel.slice( i * 3, i * 3 + 3 ) )} )` );

	}

	return [
		`const SSAO_SAMPLES = ${SSAO_SAMPLES};`,
		`const SSAO_KERNEL = array<vec3f, ${SSAO_SAMPLES}>(\n\t${elements.join( ',\n\t' )}\n);`,
		ssaoWgsl,
	].join( '\n\n' );

};

/*-------------------------------
	blur
-------------------------------*/

const blurConstants = ( samples: number, vertical: boolean ) => [
	`const BLUR_SAMPLES = ${samples};`,
	`const BLUR_WEIGHTS = array<f32, ${samples}>( ${wgslFloats( MTP.MathUtils.gaussWeights( samples ) )} );`,
	`const BLUR_DIRECTION = vec2f( ${vertical ? '0.0, 1.0' : '1.0, 0.0'} );`,
].join( '\n' );

export const buildSsaoBlurWgsl = ( samples: number, vertical: boolean ) =>
	[ blurConstants( samples, vertical ), ssaoBlurWgsl ].join( '\n\n' );

export const buildGaussBlurWgsl = ( samples: number, vertical: boolean ) =>
	[ blurConstants( samples, vertical ), gaussBlurWgsl ].join( '\n\n' );

export const buildLightShaftBlurWgsl = ( samples: number, vertical: boolean ) =>
	[ blurConstants( samples, vertical ), lightShaftBlurWgsl ].join( '\n\n' );

/*-------------------------------
	sss
-------------------------------*/

// vertical は縦ぼかしで、シェーディング結果の diffuse の置き換えまで行う
export const buildSssWgsl = ( samples: number, vertical: boolean ) => {

	const kernel = sssKernel( samples );
	const elements = [];

	let direction = '1.0, 0.0';

	if ( vertical ) {

		direction = '0.0, 1.0';

	}

	for ( let i = 0; i < samples; i ++ ) {

		elements.push( `vec4f( ${wgslFloats( kernel.slice( i * 4, i * 4 + 4 ) )} )` );

	}

	return [
		`const SSS_SAMPLES = ${samples};`,
		`const SSS_KERNEL = array<vec4f, ${samples}>(\n\t${elements.join( ',\n\t' )}\n);`,
		`const SSS_DIRECTION = vec2f( ${direction} );`,
		`const SSS_COMPOSITE = ${vertical};`,
		sssWgsl,
	].join( '\n\n' );

};

/*-------------------------------
	bloom
-------------------------------*/

// ぼかし各段のテクスチャは名前で個別に束縛されるため、合成はループにできず段数ぶん展開する
export const buildBloomCompositeWgsl = ( levels: number ) => {

	const adds = [];

	for ( let i = 0; i < levels; i ++ ) {

		adds.push( `	sum += textureSampleLevel( uBloom${i}, ppSampler, uv, 0.0 ).xyz * ${( ( i + 1 ) / levels ).toFixed( 6 )};` );

	}

	return [
		`fn bloomSum( uv: vec2f ) -> vec3f {\n\n\tvar sum = vec3f( 0.0 );\n\n${adds.join( '\n' )}\n\n\treturn sum;\n\n}`,
		bloomCompositeWgsl,
	].join( '\n\n' );

};

/*-------------------------------
	motion blur
-------------------------------*/

export const buildMotionBlurTileWgsl = ( tile: number ) =>
	[ `const TILE = ${tile};`, motionBlurTileWgsl ].join( '\n\n' );

export const buildMotionBlurWgsl = ( tile: number ) =>
	[ `const TILE = ${tile};`, motionBlurWgsl ].join( '\n\n' );
