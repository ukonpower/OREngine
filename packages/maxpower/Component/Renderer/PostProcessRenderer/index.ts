import * as GLP from 'glpower';

import { PostProcess } from '../../../PostProcess';
import { CameraParam, RenderOption } from '../CameraRenderer';
import { DrawManager, DrawParam } from '../DrawManager';

export class PostProcessRenderer {

	private gl: WebGL2RenderingContext;
	private drawManager: DrawManager;
	private quad: any; // ジオメトリの型
	private onDrawPass: ( renderTarget: GLP.GLPowerFrameBuffer | null, name: string ) => void;

	constructor( gl: WebGL2RenderingContext, drawManager: DrawManager, quad: any, onDrawPass: ( renderTarget: GLP.GLPowerFrameBuffer | null, name: string ) => void ) {

		this.gl = gl;
		this.drawManager = drawManager;
		this.quad = quad;
		this.onDrawPass = onDrawPass;

	}

	public renderPostProcess( postprocess: PostProcess, input?: GLP.GLPowerFrameBuffer, canvasSize?: GLP.Vector, renderOption?: RenderOption ) {

		// render
		let backbuffers: GLP.GLPowerTexture[] | undefined = input ? input.textures : undefined;

		if ( ! postprocess.passes ) return;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

			if ( pass.enabled === false ) continue;

			const renderTarget = pass.renderTarget;

			if ( pass.viewPort ) {

				const v = pass.viewPort;
				this.gl.viewport( v.x, v.y, v.z, v.w );

			} else {

				if ( renderTarget ) {

					this.gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );

				} else {

					if ( canvasSize ) {

						this.gl.viewport( 0, 0, canvasSize.x, canvasSize.y );

					}

				}

			}

			if ( renderTarget ) {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
				this.gl.drawBuffers( renderTarget.textureAttachmentList );

			} else {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

			}

			// clear
			let clear = 0;

			if ( pass.clearColor ) {

				this.gl.clearColor( pass.clearColor.x, pass.clearColor.y, pass.clearColor.z, pass.clearColor.w );
				clear |= this.gl.COLOR_BUFFER_BIT;

			}

			if ( pass.clearDepth !== null ) {

				this.gl.clearDepth( pass.clearDepth );
				clear |= this.gl.DEPTH_BUFFER_BIT;

			}

			if ( clear !== 0 ) {

				this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			}

			const backBuffer = pass.backBufferOverride || backbuffers || null;

			if ( backBuffer ) {

				for ( let i = 0; i < backBuffer.length; i ++ ) {

					pass.uniforms[ 'uBackBuffer' + i ] = {
						type: '1i',
						value: backBuffer[ i ]
					};

				}

			}

			const opt: DrawParam = renderOption && renderOption.cameraOverride || {};

			opt.label = pass.name;
			opt.renderTarget = renderTarget;

			this.drawManager.draw( pass.uuid, "postprocess", this.quad, pass, { directional: [], spot: [] }, opt );

			pass.onAfterRender();

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffers = pass.renderTarget.textures;

			}

			this.onDrawPass( pass.renderTarget, pass.name );

		}

	}

}
