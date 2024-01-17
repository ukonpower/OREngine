import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import hudVert from './shaders/hud.vs';
import hudFrag from './shaders/hud.fs';
import { gl, globalUniforms } from '~/ts/Globals';

export class HUD extends MXP.Entity {

	constructor() {

		super();

		const texture = new GLP.GLPowerTexture( gl );
		texture.setting( {
			wrapS: gl.REPEAT,
			wrapT: gl.REPEAT,
		} );

		const border = new MXP.Entity();
		this.add( border );

		const borderGeo = border.addComponent( "geometry", new MXP.PlaneGeometry( 2.0, 2.0 ) );

		borderGeo.setAttribute( 'num', new Float32Array( ( ()=>{

			const num = 4;

			const r: number[] = [];

			for ( let i = 0; i < num; i ++ ) {

				r.push( i );

			}

			return r;

		} )() ), 1, { instanceDivisor: 1 } );

		const mat = border.addComponent( "material", new MXP.Material( {
			frag: MXP.hotGet( 'hudFrag', hudFrag ),
			vert: MXP.hotGet( 'hudVert', hudVert ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uTex: {
					value: texture,
					type: "1i"
				}
			} ),
			type: [ "ui" ],
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/hud.vs", ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'hudVert', module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/hud.fs", ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'hudFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}


	}

}
