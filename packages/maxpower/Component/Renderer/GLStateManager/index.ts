import { Material } from '../../../Material';

// state

type GPUState = {
	[key: string] : {state: boolean},
}

export class GLStateManager {

	private gl: WebGL2RenderingContext;
	private _glStateCache: GPUState;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this._glStateCache = {};

	}

	public setMaterialStates( material: Material ) {

		// cull face

		let gpuStateType: number = this.gl.CULL_FACE;

		const cullStateCache = this._glStateCache[ gpuStateType ];

		if ( cullStateCache === undefined || cullStateCache.state != material.cullFace ) {

			if ( material.cullFace ) {

				this.gl.enable( gpuStateType );

			} else {

				this.gl.disable( gpuStateType );

			}

			this._glStateCache[ gpuStateType ] = { state: material.cullFace };

		}

		// depth

		gpuStateType = this.gl.DEPTH_TEST;

		const depthStateCache = this._glStateCache[ gpuStateType ];

		if ( depthStateCache === undefined || depthStateCache.state != material.depthTest ) {

			if ( material.depthTest ) {

				this.gl.enable( gpuStateType );

			} else {

				this.gl.disable( gpuStateType );

			}

			this._glStateCache[ gpuStateType ] = { state: material.depthTest };

		}

		this.gl.depthMask( material.depthWrite );

	}

	public setBlendMode( material: Material ) {

		if ( material.blending == 'NORMAL' ) {

			this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

		} else if ( material.blending == 'ADD' ) {

			this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE );

		} else if ( material.blending == 'DIFF' ) {

			this.gl.blendFunc( this.gl.ONE_MINUS_DST_COLOR, this.gl.ONE_MINUS_DST_COLOR );

		}

	}

	public enableBlend() {

		this.gl.enable( this.gl.BLEND );

	}

	public disableBlend() {

		this.gl.disable( this.gl.BLEND );

	}

	public clearBuffers( clearColor: boolean = true, clearDepth: boolean = true ) {

		let mask = 0;

		if ( clearColor ) {

			mask |= this.gl.COLOR_BUFFER_BIT;

		}

		if ( clearDepth ) {

			mask |= this.gl.DEPTH_BUFFER_BIT;

		}

		if ( mask !== 0 ) {

			this.gl.clear( mask );

		}

	}

	public setClearColor( r: number, g: number, b: number, a: number ) {

		this.gl.clearColor( r, g, b, a );

	}

	public setClearDepth( depth: number ) {

		this.gl.clearDepth( depth );

	}

}
