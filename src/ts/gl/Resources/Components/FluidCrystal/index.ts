import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import fluidCrystalFrag from './shaders/fluidCrystal.fs';
import fluidCrystalVert from './shaders/fluidCrystal.vs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

export class FluidCrystal extends MXP.Component {

	private material: MXP.Material;

	constructor() {

		super();

		this.material = new MXP.Material( {
			phase: [ "forward" ],
			frag: MXP.hotGet( "fluidCrystalFrag", fluidCrystalFrag ),
			vert: MXP.hotGet( "fluidCrystalVert", fluidCrystalVert ),
			uniforms: GLP.UniformsUtils.merge( {
				uResolution: globalUniforms.resolution.uResolution,
			}, globalUniforms.time )

		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/fluidCrystal.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'fluidCrystalFrag', module.default );

					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/fluidCrystal.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'fluidCrystalVert', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

	static get key(): string {

		return "fluidCrystal";

	}

	public setEntity( entity: MXP.Entity ): void {

		entity.addComponent( this.material );

	}

	public unsetEntityImpl( entity: MXP.Entity ): void {

		entity.removeComponent( this.material );

	}

}
