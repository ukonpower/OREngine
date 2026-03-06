
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { TexProcedural } from '../TexProcedural';

export type ResouceComponentItem = {
	name: string,
	component: typeof MXP.Component;
};


export type ComponentGroup = {
	child: ( ComponentGroup | ResouceComponentItem )[]
	name: string,
	addComponent: ( name: string, component: typeof MXP.Component ) => void;
	createGroup: ( name: string ) => ComponentGroup
}

export type ResourceGeometryItem = {
	name: string;
	geometryClass: typeof MXP.Geometry;
};

export type GeometryGroup = {
	child: ( GeometryGroup | ResourceGeometryItem )[];
	name: string;
	addGeometry: ( name: string, geometryClass: typeof MXP.Geometry ) => void;
	createGroup: ( name: string ) => GeometryGroup;
};

export type ResourceShaderItem = {
	name: string;
	hasVert: boolean;
	hasFrag: boolean;
};

export type ResourceTextureData = {
	frag?: string;
	resolution?: number[];
	filter?: string;
	updateEveryFrame?: boolean;
};

export type ResourceTextureItem = {
	name: string;
} & ResourceTextureData;

export type ResourceMaterialData = {
	vert?: string;
	frag?: string;
	phase?: string[];
	useLight?: boolean;
	depthTest?: boolean;
	depthWrite?: boolean;
	cullFace?: boolean;
	blending?: string;
	drawType?: string;
	uniforms?: { [key: string]: string };
};

export type ResourceMaterialItem = {
	name: string;
} & ResourceMaterialData;

export class Resources extends GLP.EventEmitter {

	private _componentList: ( ResouceComponentItem )[];
	private _componentGroups: ComponentGroup[];

	private _geometryList: ResourceGeometryItem[];
	private _geometryGroups: GeometryGroup[];

	private _materialList: ResourceMaterialItem[];
	private _materialInstances: Map<string, MXP.Material>;
	private _globalUniforms: GLP.Uniforms[] | null;

	private _shaderList: ResourceShaderItem[];

	private _textureList: ResourceTextureItem[];
	private _textures: Map<string, GLP.GLPowerTexture>;
	private _updateEveryFrameTextures: TexProcedural[];

	constructor() {

		super();
		this._componentList = [];
		this._textures = new Map();
		this._componentGroups = [];
		this._geometryList = [];
		this._geometryGroups = [];
		this._materialList = [];
		this._materialInstances = new Map();
		this._globalUniforms = null;
		this._shaderList = [];
		this._textureList = [];
		this._updateEveryFrameTextures = [];

	}

	public get componentList() {

		return this._componentList;

	}

	public get componentGroups() {

		return this._componentGroups;

	}

	public get geometryList() {

		return this._geometryList;

	}

	public get geometryGroups() {

		return this._geometryGroups;

	}

	public get materialList() {

		return this._materialList;

	}

	public get materialInstances() {

		return this._materialInstances;

	}

	public get shaderList() {

		return this._shaderList;

	}

	public get textureList() {

		return this._textureList;

	}

	public get textures() {

		return this._textures;

	}

	public get updateEveryFrameTextures() {

		return this._updateEveryFrameTextures;

	}

	public clear() {

		this._componentList = [];
		this._componentGroups = [];
		this._geometryList = [];
		this._geometryGroups = [];
		this._materialList = [];
		this._materialInstances.clear();
		this._shaderList = [];
		this._textureList = [];
		this._textures.clear();
		this._updateEveryFrameTextures = [];
		this.emit( "update" );

	}

	/*-------------------------------
		Component
	-------------------------------*/

	public getComponent( name: string ) {

		return this._componentList.find( c => {

			return c.name == name;

		} );

	}

