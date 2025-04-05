
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

export class Resources extends GLP.EventEmitter {

	public componentList: ( ResouceComponentItem )[];
	public componentGroups: ComponentGroup[];

	public textures: Map<string, GLP.GLPowerTexture>;

	constructor() {

		super();
		this.componentList = [];
		this.textures = new Map();
		this.componentGroups = [];

	}

	public clear() {

		this.componentList = [];
		this.componentGroups = [];
		this.textures.clear();

	}

	/*-------------------------------
		Component
	-------------------------------*/

	public getComponent( name: string ) {

		return this.componentList.find( c =>{

			return c.name == name;

		} );

	}

	public addComponentGroup( groupName: string ) {

		let group = this.componentGroups.find( g => g.name == groupName );

		if ( group ) return group;

		const createGroup = ( groupName: string ): ComponentGroup => {

			const child: ( ComponentGroup | ResouceComponentItem )[] = [];

			return {
				child,
				name: groupName,
				addComponent: ( name: string, component: typeof MXP.Component ) => {


					const item = { name, component };

					child.push( item );
					this.componentList.push( item );

				},
				createGroup: ( name: string ) => {

					const group = createGroup( name );

					child.push( group );

					return group;

				}
			};


		};

		group = createGroup( groupName );

		this.componentGroups.push( group );

		return group;

	}

	/*-------------------------------
		Texture
	-------------------------------*/

	public addTexture<T extends GLP.GLPowerTexture>( name: string, texture: T ) {

		this.textures.set( name, texture );

		return texture;

	}

	public getTexture( name: string ) {

		return this.textures.get( name );

	}


}


