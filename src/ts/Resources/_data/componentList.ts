import { DemoMusic } from '../Components/DemoProject/DemoMusic/index.ts';
import { SkyBox } from '../Components/DemoProject/SkyBox/index.ts';
import { ShakeViewer } from '../Components/ObjectControls/CameraShake/index.ts';
import { LookAt } from '../Components/ObjectControls/LookAt/index.ts';
import { ObjectRotate } from '../Components/ObjectControls/ObjectRotate/index.ts';
import { OrbitControls } from '../Components/ObjectControls/OrbitControls/index.ts';
import { CustomPostProcess } from '../Components/PostProcess/CustomPostProcess/index.ts';
import { Raymarch } from '../Components/Raymarch/index.ts';
import { SPZModel } from '../Components/Samples/SPZModel/index.ts';
import { BLidgeClient } from '../Components/Utilities/BLidgeClient/index.ts';
import { UniformControls } from '../Components/Utilities/UniformsControls/index.ts';

export const COMPONENTLIST: {[key: string]: any} = {
	DemoProject: {
		DemoMusic,
		SkyBox,
	},
	ObjectControls: {
		ShakeViewer,
		LookAt,
		ObjectRotate,
		OrbitControls,
	},
	PostProcess: {
		CustomPostProcess,
	},
	Raymarch,
	Samples: {
		SPZModel,
	},
	Utilities: {
		BLidgeClient,
		UniformControls,
	},
};
