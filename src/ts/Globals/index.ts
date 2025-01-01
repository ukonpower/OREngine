import * as GLP from 'glpower';

/*-------------------------------
	Elements
-------------------------------*/

export const canvas = document.createElement( "canvas" );
export const gl = canvas.getContext( 'webgl2', { antialias: false } )!;
export const power = new GLP.Power( gl );

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
