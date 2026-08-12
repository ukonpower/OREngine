
import * as BSP from 'basepower';
import * as GLP from 'glpower';

import { Serializable } from '../../../core/Serializable';

import basicFrag from './shaders/basic.fs';
import basicVert from './shaders/basic.vs';

import type { MaterialContract } from '../../../core/Contracts/MaterialContract';


type MaterialDefines = {[key: string]: any};
type MaterialVisibility = {[K in MaterialRenderType]?: boolean}
type MaterialProgramCache = {[K in MaterialRenderType]?: GLP.GLPowerProgram}

export type MaterialRenderType = "shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"
export type DrawType = 'TRIANGLES' | 'LINES' | 'POINTS';
export type Blending = 'ADD' | 'NORMAL' | "DIFF";

export interface MaterialParam {
	name?: string,
	phase?: MaterialRenderType[];
	renderOrder?: number;
	frag?: string;
	vert?: string;
	defines?: MaterialDefines;
	uniforms?: BSP.Uniforms;
	useLight?: boolean;
	depthTest?: boolean;
	depthWrite?: boolean;
	cullFace? :boolean;
	blending?: Blending,
	drawType?: DrawType;
}

export class Material extends Serializable implements MaterialContract {

	public name: string;
	public vert: string;
	public frag: string;
	public defines: MaterialDefines;
	public uniforms: BSP.Uniforms;

	public useLight: boolean;
	public depthTest: boolean;
	public depthWrite: boolean;
	public cullFace: boolean;
	public drawType: DrawType;
	public blending: Blending;
	public renderOrder: number;

	public visibilityFlag: MaterialVisibility;
	public programCache: MaterialProgramCache;

	constructor( params?: MaterialParam ) {

		super();

		params = params || {};

		this.name = params.name || '';

		this.visibilityFlag = {};
		this.setVisibility( params.phase || [ "shadowMap", "deferred" ] );

		this.useLight = params.useLight !== undefined ? params.useLight : true;
		this.depthTest = params.depthTest !== undefined ? params.depthTest : true;
		this.cullFace = params.cullFace !== undefined ? params.cullFace : false;
		this.depthWrite = params.depthWrite !== undefined ? params.depthWrite : true;
		this.drawType = params.drawType || "TRIANGLES";
		this.blending = params.blending || "NORMAL";
		this.renderOrder = params.renderOrder ?? 0;

		this.vert = params.vert || basicVert;
		this.frag = params.frag || basicFrag;
		this.defines = params.defines || {};
		this.uniforms = params.uniforms || {};

		this.programCache = {};

	}

	public setVisibility( typeArray: MaterialRenderType[] ) {

		this.visibilityFlag = {
			shadowMap: typeArray.indexOf( 'shadowMap' ) > - 1,
			deferred: typeArray.indexOf( 'deferred' ) > - 1,
			forward: typeArray.indexOf( 'forward' ) > - 1,
			ui: typeArray.indexOf( 'ui' ) > - 1,
			envMap: typeArray.indexOf( 'envMap' ) > - 1,
			postprocess: typeArray.indexOf( 'postprocess' ) > - 1,
		};

	}

	public requestUpdate() {

		this.programCache = {};

	}

}
