import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import flFrag from './shaders/flashLine.fs';
import flVert from './shaders/flashLine.vs';

export class FlashLine extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// geometry

		this.geometry = new MXP.CylinderGeometry( { radiusBottom: 0.02, radiusTop: 0.02, radSegments: 8, height: 50.0 } );

		const oPosArray = [];

		const num = 32;

		// let range = new Math.random();

		// 撮影（npm run scene-shots）で撮るたびに並びが変わって PNG が書き換わらないよう、seed を固定した乱数で置く
		const random = MTP.MathUtils.randomSeed( 1 );

		for ( let index = 0; index < num; index ++ ) {

			oPosArray.push(
				( random() * 2.0 - 1.0 ) * 20.0,
				random() * 2.0 - 1.0,
				( random() * 2.0 - 1.0 ) * 20.0,
				random()
			);

		}

		this.geometry.setAttribute( "oPos", new Float32Array( oPosArray ), 4, { instanceDivisor: 1 } );

		// material

		this.material = new MXP.Material( {
			phase: [ "forward", "envMap" ],
			transparent: true,
			frag: MXP.hotGet( "flFrag", flFrag ),
			vert: MXP.hotGet( "flVert", flVert ),
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
