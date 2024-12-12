
import * as GLP from 'glpower';
import { Entity } from 'packages/maxpower/Entity';

import { Component, ComponentParams } from '..';

import basicFrag from './shaders/basic.fs';
import basicVert from './shaders/basic.vs';


type MaterialDefines = {[key: string]: any};
type MaterialVisibility = {[K in MaterialRenderType]?: boolean}
type MaterialProgramCache = {[K in MaterialRenderType]?: GLP.GLPowerProgram}
export type MaterialRenderType = "shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"

export type DrawType = 'TRIANGLES' | 'LINES' | 'POINTS';
export type Blending = 'ADD' | 'NORMAL' | "DIFF";

export interface MaterialParam extends ComponentParams{
	name?: string,
	phase?: MaterialRenderType[];
	frag?: string;
	vert?: string;
	defines?: MaterialDefines;
	uniforms?: GLP.Uniforms;
	depthTest?: boolean;
	depthWrite?: boolean;
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
	public depthWrite: boolean;
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
		this.depthWrite = params.depthTest !== undefined ? params.depthTest : true;
		this.drawType = params.drawType || "TRIANGLES";
		this.blending = params.blending || "NORMAL";

		this.vert = params.vert || basicVert;
		this.frag = params.frag || basicFrag;
		this.defines = params.defines || {};
		this.uniforms = params.uniforms || {};

		this.programCache = {};

	}

	public static get tag() {

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

	protected setEntityImpl( entity: Entity ): void {

		if ( this.name === '' ) this.name = entity.name;

	}

	public requestUpdate() {

		this.programCache = {};

	}

}
