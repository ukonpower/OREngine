import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

import eBorderVert from './shaders/eBorder.vs';
import eBorderFrag from './shaders/eBorder.fs';
import { Entity } from 'maxpower/Entity';

export class EBorder extends Entity {

	constructor() {

		super();

		const size = new GLP.Vector( 1, 1 );

		/*-------------------------------
			Geometyr
		-------------------------------*/

		const geo = new GLP.PlaneGeometry( size.x, size.y );
		this.addComponent( "geometry", geo );

		/*-------------------------------
			Material
		-------------------------------*/

		const matName = "eBorder";

		const mat = this.addComponent( "material", new GLP.Material( {
			name: matName,
			type: [ "deferred" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			vert: hotGet( matName + "vs", eBorderVert ),
			frag: hotGet( matName + "fs", eBorderFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/eBorder.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( matName + "fs", module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/eBorder.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( matName + "vs", module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
