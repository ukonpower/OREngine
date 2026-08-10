import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import gridDotsFrag from './shaders/gridDots.fs';
import gridDotsVert from './shaders/gridDots.vs';


export class GridDots extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// geometry

		const geo = new MXP.SphereGeometry( { radius: 0.1 } );

		const posArray: number[] = [];
		const rotArray: number[] = [];

		const num = new MTP.Vector( 32, 2, 32 );

		const scale = 1.0;

		for ( let i = 0; i < num.x; i ++ ) {

			for ( let j = 0; j < num.y; j ++ ) {

				for ( let k = 0; k < num.z; k ++ ) {

					const x = ( i / ( num.x - 1.0 ) - 0.5 ) * scale;
					const y = ( j / ( num.y - 1.0 ) - 0.5 ) * scale;
					const z = ( k / ( num.z - 1.0 ) - 0.5 ) * scale;

					posArray.push( x, y, z );
					rotArray.push( 0.0, 0.0, 0.0 );


				}

			}

		}

		geo.setAttribute( "instanceRot", new Float32Array( rotArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "instancePos", new Float32Array( posArray ), 3, { instanceDivisor: 1 } );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'gridDotsFrag', gridDotsFrag ),
			vert: MXP.hotGet( 'gridDotsVert', gridDotsVert ),
			phase: [ "forward" ],
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: mat
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/gridDots.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'gridDotsFrag', module.default );

					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/gridDots.vs', ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'gridDotsVert', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
