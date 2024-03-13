import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import pmremFrag from './shaders/pmrem.fs';

import { gl, globalUniforms, power } from '~/ts/Globals';

type SwapBuffer = {rt1: GLP.GLPowerFrameBuffer, rt2: GLP.GLPowerFrameBuffer};

export class PMREMRender extends MXP.PostProcess {

	public renderTarget: GLP.GLPowerFrameBuffer;
	private swapBuffers: SwapBuffer[];

	constructor( param: Omit<MXP.PostProcessParam, "passes" | "input"> & {input: GLP.GLPowerTextureCube[], resolution: GLP.Vector} ) {

		const resolution = param.resolution;

		const renderTarget = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const passes: MXP.PostProcessPass[] = [];
		const swapBuffers: SwapBuffer[] = [];

		const mipmapLevel = 4.0;

		for ( let i = 0; i < mipmapLevel; i ++ ) {

			let roughness = 1 / ( mipmapLevel - 1.0 ) * i;

			roughness = roughness;

			swapBuffers.push( {
				rt1: new GLP.GLPowerFrameBuffer( gl ).setTexture( [ new GLP.GLPowerTexture( gl ) ] ),
				rt2: new GLP.GLPowerFrameBuffer( gl ).setTexture( [ new GLP.GLPowerTexture( gl ) ] ),
			} );

			passes.push(
				new MXP.PostProcessPass( {
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
						uFractTime: globalUniforms.time.uFractTime,
					},
					resolutionRatio: Math.pow( 0.5, i )
				} ),
			);

		}

		super( {
			...param,
			passes,
		} );

		this.renderTarget = renderTarget;
		this.swapBuffers = swapBuffers;

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/pmrem.fs', ( module ) => {

				if ( module ) {

					passes.forEach( ( pass ) => {

						pass.frag = MXP.hotUpdate( 'pmrem', module.default );
						pass.requestUpdate();

					} );

				}

			} );

		}

		super.resize( resolution );

	}

	public swap() {

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

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
