import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineResource } from '../Resources';

/*-------------------------------
	Elements
-------------------------------*/

export const screenElm = document.createElement( 'div' );
screenElm.id = "screen";
screenElm.style.position = "absolute";

export const canvas = document.createElement( "canvas" );
canvas.setAttribute( "style", "position:absolute;top:0;left:0;width:100%;height:100%;" );
screenElm.appendChild( canvas );

/*-------------------------------
	GL
-------------------------------*/

export const gl = canvas.getContext( 'webgl2', { antialias: false } )!;
export const power = new GLP.Power( gl );
export const renderer = new MXP.Renderer( power.gl );

/*-------------------------------
	Status
-------------------------------*/

/*-------------------------------
	Uniforms
-------------------------------*/

export const globalUniforms: {[key: string]: GLP.Uniforms} = {
	time: {
		uTime: {
			value: 0,
			type: "1f"
		},
		uTimeF: {
			value: 0,
			type: "1f"
		},
		uTimeE: {
			value: 0,
			type: "1f"
		},
		uTimeEF: {
			value: 0,
			type: "1f"
		},
	},
	resolution: {
		uAspectRatio: {
			value: 1.0,
			type: '1f'
		},
		uResolution: {
			value: new GLP.Vector(),
			type: '2f'
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
	gBuffer: {
		uGBufferPos: {
			value: null,
			type: "1i"
		},
		uGBufferNormal: {
			value: null,
			type: "1i"
		},
	},
	tex: {
	},
	music: {
		uMusicFreqTex: {
			value: null,
			type: "1i"
		},
		uMusicDomainTex: {
			value: null,
			type: "1i"
		},
	}
};

/*-------------------------------
	Resouce
-------------------------------*/

export const resource = new OREngineResource();
