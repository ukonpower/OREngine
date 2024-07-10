
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Font } from './Fonts';

type ComponentArgs = {[key: string]: any}

export type ResouceComponentItem = {
	component: typeof MXP.Component;
	defaultArgs?: ComponentArgs
};

export class OREngineResource extends GLP.EventEmitter {

	public componentList: ( ResouceComponentItem )[];
	public comListCats: Map<string, ( ResouceComponentItem )[]>;
	public textures: Map<string, GLP.GLPowerTexture>;
	public fonts: Font[];

	constructor() {

		super();
		this.componentList = [];
		this.comListCats = new Map();
		this.textures = new Map();
		this.fonts = [];

	}

	public clear() {

		this.componentList = [];
		this.fonts = [];
		this.comListCats.clear();
		this.textures.clear();

	}

	/*-------------------------------
		Component
	-------------------------------*/

	public getComponent( name: string ) {

		return this.componentList.find( c =>{

			return c.component.name == name;

		} );

	}

	public componentCategory( catName: string ) {

		const catCompList = this.comListCats.get( catName ) || [];

		this.comListCats.set( catName, catCompList );

		return {
			register: ( component: typeof MXP.Component, defaultArgs?: ComponentArgs ) => {

				const compItem = {
					component,
					defaultArgs
				};

				this.componentList.push( compItem );

				catCompList.push( compItem );

			}
		};

	}

	/*-------------------------------
		Texture
	-------------------------------*/

	public addTexture( key: string, texture: GLP.GLPowerTexture ) {

		this.textures.set( key, texture );

	}

	public getTexture( key: string ) {

		return this.textures.get( key );

	}

	/*-------------------------------
		Fonts
	-------------------------------*/

	public addFont( font: Font ) {

		this.fonts.push( font );

	}

	public getFont( key: typeof Font | string ) {

		const k = typeof key == 'string' ? key : key.key;

		return this.fonts.find( f => f.key == k );

	}

}


