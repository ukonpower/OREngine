
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { TexProcedural } from '../TexProcedural';

import { MaterialResource } from './MaterialResource';
import { ShaderResource } from './ShaderResource';

export { ShaderResource } from './ShaderResource';
export { MaterialResource } from './MaterialResource';

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

export type ResourceTextureData = {
	frag?: string;
	resolution?: number[];
	filter?: string;
	updateEveryFrame?: boolean;
};

export type ResourceTextureItem = {
	name: string;
} & ResourceTextureData;

export class Resources extends GLP.EventEmitter {

	private _componentList: ( ResouceComponentItem )[];
	private _componentGroups: ComponentGroup[];

	private _geometryList: ResourceGeometryItem[];
	private _geometryGroups: GeometryGroup[];

	private _materialResources: Map<string, MaterialResource>;
	private _materialInstances: Map<string, MXP.Material>;
	private _globalUniforms: GLP.Uniforms[] | null;

	private _shaders: Map<string, ShaderResource>;

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
		this._materialResources = new Map();
		this._materialInstances = new Map();
		this._globalUniforms = null;
		this._shaders = new Map();
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

	public get materialList(): MaterialResource[] {

		return Array.from( this._materialResources.values() );

	}

	public get materialInstances() {

		return this._materialInstances;

	}

	public get shaderList(): ShaderResource[] {

		return Array.from( this._shaders.values() );

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
		this._materialResources.clear();
		this._materialInstances.clear();
		this._shaders.clear();
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

	public getMaterial( name: string ): MaterialResource | undefined {

		return this._materialResources.get( name );

	}

	public addMaterial( name: string, data: {
		vert?: string; frag?: string;
		phase?: string[]; drawType?: string;
		blending?: string; useLight?: boolean;
		depthTest?: boolean; depthWrite?: boolean;
		cullFace?: boolean; uniforms?: { [key: string]: string };
	} ) {

		let vertSource: string | undefined;
		let fragSource: string | undefined;

		if ( data.vert ) {

			const sr = this._shaders.get( data.vert );
			if ( sr ) vertSource = sr.source;

		}

		if ( data.frag ) {

			const sr = this._shaders.get( data.frag );
			if ( sr ) fragSource = sr.source;

		}

		const material = new MXP.Material( {
			vert: vertSource,
			frag: fragSource,
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

		const resource = new MaterialResource( name, material, {
			data,
			getShader: ( n ) => this._shaders.get( n ),
			getShaderList: () => this.shaderList,
		} );

		this._materialResources.set( name, resource );

		this.emit( "update" );

	}

	public getMaterialInstance( name: string ): MXP.Material | undefined {

		return this._materialInstances.get( name );

	}

	public removeMaterial( name: string ) {

		this._materialResources.delete( name );
		this._materialInstances.delete( name );
		this.emit( "update" );

	}

	public exportMaterialConfigs(): { name: string, config: any }[] {

		const result: { name: string, config: any }[] = [];

		this._materialResources.forEach( ( mr, name ) => {

			result.push( { name, config: mr.serialize( { mode: "export" } ) } );

		} );

		return result;

	}

	public exportTextureConfigs(): { name: string, config: ResourceTextureData }[] {

		return this._textureList.map( t => {

			const { name, ...config } = t;
			return { name, config };

		} );

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

	public getShader( name: string ): ShaderResource | undefined {

		return this._shaders.get( name );

	}

	public addShader( name: string, source: string ) {

		const shader = new ShaderResource( name, source );
		this._shaders.set( name, shader );
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
