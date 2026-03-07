
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { ShaderResource, ShaderUniformInfo } from '../ShaderResource';

const uniformDefaultValue = ( type: string ): any => {

	switch ( type ) {

		case "float": return 0;
		case "vec2": return [ 0, 0 ];
		case "vec3": return [ 0, 0, 0 ];
		case "vec4": return [ 0, 0, 0, 0 ];
		case "int": return 0;
		case "sampler2D": return "";
		default: return 0;

	}

};

export const glslTypeToUniformType = ( type: string ): GLP.UniformType => {

	switch ( type ) {

		case "float": return "1f";
		case "vec2": return "2fv";
		case "vec3": return "3fv";
		case "vec4": return "4fv";
		case "int": return "1i";
		case "sampler2D": return "1i";
		default: return "1f";

	}

};

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

	private _uniforms: { [key: string]: { type: string, value: any } };
	private _getTextureList: () => { label: string, value: string }[];
	private _applyUniform: ( material: MXP.Material, uniformName: string, glslType: string, value: any ) => void;
	private _registeredUniformFields: string[];

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
			uniforms?: { [key: string]: { type: string, value: any } };
		};
		getShader: ( name: string ) => ShaderResource | undefined;
		getShaderList: () => ShaderResource[];
		getTextureList: () => { label: string, value: string }[];
		applyUniform: ( material: MXP.Material, uniformName: string, glslType: string, value: any ) => void;
	} ) {

		super();
		this.name = name;
		this.material = material;
		this._getShader = options.getShader;
		this._getShaderList = options.getShaderList;
		this._getTextureList = options.getTextureList;
		this._applyUniform = options.applyUniform;

		this._vertResource = null;
		this._fragResource = null;
		this._onShaderUpdate = () => {

			this._syncShaderToMaterial();
			this._rebuildUniformFields();

		};

		this._registeredUniformFields = [];

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
		this._uniforms = data?.uniforms ? JSON.parse( JSON.stringify( data.uniforms ) ) : {};

		this._bindShaderResource( "vert", this._vert );
		this._bindShaderResource( "frag", this._frag );

		this.field( "vert", () => this._vert, ( v ) => {

			this._unbindShaderResource( "vert" );
			this._vert = v;
			this._bindShaderResource( "vert", v );
			this._syncShaderToMaterial();
			this._rebuildUniformFields();

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
			this._rebuildUniformFields();

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

		this.field( "uniforms", () => {

			const result: { [key: string]: { type: string, value: any } } = {};

			for ( const key of Object.keys( this._uniforms ) ) {

				const u = this._uniforms[ key ];
				const defaultVal = uniformDefaultValue( u.type );
				const isDefault = JSON.stringify( u.value ) === JSON.stringify( defaultVal );

				if ( ! isDefault ) {

					result[ key ] = u;

				}

			}

			return Object.keys( result ).length > 0 ? result : undefined;

		}, ( v ) => {

			this._uniforms = ( v as any ) || {};
			this._rebuildUniformFields();

		}, {
			hidden: true,
		} );

		this._rebuildUniformFields();

	}

	private _rebuildUniformFields() {

		for ( const fieldPath of this._registeredUniformFields ) {

			this.removeField( fieldPath );

		}

		this._registeredUniformFields = [];

		const allUniforms: ShaderUniformInfo[] = [];
		const seen = new Set<string>();

		const collectUniforms = ( resource: ShaderResource | null ) => {

			if ( ! resource ) return;

			for ( const u of resource.uniforms ) {

				if ( ! seen.has( u.name ) ) {

					seen.add( u.name );
					allUniforms.push( u );

				}

			}

		};

		collectUniforms( this._vertResource );
		collectUniforms( this._fragResource );

		if ( allUniforms.length > 0 ) {

			const folderPath = "uniforms/";
			this.field( folderPath, () => null, undefined, { isFolder: true } );
			this._registeredUniformFields.push( folderPath );

			for ( const uniformInfo of allUniforms ) {

				const { name: uniformName, type: glslType } = uniformInfo;
				const fieldPath = `uniforms/${uniformName}`;

				if ( ! this._uniforms[ uniformName ] ) {

					this._uniforms[ uniformName ] = {
						type: glslType,
						value: uniformDefaultValue( glslType ),
					};

				}

				const uniformData = this._uniforms[ uniformName ];

				if ( glslType === "sampler2D" ) {

					this.field( fieldPath, () => uniformData.value || "", ( v ) => {

						uniformData.value = v;
						this._applyUniform( this.material, uniformName, glslType, v );

					}, {
						format: {
							type: "select",
							list: () => [
								{ label: "(None)", value: "" },
								...this._getTextureList()
							]
						}
					} );

				} else if ( glslType === "vec2" || glslType === "vec3" || glslType === "vec4" ) {

					this.field( fieldPath, () => uniformData.value, ( v ) => {

						uniformData.value = v;
						this._applyUniform( this.material, uniformName, glslType, v );

					}, {
						format: { type: "vector" }
					} );

				} else if ( glslType === "int" ) {

					this.field( fieldPath, () => uniformData.value, ( v ) => {

						uniformData.value = v;
						this._applyUniform( this.material, uniformName, glslType, v );

					}, {
						step: 1
					} );

				} else {

					this.field( fieldPath, () => uniformData.value, ( v ) => {

						uniformData.value = v;
						this._applyUniform( this.material, uniformName, glslType, v );

					} );

				}

				this._registeredUniformFields.push( fieldPath );

				this._applyUniform( this.material, uniformName, glslType, uniformData.value );

			}

		}

		for ( const key of Object.keys( this._uniforms ) ) {

			if ( ! seen.has( key ) ) {

				delete this._uniforms[ key ];
				delete this.material.uniforms[ key ];

			}

		}

		this.emit( "fields/update", [ this._registeredUniformFields ] );

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
