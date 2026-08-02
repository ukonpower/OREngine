import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { GL, GLBackend } from '../../../GLBackend';

import pmremFrag from './shaders/pmrem.fs';


type SwapBuffer = {rt1: GLP.GLPowerFrameBuffer, rt2: GLP.GLPowerFrameBuffer};

export class PMREMRender extends GLP.EventEmitter {

	public postprocess: MXP.PostProcess;
	public resolution: GLP.Vector;
	public renderTarget: GLP.GLPowerFrameBuffer;
	private pmremPasses: MXP.PostProcessPass[];
	private swapBuffers: SwapBuffer[];
	private timeUniforms: GLP.Uniforms;

	constructor( backend: GLBackend, param: {input: GLP.GLPowerTextureCube[], resolution: GLP.Vector} ) {

		super();

		const resolution = param.resolution;

		const timeUniforms: GLP.Uniforms = {
			uTimeEF: {
				value: 0,
				type: '1f'
			},
		};

		const renderTarget = backend.createFrameBuffer().setTexture( [
			backend.createTexture().setting( {
				type: GL.FLOAT,
				internalFormat: GL.RGBA16F,
				format: GL.RGBA,
				magFilter: GL.LINEAR,
				minFilter: GL.LINEAR,
				wrapS: GL.CLAMP_TO_EDGE,
				wrapT: GL.CLAMP_TO_EDGE,
			} ),
		] );

		const passes: MXP.PostProcessPass[] = [];
		const pmremPasses: MXP.PostProcessPass[] = [];
		const swapBuffers: SwapBuffer[] = [];

		const mipmapLevel = 5.0;

		let viewPortY = 0;

		for ( let i = 0; i < mipmapLevel; i ++ ) {

			const resolutionScale = 1 / Math.pow( 2, i );
			const width = resolution.x * resolutionScale;
			const height = resolution.y * resolutionScale * 0.5;

			const viewPort = new GLP.Vector( 0, viewPortY, width, height );
			viewPortY += height;

			swapBuffers.push( {
				rt1: backend.createFrameBuffer().setTexture( [ backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } ) ] ),
				rt2: backend.createFrameBuffer().setTexture( [ backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } ) ] ),
			} );

			const roughness = 1 / ( mipmapLevel - 1.0 ) * i;

			const pmremPass = new MXP.PostProcessPass( backend, {
				renderTarget: swapBuffers[ i ].rt1,
				frag: pmremFrag,
				uniforms: MXP.UniformsUtils.merge( timeUniforms, {
					uRoughness: {
						value: roughness,
						type: '1f'
					},
					uEnvMap: {
						value: param.input,
						type: '1i'
					},
					uPMREMBackBuffer: {
						value: swapBuffers[ i ].rt2.textures,
						type: '1i'
					},
					uRenderCount: {
						value: 1,
						type: "1f"
					},
				} ),
				defines: {
					NUM_SAMPLES: Math.floor( Math.pow( 2, i + 1 ) )
				}
			} );

			pmremPass.resize( new GLP.Vector( width, height ) );

			const blitPass = new MXP.PostProcessPass( backend, {
				renderTarget: renderTarget,
				viewPort,
				passThrough: true,
			} );

			blitPass.resize( resolution );

			passes.push(
				pmremPass,
				blitPass,
			);

			pmremPasses.push( pmremPass );

		}

		this.postprocess = new MXP.PostProcess( { passes } );
		this.postprocess.passes[ 0 ].backBufferOverride = renderTarget.textures;

		this.resolution = resolution;
		this.renderTarget = renderTarget;
		this.pmremPasses = pmremPasses;
		this.swapBuffers = swapBuffers;
		this.timeUniforms = timeUniforms;

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/pmrem.fs', ( module ) => {

				if ( module ) {

					this.pmremPasses.forEach( ( pass ) => {

						pass.frag = MXP.hotUpdate( 'pmrem', module.default );
						pass.requestUpdate();

					} );

				}

			} );

		}

	}

	public swap() {

		this.timeUniforms.uTimeEF.value = ( this.timeUniforms.uTimeEF.value + 0.016 ) % 1;

		for ( let i = 0; i < this.pmremPasses.length; i ++ ) {

			const pass = this.pmremPasses[ i ];

			const swap = this.swapBuffers[ i ];
			const tmp = swap.rt1;
			swap.rt1 = swap.rt2;
			swap.rt2 = tmp;

			pass.setRendertarget( swap.rt1 );
			pass.uniforms.uPMREMBackBuffer.value = swap.rt2.textures;

		}

	}

	public resize( _resolution: GLP.Vector ): void {

		return;

	}

}
