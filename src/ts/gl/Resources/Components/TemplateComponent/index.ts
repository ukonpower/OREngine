import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import templateFrag from './shaders/template.fs';
import templateVert from './shaders/template.vs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

export class TemplateComponent extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor() {

		super();

		// geometry

		this.geometry = new MXP.SphereGeometry();

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( "templateFrag", templateFrag ),
			vert: MXP.hotGet( "templateVert", templateVert ),
			uniforms: GLP.UniformsUtils.merge( {
				uResolution: globalUniforms.resolution.uResolution,
			}, globalUniforms.time )

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

	static get key(): string {

		return "templateComponent";

	}


	public setEntity( entity: MXP.Entity ): void {

		entity.addComponent( this.material );
		entity.addComponent( this.geometry );

	}

	public unsetEntityImpl( entity: MXP.Entity ): void {

		entity.removeComponent( this.material );
		entity.removeComponent( this.geometry );

	}

}
