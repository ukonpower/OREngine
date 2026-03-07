// @ts-nocheck

export const MATERIALLIST: {[key: string]: any} = {
	Default: {},
	OREngineCube: {"vert":"OREngineCube/vert","frag":"OREngineCube/frag"},
	OREngineLogo: {"vert":"OREngineLogo/vert","frag":"OREngineLogo/frag","phase":["deferred","shadowMap"]},
	SkyBox: {"frag":"SkyBox/frag","phase":["deferred","envMap"],"cullFace":false},
};