	public addComponentGroup( groupName: string ) {

		let group = this._componentGroups.find( g => g.name == groupName );

		if ( group ) return group;

		const createGroup = ( groupName: string ): ComponentGroup => {

			const child: ( ComponentGroup | ResouceComponentItem )[] = [];

			return {
				child,
				name: groupName,
				addComponent: ( name: string, component: typeof MXP.Component ) => {

					const item = { name, component };

					child.push( item );
					this._componentList.push( item );

				},
				createGroup: ( name: string ) => {

					const group = createGroup( name );

					child.push( group );

					return group;

				}
			};

		};

		group = createGroup( groupName );

		this._componentGroups.push( group );

		this.emit( "update" );

		return group;

	}

	/*-------------------------------
		Geometry
	-------------------------------*/

	public getGeometry( name: string ) {

		return this._geometryList.find( g => g.name === name );

	}

	public addGeometryGroup( groupName: string ) {

		let group = this._geometryGroups.find( g => g.name === groupName );
		if ( group ) return group;

		const createGroup = ( groupName: string ): GeometryGroup => {

			const child: ( GeometryGroup | ResourceGeometryItem )[] = [];

			return {
				child,
				name: groupName,
				addGeometry: ( name: string, geometryClass: typeof MXP.Geometry ) => {

					const item = { name, geometryClass };
					child.push( item );
					this._geometryList.push( item );

				},
				createGroup: ( name: string ) => {

					const group = createGroup( name );
					child.push( group );
					return group;

				}
			};

		};

		group = createGroup( groupName );
		this._geometryGroups.push( group );
		this.emit( "update" );
		return group;

	}

	/*-------------------------------
		Material
	-------------------------------*/

	public getMaterial( name: string ) {

		return this._materialList.find( m => m.name === name );

	}

	public addMaterial( name: string, data: ResourceMaterialData ) {

		const item: ResourceMaterialItem = { name, ...data };
		this._materialList.push( item );

		const material = new MXP.Material( {
			vert: data.vert,
			frag: data.frag,
			phase: data.phase as MXP.MaterialRenderType[],
			useLight: data.useLight,
			depthTest: data.depthTest,
			depthWrite: data.depthWrite,
			cullFace: data.cullFace,
			blending: data.blending as MXP.Blending,
			drawType: data.drawType as MXP.DrawType,
		} );

		material.name = name;

		if ( this._globalUniforms ) {

			MXP.UniformsUtils.assign( material.uniforms, ...this._globalUniforms );

		}

		this._applyTextureUniforms( material, data.uniforms );

		this._materialInstances.set( name, material );
		this.emit( "update" );

	}

	public getMaterialInstance( name: string ): MXP.Material | undefined {

		return this._materialInstances.get( name );

	}

	public updateMaterialInstance( name: string, data: ResourceMaterialData ) {

		const material = this._materialInstances.get( name );

		if ( ! material ) return;

		if ( data.vert !== undefined ) material.vert = data.vert;
		if ( data.frag !== undefined ) material.frag = data.frag;
		if ( data.phase !== undefined ) material.setVisibility( data.phase as MXP.MaterialRenderType[] );
		if ( data.useLight !== undefined ) material.useLight = data.useLight;
		if ( data.depthTest !== undefined ) material.depthTest = data.depthTest;
		if ( data.depthWrite !== undefined ) material.depthWrite = data.depthWrite;
		if ( data.cullFace !== undefined ) material.cullFace = data.cullFace;
		if ( data.blending !== undefined ) material.blending = data.blending as MXP.Blending;
		if ( data.drawType !== undefined ) material.drawType = data.drawType as MXP.DrawType;
		if ( data.uniforms !== undefined ) this._applyTextureUniforms( material, data.uniforms );

		material.requestUpdate();
		this.emit( "update/material" );

	}

	public setGlobalUniforms( ...uniforms: GLP.Uniforms[] ) {

		this._globalUniforms = uniforms;

		this._materialInstances.forEach( ( mat ) => {

			MXP.UniformsUtils.assign( mat.uniforms, ...uniforms );

		} );

	}

