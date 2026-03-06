
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

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

	private _shaderList: ResourceShaderItem[];

	private _textures: Map<string, GLP.GLPowerTexture>;

	constructor() {

		super();
		this._componentList = [];
		this._textures = new Map();
		this._componentGroups = [];
		this._geometryList = [];
		this._geometryGroups = [];
		this._materialList = [];
		this._shaderList = [];

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

	public get shaderList() {

		return this._shaderList;

	}

	public get textures() {

		return this._textures;

	}

	public clear() {

		this._componentList = [];
		this._componentGroups = [];
		this._geometryList = [];
		this._geometryGroups = [];
		this._materialList = [];
		this._shaderList = [];
		this._textures.clear();
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
		this.emit( "update" );

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

	public addTexture<T extends GLP.GLPowerTexture>( name: string, texture: T ) {

		this._textures.set( name, texture );

		return texture;

	}

	public getTexture( name: string ) {

		return this._textures.get( name );

	}


}
