import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gridCrossFrag from './shaders/gridCross.fs';
import gridCrossVert from './shaders/gridCross.vs';


export class GridCross extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// geometry

		const geo = new MXP.CubeGeometry( { width: 0.05, height: 0.5, depth: 0.05 } );

		const posArray: number[] = [];
		const rotArray: number[] = [];

		const num = new GLP.Vector( 16, 2, 16 );

		const scale = 1.0;

		for ( let i = 0; i < num.x; i ++ ) {

			for ( let j = 0; j < num.y; j ++ ) {

				for ( let k = 0; k < num.z; k ++ ) {

					const x = ( i / ( num.x - 1.0 ) - 0.5 ) * scale;
					const y = ( j / ( num.y - 1.0 ) - 0.5 ) * scale;
					const z = ( k / ( num.z - 1.0 ) - 0.5 ) * scale;

					// posArray.push( x, y, z );
					// rotArray.push( 0.0, 0.0, 0.0 );

					posArray.push( x, y, z );
					rotArray.push( Math.PI / 2, 0.0, 0.0 );

					posArray.push( x, y, z );
					rotArray.push( 0.0, 0.0, Math.PI / 2 );

				}

			}

		}

		geo.setAttribute( "instanceRot", new Float32Array( rotArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "instancePos", new Float32Array( posArray ), 3, { instanceDivisor: 1 } );

		// material

		const mat = new MXP.Material( {
			frag: MXP.hotGet( 'gridCrossFrag', gridCrossFrag ),
			vert: MXP.hotGet( 'gridCrossVert', gridCrossVert ),
			phase: [ "forward" ],
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: mat
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/gridCross.fs', ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'gridCrossFrag', module.default );

					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/gridCross.vs', ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'gridCrossVert', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
