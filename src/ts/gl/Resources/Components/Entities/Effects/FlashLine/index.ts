import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import flFrag from './shaders/flashLine.fs';
import flVert from './shaders/flashLine.vs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

export class FlashLine extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor() {

		super();

		// geometry

		this.geometry = new MXP.CylinderGeometry( { radiusBottom: 0.02, radiusTop: 0.02, radSegments: 8, height: 50.0 } );

		const oPosArray = [];

		const num = 32;

		// let range = new Math.random();

		for ( let index = 0; index < num; index ++ ) {

			const rnd = GLP.MathUtils.randomVector().multiply( new GLP.Vector( 20, 1, 20.0 ) );

			oPosArray.push(
				rnd.x, rnd.y, rnd.z, Math.random()
			);

		}

		this.geometry.setAttribute( "oPos", new Float32Array( oPosArray ), 4, { instanceDivisor: 1 } );

		// material

		this.material = new MXP.Material( {
			phase: [ "forward", "envMap" ],
			frag: MXP.hotGet( "flFrag", flFrag ),
			vert: MXP.hotGet( "flVert", flVert ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/flashLine.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'flFrag', module.default );

					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/flashLine.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'flVert', module.default );

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
