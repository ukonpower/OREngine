import * as GLP from 'glpower';

import { Resource } from '../Resource';

export class Font extends Resource {

	public texture: GLP.GLPowerTexture;
	public matrices: Map<string, {geo: GLP.Matrix, uv: GLP.Matrix}> = new Map();

	constructor( gl: WebGL2RenderingContext ) {

		super( );

		this.texture = new GLP.GLPowerTexture( gl );

		this.matrices = new Map();

	}

	public static get key() {

		return "";

	}

	public get key() {

		return ( this.constructor as typeof Font ).key;

	}

}
