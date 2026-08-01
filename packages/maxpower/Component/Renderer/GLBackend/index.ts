import * as GLP from 'glpower';

import { Blending, DrawType } from '../../../Material';

export type TimerQueryResult = { name: string, duration: number };

// WebGLの描画コマンド発行とステート管理を担うバックエンド。
// Rendererはパス編成に専念し、生のgl呼び出しはここへ集約する。
export class GLBackend {

	public readonly gl: WebGL2RenderingContext;

	private _stateCache: { [key: number]: boolean };
	private _extDisJointTimerQuery: any;
	private _queryList: WebGLQuery[];
	private _queryListQueued: { name: string, query: WebGLQuery }[];

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this._stateCache = {};
		this._queryList = [];
		this._queryListQueued = [];

		gl.getExtension( "EXT_color_buffer_float" );
		gl.getExtension( "EXT_color_buffer_half_float" );
		gl.getExtension( "OES_texture_float_linear" );

		this._extDisJointTimerQuery = gl.getExtension( "EXT_disjoint_timer_query_webgl2" );

		if ( ! this._extDisJointTimerQuery ) {

			console.warn( "[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled." );

		}

		gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

	}

	/*-------------------------------
		State
	-------------------------------*/

	// GLステートをキャッシュと比較し、変化があった時だけ切り替える
	private _setState( type: number, state: boolean ) {

		if ( this._stateCache[ type ] !== state ) {

			if ( state ) {

				this.gl.enable( type );

			} else {

				this.gl.disable( type );

			}

			this._stateCache[ type ] = state;

		}

	}

	// マテリアル由来の描画ステートをまとめて設定する
	public setMaterialState( cullFace: boolean, depthTest: boolean, depthWrite: boolean ) {

		this._setState( this.gl.CULL_FACE, cullFace );
		this._setState( this.gl.DEPTH_TEST, depthTest );

		this.gl.depthMask( depthWrite );

	}

	// アルファブレンドの有効/無効を切り替える
	public setBlendEnabled( enabled: boolean ) {

		if ( enabled ) {

			this.gl.enable( this.gl.BLEND );

		} else {

			this.gl.disable( this.gl.BLEND );

		}

	}

	/*-------------------------------
		RenderTarget
	-------------------------------*/

	// viewport設定とframebufferバインドをまとめて行う
	public bindRenderTarget( renderTarget: GLP.GLPowerFrameBuffer | null, viewPort?: GLP.Vector | null, canvasSize?: GLP.Vector ) {

		if ( viewPort ) {

			this.gl.viewport( viewPort.x, viewPort.y, viewPort.z, viewPort.w );

		} else if ( renderTarget ) {

			this.gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );

		} else if ( canvasSize ) {

			this.gl.viewport( 0, 0, canvasSize.x, canvasSize.y );

		}

		if ( renderTarget ) {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
			this.gl.drawBuffers( renderTarget.textureAttachmentList );

		} else {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		}

	}

	// 指定された要素だけをclearする
	public clear( color: GLP.Vector | null, depth: number | null ) {

		let bits = 0;

		if ( color ) {

			this.gl.clearColor( color.x, color.y, color.z, color.w );
			bits |= this.gl.COLOR_BUFFER_BIT;

		}

		if ( depth !== null ) {

			this.gl.clearDepth( depth );
			bits |= this.gl.DEPTH_BUFFER_BIT;

		}

		if ( bits !== 0 ) {

			this.gl.clear( bits );

		}

	}

	// framebuffer間のカラーコピー。restrictColor0はMRTのうちCOLOR_ATTACHMENT0だけを対象にする
	public blit( read: GLP.GLPowerFrameBuffer | null, draw: GLP.GLPowerFrameBuffer | null, width: number, height: number, linear?: boolean, restrictColor0?: boolean ) {

		const gl = this.gl;

		gl.bindFramebuffer( gl.READ_FRAMEBUFFER, read ? read.getFrameBuffer() : null );

		if ( restrictColor0 ) {

			gl.readBuffer( gl.COLOR_ATTACHMENT0 );

		}

		gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, draw ? draw.getFrameBuffer() : null );

		if ( restrictColor0 && draw ) {

			gl.drawBuffers( [ gl.COLOR_ATTACHMENT0 ] );

		}

		gl.blitFramebuffer(
			0, 0, width, height,
			0, 0, width, height,
			gl.COLOR_BUFFER_BIT, linear ? gl.LINEAR : gl.NEAREST );

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	// programとVAOで1回の描画コマンドを発行する
	public draw( program: GLP.GLPowerProgram, vao: GLP.GLPowerVAO, drawType: DrawType, blending: Blending, queryName?: string ) {

		program.use( ( program ) => {

			program.uploadUniforms();

			this.gl.bindVertexArray( vao.getVAO() );

			const indexBuffer = vao.indexBuffer;

			let indexBufferArrayType: number = this.gl.UNSIGNED_SHORT;

			if ( indexBuffer && indexBuffer.array && indexBuffer.array.BYTES_PER_ELEMENT == 4 ) {

				indexBufferArrayType = this.gl.UNSIGNED_INT;

			}

			if ( blending == 'NORMAL' ) {

				this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

			} else if ( blending == 'ADD' ) {

				this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE );

			} else if ( blending == 'DIFF' ) {

				this.gl.blendFunc( this.gl.ONE_MINUS_DST_COLOR, this.gl.ONE_MINUS_DST_COLOR );

			}

			const mode = this.gl[ drawType ];

			// query ------------------------

			let query: WebGLQuery | null = null;

			if ( import.meta.env.DEV && this._extDisJointTimerQuery ) {

				query = this._queryList.pop() || null;

				if ( query == null ) {

					query = this.gl.createQuery();

				}

				if ( query ) {

					this.gl.beginQuery( this._extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

				}

			}

			// -----------------------------

			if ( vao.instanceCount > 0 ) {

				if ( indexBuffer ) {

					this.gl.drawElementsInstanced( mode, vao.indexCount, indexBufferArrayType, 0, vao.instanceCount );

				} else {

					this.gl.drawArraysInstanced( mode, 0, vao.vertCount, vao.instanceCount );

				}

			} else {

				if ( indexBuffer ) {

					this.gl.drawElements( mode, vao.indexCount, indexBufferArrayType, 0 );

				} else {

					this.gl.drawArrays( mode, 0, vao.vertCount );

				}

			}

			// query ------------------------

			if ( import.meta.env.DEV && this._extDisJointTimerQuery ) {

				if ( query ) {

					this.gl.endQuery( this._extDisJointTimerQuery.TIME_ELAPSED_EXT );

					this._queryListQueued.push( {
						name: queryName || "_",
						query: query
					} );

				}

			}

			// ----------------------------

			this.gl.bindVertexArray( null );

		} );

	}

	/*-------------------------------
		Timer Query
	-------------------------------*/

	// 完了したGPUタイマークエリの結果を回収する。拡張が無い場合とdisjoint時はnull
	public collectTimerQueries(): TimerQueryResult[] | null {

		if ( ! this._extDisJointTimerQuery ) return null;

		const disjoint = this.gl.getParameter( this._extDisJointTimerQuery.GPU_DISJOINT_EXT );

		if ( disjoint ) {

			this._queryList.forEach( q => this.gl.deleteQuery( q ) );

			this._queryList.length = 0;

			return null;

		}

		const updatedList: TimerQueryResult[] = [];

		if ( this._queryListQueued.length > 0 ) {

			const l = this._queryListQueued.length;

			for ( let i = l - 1; i >= 0; i -- ) {

				const q = this._queryListQueued[ i ];

				const resultAvailable = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT_AVAILABLE );

				if ( resultAvailable ) {

					const result = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT );

					updatedList.push( {
						name: q.name,
						duration: result / 1000 / 1000
					} );

					this._queryList.push( q.query );

					this._queryListQueued.splice( i, 1 );

				}

			}

		}

		return updatedList;

	}

}
