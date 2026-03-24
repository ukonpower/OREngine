import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import eyeRingsFrag from './shaders/eyeRings.fs';
import eyeRingsVert from './shaders/eyeRings.vs';

import { gl } from '~/ts/Globals';

export class EyeRings extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.RingGeometry( {
			thetaSegments: 64,
			innerRadius: 4.0,
			outerRadius: 4.01,
			extrude: 0.01
		} );

		const instanceArray = [];

		const num = 8;

		for ( let i = 0; i < num; i ++ ) {

			instanceArray.push( - 1, i, i / ( num - 1.0 ) );
			instanceArray.push( 1, i, i / ( num - 1.0 ) );

		}

		geometry.setAttribute( 'instance', new Float32Array( instanceArray ), 3, {
			instanceDivisor: 1
		} );

		const material = new MXP.Material( {
			phase: [ 'deferred', 'shadowMap' ],
			frag: eyeRingsFrag,
			vert: eyeRingsVert,
			uniforms: Engine.getInstance( gl ).uniforms,
		} );

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
		} );

		if ( process.env.NODE_ENV === 'development' ) {

			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/eyeRings.fs', ( module ) => {

					if ( module ) {

						mesh.material.frag = MXP.hotUpdate( 'eyeRingsFrag', module.default );

						mesh.material.requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/eyeRings.vs', ( module ) => {

					if ( module ) {

						mesh.material.vert = MXP.hotUpdate( 'eyeRingsVert', module.default );

						mesh.material.requestUpdate();

					}


				} );

			}

		}

	}

	public dispose(): void {

		super.dispose();

		this.entity.removeComponent( MXP.Mesh );

	}

}
