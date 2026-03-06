// @ts-nocheck
import OREngineCubeVert from '../Shaders/OREngineCube/index.vs';
import OREngineCubeFrag from '../Shaders/OREngineCube/index.fs';
import OREngineLogoVert from '../Shaders/OREngineLogo/index.vs';
import OREngineLogoFrag from '../Shaders/OREngineLogo/index.fs';
import SkyBoxFrag from '../Shaders/SkyBox/index.fs';

export const MATERIALLIST: {[key: string]: any} = {
	Default: {
	},
	OREngineCube: {
		vert: OREngineCubeVert,
		frag: OREngineCubeFrag,
	},
	OREngineLogo: {
		vert: OREngineLogoVert,
		frag: OREngineLogoFrag,
		phase: ["deferred","shadowMap"],
	},
	SkyBox: {
		frag: SkyBoxFrag,
		phase: ["deferred","envMap"],
		cullFace: false,
	},
};
