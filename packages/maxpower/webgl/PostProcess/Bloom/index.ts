import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { PostProcess } from '..';
import { GL, GLBackend } from '../../backend/GLBackend';
import { PostProcessPass, PostProcessPassParam } from '../PostProcessPass';
import gaussBlurFrag from '../shaders/gaussBlur.fs';

import bloomBrightFrag from './shaders/bloomBright.fs';
import bloomCompositeFrag from './shaders/bloomComposite.fs';

export class Bloom extends PostProcess {

	constructor( backend: GLBackend, srcTexture: GLP.GLPowerTexture ) {

		const renderCount = 4;

		/*-------------------------------
			RenderTarget
		-------------------------------*/

		const rtVerticalList = [];
		const rtHorizontalList = [];

		for ( let i = 0; i < renderCount; i ++ ) {

			rtVerticalList.push( backend.createFrameBuffer().setTexture( [
				backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
			] ) );

			rtHorizontalList.push( backend.createFrameBuffer().setTexture( [
				backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
			] ) );

		}

		/*-------------------------------
			Bright
		-------------------------------*/

		let bloomInvScale = 2.0;

		const brightPass = new PostProcessPass( backend, {
			name: 'bloom/bright/',
			frag: bloomBrightFrag,
			passThrough: true,
			uniforms: {
				uSrcTexture1: {
					value: srcTexture,
					type: '1i'
				},
				uThreshold: {
					value: 1.8,
					type: '1f'
				},
				uBrightness: {
					value: 1.0,
					type: '1f'
				},
			},
			resolutionRatio: 1.0 / bloomInvScale,
		} );


		/*-------------------------------
			Blur
		-------------------------------*/

		const blurPasses = [];

		let bloomInput: GLP.GLPowerTexture[] = brightPass.renderTarget!.textures;

		for ( let i = 0; i < renderCount; i ++ ) {

			const rtVertical = rtVerticalList[ i ];
			const rtHorizonal = rtHorizontalList[ i ];

			const guassSamples = 8.0;

			const blurParam: PostProcessPassParam = {
				name: 'bloom/blur/' + i + '/v',
				renderTarget: rtVertical,
				frag: gaussBlurFrag,
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
						value: MTP.MathUtils.gaussWeights( guassSamples )
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
				resolutionRatio: 1.0 / bloomInvScale
			};

			blurPasses.push( new PostProcessPass( backend, blurParam ) );

			blurPasses.push( new PostProcessPass( backend, {
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

			bloomInvScale *= 2.0;

		}

		/*-------------------------------
			Composite
		-------------------------------*/

		const compositePass = new PostProcessPass( backend, {
			name: 'bloom/composite/',
			frag: bloomCompositeFrag,
			uniforms: {
				uBloomTexture: {
					value: rtHorizontalList.map( rt => rt.textures[ 0 ] ),
					type: '1iv'
				},
			},
		} );


		super( {
			name: "Bloom",
			passes: [
				brightPass,
				...blurPasses,
				compositePass
			]
		} );


	}

	/*-------------------------------
		Getters & Setters
	-------------------------------*/

	public get threshold(): number {

		return ( this.passes[ 0 ] as PostProcessPass ).uniforms.uThreshold.value;

	}

	public set threshold( value: number ) {

		( this.passes[ 0 ] as PostProcessPass ).uniforms.uThreshold.value = value;

	}

	public get brightness(): number {

		return ( this.passes[ 0 ] as PostProcessPass ).uniforms.uBrightness.value;

	}

	public set brightness( value: number ) {

		( this.passes[ 0 ] as PostProcessPass ).uniforms.uBrightness.value = value;

	}


}
