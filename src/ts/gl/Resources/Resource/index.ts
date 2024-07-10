import * as GLP from 'glpower';

export class Resource extends GLP.EventEmitter {

	public keyOverride: string | null = null;

	constructor() {

		super();

	}

	public static get key() {

		return "";

	}

	public get key() {

		if ( this.keyOverride ) return this.keyOverride;

		return ( this.constructor as typeof Resource ).key;

	}

}
