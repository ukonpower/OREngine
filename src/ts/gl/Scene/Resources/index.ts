
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

type ComponentArgs = {[key: string]: any}

export type ResouceComponentItem = {
	key: string;
	component: typeof MXP.Component;
	defaultArgs?: ComponentArgs
};

export class OREngineResource extends GLP.EventEmitter {

	public componentListCategrized: Map<string, ( ResouceComponentItem )[]> = new Map();
	public componentList: ( ResouceComponentItem )[] = [];

	constructor() {

		super();

	}

	public getComponent( name: string ) {

		return this.componentList.find( c =>{

			return c.component.name == name;

		} );

	}

	public clearComponents() {

		this.componentList.length = 0;

	}

	public componentCategory( catName: string ) {

		const catCompList = this.componentListCategrized.get( catName ) || [];

		this.componentListCategrized.set( catName, catCompList );

		return {
			register: ( key: string, component: typeof MXP.Component, defaultArgs?: ComponentArgs ) => {

				const compItem = {
					key,
					component,
					defaultArgs
				};

				this.componentList.push( compItem );

				catCompList.push( compItem );

			}
		};

	}

}


