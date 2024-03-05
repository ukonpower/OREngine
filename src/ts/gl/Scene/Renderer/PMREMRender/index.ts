import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import pmremFrag from './shaders/pmrem.fs';

import { gl, power } from '~/ts/Globals';

export class PMREMRender extends MXP.PostProcess {

	public renderTarget: GLP.GLPowerFrameBuffer;

	constructor( param: Omit<MXP.PostProcessParam, "passes"> & {resolution: GLP.Vector} ) {

		const resolution = param.resolution;

		const renderTarget = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const passes: MXP.PostProcessPass[] = [];

		let y = 0;

		for ( let i = 0; i < 8; i ++ ) {

			const resolutionRatio = 1 / Math.pow( 2, i );
			const width = resolution.x * resolutionRatio;
			const height = resolution.y * resolutionRatio * 0.5;

			const viewPort = new GLP.Vector( 0, y, width, height );
			y += height;

			passes.push(
				new MXP.PostProcessPass( {
					name: "pmrem" + i + "/blur",
					frag: MXP.hotGet( "pmrem", pmremFrag ),
					uniforms: {
						uBlur: {
							value: i / 5,
							type: "1f"
						},
					},
					resolutionRatio
				} ),
				new MXP.PostProcessPass( {
					name: "pmrem" + i + "/draw",
					renderTarget,
					viewPort,
					passThrough: true,
				} ),
			);

		}

		super( {
			...param,
			passes,
		} );

		this.renderTarget = renderTarget;

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


	public resize( resolution: GLP.Vector ): void {

		return;

	}

}
