import * as GLP from 'glpower';

import { Material, MaterialParam } from '../Material';

export interface PostProcessPassParam extends MaterialParam{
	// input?: ( GLPowerTexture | null )[],
	renderTarget?: GLP.GLPowerFrameBuffer | null,
	clearColor?: GLP.Vector;
	clearDepth?: number;
	resolutionRatio?: number;
	passThrough?: boolean;
	viewPort?: GLP.Vector
}

import passFrag from './shaders/pass.fs';
import quadVert from './shaders/quad.vs';

export class PostProcessPass extends Material {

	public renderTarget: GLP.GLPowerFrameBuffer | null;

	public clearColor: GLP.Vector | null;
	public clearDepth: number | null;

	public resolutionRatio: number;
	public passThrough: boolean;

	public resolution: GLP.Vector;
	public resolutionInv: GLP.Vector;
	public viewPort: GLP.Vector | null;

	constructor( gl: WebGL2RenderingContext, param: PostProcessPassParam ) {

		super( { ...param, frag: param.frag || passFrag, vert: param.vert || quadVert } );

		this.resolution = new GLP.Vector();
		this.resolutionInv = new GLP.Vector();

		this.viewPort = null;

		this.uniforms.uPPResolution = {
			value: this.resolution,
			type: '2fv'
		};

		this.uniforms.uPPPixelSize = {
			value: this.resolutionInv,
			type: '2fv'
		};

		this.renderTarget = param.renderTarget !== undefined ? param.renderTarget : new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;
		this.depthTest = param.depthTest !== undefined ? param.depthTest : false;
		this.resolutionRatio = param.resolutionRatio || 1;
		this.passThrough = param.passThrough ?? false;
		this.viewPort = param.viewPort || null;

	}

	public get enabled() {

		return true;

	}

	public set enabled( value: boolean ) {

	}

	public onAfterRender() {
	}

	public resize( resolution: GLP.Vector ): void {

		this.resolution.copy( resolution ).multiply( this.resolutionRatio );
		this.resolutionInv.set( 1.0 / this.resolution.x, 1.0 / this.resolution.y );

		if ( this.renderTarget ) {

			this.renderTarget.setSize( this.resolution );

		}

	}

	public setRendertarget( renderTarget:GLP.GLPowerFrameBuffer | null ) {

		this.renderTarget = renderTarget;

		if ( this.renderTarget && ( this.renderTarget.size.x != this.resolution.x || this.renderTarget.size.y != this.resolution.y ) ) {

			this.renderTarget.setSize( this.resolution );

		}

	}

}
