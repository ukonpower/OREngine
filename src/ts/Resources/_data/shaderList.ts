// @ts-nocheck
import BikabikaShaderVert from '../Shaders/BikabikaShader/index.vs';
import BikabikaShaderFrag from '../Shaders/BikabikaShader/index.fs';
import ChromaPillarVert from '../Shaders/ChromaPillar/index.vs';
import ChromaPillarFrag from '../Shaders/ChromaPillar/index.fs';
import HashFrag from '../Shaders/Hash/index.fs';
import MaguroVert from '../Shaders/Maguro/index.vs';
import MaguroFrag from '../Shaders/Maguro/index.fs';
import NeonWireVert from '../Shaders/NeonWire/index.vs';
import NeonWireFrag from '../Shaders/NeonWire/index.fs';
import NoiseFrag from '../Shaders/Noise/index.fs';
import NoiseCyclicFrag from '../Shaders/NoiseCyclic/index.fs';
import OREngineCubeVert from '../Shaders/OREngineCube/index.vs';
import OREngineCubeFrag from '../Shaders/OREngineCube/index.fs';
import OREngineLogoVert from '../Shaders/OREngineLogo/index.vs';
import OREngineLogoFrag from '../Shaders/OREngineLogo/index.fs';
import PulseGlowVert from '../Shaders/PulseGlow/index.vs';
import PulseGlowFrag from '../Shaders/PulseGlow/index.fs';
import SashimiVert from '../Shaders/Sashimi/index.vs';
import SashimiFrag from '../Shaders/Sashimi/index.fs';
import SkyBoxFrag from '../Shaders/SkyBox/index.fs';
import VortexDisplaceVert from '../Shaders/VortexDisplace/index.vs';
import VortexDisplaceFrag from '../Shaders/VortexDisplace/index.fs';

export const SHADERLIST: {name: string, source: string}[] = [
	{ name: "BikabikaShader/vert", source: BikabikaShaderVert },
	{ name: "BikabikaShader/frag", source: BikabikaShaderFrag },
	{ name: "ChromaPillar/vert", source: ChromaPillarVert },
	{ name: "ChromaPillar/frag", source: ChromaPillarFrag },
	{ name: "Hash/frag", source: HashFrag },
	{ name: "Maguro/vert", source: MaguroVert },
	{ name: "Maguro/frag", source: MaguroFrag },
	{ name: "NeonWire/vert", source: NeonWireVert },
	{ name: "NeonWire/frag", source: NeonWireFrag },
	{ name: "Noise/frag", source: NoiseFrag },
	{ name: "NoiseCyclic/frag", source: NoiseCyclicFrag },
	{ name: "OREngineCube/vert", source: OREngineCubeVert },
	{ name: "OREngineCube/frag", source: OREngineCubeFrag },
	{ name: "OREngineLogo/vert", source: OREngineLogoVert },
	{ name: "OREngineLogo/frag", source: OREngineLogoFrag },
	{ name: "PulseGlow/vert", source: PulseGlowVert },
	{ name: "PulseGlow/frag", source: PulseGlowFrag },
	{ name: "Sashimi/vert", source: SashimiVert },
	{ name: "Sashimi/frag", source: SashimiFrag },
	{ name: "SkyBox/frag", source: SkyBoxFrag },
	{ name: "VortexDisplace/vert", source: VortexDisplaceVert },
	{ name: "VortexDisplace/frag", source: VortexDisplaceFrag },
];
