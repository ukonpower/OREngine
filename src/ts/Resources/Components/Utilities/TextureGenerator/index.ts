import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine, TexProcedural } from 'orengine';

import hashFrag from './shaders/hash.fs';
import noiseFrag from './shaders/noise.fs';
import noiseCyclicFrag from './shaders/noiseCyclic.fs';

import { gl } from '~/ts/Globals';

export class TextureGenerator extends MXP.Component {

	private updateTextures: TexProcedural[];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.updateTextures = [];

		const engine = Engine.getInstance( gl );

		const renderer = engine.renderer;

		Engine.resources.addTexture( "noise", new TexProcedural( renderer, {
			frag: noiseFrag,
			resolution: new GLP.Vector( 1024, 1024 )
		} ) );

		Engine.resources.addTexture( "noiseCyclic", new TexProcedural( renderer, {
			frag: noiseCyclicFrag,
			resolution: new GLP.Vector( 1024, 1024 )
		} ) );

		const hashTex = new TexProcedural( renderer, {
			frag: hashFrag,
			resolution: new GLP.Vector( 512, 512 )
		} );

		hashTex.setting( {
			magFilter: gl.NEAREST,
			minFilter: gl.NEAREST
		} );

		hashTex.render();

		Engine.resources.addTexture( "hash", hashTex );

		this.updateTextures.push(
			Engine.resources.addTexture( "noiseCyclic_anime", new TexProcedural( renderer, {
				frag: noiseCyclicFrag,
				uniforms: Engine.getInstance( gl ).uniforms,
				resolution: new GLP.Vector( 512, 512 ),
			} ) )
		);


		this.once( "dispose", () => {

			this.updateTextures.forEach( ( tex ) => {

				tex.dispose();

			} );

			this.updateTextures = [];

		} );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		for ( let i = 0; i < this.updateTextures.length; i ++ ) {

			const tex = this.updateTextures[ i ];

			tex.render();

		}

	}

}
