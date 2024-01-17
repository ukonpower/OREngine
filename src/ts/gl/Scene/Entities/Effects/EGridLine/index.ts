import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

import eGridLineVert from './shaders/eGridLine.vs';
import eGridLineFrag from './shaders/eGridLine.fs';
import { Entity } from 'maxpower/Entity';

type DotType = 'line' | 'dash'

export class EGridLine extends Entity {

	constructor( lineType: DotType = 'dash', res: GLP.Vector = new GLP.Vector( 4.0, 4.0 ), size: GLP.Vector = new GLP.Vector( 1.0, 1.0 ) ) {

		super();

		/*-------------------------------
			Geometyr
		-------------------------------*/

		const geo = new GLP.PlaneGeometry( 1.0, 1.0 );

		const instancePosArray: number[] = [];
		const instanceIdArray: number [] = [];

		const gRnd = Math.random();

		for ( let i = 1; i < res.x; i ++ ) {

			instancePosArray.push( i / res.x * size.x - size.x / 2, 0.0, 0.0 );
			instanceIdArray.push( 0, gRnd, size.y );

		}

		for ( let i = 1; i < res.y; i ++ ) {

			instancePosArray.push( 0.0, i / res.y * size.y - size.y / 2, 0.0 );
			instanceIdArray.push( 1, gRnd, size.x );

		}

		geo.setAttribute( "insPos", new Float32Array( instancePosArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "insId", new Float32Array( instanceIdArray ), 3, { instanceDivisor: 1 } );

		this.addComponent( "geometry", geo );

		/*-------------------------------
			Material
		-------------------------------*/

		const matName = "eGridLine";

		const defines: {[key:string]:string} = {};

		if ( lineType == 'dash' ) {

			defines[ "IS_DASH" ] = "";

		}

		const mat = this.addComponent( "material", new GLP.Material( {
			name: matName,
			type: [ "deferred" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
			} ),
			defines,
			vert: hotGet( matName + "vs", eGridLineVert ),
			frag: hotGet( matName + "fs", eGridLineFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/eGridLine.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( matName + "fs", module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/eGridLine.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( matName + "vs", module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
