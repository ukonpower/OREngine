import common from './shaderModules/common.module.glsl';
import sdf from './shaderModules/sdf.module.glsl';
import noise from './shaderModules/noise.module.glsl';
import rotate from './shaderModules/rotate.module.glsl';
import light_h from './shaderModules/light_h.module.glsl';
import light from './shaderModules/light.module.glsl';
import re from './shaderModules/re.module.glsl';
import vert_h from './shaderModules/vert_h.module.glsl';
import vert_in from './shaderModules/vert_in.module.glsl';
import vert_out from './shaderModules/vert_out.module.glsl';
import frag_h from './shaderModules/frag_h.module.glsl';
import frag_in from './shaderModules/frag_in.module.glsl';
import frag_out from './shaderModules/frag_out.module.glsl';
import { CollectedLights } from '..';

type Defines = {[key:string]: number | string} | undefined;

export const shaderInsertDefines = ( shader: string, defines: Defines ) => {

	if ( ! defines ) return shader;

	const splited = shader.split( '\n' );

	let insertIndex = splited.findIndex( item => item.indexOf( 'precision' ) > - 1 );

	if ( insertIndex == - 1 ) {

		insertIndex = splited.findIndex( item => item.indexOf( '#version' ) > - 1 );

	}

	if ( insertIndex == - 1 ) insertIndex = 0;

	const keys = Object.keys( defines );

	for ( let i = 0; i < keys.length; i ++ ) {

		splited.splice( insertIndex + 1, 0, "#define " + keys[ i ] + ' ' + defines[ keys[ i ] ] );

	}

	let res = '';

	splited.forEach( item => {

		res += item + '\n';

	} );

	return res;

};

export const shaderInclude = ( shader: string ) => {

	const dict : {[key: string]: string} = {
		"common": common,
		"sdf": sdf,
		"rotate": rotate,
		"noise": noise,
		"light_h": light_h,
		"light": light,
		"re": re,
		"vert_h": vert_h,
		"vert_in": vert_in,
		"vert_out": vert_out,
		"frag_h": frag_h,
		"frag_in": frag_in,
		"frag_out": frag_out,
	};

	shader = shader.replace( /#include\s?\<([\S]*)\>/g, ( _: string, body: string ) => {

		let str = "";

		let module = dict[ body ] || '';

		module = module.replace( /#define GLSLIFY .*\n/g, "" );
		str += module;

		return str;

	} );

	return shader;

};

const shaderInsertLights = ( shader: string, lights?: CollectedLights ) => {

	shader = shader.replaceAll( 'NUM_LIGHT_DIR', lights ? lights.directional.length.toString() : "0" );
	shader = shader.replaceAll( 'NUM_LIGHT_SPOT', lights ? lights.spot.length.toString() : "0" );

	return shader;

};

const shaderUnrollLoop = ( shader: string ) => {

	shader = shader.replace( /#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g, ( _: string, loop: string, body: string ) => {

		let str = "";

		for ( let i = 0; i < Number( loop ); i ++ ) {

			str += body.replaceAll( 'LOOP_INDEX', i.toString() );

		}

		return str;

	} );

	return shader;

};

export const shaderParse = ( shader: string, defines?: Defines, lights?: CollectedLights ) => {

	shader = shaderInclude( shader );
	shader = shaderInsertLights( shader, lights );
	shader = shaderInsertDefines( shader, defines );
	shader = shaderUnrollLoop( shader );
	shader = shader.replace( /#define GLSLIFY .*\n/g, "" );

	return shader;

};
