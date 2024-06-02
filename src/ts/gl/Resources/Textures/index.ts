import { GLPowerTexture, GLPowerTextureCube } from "glpower";


import { TexProcedural } from "../../ProjectScene/utils/TexProcedural";

import noiseFrag from './shaders/noise.fs';

import { gl, globalUniforms } from "~/ts/gl/GLGlobals";

export const initTextures = () => {

	globalUniforms.tex.uNoiseTex = {
		value: new TexProcedural( gl, {
			frag: noiseFrag,
		} ),
		type: '1i'
	};

	globalUniforms.tex.uEnvTex = {
		value: new GLPowerTexture( gl ).load( "/env/test.png" ).setting( {
			magFilter: gl.LINEAR,
			minFilter: gl.LINEAR,
		} ),
		type: '1i'
	};

};
