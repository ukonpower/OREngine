import * as MXP from 'maxpower';


import { resource } from '../GLGlobals';

import { BLidgeClient } from "./Components/BLidgeClient";
import { FluidCrystal } from './Components/FluidCrystal';
import { LookAt } from "./Components/LookAt";
import { Music } from './Components/Music';
import { OrbitControls } from './Components/OrbitControls';
import { ShakeViewer } from "./Components/ShakeViewer";
import { SkyBox } from "./Components/SkyBox";
import { TemplateComponent } from './Components/TemplateComponent';
import { TurnTable } from './Components/TurnTable';
import { VJCamera } from './Components/VJCamera';
import { OREngineCube } from './Materials/OREngineCube';
import { OREngineLogo } from './Materials/OREngineLogo';


export const initResouces = () => {

	/*-------------------------------
		Components
	-------------------------------*/

	resource.clearComponents();

	// object

	const comObject = resource.componentCategory( "Object" );

	comObject.register( MXP.Camera, {
		cameraType: "perspective",
	} );

	comObject.register( MXP.Light, {
		lightType: "directional",
	} );

	// geometry

	const comGeometry = resource.componentCategory( "Geometry" );

	comGeometry.register( MXP.SphereGeometry, {
		radius: 0.5,
		widthSegments: 20,
		heightSegments: 10,
	} );

	comGeometry.register( MXP.CubeGeometry, {
		width: 1,
		height: 1,
		depth: 1,
	} );

	comGeometry.register( MXP.CylinderGeometry, {
		radiusTop: 0.5,
		radiusBottom: 0.5,
		height: 1,
		radSegments: 10,
		heightSegments: 1
	} );

	// material

	const comMaterial = resource.componentCategory( "Material" );

	comMaterial.register( MXP.Material );
	comMaterial.register( OREngineLogo );
	comMaterial.register( OREngineCube );

	// controls

	const comView = resource.componentCategory( "Controls" );

	comView.register( LookAt );

	comView.register( ShakeViewer, {
		power: 1.0,
		speed: 1.0
	} );

	comView.register( OrbitControls );

	comView.register( VJCamera );

	comView.register( TurnTable );

	// entity

	const comEntity = resource.componentCategory( "Entity" );

	comEntity.register( SkyBox );

	comEntity.register( FluidCrystal );

	comEntity.register( TemplateComponent );


	// Other

	const comOther = resource.componentCategory( "Other" );

	comOther.register( BLidgeClient );
	comOther.register( Music );


};
