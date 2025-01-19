import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gaussBlurFrag from '../shaders/gaussBlur.fs';

import { gl } from '~/ts/Globals';

export class Blur extends MXP.PostProcess {

	constructor( params: MXP.PostProcessParams ) {

		// bokeh

		const bSample = 8;

		const bokehParam: MXP.PostProcessPassParam = {
			name: 'bokeh/h',
			frag: gaussBlurFrag,
			uniforms: {
				uIsVertical: {
					type: '1i',
					value: true
				},
				uWeights: {
					type: '1fv',
					value: GLP.MathUtils.gaussWeights( bSample )
				},
				uBlurRange: {
					value: 6.0,
					type: '1f'
				}
			},
			defines: {
				GAUSS_WEIGHTS: bSample.toString(),
				IS_BOKEH: "",
			},
			resolutionRatio: 1.0,
		};

		const bokehV = new MXP.PostProcessPass( gl, bokehParam );
		const bokehH = new MXP.PostProcessPass( gl, {
			...bokehParam,
			uniforms: {
				...bokehParam.uniforms,
				uIsVertical: {
					type: '1i',
					value: false
				},
			},
		} );

		super( {
			...params,
			passes: [ bokehV, bokehH ]
		} );

	}

}
