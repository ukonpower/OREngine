import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class Font extends MXP.Resource {

	public texture: GLP.GLPowerTexture;
	public matrices: Map<string, {geo: GLP.Matrix, uv: GLP.Matrix}> = new Map();

	constructor( gl: WebGL2RenderingContext ) {

		super( );

		this.texture = new GLP.GLPowerTexture( gl );

		this.matrices = new Map();

	}

	public get resourceId() {

		return ( this.constructor as typeof Font ).resourceId;

	}

}
