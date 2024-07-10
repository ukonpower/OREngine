import * as GLP from 'glpower';

export type MaterialRenderType = "shadowMap" | "deferred" | "forward" | "envMap" | 'postprocess' | 'ui'

type MaterialDefines = {[key: string]: any};
type MaterialVisibility = {[K in MaterialRenderType]?: boolean}
type MaterialProgramCache = {[K in MaterialRenderType]?: GLP.GLPowerProgram}

import { Component, ComponentParams } from '..';

import basicFrag from './shaders/basic.fs';
import basicVert from './shaders/basic.vs';


export type DrawType = 'TRIANGLES' | 'LINES' | 'POINTS';
export type Blending = 'ADD' | 'NORMAL';

export interface MaterialParam extends ComponentParams{
	name?: string,
	phase?: MaterialRenderType[];
	frag?: string;
	vert?: string;
	defines?: MaterialDefines;
	uniforms?: GLP.Uniforms;
	depthTest?: boolean;
	cullFace? :boolean;
	blending?: Blending,
	drawType?: DrawType;
}


export class Material extends Component {

	public name: string;
	public vert: string;
	public frag: string;
	public defines: MaterialDefines;
	public uniforms: GLP.Uniforms;

	public useLight: boolean;
	public depthTest: boolean;
	public cullFace: boolean;
	public drawType: DrawType;
	public blending: Blending;

	public visibilityFlag: MaterialVisibility;
	public programCache: MaterialProgramCache;


	constructor( params?: MaterialParam ) {

		super( params );

		params = params || {};

		this.name = params.name || '';

		this.visibilityFlag = {};
		this.setVisibility( params.phase || [ "deferred" ] );

		this.useLight = true;
		this.depthTest = true;
		this.cullFace = false;
		this.drawType = params.drawType || "TRIANGLES";
		this.blending = params.blending || "NORMAL";

		this.vert = params.vert || basicVert;
		this.frag = params.frag || basicFrag;
		this.defines = params.defines || {};
		this.uniforms = params.uniforms || {};

		this.setProps( params );

		this.programCache = {};

	}

	static get key() {

		return "material";

	}

	private setVisibility( typeArray: MaterialRenderType[] ) {

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
