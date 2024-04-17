import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import pmremFrag from './shaders/pmrem.fs';

import { gl, globalUniforms, power } from '~/ts/Globals';

type SwapBuffer = {rt1: GLP.GLPowerFrameBuffer, rt2: GLP.GLPowerFrameBuffer};

export class PMREMRender extends MXP.PostProcess {

	public renderTarget: GLP.GLPowerFrameBuffer;
	private pmremPasses: MXP.PostProcessPass[];
	private swapBuffers: SwapBuffer[];

	constructor( param: Omit<MXP.PostProcessParam, "passes" | "input"> & {input: GLP.GLPowerTextureCube[], resolution: GLP.Vector} ) {

		const resolution = param.resolution;

		const renderTarget = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( {
				type: gl.FLOAT,
				internalFormat: gl.RGBA16F,
				format: gl.RGBA,
				magFilter: gl.LINEAR,
				minFilter: gl.LINEAR,
				wrapS: gl.CLAMP_TO_EDGE,
				wrapT: gl.CLAMP_TO_EDGE,
				generateMipmap: true
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
				rt1: new GLP.GLPowerFrameBuffer( gl ).setTexture( [ new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } ) ] ),
				rt2: new GLP.GLPowerFrameBuffer( gl ).setTexture( [ new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } ) ] ),
			} );

			let roughness = 1 / ( mipmapLevel - 1.0 ) * i;
			roughness = roughness;

			const pmremPass = new MXP.PostProcessPass( {
				renderTarget: swapBuffers[ i ].rt1,
				frag: pmremFrag,
				uniforms: {
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
					uTimeEF: globalUniforms.time.uTimeEF,
				},
				defines: {
					NUM_SAMPLES: Math.floor( Math.pow( 2, i + 1 ) )
				}
			} );

			pmremPass.resize( new GLP.Vector( width, height ) );

			const blitPass = new MXP.PostProcessPass( {
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

		super( {
			...param,
			passes,
		} );

		this.renderTarget = renderTarget;
		this.pmremPasses = pmremPasses;
		this.swapBuffers = swapBuffers;

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

		for ( let i = 0; i < this.pmremPasses.length; i ++ ) {

			const pass = this.pmremPasses[ i ];

			const swap = this.swapBuffers[ i ];
			const tmp = swap.rt1;
			swap.rt1 = swap.rt2;
			swap.rt2 = tmp;

			pass.setRendertarget( swap.rt1 );
			pass.uniforms.uPMREMBackBuffer.value = swap.rt2.textures;
			pass.uniforms.uRenderCount.value += 1;

		}

	}

	public resize( resolution: GLP.Vector ): void {

		return;

	}

}
