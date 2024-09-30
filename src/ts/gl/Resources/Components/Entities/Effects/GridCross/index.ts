import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gridCrossFrag from './shaders/gridCross.fs';
import gridCrossVert from './shaders/gridCross.vs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

export class GridCross extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor() {

		super();

		// geometry

		this.geometry = new MXP.CubeGeometry( { width: 0.05, height: 0.5, depth: 0.05 } );

		const w = 1.0;
		const hw = w / 2.0;

		const posArray: number[] = [];
		const rotArray: number[] = [];

		const num = 11;

		const scale = 20.0;

		for ( let i = 0; i < num; i ++ ) {

			for ( let j = 0; j < num; j ++ ) {

				for ( let k = 0; k < num; k ++ ) {

					const x = ( i / num - 0.5 ) * scale;
					const y = ( j / num - 0.5 ) * scale;
					const z = ( k / num - 0.5 ) * scale;

					posArray.push( x, y, z );
					rotArray.push( 0.0, 0.0, 0.0 );

					posArray.push( x, y, z );
					rotArray.push( Math.PI / 2, 0.0, 0.0 );

					posArray.push( x, y, z );
					rotArray.push( 0.0, 0.0, Math.PI / 2 );

				}

			}

		}

		this.geometry.setAttribute( "instanceRot", new Float32Array( rotArray ), 3, { instanceDivisor: 1 } );
		this.geometry.setAttribute( "instancePos", new Float32Array( posArray ), 3, { instanceDivisor: 1 } );

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( 'gridCrossFrag', gridCrossFrag ),
			vert: MXP.hotGet( 'gridCrossVert', gridCrossVert ),
			phase: [ "deferred" ],
			drawType: "TRIANGLES",
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/gridCross.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'gridCrossFrag', module.default );

					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/gridCross.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'gridCrossVert', module.default );

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
