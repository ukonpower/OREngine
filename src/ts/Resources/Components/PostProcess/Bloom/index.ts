import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import { gl } from '~/ts/Globals';

export class Bloom extends MXP.Component {

	private _bloomRenderCount: number;
	private _bloomBright: MXP.PostProcessPass;
	private _bloomBlur: MXP.PostProcessPass[];
	private _rtBloomVertical: GLP.GLPowerFrameBuffer[];
	private _rtBloomHorizonal: GLP.GLPowerFrameBuffer[];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// bloom

		this._bloomRenderCount = 4;

		this._rtBloomVertical = [];
		this._rtBloomHorizonal = [];

		for ( let i = 0; i < this._bloomRenderCount; i ++ ) {

			this._rtBloomVertical.push( new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] ) );

			this._rtBloomHorizonal.push( new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] ) );

		}

		let bloomScale = 2.0;

		this._bloomBright = new MXP.PostProcessPass( gl, {
			name: 'bloom/bright/',
			frag: bloomBrightFrag,
			uniforms: {
				uShadingTex: {
					value: this._renderTarget.shadingBuffer.textures[ 0 ],
					type: "1i"
				}
			},
			passThrough: true,
			resolutionRatio: 1.0 / bloomScale,
		} );

		this._bloomBlur = [];

		// bloom blur

		let bloomInput: GLP.GLPowerTexture[] = this._bloomBright.renderTarget!.textures;

		for ( let i = 0; i < this._bloomRenderCount; i ++ ) {

			const rtVertical = this._rtBloomVertical[ i ];
			const rtHorizonal = this._rtBloomHorizonal[ i ];

			const resolution = new GLP.Vector();
			this._resolutionBloom.push( resolution );

			const guassSamples = 8.0;

			const blurParam: MXP.PostProcessPassParam = {
				name: 'bloom/blur/' + i + '/v',
				renderTarget: rtVertical,
				frag: gaussBlur,
				uniforms: {
					uBackBlurTex: {
						value: bloomInput,
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: true
					},
					uWeights: {
						type: '1fv',
						value: GLP.MathUtils.gaussWeights( guassSamples )
					},
					uBlurRange: {
						value: 2.0,
						type: '1f'
					}
				},
				defines: {
					GAUSS_WEIGHTS: guassSamples.toString(),
					USE_BACKBLURTEX: "",
				},
				passThrough: true,
				resolutionRatio: 1.0 / bloomScale
			};

			this._bloomBlur.push( new MXP.PostProcessPass( gl, blurParam ) );

			this._bloomBlur.push( new MXP.PostProcessPass( gl, {
				...blurParam,
				name: 'bloom/blur/' + i + '/h',
				renderTarget: rtHorizonal,
				uniforms: {
					...blurParam.uniforms,
					uBackBlurTex: {
						value: rtVertical.textures[ 0 ],
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: false
					},
				},
			} ) );

			bloomInput = rtHorizonal.textures;

			bloomScale *= 2.0;

		}

	}

}
