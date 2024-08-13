
import { CollectedLights } from 'packages/maxpower/Component/Renderer';

import common from './shaderModules/common.module.glsl';
import light from './shaderModules/light.module.glsl';
import noise from './shaderModules/noise.module.glsl';
import pmrem from './shaderModules/pmrem.module.glsl';
import raymarch_normal from './shaderModules/raymarch_normal.module.glsl';
import rotate from './shaderModules/rotate.module.glsl';
import sdf from './shaderModules/sdf.module.glsl';
import frag_h from './shaderParts/frag_h.part.glsl';
import frag_in from './shaderParts/frag_in.part.glsl';
import frag_out from './shaderParts/frag_out.part.glsl';
import lighting from './shaderParts/lighting.part.glsl';
import raymarch_ray_object from './shaderParts/raymarch_ray_object.part.glsl';
import uniformTime from './shaderParts/uniform_time.part.glsl';
import vert_h from './shaderParts/vert_h.part.glsl';
import vert_in from './shaderParts/vert_in.part.glsl';
import vert_out from './shaderParts/vert_out.part.glsl';

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

	const dict = new Map<string, string>( [
		[ "common", common ],
		[ "sdf", sdf ],
		[ "rotate", rotate ],
		[ "noise", noise ],
		[ "light", light ],
		[ "lighting", lighting ],
		[ "vert_h", vert_h ],
		[ "vert_in", vert_in ],
		[ "vert_out", vert_out ],
		[ "frag_h", frag_h ],
		[ "frag_in", frag_in ],
		[ "frag_out", frag_out ],
		[ "rm_normal", raymarch_normal ],
		[ "rm_ray_obj", raymarch_ray_object ],
		[ "uni_time", uniformTime ],
		[ "pmrem", pmrem ],
	] );

	shader = shader.replace( /#include\s?<([\S]*)>/g, ( _: string, body: string ) => {

		let str = "";

		let module = dict.get( body ) || '';

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
