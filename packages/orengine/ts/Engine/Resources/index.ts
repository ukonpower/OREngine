
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

        private _componentList: ( ResouceComponentItem )[];
        private _componentGroups: ComponentGroup[];

        private _textures: Map<string, GLP.GLPowerTexture>;

        constructor() {

		super();
                this._componentList = [];
                this._textures = new Map();
                this._componentGroups = [];

        }

        public get componentList() {
                return this._componentList;
        }

        public get componentGroups() {
                return this._componentGroups;
        }

        public get textures() {
                return this._textures;
        }

	public clear() {

                this._componentList = [];
                this._componentGroups = [];
                this._textures.clear();

	}

	/*-------------------------------
		Component
	-------------------------------*/

	public getComponent( name: string ) {

                return this._componentList.find( c =>{

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

		return group;

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


