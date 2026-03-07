// @ts-nocheck

export const MATERIALLIST: {[key: string]: any} = {
	Default: {"vert":"","frag":"","phase":["shadowMap","deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	OREngineCube: {"vert":"OREngineCube/vert","frag":"OREngineCube/frag","phase":["shadowMap","deferred"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	OREngineLogo: {"vert":"OREngineLogo/vert","frag":"OREngineLogo/frag","phase":["deferred","shadowMap"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
	SkyBox: {"vert":"","frag":"SkyBox/frag","phase":["deferred","envMap"],"drawType":"","blending":"","useLight":true,"depthTest":true,"depthWrite":true,"cullFace":false},
};
