import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import flFrag from './shaders/flashLine.fs';
import flVert from './shaders/flashLine.vs';

export class FlashLine extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

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
			uniforms: MXP.UniformsUtils.merge( engine.uniforms )
		} );

		this.entity.addComponent( MXP.Mesh, {
			material: this.material,
			geometry: this.geometry
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

}
