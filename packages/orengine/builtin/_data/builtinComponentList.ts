// @ts-nocheck
import { CameraController } from '../Components/Camera/CameraController/index.ts';
import { CameraOrbitAnim } from '../Components/Camera/CameraOrbitAnim/index.ts';
import { ShakeViewer } from '../Components/Camera/CameraShake/index.ts';
import { LookAt } from '../Components/Camera/LookAt/index.ts';
import { OrbitControls } from '../Components/Camera/OrbitControls/index.ts';
import { ObjectRotate } from '../Components/Object/ObjectRotate/index.ts';
import { BLidgeClient } from '../Components/Utility/BLidgeClient/index.ts';

export const BUILTIN_COMPONENTLIST: {[key: string]: any} = {
	Camera: {
		CameraController,
		CameraOrbitAnim,
		ShakeViewer,
		LookAt,
		OrbitControls,
	},
	Object: {
		ObjectRotate,
	},
	Utility: {
		BLidgeClient,
	},
};
