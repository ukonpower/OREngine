import { AudioTexture } from '../Components/Audio/AudioTexture/index.ts';
import { MainCamera } from '../Components/Camera/MainCamera/index.ts';
import { Bloom } from '../Components/Camera/MainCamera/PostProcess/Bloom/index.ts';
import { Blur } from '../Components/Camera/MainCamera/PostProcess/Blur/index.ts';
import { ColorGrading } from '../Components/Camera/MainCamera/PostProcess/ColorGrading/index.ts';
import { Finalize } from '../Components/Camera/MainCamera/PostProcess/Finalize/index.ts';
import { FXAA } from '../Components/Camera/MainCamera/PostProcess/FXAA/index.ts';
import { Glitch } from '../Components/Camera/MainCamera/PostProcess/Glitch/index.ts';
import { OverlayMixer } from '../Components/Camera/MainCamera/PostProcess/OverlayMixer/index.ts';
import { PixelSort } from '../Components/Camera/MainCamera/PostProcess/PixelSort/index.ts';
import { CameraFixed } from '../Components/CameraControls/CameraFixed/index.ts';
import { CameraFixedDrive } from '../Components/CameraControls/CameraFixedDrive/index.ts';
import { CameraFixedRoad } from '../Components/CameraControls/CameraFixedRoad/index.ts';
import { CameraFloating } from '../Components/CameraControls/CameraFloating/index.ts';
import { CameraRotateDrill } from '../Components/CameraControls/CameraRotateDrill/index.ts';
import { CameraRotateXY } from '../Components/CameraControls/CameraRotateXY/index.ts';
import { CameraRotateY } from '../Components/CameraControls/CameraRotateY/index.ts';
import { ShakeViewer } from '../Components/CameraControls/CameraShake/index.ts';
import { OrbitControls } from '../Components/CameraControls/OrbitControls/index.ts';
import { VJCamera } from '../Components/CameraControls/VJCamera/index.ts';
import { DemoMusic } from '../Components/DemoProject/DemoMusic/index.ts';
import { OREngineCubeMaterial } from '../Components/DemoProject/OREngineCubeMaterial/index.ts';
import { OREngineLogoMaterial } from '../Components/DemoProject/OREngineLogoMaterial/index.ts';
import { SkyBox } from '../Components/DemoProject/SkyBox/index.ts';
import { LPD8 } from '../Components/MIDI/LPD8/index.ts';
import { MIDIMIX } from '../Components/MIDI/MIDIMIX/index.ts';
import { LookAt } from '../Components/ObjectControls/LookAt/index.ts';
import { ObjectRotate } from '../Components/ObjectControls/ObjectRotate/index.ts';
import { Raymarch } from '../Components/Samples/Raymarch/index.ts';
import { BLidgeClient } from '../Components/Utilities/BLidgeClient/index.ts';
import { Text } from '../Components/Utilities/Text/index.ts';
import { TextureGenerator } from '../Components/Utilities/TextureGenerator/index.ts';
import { UniformControls } from '../Components/Utilities/UniformsControls/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Audio: {
		AudioTexture,
	},
	Camera: {
		MainCamera,
	},
	CameraControls: {
		CameraFixed,
		CameraFixedDrive,
		CameraFixedRoad,
		CameraFloating,
		CameraRotateDrill,
		CameraRotateXY,
		CameraRotateY,
		ShakeViewer,
		OrbitControls,
		VJCamera,
	},
	DemoProject: {
		DemoMusic,
		OREngineCubeMaterial,
		OREngineLogoMaterial,
		SkyBox,
	},
	MIDI: {
		LPD8,
		MIDIMIX,
	},
	ObjectControls: {
		LookAt,
		ObjectRotate,
	},
	Samples: {
		Raymarch,
	},
	Utilities: {
		BLidgeClient,
		Text,
		TextureGenerator,
		UniformControls,
	},
};
