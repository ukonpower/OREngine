// @ts-nocheck
import { CameraController } from '../Components/Camera/CameraController/index.ts';
import { ShakeViewer } from '../Components/Camera/CameraShake/index.ts';
import { LookAt } from '../Components/Camera/LookAt/index.ts';
import { OrbitControls } from '../Components/Camera/OrbitControls/index.ts';
import { DemoMusic } from '../Components/DemoProject/DemoMusic/index.ts';
import { SkyBox } from '../Components/DemoProject/SkyBox/index.ts';
import { ObjectRotate } from '../Components/Object/ObjectRotate/index.ts';
import { AudioTexture } from '../Components/Samples/Audio/AudioTexture/index.ts';
import { CameraFixed } from '../Components/Samples/CameraControls/CameraFixed/index.ts';
import { CameraFixedDrive } from '../Components/Samples/CameraControls/CameraFixedDrive/index.ts';
import { CameraFixedRoad } from '../Components/Samples/CameraControls/CameraFixedRoad/index.ts';
import { CameraFloating } from '../Components/Samples/CameraControls/CameraFloating/index.ts';
import { CameraRotateDrill } from '../Components/Samples/CameraControls/CameraRotateDrill/index.ts';
import { CameraRotateXY } from '../Components/Samples/CameraControls/CameraRotateXY/index.ts';
import { CameraRotateY } from '../Components/Samples/CameraControls/CameraRotateY/index.ts';
import { VJCamera } from '../Components/Samples/CameraControls/VJCamera/index.ts';
import { LPD8 } from '../Components/Samples/MIDI/LPD8/index.ts';
import { MIDIMIX } from '../Components/Samples/MIDI/MIDIMIX/index.ts';
import { Raymarch } from '../Components/Samples/Materials/Raymarch/index.ts';
import { SPZModel } from '../Components/Samples/SPZModel/index.ts';
import { Text } from '../Components/Samples/Text/index.ts';
import { BLidgeClient } from '../Components/Utility/BLidgeClient/index.ts';
import { UniformControls } from '../Components/Utility/UniformsControls/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		CameraController,
		ShakeViewer,
		LookAt,
		OrbitControls,
	},
	DemoProject: {
		DemoMusic,
		SkyBox,
	},
	Object: {
		ObjectRotate,
	},
	Samples: {
		Audio: {
			AudioTexture,
		},
		CameraControls: {
			CameraFixed,
			CameraFixedDrive,
			CameraFixedRoad,
			CameraFloating,
			CameraRotateDrill,
			CameraRotateXY,
			CameraRotateY,
			VJCamera,
		},
		MIDI: {
			LPD8,
			MIDIMIX,
		},
		Materials: {
			Raymarch,
		},
		SPZModel,
		Text,
	},
	Utility: {
		BLidgeClient,
		UniformControls,
	},
};
