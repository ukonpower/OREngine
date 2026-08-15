import * as MTP from 'mathpower';

import { VERTEX_INPUT_WGSL } from '../GeometryBuffer';
import { requestShaderReload } from '../HotReload';
import { buildStructWgsl } from '../UniformBinder';


import gbufferWgsl from './shaders/gbuffer.wgsl';
import vertexOutputWgsl from './shaders/vertexOutput.wgsl';

import type { UniformField } from '../UniformBinder';

// HMRで差し替わるシェーダーソース。playerでは初期値のまま使われる
let hotGbufferWgsl = gbufferWgsl;
let hotVertexOutputWgsl = vertexOutputWgsl;

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/gbuffer.wgsl', ( m ) => {

		if ( m ) hotGbufferWgsl = m.default;

		requestShaderReload();

	} );

	import.meta.hot.accept( './shaders/vertexOutput.wgsl', ( m ) => {

		if ( m ) hotVertexOutputWgsl = m.default;

		requestShaderReload();

	} );

}

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
// forward系だけが読む共有リソース。forward描画前のシーン（shading結果）のコピー
// （webgl側の refractionBuffer / uDeferredTexture に相当）と、PMREM環境マップが入る。
// レイアウトが付くのは fsForward を使うパイプライン（forward / envMap / editor）だけなので、
// fsDeferred / fsShadow から refractionTexture / envMapTexture を参照するとパイプライン生成に失敗する
export const GROUP_REFRACTION = 3;

// GLのクリップ空間（z∈[-w,w]）をWebGPU（z∈[0,w]）へ移す補正。
// カメラ・ライトどちらのprojection行列にも1回だけ乗算する。
// もう一方の規約差であるテクスチャ座標のY向きは、シャドウUVを求める箇所だけで吸収する
export const CLIP_CORRECTION = new MTP.Matrix().set( [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 0.5, 0,
	0, 0, 0.5, 1,
] );

