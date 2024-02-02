
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { LookAt } from '../../Scene/Components/LookAt';
import { ShakeViewer } from '../../Scene/Components/ShakeViewer';

type ComponentArgs = {[key: string]: any}

type ComponentItem = {
	name: string;
	component: typeof MXP.Component;
	defaultArgs?: ComponentArgs
};

export class EditorResources extends GLP.EventEmitter {

	public componentList: ( ComponentItem )[] = [];

	constructor() {

		super();

		this.componentList.push( { name: "camera", component: MXP.Camera, defaultArgs: {
			cameraType: "perspective",
		} } );

		this.componentList.push( { name: "light", component: MXP.Light, args: {
			lightType: "directional",
		} } );

		this.componentList.push( { name: "geometry", component: MXP.SphereGeometry, defaultArgs: {
			radius: 0.5,
			widthSegments: 20,
			heightSegments: 10,
		} } );

		this.componentList.push( { name: "geometry", component: MXP.CubeGeometry, defaultArgs: {
			width: 1,
			height: 1,
			depth: 1,
		} } );

		this.componentList.push( { name: "geometry", component: MXP.CylinderGeometry, defaultArgs: {
			radiusTop: 0.5,
			radiusBottom: 0.5,
			height: 1,
			radSegments: 10,
			heightSegments: 1
		} } );

		this.componentList.push( { name: "material", component: MXP.Material, defaultArgs: {} } );

		this.componentList.push( { name: "lookAt", component: LookAt } );

		this.componentList.push( { name: "shakeViewer", component: ShakeViewer } );

	}

}
