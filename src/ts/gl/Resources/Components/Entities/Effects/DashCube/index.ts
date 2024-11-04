import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import dashCubeFrag from './shaders/dashCube.fs';
import dashCubeVert from './shaders/dashCube.vs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

export class DashCube extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor() {

		super();

		// geometry

		this.geometry = new MXP.CubeGeometry( {
			width: 0.005,
			height: 5.0,
			depth: 0.005,
			segmentsHeight: 20
		} );

		const w = 1.1;
		const hw = w / 2.0;

		const posArray: number[] = [];
		const rotArray: number[] = [];

		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 4; j ++ ) {

				const pos = [
					[ hw, 0.0, hw ],
					[ hw, 0.0, - hw ],
					[ - hw, 0.0, hw ],
					[ - hw, 0.0, - hw ],
				][ j ];

				pos.forEach( i => {

					posArray.push( i );

				} );


				const rot = [
					[ 0, 0, 0 ],
					[ Math.PI / 2, 0.0, 0 ],
					[ 0, 0.0, Math.PI / 2 ],
				][ i ];

				rot.forEach( i => {

					rotArray.push( i );

				} );

			}

		}

		this.geometry.setAttribute( "instancePos", new Float32Array( posArray ), 3, { instanceDivisor: 1 } );
		this.geometry.setAttribute( "instanceRot", new Float32Array( rotArray ), 3, { instanceDivisor: 1 } );

		// material

		this.material = new MXP.Material( {
			phase: [ "deferred" ],
			frag: MXP.hotGet( 'dashCubeFrag', dashCubeFrag ),
			vert: MXP.hotGet( 'dashCubeVert', dashCubeVert ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/dashCube.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'dashCubeFrag', module.default );

					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/dashCube.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'dashCubeVert', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

	public setEntityImpl( entity: MXP.Entity ): void {

		entity.addComponent( this.material );
		entity.addComponent( this.geometry );

	}

	public unsetEntityImpl( entity: MXP.Entity ): void {

		entity.removeComponent( this.material );
		entity.removeComponent( this.geometry );

	}

}
