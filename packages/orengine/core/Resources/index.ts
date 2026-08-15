
import * as BSP from 'basepower';
import { EventEmitter } from 'basepower';
import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { TextureResource } from './TextureResource';

export { TextureResource } from './TextureResource';
export { buildClassTree } from './classTree';

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

export class Resources extends EventEmitter {

	private _componentList: ( ResouceComponentItem )[];
	private _componentGroups: ComponentGroup[];

	private _geometryList: ResourceGeometryItem[];
	private _geometryGroups: GeometryGroup[];

	private _textureResources: Map<string, TextureResource>;
	private _textures: Map<string, MXP.TextureContract>;
	private _updateEveryFrameTextures: MXP.TexProceduralContract[];

	constructor() {

		super();
		this._componentList = [];
		this._textures = new Map();
		this._componentGroups = [];
		this._geometryList = [];
		this._geometryGroups = [];
		this._textureResources = new Map();
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

	public get textureList(): TextureResource[] {

		return Array.from( this._textureResources.values() );

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
		this._textureResources.clear();
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
		Texture
	-------------------------------*/

	public addTextureResource( name: string, data: {
		frag?: string;
		resolution?: number[];
		filter?: string;
		updateEveryFrame?: boolean;
		textures?: { [key: string]: string };
	} ) {

		const resource = new TextureResource( name, { data } );

		this._textureResources.set( name, resource );
		this.emit( "update" );

	}

	public getTextureResource( name: string ): TextureResource | undefined {

		return this._textureResources.get( name );

	}

	public removeTextureResource( name: string ) {

		this._textureResources.delete( name );

		const tex = this._textures.get( name );

		if ( tex ) {

			tex.dispose();
			this._textures.delete( name );

		}

		this.emit( "update" );

	}

	public addTexture<T extends MXP.TextureContract>( name: string, texture: T ) {

		this._textures.set( name, texture );

		return texture;

	}

	public getTexture( name: string ) {

		return this._textures.get( name );

	}

	private _buildTexture( resource: TextureResource, renderer: MXP.RendererContract, textures: { [ key: string ]: MXP.TextureContract }, engineUniforms?: BSP.Uniforms ): MXP.TexProceduralContract | null {

		const fragSource = resource.frag;
		if ( ! fragSource ) return null;

		return renderer.createTexProcedural( {
			name: resource.name,
			frag: fragSource,
			resolution: new MTP.Vector(
				resource.resolution[ 0 ] || 1024,
				resource.resolution[ 1 ] || 1024
			),
			filter: resource.filter,
			textures,
			uniforms: resource.updateEveryFrame ? engineUniforms : undefined,
		} );

	}

	// 依存テクスチャ（resource.textures）を先にビルドしてから自身をビルドする
	private _ensureTexture( resource: TextureResource, renderer: MXP.RendererContract, engineUniforms: BSP.Uniforms | undefined, building: Set<string> ): MXP.TextureContract | null {

		const built = this._textures.get( resource.name );

		if ( built ) return built;

		// 循環参照はビルドせずスキップする
		if ( building.has( resource.name ) ) return null;

		building.add( resource.name );

		const textures: { [ key: string ]: MXP.TextureContract } = {};
		const texNames = resource.textures;
		const keys = Object.keys( texNames );

		for ( let i = 0; i < keys.length; i ++ ) {

			const uniformName = keys[ i ];
			const depName = texNames[ uniformName ];
			const depResource = this._textureResources.get( depName );

			const dep = depResource
				? this._ensureTexture( depResource, renderer, engineUniforms, building )
				: this._textures.get( depName );

			if ( dep ) {

				textures[ uniformName ] = dep;

			}

		}

		const tex = this._buildTexture( resource, renderer, textures, engineUniforms );

		if ( ! tex ) return null;

		this._textures.set( resource.name, tex );

		if ( resource.updateEveryFrame ) {

			this._updateEveryFrameTextures.push( tex );

		}

		return tex;

	}

	public buildTextureInstances( renderer: MXP.RendererContract, engineUniforms?: BSP.Uniforms ) {

		this._updateEveryFrameTextures = [];

		const building = new Set<string>();

		this._textureResources.forEach( ( resource ) => {

			this._ensureTexture( resource, renderer, engineUniforms, building );

		} );

		this.emit( "update" );

	}

}
