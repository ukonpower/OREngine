import { Bloom } from '../Components/Camera/MainCamera/PostProcess/Bloom/index.ts';
import { MainCamera } from '../Components/Camera/MainCamera/index.ts';
import { RotateViewer } from '../Components/CameraControls/CameraRotate/index.ts';
import { ShakeViewer } from '../Components/CameraControls/CameraShake/index.ts';
import { OrbitControls } from '../Components/CameraControls/OrbitControls/index.ts';
import { VJCamera } from '../Components/CameraControls/VJCamera/index.ts';
import { DemoMusic } from '../Components/DemoProject/DemoMusic/index.ts';
import { OREngineCubeMaterial } from '../Components/DemoProject/OREngineCubeMaterial/index.ts';
import { OREngineLogoMaterial } from '../Components/DemoProject/OREngineLogoMaterial/index.ts';
import { SkyBox } from '../Components/DemoProject/SkyBox/index.ts';
import { LookAt } from '../Components/ObjectControls/LookAt/index.ts';
import { ObjectRotate } from '../Components/ObjectControls/ObjectRotate/index.ts';
import { Particles } from '../Components/Samples/Particles/index.ts';
import { Raymarch } from '../Components/Samples/Raymarch/index.ts';
import { BLidgeClient } from '../Components/Utilities/BLidgeClient/index.ts';
import { Text } from '../Components/Utilities/Text/index.ts';
import { TextureGenerator } from '../Components/Utilities/TextureGenerator/index.ts';
import { UniformControls } from '../Components/Utilities/UniformsControls/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		MainCamera,
	},
	CameraControls: {
		RotateViewer,
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
	ObjectControls: {
		LookAt,
		ObjectRotate,
	},
	Samples: {
		Particles,
		Raymarch,
	},
	Utilities: {
		BLidgeClient,
		Text,
		TextureGenerator,
		UniformControls,
	},
};
