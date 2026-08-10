import { buildStructWgsl } from 'gpupower';

import { ENVMAP_MIP_COUNT, FRAME_FIELDS, GBUFFER_ATTACHMENTS } from '../../Bindings';
import { buildLightWgsl } from '../Lights';

import shadingWgsl from './shading.wgsl';

/*-------------------------------
	シェーディングパスの宣言部

	本体は shading.wgsl。gBufferと環境マップの束縛はここで組み立てて前置する。
-------------------------------*/

const GBUFFER_BINDINGS = GBUFFER_ATTACHMENTS.map( ( attachment, i ) =>
	`@group(1) @binding(${i}) var gBuffer${i}: texture_2d<f32>;\t// ${attachment.name}`
).join( '\n' );

// gBufferと同じgroupに環境マップを置く（どちらもシェーディングの入力で、寿命も同じ）
export const ENVMAP_BINDING = GBUFFER_ATTACHMENTS.length;
export const ENVMAP_SAMPLER_BINDING = GBUFFER_ATTACHMENTS.length + 1;
export const SSAO_BINDING = GBUFFER_ATTACHMENTS.length + 2;
export const LIGHTSHAFT_BINDING = GBUFFER_ATTACHMENTS.length + 3;

// シェーディングパスのWGSL完成形。宣言はBindings / Lights と同じ配列から作る
export const buildShadingSource = () => [
	buildStructWgsl( 'FrameUniforms', FRAME_FIELDS ),
	'@group(0) @binding(0) var<uniform> frame: FrameUniforms;',
	GBUFFER_BINDINGS,
	`@group(1) @binding(${ENVMAP_BINDING}) var envMap: texture_cube<f32>;`,
	`@group(1) @binding(${ENVMAP_SAMPLER_BINDING}) var envMapSampler: sampler;`,
	`@group(1) @binding(${SSAO_BINDING}) var ssaoTexture: texture_2d<f32>;`,
	`@group(1) @binding(${LIGHTSHAFT_BINDING}) var lightShaftTexture: texture_2d<f32>;`,
	`const MAX_ENV_MIP = ${( ENVMAP_MIP_COUNT - 1 ).toFixed( 1 )};`,
	buildLightWgsl( 2 ),
	shadingWgsl,
].join( '\n\n' );
