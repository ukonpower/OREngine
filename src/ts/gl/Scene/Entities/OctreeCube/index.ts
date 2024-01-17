import * as MXP from 'maxpower';
import * as GLP from 'glpower';

import contentFrag from './shaders/content.fs';
import { globalUniforms } from '~/ts/Globals';
import { TurnTable } from '../../Components/TurnTable';

export class OctreeCube extends MXP.Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "octreecube",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution ),
			frag: MXP.hotGet( 'contentFrag', contentFrag )
		} ) );

		this.addComponent( 'geometry', new MXP.CubeGeometry( 1.0, 1.0, 1.0 ) );
		this.addComponent( "turnTable", new TurnTable() );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/content.fs", ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'content', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
