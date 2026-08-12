import * as GLP from 'glpower';
import * as MTP from 'mathpower';

export interface PostProcessPassParam extends MaterialParam{
	backBufferOverride?:GLP.GLPowerTexture[],
	renderTarget?: GLP.GLPowerFrameBuffer | null,
	clearColor?: MTP.Vector;
	clearDepth?: number;
	resolutionRatio?: number;
	passThrough?: boolean;
	viewPort?: MTP.Vector
	fixedResotluion?: MTP.Vector
}

import { GL, GLBackend } from '../../../backend/GLBackend';
import { MaterialParam, Material } from '../../Material';

import passFrag from './shaders/pass.fs';
import quadVert from './shaders/quad.vs';


export class PostProcessPass extends Material {

	public enabled: boolean;

	public renderTarget: GLP.GLPowerFrameBuffer | null;
	public backBufferOverride: GLP.GLPowerTexture[] | null;

	public clearColor: MTP.Vector | null;
	public clearDepth: number | null;

	public resolutionRatio: number;
	public passThrough: boolean;

	public resolution: MTP.Vector;
	public resolutionInv: MTP.Vector;
	public viewPort: MTP.Vector | null;
	private _fixedResolution: MTP.Vector | null;

	constructor( backend: GLBackend, param: PostProcessPassParam ) {

		super( { ...param, frag: param.frag || passFrag, vert: param.vert || quadVert } );

		this.enabled = true;
		this._fixedResolution = param.fixedResotluion ? param.fixedResotluion.clone() : null;
		this.resolution = new MTP.Vector();
		this.resolutionInv = new MTP.Vector();

		this.viewPort = null;

		this.uniforms.uPPResolution = {
			value: this.resolution,
			type: '2fv'
		};

		this.uniforms.uPPPixelSize = {
			value: this.resolutionInv,
			type: '2fv'
		};

		this.renderTarget = param.renderTarget !== undefined ? param.renderTarget : backend.createFrameBuffer().setTexture( [
			backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
		] );

		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;
		this.depthTest = param.depthTest !== undefined ? param.depthTest : false;
		this.resolutionRatio = param.resolutionRatio || 1;
		this.passThrough = param.passThrough ?? false;
		this.viewPort = param.viewPort || null;
		this.backBufferOverride = param.backBufferOverride || null;

	}

	public get fixedResolution() {

		return this._fixedResolution;

	}

	public set fixedResolution( resolution: MTP.Vector | null ) {

		this._fixedResolution = resolution;

		this.resize( resolution || new MTP.Vector() );

	}

	public onAfterRender() {
	}

	public resize( resolution: MTP.Vector ): void {

		if ( this._fixedResolution ) {

			this.resolution.copy( this._fixedResolution );

		} else {

			this.resolution.copy( resolution ).multiply( this.resolutionRatio );

		}

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
