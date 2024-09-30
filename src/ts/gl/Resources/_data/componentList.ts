import { MainCamera } from '../Components/Camera/MainCamera/index.ts';
import { OREngineCube } from '../Components/DemoProject/OREngineCube/index.ts';
import { OREngineLogo } from '../Components/DemoProject/OREngineLogo/index.ts';
import { SkyBox } from '../Components/DemoProject/SkyBox/index.ts';
import { DashCube } from '../Components/Entities/Effects/DashCube/index.ts';
import { FlashLine } from '../Components/Entities/Effects/FlashLine/index.ts';
import { GridCross } from '../Components/Entities/Effects/GridCross/index.ts';
import { FluidCrystal } from '../Components/Entities/FluidCrystal/index.ts';
import { MatchMove } from '../Components/Entities/MatchMove/index.ts';
import { TextEffect } from '../Components/Entities/TextEffect/index.ts';
import { TestComponent } from '../Components/Test/TestComponent/index.ts';
import { BLidgeClient } from '../Components/Utilities/BLidgeClient/index.ts';
import { Text } from '../Components/Utilities/Text/index.ts';
import { TurnTable } from '../Components/Utilities/TurnTable/index.ts';
import { LookAt } from '../Components/View/LookAt/index.ts';
import { OrbitControls } from '../Components/View/OrbitControls/index.ts';
import { RotateViewer } from '../Components/View/RotateViewer/index.ts';
import { ShakeViewer } from '../Components/View/ShakeViewer/index.ts';
import { VJCamera } from '../Components/View/VJCamera/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		MainCamera,
	},
	DemoProject: {
		OREngineCube,
		OREngineLogo,
		SkyBox,
	},
	Entities: {
		Effects: {
			DashCube,
			FlashLine,
			GridCross,
		},
		FluidCrystal,
		MatchMove,
		TextEffect,
	},
	Test: {
		TestComponent,
	},
	Utilities: {
		BLidgeClient,
		Text,
		TurnTable,
	},
	View: {
		LookAt,
		OrbitControls,
		RotateViewer,
		ShakeViewer,
		VJCamera,
	},
};
