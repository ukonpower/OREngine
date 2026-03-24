import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import vectorFieldFrag from './shaders/vectorField.fs';
import vectorFieldVert from './shaders/vectorField.vs';

import { gl } from '~/ts/Globals';

export class VectorField extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.CubeGeometry();

		const instancePosArray = [];
		const instanceIdArray = [];

		const num = new GLP.Vector( 32, 32 );
		for ( let iX = 0; iX < num.x; iX ++ ) {

			for ( let iY = 0; iY < num.y; iY ++ ) {

				instancePosArray.push(
					iX / num.x,
					iY / num.y
				);

				instanceIdArray.push(
					Math.random(),
					Math.random(),
					Math.random(),
				);

			}

		}

		geometry.setAttribute( "instancePos", new Float32Array( instancePosArray ), 2, {
			instanceDivisor: 1
		} );

		geometry.setAttribute( "instanceId", new Float32Array( instanceIdArray ), 3, {
			instanceDivisor: 1
		} );

		const material = new MXP.Material( {
			phase: [ 'forward' ],
			frag: vectorFieldFrag,
			vert: vectorFieldVert,
			uniforms: MXP.UniformsUtils.merge(
				Engine.getInstance( gl ).uniforms, {
					uVelocityTex: {
						value: null,
						type: "1i"
					}
				}
			),
		} );

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
		} );

		if ( process.env.NODE_ENV === 'development' ) {

			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/vectorField.fs', ( module ) => {

					if ( module ) {

						mesh.material.frag = MXP.hotUpdate( 'vectorFieldFrag', module.default );

						mesh.material.requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/vectorField.vs', ( module ) => {

					if ( module ) {

						mesh.material.vert = MXP.hotUpdate( 'vectorFieldVert', module.default );

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
