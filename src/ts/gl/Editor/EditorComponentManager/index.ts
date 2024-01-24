
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { LookAt } from '../../Scene/Components/LookAt';
import { ShakeViewer } from '../../Scene/Components/ShakeViewer';

type ComponentItem = {
	name: string;
	component: typeof MXP.Component;
};

export class EditorComponentManager extends GLP.EventEmitter {

	public componentList: ( ComponentItem )[] = [];

	constructor() {

		super();

		this.componentList.push( { name: "camera", component: MXP.Camera } );
		this.componentList.push( { name: "light", component: MXP.Light } );
		this.componentList.push( { name: "geometry", component: MXP.SphereGeometry } );
		this.componentList.push( { name: "geometry", component: MXP.CubeGeometry } );
		this.componentList.push( { name: "geometry", component: MXP.CylinderGeometry } );
		this.componentList.push( { name: "material", component: MXP.Material } );
		this.componentList.push( { name: "lookAt", component: LookAt } );
		this.componentList.push( { name: "shakeViewer", component: ShakeViewer } );

	}

}
