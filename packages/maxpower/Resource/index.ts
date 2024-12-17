import { Serializable } from '../Serializable';

export class Resource extends Serializable {

	public resourceIdOverride: string | null = null;

	constructor() {

		super();

	}

	// public static get resourceId() {

	// 	return this.name;

	// }

	// public get resourceId() {

	// 	if ( this.resourceIdOverride ) return this.resourceIdOverride;

	// 	return ( this.constructor as typeof Resource ).resourceId;

	// }

}
