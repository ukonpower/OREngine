import { GLPowerTextureCube } from "glpower";

import { TexProcedural } from "../utils/TexProcedural";

import noiseFrag from './shaders/noise.fs';

import { gl, globalUniforms } from "~/ts/Globals";

export const createTextures = () => {

	globalUniforms.tex.uNoiseTex = {
		value: new TexProcedural( {
			frag: noiseFrag
		} ),
		type: '1i'
	};

	globalUniforms.tex.uEnvTex = {
		value: new GLPowerTextureCube( gl ),
		type: '1i'
	};

	const prms = [
		'/env/px.png',
		'/env/py.png',
		'/env/pz.png',
		'/env/nx.png',
		'/env/ny.png',
		'/env/nz.png'
	].map( path => new Promise<HTMLImageElement>( ( r )=> {

		const img = document.createElement( "img" );

		img.onload = () => {

			r( img );

		};

		img.src = path;

	} ) );

	Promise.all( prms ).then( imgs => {

		globalUniforms.tex.uEnvTex.value.attach( imgs );

	} );

};
