// @ts-nocheck
import { CameraController } from '../Components/Camera/CameraController/index.ts';
import { CameraOrbitAnim } from '../Components/Camera/CameraOrbitAnim/index.ts';
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
import { EyeRings } from '../Components/Samples/Effects/EyeRings/index.ts';
import { FlashLine } from '../Components/Samples/Effects/FlashLine/index.ts';
import { NoiseFlare } from '../Components/Samples/Effects/NoiseFlare/index.ts';
import { VectorField } from '../Components/Samples/Effects/VectorField/index.ts';
import { GridCross } from '../Components/Samples/Geometry/GridCross/index.ts';
import { GridDots } from '../Components/Samples/Geometry/GridDots/index.ts';
import { WireCube } from '../Components/Samples/Geometry/WireCube/index.ts';
import { LPD8 } from '../Components/Samples/MIDI/LPD8/index.ts';
import { MIDIMIX } from '../Components/Samples/MIDI/MIDIMIX/index.ts';
import { Dust } from '../Components/Samples/Particles/Dust/index.ts';
import { YakiSoba } from '../Components/Samples/Particles/YakiSoba/index.ts';
import { SPZModel } from '../Components/Samples/SPZModel/index.ts';
import { Text } from '../Components/Samples/Text/index.ts';
import { BLidgeClient } from '../Components/Utility/BLidgeClient/index.ts';
import { UniformControls } from '../Components/Utility/UniformsControls/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		CameraController,
		CameraOrbitAnim,
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
		Effects: {
			EyeRings,
			FlashLine,
			NoiseFlare,
			VectorField,
		},
		Geometry: {
			GridCross,
			GridDots,
			WireCube,
		},
		MIDI: {
			LPD8,
			MIDIMIX,
		},
		Particles: {
			Dust,
			YakiSoba,
		},
		SPZModel,
		Text,
	},
	Utility: {
		BLidgeClient,
		UniformControls,
	},
};
