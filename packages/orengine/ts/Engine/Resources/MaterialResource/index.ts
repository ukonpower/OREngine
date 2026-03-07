
import * as MXP from 'maxpower';

import { ShaderResource } from '../ShaderResource';

export class MaterialResource extends MXP.Serializable {

	public name: string;
	public material: MXP.Material;

	private _vert: string;
	private _frag: string;
	private _phase: string[];
	private _drawType: string;
	private _blending: string;
	private _useLight: boolean;
	private _depthTest: boolean;
	private _depthWrite: boolean;
	private _cullFace: boolean;

	private _vertResource: ShaderResource | null;
	private _fragResource: ShaderResource | null;
	private _onShaderUpdate: () => void;

	private _getShader: ( name: string ) => ShaderResource | undefined;
	private _getShaderList: () => ShaderResource[];

	constructor( name: string, material: MXP.Material, options: {
		data?: {
			vert?: string;
			frag?: string;
			phase?: string[];
			drawType?: string;
			blending?: string;
			useLight?: boolean;
			depthTest?: boolean;
			depthWrite?: boolean;
			cullFace?: boolean;
		};
		getShader: ( name: string ) => ShaderResource | undefined;
		getShaderList: () => ShaderResource[];
	} ) {

		super();
		this.name = name;
		this.material = material;
		this._getShader = options.getShader;
		this._getShaderList = options.getShaderList;

		this._vertResource = null;
		this._fragResource = null;
		this._onShaderUpdate = () => this._syncShaderToMaterial();

		const data = options.data;
		this._vert = data?.vert || "";
		this._frag = data?.frag || "";
		this._phase = data?.phase || [ "shadowMap", "deferred" ];
		this._drawType = data?.drawType || "";
		this._blending = data?.blending || "";
		this._useLight = data?.useLight ?? true;
		this._depthTest = data?.depthTest ?? true;
		this._depthWrite = data?.depthWrite ?? true;
		this._cullFace = data?.cullFace ?? false;

		this._bindShaderResource( "vert", this._vert );
		this._bindShaderResource( "frag", this._frag );

		this.field( "vert", () => this._vert, ( v ) => {

			this._unbindShaderResource( "vert" );
			this._vert = v;
			this._bindShaderResource( "vert", v );
			this._syncShaderToMaterial();

		}, {
			format: {
				type: "select",
				list: () => this._buildShaderSelectList( "vert" )
			}
		} );

		this.field( "frag", () => this._frag, ( v ) => {

			this._unbindShaderResource( "frag" );
			this._frag = v;
			this._bindShaderResource( "frag", v );
			this._syncShaderToMaterial();

		}, {
			format: {
				type: "select",
				list: () => this._buildShaderSelectList( "frag" )
			}
		} );

		this.field( "phase", () => this._phase, ( v ) => {

			this._phase = v;
			this.material.setVisibility( v as MXP.MaterialRenderType[] );
			this.material.requestUpdate();

		} );

		this.field( "drawType", () => this._drawType, ( v ) => {

			this._drawType = v;
			this.material.drawType = v as MXP.DrawType;
			this.material.requestUpdate();

		}, {
			format: { type: "select", list: [
				{ label: "(Default)", value: "" },
				"TRIANGLES", "LINES", "POINTS"
			] }
		} );

		this.field( "blending", () => this._blending, ( v ) => {

			this._blending = v;
			this.material.blending = v as MXP.Blending;
			this.material.requestUpdate();

		}, {
			format: { type: "select", list: [
				{ label: "(Default)", value: "" },
				"NORMAL", "ADD", "DIFF"
			] }
		} );

		this.field( "useLight", () => this._useLight, ( v ) => {

			this._useLight = v;
			this.material.useLight = v;
			this.material.requestUpdate();

		} );

		this.field( "depthTest", () => this._depthTest, ( v ) => {

			this._depthTest = v;
			this.material.depthTest = v;
			this.material.requestUpdate();

		} );

		this.field( "depthWrite", () => this._depthWrite, ( v ) => {

			this._depthWrite = v;
			this.material.depthWrite = v;
			this.material.requestUpdate();

		} );

		this.field( "cullFace", () => this._cullFace, ( v ) => {

			this._cullFace = v;
			this.material.cullFace = v;
			this.material.requestUpdate();

		} );

	}

	private _buildShaderSelectList( type: "vert" | "frag" ) {

		const suffix = `/${type}`;
		const list: { label: string, value: string }[] = [ { label: "(None)", value: "" } ];

		this._getShaderList().forEach( s => {

			if ( s.name.endsWith( suffix ) ) {

				list.push( { label: s.name, value: s.name } );

			}

		} );

		return list;

	}

	private _bindShaderResource( type: "vert" | "frag", name: string ) {

		if ( ! name ) return;

		const resource = this._getShader( name );
		if ( ! resource ) return;

		if ( type === "vert" ) this._vertResource = resource;
		else this._fragResource = resource;

		resource.on( "update", this._onShaderUpdate );

	}

	private _unbindShaderResource( type: "vert" | "frag" ) {

		const resource = type === "vert" ? this._vertResource : this._fragResource;
		if ( ! resource ) return;

		resource.off( "update", this._onShaderUpdate );

		if ( type === "vert" ) this._vertResource = null;
		else this._fragResource = null;

	}

	private _syncShaderToMaterial() {

		if ( this._vertResource ) {

			this.material.vert = this._vertResource.source;

		}

		if ( this._fragResource ) {

			this.material.frag = this._fragResource.source;

		}

		this.material.requestUpdate();

	}

}
