import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import templateFrag from './shaders/template.fs';
import templateVert from './shaders/template.vs';

import { globalUniforms } from '~/ts/Globals';

export class TestComponent extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// geometry

		this.geometry = new MXP.SphereGeometry();

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( "templateFrag", templateFrag ),
			vert: MXP.hotGet( "templateVert", templateVert ),
			phase: [ "deferred", "shadowMap" ],
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/template.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'templateFrag', module.default );

					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/template.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'templateVert', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

}
