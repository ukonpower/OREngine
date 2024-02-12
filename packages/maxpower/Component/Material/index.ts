import * as GLP from 'glpower';

import { Component, ComponentProps, ComponentSetProps } from "..";
export type MaterialRenderType = "shadowMap" | "deferred" | "forward" | "envMap" | 'postprocess' | 'ui'

type MaterialDefines = {[key: string]: any};
type MaterialVisibility = {[K in MaterialRenderType]?: boolean}
type MaterialProgramCache = {[K in MaterialRenderType]?: GLP.GLPowerProgram}

import basicFrag from './shaders/basic.fs';
import basicVert from './shaders/basic.vs';

export type DrawType = 'TRIANGLES' | 'LINES' | 'POINTS';

export type MaterialParam = {
	name?: string,
	type?: MaterialRenderType[];
	frag?: string;
	vert?: string;
	defines?: MaterialDefines;
	uniforms?: GLP.Uniforms;
	depthTest?: boolean;
	cullFace? :boolean;
	blending?: boolean,
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

	public visibilityFlag: MaterialVisibility;
	public programCache: MaterialProgramCache;

	constructor( opt?: MaterialParam ) {

		super();

		opt = opt || {};

		this.name = opt.name || '';

		this.visibilityFlag = {};
		this.setVisibility( [ "deferred", "shadowMap" ] );

		this.useLight = true;
		this.depthTest = true;
		this.cullFace = true;
		this.drawType = "TRIANGLES";

		this.vert = opt.vert || basicVert;
		this.frag = opt.frag || basicFrag;
		this.defines = opt.defines || {};
		this.uniforms = opt.uniforms || {};

		this.setPropertyValues( opt );

		this.programCache = {};

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

	public getProperties(): ComponentProps {

		return {
			name: { value: this.name },
			deferred: { value: this.visibilityFlag.deferred },
			forward: { value: this.visibilityFlag.forward },
			shadowMap: { value: this.visibilityFlag.shadowMap },
			ui: { value: this.visibilityFlag.ui },
			useLight: { value: this.useLight },
			depthTest: { value: this.depthTest },
			cullFace: { value: this.cullFace },
			drawType: { value: this.drawType },
		};

	}

	public setPropertyValues( props: ComponentSetProps ): void {

		props = { ...this.getPropertyValues(), ...props };

		this.name = props.name;
		this.visibilityFlag.deferred = props.deferred;
		this.visibilityFlag.forward = props.forward;
		this.visibilityFlag.shadowMap = props.shadowMap;
		this.visibilityFlag.ui = props.ui;
		this.useLight = props.useLight;
		this.depthTest = props.depthTest;
		this.cullFace = props.cullFace;
		this.drawType = props.drawType;

		this.requestUpdate();

	}

	public requestUpdate() {

		this.programCache = {};

	}

}
