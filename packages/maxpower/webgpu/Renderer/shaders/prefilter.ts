import { buildStructWgsl } from '../../resources/UniformBinder';

import prefilterBodyWgsl from './prefilter.wgsl';

import type { UniformField } from '../../resources/UniformBinder';

/*-------------------------------
	envMap の事前フィルタ（PMREM）の宣言部

	本体は prefilter.wgsl。roughness とサンプル数はミップごとに override 定数で
	差し込むため、パイプラインはミップ数ぶん、bind group は面数ぶんで足りる。
-------------------------------*/

export const PREFILTER_FIELDS: UniformField[] = [
	{ name: 'uFace', type: 'i32' },
];

export const prefilterWgsl = [
	buildStructWgsl( 'PrefilterUniforms', PREFILTER_FIELDS ),
	prefilterBodyWgsl,
].join( '\n\n' );