// キューブ面へ描くときの補正。フレームバッファの行0がNDC y=+1 なのに対し、
// キューブ面の v=0 はGL規約だとNDC y=-1 側にあたるため、Yだけ反転してGLと同じ
// テクセル並びを作る（横方向はGLの視線行列のまま）。裏返るワインディングは
// envMapパイプラインを cullMode: 'none' にして無効化している
export const ENVMAP_CLIP_CORRECTION = new MTP.Matrix().set( [
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
	{ name: 'uDeltaTime', type: 'f32' },
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
	storage buffer（GPGPU出力）

	GPUCompute が実装する契約。Material はこれを名前付きで受け取り、
	group2 の binding1.. に read-only storage として生やす。
	buffers はピンポン2本で、readIndex が「今フレーム読める側」を指す。
-------------------------------*/

export interface StorageSource {
	structName: string;
	structWgsl: string;
	// device 準備前・compute 未構築の間は null
	buffers: [ GPUBuffer, GPUBuffer ] | null;
	readIndex: number;
	count: number;
}

export type MaterialStorage = { name: string, source: StorageSource };

/*-------------------------------
	マテリアルテクスチャ

	TexProcedural が実装する契約。Material はこれを名前付きで受け取り、
	group2 の storage の後ろへ texture + sampler のペアとして生やす。
	実体の生成が非同期なため、view が揃うまでそのマテリアルの描画はスキップされる。
-------------------------------*/

export interface TextureSource {
	view: GPUTextureView | null;
	sampler: GPUSampler | null;
}

export type MaterialTexture = { name: string, source: TextureSource };

// group2 上のテクスチャの開始binding。0=uniform、1..=storage の後ろに並ぶ
export const materialTextureBinding = ( storageCount: number, index: number ) => 1 + storageCount + index * 2;

/*-------------------------------
	WGSL 宣言
-------------------------------*/

// gBufferの出力structはアタッチメント表から作る。
// GBufferDepthOutput はラスタライズした面と実体がずれるマテリアル（レイマーチ等）用で、
// fsDeferred の戻り値をこちらにすると深度を書き直せる。
// @builtin(frag_depth) を宣言したフラグメントは early-z が効かなくなるため、
// 深度をそのまま使えるマテリアルは GBufferOutput のままにしておく
const GBUFFER_OUTPUT_WGSL = `struct GBufferOutput {
${GBUFFER_ATTACHMENTS.map( ( a, i ) => `\t@location(${i}) ${a.name}: vec4f,` ).join( '\n' )}
};

struct GBufferDepthOutput {
${GBUFFER_ATTACHMENTS.map( ( a, i ) => `\t@location(${i}) ${a.name}: vec4f,` ).join( '\n' )}
	@builtin(frag_depth) depth: f32,
};

// gBufferの出力に、書き直したクリップ空間の深度を添える
fn withDepth( g: GBufferOutput, depth: f32 ) -> GBufferDepthOutput {

	var output: GBufferDepthOutput;
${GBUFFER_ATTACHMENTS.map( ( a ) => `\toutput.${a.name} = g.${a.name};` ).join( '\n' )}
	output.depth = depth;

	return output;

}`;

// マテリアルが書いた fsForward の宣言。entry pointはWGSLでは関数として呼べないため、
// これを実装関数 forwardColor へ改名し、entry point は FORWARD_ENTRY_WGSL で生成する。
// 戻り値の @location(0) は entry point 以外では書けないので、シグネチャごと置き換える
const FORWARD_COLOR_DECL = /@fragment\s+fn\s+fsForward\s*\(\s*(\w+)\s*:\s*VertexOutput\s*\)\s*->\s*@location\(\s*0\s*\)\s*vec4f/;

// forward系のentry point。fsForward は単一ターゲット（envMap / エディタ描画）用。
// fsForwardMrt はシーン色に加えてgBufferの position / velocity も上書きし、
// forwardメッシュをDOF・モーションブラーへ乗せる（webgl側 frag_out.part.glsl の IS_FORWARD と同じ構図）。
// αはgBufferではemissionだが、シェーディング後に読む側はxyzしか見ないので1.0で埋める
const FORWARD_ENTRY_WGSL = `struct ForwardOutput {
	@location(0) color: vec4f,
	@location(1) position: vec4f,
	@location(2) velocity: vec4f,
};

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	return forwardColor( input );

}

@fragment
fn fsForwardMrt( input: VertexOutput ) -> ForwardOutput {

	var output: ForwardOutput;
	output.color = forwardColor( input );
	output.position = vec4f( input.worldPosition, 1.0 );
	output.velocity = vec4f( input.velocity, 0.0, 1.0 );

	return output;

}`;

// マテリアルのWGSL本体の先頭へ、頂点入出力とuniformの宣言を差し込んで完成形を作る
export const buildShaderSource = ( body: string, materialFields: UniformField[], storages: MaterialStorage[] = [], textures: MaterialTexture[] = [] ) => {

	const chunks = [
		VERTEX_INPUT_WGSL,
		hotVertexOutputWgsl,
		buildStructWgsl( 'FrameUniforms', FRAME_FIELDS ),
		`@group(${GROUP_FRAME}) @binding(0) var<uniform> frame: FrameUniforms;`,
		buildStructWgsl( 'ObjectUniforms', OBJECT_FIELDS ),
		`@group(${GROUP_OBJECT}) @binding(0) var<uniform> object: ObjectUniforms;`,
		`@group(${GROUP_REFRACTION}) @binding(0) var refractionTexture: texture_2d<f32>;`,
		`@group(${GROUP_REFRACTION}) @binding(1) var refractionSampler: sampler;`,
		`@group(${GROUP_REFRACTION}) @binding(2) var envMapTexture: texture_cube<f32>;`,
		`@group(${GROUP_REFRACTION}) @binding(3) var envMapSampler: sampler;`,
		// シェーディングパス（shading.ts）の sampleEnvMap と同じ roughness→mip 対応
		`const MAX_ENV_MIP = ${( ENVMAP_MIP_COUNT - 1 ).toFixed( 1 )};

// PMREM環境マップをroughness対応のミップで引く。forward系（fsForward）専用
fn sampleEnvMap( direction: vec3f, roughness: f32 ) -> vec3f {

	return textureSampleLevel( envMapTexture, envMapSampler, direction, roughness * MAX_ENV_MIP ).xyz;

}`,
	];

	// uniformを持たないマテリアルは binding0 が存在しない（空structはWGSLで書けない）
	if ( materialFields.length > 0 ) {

		chunks.push( buildStructWgsl( 'MaterialUniforms', materialFields ) );
		chunks.push( `@group(${GROUP_MATERIAL}) @binding(0) var<uniform> material: MaterialUniforms;` );

	}

	if ( storages.length > 0 ) {

		// 同じGPUComputeを複数の名前で受けても struct 定義は1回だけ出す
		const structs = new Set( storages.map( ( s ) => s.source.structWgsl ) );

		chunks.push( Array.from( structs ).join( '\n\n' ) );
		chunks.push( storages.map( ( s, i ) =>
			`@group(${GROUP_MATERIAL}) @binding(${i + 1}) var<storage, read> ${s.name}: array<${s.source.structName}>;` ).join( '\n' ) );

	}

	if ( textures.length > 0 ) {

		chunks.push( textures.map( ( t, i ) => {

			const binding = materialTextureBinding( storages.length, i );

			return `@group(${GROUP_MATERIAL}) @binding(${binding}) var ${t.name}: texture_2d<f32>;\n@group(${GROUP_MATERIAL}) @binding(${binding + 1}) var ${t.name}Sampler: sampler;`;

		} ).join( '\n' ) );

	}

	chunks.push( GBUFFER_OUTPUT_WGSL );
	chunks.push( hotGbufferWgsl );

	if ( FORWARD_COLOR_DECL.test( body ) ) {

		chunks.push( body.replace( FORWARD_COLOR_DECL, 'fn forwardColor( $1: VertexOutput ) -> vec4f' ) );
		chunks.push( FORWARD_ENTRY_WGSL );

	} else {

		chunks.push( body );

	}

	return chunks.join( '\n\n' );

};
