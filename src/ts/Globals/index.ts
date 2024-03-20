import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineResource } from '../gl/Scene/Resources';
import { GPUState } from '../gl/Scene/utils/GPUState';

export const canvas = document.createElement( "canvas" );
export const gl = canvas.getContext( 'webgl2', { antialias: false } )!;
export const power = new GLP.Power( gl );
export const mainCmaera = new MXP.Entity( { name: "camera" } );

export const globalUniforms: {[key: string]: GLP.Uniforms} = {
	time: {
		uTime: {
			value: 0,
			type: "1f"
		},
		uFractTime: {
			value: 0,
			type: "1f"
		},
		uTimeSeq: {
			value: 0,
			type: "1f"
		},
		uMove: {
			value: 0,
			type: "1f"
		}
	},
	resolution: {
		uAspectRatio: {
			value: 1.0,
			type: '1f'
		}
	},
	camera: {
		projectionMatrix: {
			value: new GLP.Matrix(),
			type: 'Matrix4fv'
		},
		viewMatrix: {
			value: new GLP.Matrix(),
			type: 'Matrix4fv'
		}
	},
	tex: {
	}
};

/*-------------------------------
	Resouce
-------------------------------*/

export const resource = new OREngineResource();

/*-------------------------------
	DEBUG
-------------------------------*/

export let gpuState: GPUState | undefined = undefined;

// import 'webgl-memory';
// gpuState = new GPUState();
gpuState = undefined;

