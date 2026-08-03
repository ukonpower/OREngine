
import type { CollectedLights } from '../Renderer';

type Defines = {[key:string]: number | string} | undefined;

export const shaderInsertDefines = ( shader: string, defines: Defines ) => {

	if ( ! defines ) return shader;

	const keys = Object.keys( defines );

	let res = "";

	for ( let i = 0; i < keys.length; i ++ ) {

		res += "#define " + keys[ i ] + ' ' + defines[ keys[ i ] ] + "\n";

	}

	res = res + shader;

	return res;

};

const shaderInsertLights = ( shader: string, lights?: CollectedLights ) => {

	shader = shader.replaceAll( 'NUM_LIGHT_DIR', lights ? lights.directional.length.toString() : "0" );
	shader = shader.replaceAll( 'NUM_SHADOWMAP_DIR', lights ? Math.min( 2, lights.directional.filter( ( light ) => light.component.castShadow ).length ).toString() : "0" );

	shader = shader.replaceAll( 'NUM_LIGHT_SPOT', lights ? lights.spot.length.toString() : "0" );
	shader = shader.replaceAll( 'NUM_SHADOWMAP_SPOT', lights ? Math.min( 2, lights.spot.filter( ( light ) => light.component.castShadow ).length ).toString() : "0" );

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

// シェーダーの #include はビルド時に ShaderBuilder が解決済み。
// ここでは define 注入・ライト数の埋め込み・ループ展開のみ行う
export const shaderParse = ( shader: string, defines?: Defines, lights?: CollectedLights ) => {

	shader = shaderInsertDefines( shader, defines );
	shader = "#version 300 es\nprecision highp float;\n" + shader;

	shader = shaderInsertLights( shader, lights );
	shader = shaderUnrollLoop( shader );

	return shader;

};
