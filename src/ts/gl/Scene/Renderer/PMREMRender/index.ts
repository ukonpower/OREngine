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

		for ( let i = 0; i < 4; i ++ ) {

			const width = resolution.x / Math.pow( 2, i );
			const height = resolution.y / Math.pow( 2, i + 1 );

			const viewPort = new GLP.Vector( 0, y, width, height );
			y += height;

			passes.push( new MXP.PostProcessPass( {
				name: "pmrem" + i,
				renderTarget,
				frag: MXP.hotGet( "pmrem", pmremFrag ),
				viewPort,
				depthTest: false,
				passThrough: true,
			} ) );

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
