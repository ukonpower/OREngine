import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

import eGridDotsVert from './shaders/eGridDots.vs';
import eGridDotsFrag from './shaders/eGridDots.fs';
import { Entity } from 'maxpower/Entity';

type DotType = 'square' | 'circle'

export class EGridDots extends Entity {

	constructor( dotType: DotType = 'circle', res: GLP.Vector = new GLP.Vector( 8.0, 8.0 ), size: GLP.Vector = new GLP.Vector( 1.0, 1.0 ), dotSclae : number = 1.0 ) {

		super();

		/*-------------------------------
			Geometyr
		-------------------------------*/

		const geo = new GLP.PlaneGeometry( size.x / res.x * 0.5 * dotSclae, size.y / res.y * 0.5 * dotSclae );

		const instancePosArray: number[] = [];
		const instanceIdArray: number [] = [];

		const gRnd = Math.random();

		for ( let i = 0; i < res.y; i ++ ) {

			for ( let j = 0; j < res.x; j ++ ) {

				instancePosArray.push(
					j * ( size.x / res.x ) - size.x / 2, i * ( size.y / res.y ) - size.y / 2, 0
				);

				instanceIdArray.push(
					j, i, gRnd
				);

			}

		}

		geo.setAttribute( "insPos", new Float32Array( instancePosArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "insId", new Float32Array( instanceIdArray ), 3, { instanceDivisor: 1 } );

		this.addComponent( "geometry", geo );

		/*-------------------------------
			Material
		-------------------------------*/

		const matName = "eGridDots";

		const defines: {[key:string]:string} = {};

		if ( dotType == 'circle' ) {

			defines[ "IS_CIRCLE" ] = "";

		}

		const mat = this.addComponent( "material", new GLP.Material( {
			name: matName,
			type: [ "deferred" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
			} ),
			defines,
			vert: hotGet( matName + "vs", eGridDotsVert ),
			frag: hotGet( matName + "fs", eGridDotsFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/eGridDots.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( matName + "fs", module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/eGridDots.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( matName + "vs", module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
