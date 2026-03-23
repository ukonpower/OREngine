// @ts-nocheck

export const MATERIALLIST: {[key: string]: any} = {
	ChromaPillarMat: {"vert":"ChromaPillar/vert","frag":"ChromaPillar/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	Default: {"vert":"","frag":"","phase":["shadowMap","deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	IkikaMaterial: {"vert":"BikabikaShader/vert","frag":"BikabikaShader/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	Maguro: {"vert":"Maguro/vert","frag":"Maguro/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false,"uniforms/uNoiseTex":""},
	NeonWireMat: {"vert":"NeonWire/vert","frag":"NeonWire/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	OREngineCube: {"vert":"OREngineCube/vert","frag":"OREngineCube/frag","phase":["shadowMap","deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false,"uniforms/uNoiseTex":"noise"},
	OREngineLogo: {"vert":"OREngineLogo/vert","frag":"OREngineLogo/frag","phase":["deferred","shadowMap"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	PulseGlowMat: {"vert":"PulseGlow/vert","frag":"PulseGlow/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	Sashimi: {"vert":"Sashimi/vert","frag":"Sashimi/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false,"uniforms/uNoiseTex":"noise"},
	SkyBox: {"vert":"","frag":"SkyBox/frag","phase":["deferred","envMap"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false,"uniforms/uAspectRatio":0},
	VortexMat: {"vert":"VortexDisplace/vert","frag":"VortexDisplace/frag","phase":["deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
};
