
import * as MXP from 'maxpower';

import { ShaderResource } from '../ShaderResource';

export class TextureResource extends MXP.Serializable {

	public name: string;

	private _frag: string;
	private _resolution: number[];
	private _filter: string;
	private _updateEveryFrame: boolean;

	private _fragResource: ShaderResource | null;
	private _onShaderUpdate: () => void;

	private _getShader: ( name: string ) => ShaderResource | undefined;
	private _getShaderList: () => ShaderResource[];

	constructor( name: string, options: {
		data?: {
			frag?: string;
			resolution?: number[];
			filter?: string;
			updateEveryFrame?: boolean;
		};
		getShader: ( name: string ) => ShaderResource | undefined;
		getShaderList: () => ShaderResource[];
	} ) {

		super();
		this.name = name;
		this._getShader = options.getShader;
		this._getShaderList = options.getShaderList;

		this._fragResource = null;
		this._onShaderUpdate = () => this.emit( "update/shader" );

		const data = options.data;
		this._frag = data?.frag || "";
		this._resolution = data?.resolution || [ 1024, 1024 ];
		this._filter = data?.filter || "linear";
		this._updateEveryFrame = data?.updateEveryFrame ?? false;

		this._bindShaderResource( this._frag );

		this.field( "frag", () => this._frag, ( v ) => {

			this._unbindShaderResource();
			this._frag = v;
			this._bindShaderResource( v );
			this.emit( "update/shader" );

		}, {
			format: {
				type: "select",
				list: () => this._buildShaderSelectList()
			}
		} );

		this.field( "resolution", () => this._resolution, ( v ) => {

			this._resolution = v;

		}, {
			format: { type: "vector" }
		} );

		this.field( "filter", () => this._filter, ( v ) => {

			this._filter = v;

		}, {
			format: {
				type: "select",
				list: [
					{ label: "linear", value: "linear" },
					{ label: "nearest", value: "nearest" },
				]
			}
		} );

		this.field( "updateEveryFrame", () => this._updateEveryFrame, ( v ) => {

			this._updateEveryFrame = v;

		} );

	}

	public get frag() { return this._frag; }

	public get resolution() { return this._resolution; }

	public get filter() { return this._filter; }

	public get updateEveryFrame() { return this._updateEveryFrame; }

	public get fragSource(): string | undefined {

		return this._fragResource?.source;

	}

	private _buildShaderSelectList() {

		const suffix = "/frag";
		const list: { label: string, value: string }[] = [ { label: "(None)", value: "" } ];

		this._getShaderList().forEach( s => {

			if ( s.name.endsWith( suffix ) ) {

				list.push( { label: s.name, value: s.name } );

			}

		} );

		return list;

	}

	private _bindShaderResource( name: string ) {

		if ( ! name ) return;

		const resource = this._getShader( name );
		if ( ! resource ) return;

		this._fragResource = resource;
		resource.on( "update", this._onShaderUpdate );

	}

	private _unbindShaderResource() {

		if ( ! this._fragResource ) return;

		this._fragResource.off( "update", this._onShaderUpdate );
		this._fragResource = null;

	}

}
