import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Font1 } from '../../../Fonts/Font1';

import textFrag from './shaders/text.fs';
import textVert from './shaders/text.vs';

import { resource, globalUniforms, gl } from '~/ts/Globals';

export class Text extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const font = resource.getFont( Font1 )!;

		// geometry

		this.geometry = new MXP.PlaneGeometry();

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( 'textFrag', textFrag ),
			vert: MXP.hotGet( 'textVert', textVert ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, {
				uTex: {
					value: font.texture,
					type: '1i'
				}
			} )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/text.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'textFrag', module.default );

					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/text.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'textVert', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

	public setText( text: string, align?: string ): void {

		const font = resource.getFont( Font1 )!;

		const uvMatrixArray = [];
		const geoMatrixArray = [];

		for ( let i = 0; i < text.length; i ++ ) {

			const c = text[ i ];

			const uvMatrix = font.matrices.get( c );

			if ( uvMatrix ) {

				geoMatrixArray.push( ...uvMatrix.geo.clone().applyScale( new GLP.Vector( 0.2 ) ).applyPosition( new GLP.Vector( i - ( align == 'center' ? text.length / 2 : 0 ), 0, 0 ) ).elm );
				uvMatrixArray.push( ...uvMatrix.uv.elm );

			}

		}

		this.geometry.setAttribute( "geoMatrix", new Float32Array( geoMatrixArray ), 16, {
			instanceDivisor: 1,
			usage: gl.DYNAMIC_DRAW
		} );

		this.geometry.setAttribute( "uvMatrix", new Float32Array( uvMatrixArray ), 16, {
			instanceDivisor: 1,
			usage: gl.DYNAMIC_DRAW
		} );

		this.geometry.requestUpdate();

	}

}
