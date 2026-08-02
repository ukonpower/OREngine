import * as GLP from 'glpower';

import { VERTEX_INPUT_WGSL } from '../resources/GeometryBuffer';
import { buildStructWgsl } from '../resources/UniformBinder';

import gbufferWgsl from './shaders/gbuffer.wgsl';
import vertexOutputWgsl from './shaders/vertexOutput.wgsl';

import type { UniformField } from '../resources/UniformBinder';

/*-------------------------------
	シェーダーとパイプラインが共有する束縛の定義

	bind group は group0=フレーム / group1=オブジェクト / group2=マテリアル で固定。
	各グループの中身はここの宣言が唯一の出所で、WGSL の struct 文字列も
	CPU側のバイトオフセットも同じ配列から作られる。
	gBufferのフォーマットも同様に、アタッチメント記述とWGSLの出力structが
	この表から作られる。
-------------------------------*/

export const GROUP_FRAME = 0;
export const GROUP_OBJECT = 1;
export const GROUP_MATERIAL = 2;

// GLのクリップ空間（z∈[-w,w]）をWebGPU（z∈[0,w]）へ移す補正。
// カメラ・ライトどちらのprojection行列にも1回だけ乗算する。
// もう一方の規約差であるテクスチャ座標のY向きは、シャドウUVを求める箇所だけで吸収する
export const CLIP_CORRECTION = new GLP.Matrix().set( [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 0.5, 0,
	0, 0, 0.5, 1,
] );

// キューブ面へ描くときの補正。フレームバッファの行0がNDC y=+1 なのに対し、
// キューブ面の v=0 はGL規約だとNDC y=-1 側にあたるため、Yだけ反転してGLと同じ
// テクセル並びを作る（横方向はGLの視線行列のまま）。裏返るワインディングは
// envMapパイプラインを cullMode: 'none' にして無効化している
export const ENVMAP_CLIP_CORRECTION = new GLP.Matrix().set( [
	1, 0, 0, 0,
	0, - 1, 0, 0,
	0, 0, 0.5, 0,
	0, 0, 0.5, 1,
] );

// フレーム単位で変わる値（時間・解像度・カメラ）。シャドウパスではライトのカメラが入る
export const FRAME_FIELDS: UniformField[] = [
	{ name: 'uTime', type: 'f32' },
	{ name: 'uTimeF', type: 'f32' },
	{ name: 'uTimeE', type: 'f32' },
	{ name: 'uTimeEF', type: 'f32' },
	{ name: 'uResolution', type: 'vec2f' },
	{ name: 'uAspectRatio', type: 'f32' },
	{ name: 'uCameraNear', type: 'f32' },
	{ name: 'uCameraFar', type: 'f32' },
	{ name: 'uCameraPosition', type: 'vec3f' },
	{ name: 'uViewMatrix', type: 'mat4x4f' },
	{ name: 'uProjectionMatrix', type: 'mat4x4f' },
	{ name: 'uProjectionMatrixInverse', type: 'mat4x4f' },
	{ name: 'uCameraMatrix', type: 'mat4x4f' },
	// 速度ベクトルを出すための前フレームの行列
	{ name: 'uViewMatrixPrev', type: 'mat4x4f' },
	{ name: 'uProjectionMatrixPrev', type: 'mat4x4f' },
];

// 描画対象ごとに変わる値
export const OBJECT_FIELDS: UniformField[] = [
	{ name: 'uModelMatrix', type: 'mat4x4f' },
	{ name: 'uNormalMatrix', type: 'mat4x4f' },
	{ name: 'uModelMatrixPrev', type: 'mat4x4f' },
];

/*-------------------------------
	gBuffer
-------------------------------*/

// webgl側 frag_out.part.glsl の IS_DEFERRED 出力と同じ並び。
// bytes は仕様の render target pixel byte cost（rgba8unorm はメモリ上4バイトだが仕様上8）。
// bytes/sample = 16+16+8+8+16 = 64 で、既定上限32を超えるためdevice要求時に引き上げる
// rgba32float は filtering サンプラーで引けないため sampleType は unfilterable-float になる
export const GBUFFER_ATTACHMENTS = [
	{ name: 'position', format: 'rgba32float', bytes: 16, sampleType: 'unfilterable-float' },
	{ name: 'normal', format: 'rgba32float', bytes: 16, sampleType: 'unfilterable-float' },
	{ name: 'albedo', format: 'rgba8unorm', bytes: 8, sampleType: 'float' },
	{ name: 'material', format: 'rgba8unorm', bytes: 8, sampleType: 'float' },
	{ name: 'velocity', format: 'rgba32float', bytes: 16, sampleType: 'unfilterable-float' },
] as const;

export const GBUFFER_BYTES_PER_SAMPLE = GBUFFER_ATTACHMENTS.reduce( ( sum, a ) => sum + a.bytes, 0 );

export const GBUFFER_TARGETS: GPUColorTargetState[] = GBUFFER_ATTACHMENTS.map( ( a ) => ( { format: a.format } ) );

export const SCENE_FORMAT: GPUTextureFormat = 'rgba16float';
export const DEPTH_FORMAT: GPUTextureFormat = 'depth24plus';
export const SHADOW_FORMAT: GPUTextureFormat = 'depth32float';
export const ENVMAP_FORMAT: GPUTextureFormat = 'rgba16float';

// envMapは面256pxのキューブ。ミップ0が生の描画結果で、1〜4がroughnessごとの事前フィルタ結果。
// webgl側の roughnessToMip（roughness * (MAXMIP-1)）と同じ 0〜4 の対応になる
export const ENVMAP_SIZE = 256;
export const ENVMAP_MIP_COUNT = 5;

/*-------------------------------
	WGSL 宣言
-------------------------------*/

// gBufferの出力structはアタッチメント表から作る
const GBUFFER_OUTPUT_WGSL = `struct GBufferOutput {
${GBUFFER_ATTACHMENTS.map( ( a, i ) => `\t@location(${i}) ${a.name}: vec4f,` ).join( '\n' )}
};`;

// マテリアルのWGSL本体の先頭へ、頂点入出力とuniformの宣言を差し込んで完成形を作る
export const buildShaderSource = ( body: string, materialFields: UniformField[] ) => {

	const chunks = [
		VERTEX_INPUT_WGSL,
		vertexOutputWgsl,
		buildStructWgsl( 'FrameUniforms', FRAME_FIELDS ),
		`@group(${GROUP_FRAME}) @binding(0) var<uniform> frame: FrameUniforms;`,
		buildStructWgsl( 'ObjectUniforms', OBJECT_FIELDS ),
		`@group(${GROUP_OBJECT}) @binding(0) var<uniform> object: ObjectUniforms;`,
	];

	// uniformを持たないマテリアルは group2 ごと存在しない（空structはWGSLで書けない）
	if ( materialFields.length > 0 ) {

		chunks.push( buildStructWgsl( 'MaterialUniforms', materialFields ) );
		chunks.push( `@group(${GROUP_MATERIAL}) @binding(0) var<uniform> material: MaterialUniforms;` );

	}

	chunks.push( GBUFFER_OUTPUT_WGSL );
	chunks.push( gbufferWgsl );
	chunks.push( body );

	return chunks.join( '\n\n' );

};
