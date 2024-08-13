
import * as MXP from 'maxpower';

import { gl, renderer, resource } from '../GLGlobals';
import { TexProcedural } from '../ProjectScene/utils/TexProcedural';

import { BLidgeClient } from "./Components/BLidgeClient";
import { DashCube } from './Components/Effects/DashCube';
import { FlashLine } from './Components/Effects/FlashLine';
import { GridCross } from './Components/Effects/GridCross';
import { FluidCrystal } from './Components/FluidCrystal';
import { LookAt } from "./Components/LookAt";
import { MatchMove } from './Components/MatchMove';
import { Music } from './Components/Music';
import { OrbitControls } from './Components/OrbitControls';
import { ShakeViewer } from "./Components/ShakeViewer";
import { SkyBox } from "./Components/SkyBox";
import { TemplateComponent } from './Components/TemplateComponent';
import { TextEffect } from './Components/TextEffect';
import { TurnTable } from './Components/TurnTable';
import { VJCamera } from './Components/VJCamera';
import { Font1 } from './Fonts/Font1';
import { OREngineCube } from './Materials/OREngineCube';
import { OREngineLogo } from './Materials/OREngineLogo';
import noiseFrag from './Textures/noise.fs';

export const initResouces = () => {

	/*-------------------------------
		Components
	-------------------------------*/

	resource.clear();

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

	comEntity.register( FlashLine );

	comEntity.register( MatchMove );

	comEntity.register( GridCross );

	comEntity.register( DashCube );

	comEntity.register( TextEffect );

	// Other

	const comOther = resource.componentCategory( "Other" );

	comOther.register( BLidgeClient );
	comOther.register( Music );
	comOther.register( MXP.Light );

	/*-------------------------------
		Textures
	-------------------------------*/

	resource.addTexture( "noise", new TexProcedural( renderer, {
		frag: noiseFrag,
	} ) );

	/*-------------------------------
		Fonts
	-------------------------------*/

	resource.addFont( new Font1( gl ) );

};
