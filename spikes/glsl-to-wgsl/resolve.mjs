// OREngine のシェーダーを「単体で glslang に食わせられる完全形 GLSL」に組み立てる。
// ビルド時の #include 解決（host/vite/plugins/ShaderBuilder）と、
// 実行時の shaderParse（packages/maxpower/shader/ShaderParser）を再現する。

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname( fileURLToPath( import.meta.url ) );
const REPO = path.resolve( HERE, '../..' );
const SHADER_PARSER_DIR = path.join( REPO, 'packages/maxpower/shader/ShaderParser' );
const OUT_DIR = path.join( HERE, 'out' );

// host/vite/plugins/ShaderBuilder/index.ts の INCLUDE_FILES（28行目付近）からの転記
const INCLUDE_FILES = new Map( [
	[ 'common', 'shaderModules/common.module.glsl' ],
	[ 'sdf', 'shaderModules/sdf.module.glsl' ],
	[ 'rotate', 'shaderModules/rotate.module.glsl' ],
	[ 'random', 'shaderModules/random.module.glsl' ],
	[ 'noise_simplex', 'shaderModules/noiseSimplex.module.glsl' ],
	[ 'noise_cyclic', 'shaderModules/noiseCyclic.module.glsl' ],
	[ 'noise_value', 'shaderModules/noiseValue.module.glsl' ],
	[ 'light', 'shaderModules/light.module.glsl' ],
	[ 'pmrem', 'shaderModules/pmrem.module.glsl' ],
	[ 'rm_normal', 'shaderModules/raymarch_normal.module.glsl' ],
	[ 'lighting_light', 'shaderParts/lighting_light.part.glsl' ],
	[ 'lighting_env', 'shaderParts/lighting_env.part.glsl' ],
	[ 'lighting_forwardIn', 'shaderParts/lighting_forwardIn.part.glsl' ],
	[ 'vert_h', 'shaderParts/vert_h.part.glsl' ],
	[ 'vert_in', 'shaderParts/vert_in.part.glsl' ],
	[ 'vert_out', 'shaderParts/vert_out.part.glsl' ],
	[ 'frag_h', 'shaderParts/frag_h.part.glsl' ],
	[ 'frag_in', 'shaderParts/frag_in.part.glsl' ],
	[ 'frag_out', 'shaderParts/frag_out.part.glsl' ],
	[ 'rm_h', 'shaderParts/raymarch_h.part.glsl' ],
	[ 'rm_ray_obj', 'shaderParts/raymarch_ray_object.part.glsl' ],
	[ 'rm_ray_world', 'shaderParts/raymarch_ray_world.part.glsl' ],
	[ 'rm_out_obj', 'shaderParts/raymarch_out_obj.part.glsl' ],
	[ 'uni_time', 'shaderParts/uniform_time.part.glsl' ],
] );

// #include<key> を対応ファイルの中身へ置換する。未知のキーは空文字（実行時挙動と同一）
const inlineIncludes = ( code ) => {

	const includePattern = /#include\s?<([\S]*)>/g;

	return code.replace( includePattern, ( _, key ) => {

		const file = INCLUDE_FILES.get( key );

		return file ? inlineIncludes( fs.readFileSync( path.join( SHADER_PARSER_DIR, file ), 'utf-8' ) ) : '';

	} );

};

// ライト数プレースホルダの固定値。DIR=1 / SPOT=0 でシャドウマップ経路を必ず1本通す
const LIGHT_COUNTS = {
	NUM_LIGHT_DIR: 1,
	NUM_SHADOWMAP_DIR: 1,
	NUM_LIGHT_SPOT: 0,
	NUM_SHADOWMAP_SPOT: 0,
};

// packages/maxpower/shader/ShaderParser/index.ts の shaderParse() 相当
export const shaderParse = ( shader ) => {

	shader = '#version 300 es\nprecision highp float;\n' + shader;

	for ( const [ key, value ] of Object.entries( LIGHT_COUNTS ) ) {

		shader = shader.replaceAll( key, String( value ) );

	}

	// #pragma loop_start N 〜 #pragma loop_end を展開し LOOP_INDEX を数値に置換
	shader = shader.replace( /#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g, ( _, loop, body ) => {

		let str = '';

		for ( let i = 0; i < Number( loop ); i ++ ) str += body.replaceAll( 'LOOP_INDEX', String( i ) );

		return str;

	} );

	return shader;

};

// 障害切り分け用の最小サンプル。loose uniform 1個 + sampler2D 1個 + 出力1個
const MINIMAL_SRC = `uniform vec3 uColor;
uniform sampler2D uTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	outColor = vec4( texture( uTex, vUv ).xyz * uColor, 1.0 );

}
`;

const TARGETS = [
	{
		name: 'deferredShading',
		src: fs.readFileSync( path.join( REPO, 'packages/maxpower/Component/Renderer/DeferredRenderer/shaders/deferredShading.fs' ), 'utf-8' ),
	},
	{
		name: 'minimal',
		src: MINIMAL_SRC,
	},
];

if ( import.meta.main ) {

	fs.mkdirSync( OUT_DIR, { recursive: true } );

	for ( const target of TARGETS ) {

		const out = path.join( OUT_DIR, `${target.name}.full.frag` );

		fs.writeFileSync( out, shaderParse( inlineIncludes( target.src ) ) );

		console.log( `wrote ${path.relative( REPO, out )}` );

	}

}
