import { Bloom } from '../Components/Camera/MainCamera/PostProcess/Bloom/index.ts';
import { Blur } from '../Components/Camera/MainCamera/PostProcess/Blur/index.ts';
import { ColorGrading } from '../Components/Camera/MainCamera/PostProcess/ColorGrading/index.ts';
import { FXAA } from '../Components/Camera/MainCamera/PostProcess/FXAA/index.ts';
import { Finalize } from '../Components/Camera/MainCamera/PostProcess/Finalize/index.ts';
import { Glitch } from '../Components/Camera/MainCamera/PostProcess/Glitch/index.ts';
import { OverlayMixer } from '../Components/Camera/MainCamera/PostProcess/OverlayMixer/index.ts';
import { PixelSort } from '../Components/Camera/MainCamera/PostProcess/PixelSort/index.ts';
import { MainCamera } from '../Components/Camera/MainCamera/index.ts';
import { DemoMusic } from '../Components/DemoProject/DemoMusic/index.ts';
import { OREngineCubeMaterial } from '../Components/DemoProject/OREngineCubeMaterial/index.ts';
import { OREngineLogoMaterial } from '../Components/DemoProject/OREngineLogoMaterial/index.ts';
import { SkyBox } from '../Components/DemoProject/SkyBox/index.ts';
import { ShakeViewer } from '../Components/ObjectControls/CameraShake/index.ts';
import { LookAt } from '../Components/ObjectControls/LookAt/index.ts';
import { ObjectRotate } from '../Components/ObjectControls/ObjectRotate/index.ts';
import { OrbitControls } from '../Components/ObjectControls/OrbitControls/index.ts';
import { SPZModel } from '../Components/Samples/SPZModel/index.ts';
import { TextureGenerator } from '../Components/Texture/TextureGenerator/index.ts';
import { BLidgeClient } from '../Components/Utilities/BLidgeClient/index.ts';
import { UniformControls } from '../Components/Utilities/UniformsControls/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		MainCamera,
	},
	DemoProject: {
		DemoMusic,
		OREngineCubeMaterial,
		OREngineLogoMaterial,
		SkyBox,
	},
	ObjectControls: {
		ShakeViewer,
		LookAt,
		ObjectRotate,
		OrbitControls,
	},
	Samples: {
		SPZModel,
	},
	Texture: {
		TextureGenerator,
	},
	Utilities: {
		BLidgeClient,
		UniformControls,
	},
};