	private _applyTextureUniforms( material: MXP.Material, textureUniforms?: { [key: string]: string } ) {

		if ( ! textureUniforms ) return;

		const keys = Object.keys( textureUniforms );

		for ( let i = 0; i < keys.length; i ++ ) {

			const uniformName = keys[ i ];
			const textureName = textureUniforms[ uniformName ];
			const texture = this._textures.get( textureName );

			if ( texture ) {

				material.uniforms[ uniformName ] = {
					value: texture,
					type: "1i"
				};

			}

		}

	}

	/*-------------------------------
		Shader
	-------------------------------*/

	public getShader( name: string ) {

		return this._shaderList.find( s => s.name === name );

	}

	public addShader( name: string, hasVert: boolean, hasFrag: boolean ) {

		const item: ResourceShaderItem = { name, hasVert, hasFrag };
		this._shaderList.push( item );
		this.emit( "update" );

	}

	/*-------------------------------
		Texture
	-------------------------------*/

	public addTextureResource( name: string, data: ResourceTextureData ) {

		const item: ResourceTextureItem = { name, ...data };
		this._textureList.push( item );
		this.emit( "update" );

	}

	public getTextureResource( name: string ) {

		return this._textureList.find( t => t.name === name );

	}

	public updateTextureResource( name: string, data: ResourceTextureData ) {

		const idx = this._textureList.findIndex( t => t.name === name );

		if ( idx >= 0 ) {

			this._textureList[ idx ] = { ...this._textureList[ idx ], ...data };

		}

		this.emit( "update/texture" );

	}

	public removeTextureResource( name: string ) {

		this._textureList = this._textureList.filter( t => t.name !== name );

		const tex = this._textures.get( name );

		if ( tex ) {

			tex.dispose();
			this._textures.delete( name );

		}

		this.emit( "update" );

	}

	public addTexture<T extends GLP.GLPowerTexture>( name: string, texture: T ) {

		this._textures.set( name, texture );

		return texture;

	}

	public getTexture( name: string ) {

		return this._textures.get( name );

	}

	private _buildTexture( item: ResourceTextureItem, renderer: MXP.Renderer, gl: WebGL2RenderingContext ): TexProcedural | null {

		if ( ! item.frag ) return null;

		const tex = new TexProcedural( renderer, {
			frag: item.frag,
			resolution: new GLP.Vector(
				item.resolution?.[ 0 ] || 1024,
				item.resolution?.[ 1 ] || 1024
			),
		} );

		if ( item.filter === "nearest" ) {

			tex.setting( {
				magFilter: gl.NEAREST,
				minFilter: gl.NEAREST,
			} );

			tex.render();

		}

		return tex;

	}

	public buildTextureInstances( renderer: MXP.Renderer, gl: WebGL2RenderingContext, engineUniforms?: GLP.Uniforms ) {

		this._updateEveryFrameTextures = [];

		this._textureList.forEach( ( item ) => {

			if ( this._textures.has( item.name ) ) return;

			const tex = this._buildTexture( item, renderer, gl );

			if ( ! tex ) return;

			if ( item.updateEveryFrame && engineUniforms ) {

				MXP.UniformsUtils.assign( tex.material.uniforms, engineUniforms );

			}

			this._textures.set( item.name, tex );

			if ( item.updateEveryFrame ) {

				this._updateEveryFrameTextures.push( tex );

			}

		} );

		this.emit( "update" );

	}

	public rebuildTexture( name: string, renderer: MXP.Renderer, gl: WebGL2RenderingContext ) {

		const item = this._textureList.find( t => t.name === name );
		if ( ! item ) return;

		const existing = this._textures.get( name );

		if ( existing ) {

			existing.dispose();
			this._updateEveryFrameTextures = this._updateEveryFrameTextures.filter( t => t !== existing );
			this._textures.delete( name );

		}

		const tex = this._buildTexture( item, renderer, gl );

		if ( ! tex ) return;

		this._textures.set( name, tex );

		if ( item.updateEveryFrame ) {

			this._updateEveryFrameTextures.push( tex );

		}

		this.emit( "update/texture" );

	}

}
