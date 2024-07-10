import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Font1 } from '../../Fonts/Font1';

import textFrag from './shaders/text.fs';
import textVert from './shaders/text.vs';

import { gl, globalUniforms, resource } from '~/ts/gl/GLGlobals';

export class Text extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor() {

		super();

		const font = resource.getFont( Font1 )!;

		// geometry

		this.geometry = new MXP.PlaneGeometry();

		// material

		this.material = new MXP.Material( {
			frag: MXP.hotGet( 'textFrag', textFrag ),
			vert: MXP.hotGet( 'textVert', textVert ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.resolution, globalUniforms.time, {
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

	static get key(): string {

		return 'text';

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

	public setEntityImpl( entity: MXP.Entity ): void {

		entity.addComponent( this.material );
		entity.addComponent( this.geometry );

	}

	public unsetEntityImpl( entity: MXP.Entity ): void {

		entity.removeComponent( this.material );
		entity.removeComponent( this.geometry );

	}

	public dispose(): void {

		super.dispose();
		this.geometry.dispose();
		this.material.dispose();

	}

}
