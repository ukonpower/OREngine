// @ts-nocheck
import BikabikaShaderVert from '../Shaders/BikabikaShader/index.vs';
import BikabikaShaderFrag from '../Shaders/BikabikaShader/index.fs';
import HashFrag from '../Shaders/Hash/index.fs';
import NoiseFrag from '../Shaders/Noise/index.fs';
import NoiseCyclicFrag from '../Shaders/NoiseCyclic/index.fs';
import OREngineCubeVert from '../Shaders/OREngineCube/index.vs';
import OREngineCubeFrag from '../Shaders/OREngineCube/index.fs';
import OREngineLogoVert from '../Shaders/OREngineLogo/index.vs';
import OREngineLogoFrag from '../Shaders/OREngineLogo/index.fs';
import SkyBoxFrag from '../Shaders/SkyBox/index.fs';

export const SHADERLIST: {name: string, source: string}[] = [
	{ name: "BikabikaShader/vert", source: BikabikaShaderVert },
	{ name: "BikabikaShader/frag", source: BikabikaShaderFrag },
	{ name: "Hash/frag", source: HashFrag },
	{ name: "Noise/frag", source: NoiseFrag },
	{ name: "NoiseCyclic/frag", source: NoiseCyclicFrag },
	{ name: "OREngineCube/vert", source: OREngineCubeVert },
	{ name: "OREngineCube/frag", source: OREngineCubeFrag },
	{ name: "OREngineLogo/vert", source: OREngineLogoVert },
	{ name: "OREngineLogo/frag", source: OREngineLogoFrag },
	{ name: "SkyBox/frag", source: SkyBoxFrag },
];
