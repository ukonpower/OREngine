import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Mesh } from '../../core/Components/Mesh';
import { EditorDrawContract, EditorFrame, EditorRect, EditorRecipe, EditorRenderEntitiesParam, EditorTarget } from '../../core/Contracts/EditorDrawContract';
import { GL } from '../backend/GLBackend';
import { Material } from '../render/Material';
import { PostProcess } from '../render/PostProcess';
import { PostProcessPass } from '../render/PostProcess/PostProcessPass';
import { Renderer } from '../render/Renderer';

import flatFrag from './shaders/flat.fs';
import flatVert from './shaders/flat.vs';
import gridFrag from './shaders/grid.fs';
import maskFrag from './shaders/mask.fs';
import maskVert from './shaders/mask.vs';
import outlineFrag from './shaders/outline.fs';
import textureFrag from './shaders/texture.fs';

import type { EngineContract } from '../../core/Contracts/EngineContract';
import type { MaterialContract } from '../../core/Contracts/MaterialContract';

/*-------------------------------
	Handles
-------------------------------*/

class GLEditorFrame implements EditorFrame {

	public readonly isEditorFrame = true;
	public readonly texture: GLP.GLPowerTexture;
	// キューブマップのフェイス指定を含むアタッチ先
	public readonly textarget: number;

	constructor( texture: GLP.GLPowerTexture, textarget: number ) {

		this.texture = texture;
		this.textarget = textarget;

	}

}

class GLEditorTarget extends GLEditorFrame implements EditorTarget {

	public readonly isEditorTarget = true;
	public readonly frameBuffer: GLP.GLPowerFrameBuffer;
	// sizeを指定せず作られたターゲットは解像度に追従する
	public readonly autoResize: boolean;

	constructor( frameBuffer: GLP.GLPowerFrameBuffer, autoResize: boolean ) {

		super( frameBuffer.textures[ 0 ], GL.TEXTURE_2D );

		this.frameBuffer = frameBuffer;
		this.autoResize = autoResize;

	}

}

class GLEditorRecipe implements EditorRecipe {

	public readonly isEditorRecipe = true;
	public readonly postprocess: PostProcess;
	public readonly pass: PostProcessPass;

	constructor( name: string, pass: PostProcessPass ) {

		this.pass = pass;
		this.postprocess = new PostProcess( { name, passes: [ pass ] } );

	}

}

/*-------------------------------
	GLEditorDraw
-------------------------------*/

export class GLEditorDraw implements EditorDrawContract {

	private _renderer: Renderer;
	private _gl: WebGL2RenderingContext;

	private _targets: GLEditorTarget[];
	private _recipes: GLEditorRecipe[];

	// blitのsrcを任意テクスチャに差し替えるための読み出し用FB
	private _readFrameBuffer: GLP.GLPowerFrameBuffer;
	// uiバッファは読み書きを同時にできないため、フルスクリーンパスはここを経由して戻す
	private _fullscreenBuffer: GLP.GLPowerFrameBuffer;

	private _texturePass: PostProcessPass;
	private _texturePostProcess: PostProcess;

	constructor( renderer: Renderer ) {

		this._renderer = renderer;
		this._gl = renderer.backend.gl;

		this._targets = [];
		this._recipes = [];

		this._readFrameBuffer = new GLP.GLPowerFrameBuffer( this._gl, { disableDepthBuffer: true } );

		this._fullscreenBuffer = new GLP.GLPowerFrameBuffer( this._gl, { disableDepthBuffer: true } )
			.setTexture( [ new GLP.GLPowerTexture( this._gl ).setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ) ] );
		this._fullscreenBuffer.setSize( renderer.resolution );

		this._texturePass = new PostProcessPass( renderer.backend, { frag: textureFrag, renderTarget: null } );
		this._texturePostProcess = new PostProcess( { name: "editorTexture", passes: [ this._texturePass ] } );

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	public renderEntities( opt: EditorRenderEntitiesParam ) {

		const renderer = this._renderer;
		const target = opt.target ? ( opt.target as GLEditorTarget ).frameBuffer : renderer.renderTarget.uiBuffer;
		const override = opt.materialOverride as Material | undefined;
		const restore: ( MaterialContract | null )[] = [];

		if ( override ) {

			for ( let i = 0; i < opt.entities.length; i ++ ) {

				const mesh = opt.entities[ i ].getComponent( Mesh );
				restore.push( mesh ? mesh.material : null );

				if ( mesh ) mesh.material = override;

			}

		}

		if ( opt.depthCompare === 'lequal' ) {

			this._gl.depthFunc( GL.LEQUAL );

		}

		renderer.renderCamera(
			"forward",
			opt.camera,
			opt.entities,
			target,
			renderer.resolution,
			// uiバッファへはシーンの上に重ねるためクリアせず、自前ターゲットは毎回クリアする
			{ disableClear: opt.target === null }
		);

		if ( opt.depthCompare === 'lequal' ) {

			this._gl.depthFunc( GL.LESS );

		}

		if ( override ) {

			for ( let i = 0; i < opt.entities.length; i ++ ) {

				const mesh = opt.entities[ i ].getComponent( Mesh );

				if ( mesh ) mesh.material = restore[ i ];

			}

		}

	}

	public renderFullscreen( recipe: EditorRecipe, target: EditorTarget | null ) {

		const r = recipe as GLEditorRecipe;
		const renderer = this._renderer;

		if ( target ) {

			const fb = ( target as GLEditorTarget ).frameBuffer;
			r.pass.renderTarget = fb;

			renderer.renderPostProcess( r.postprocess, undefined, fb.size );

			return;

		}

		const ui = renderer.renderTarget.uiBuffer;
		const res = renderer.resolution;

		r.pass.renderTarget = this._fullscreenBuffer;

		renderer.renderPostProcess( r.postprocess, ui, res );
		renderer.backend.blit( this._fullscreenBuffer, ui, res.x, res.y );

	}

	public blit( src: EditorFrame, dst: EditorTarget | null, dstRect?: EditorRect ) {

		const gl = this._gl;
		const s = src as GLEditorFrame;

		// dst省略時はuiバッファへ描く（presentで画面に出る。webgpu側と同じ契約）
		const dstFrameBuffer = dst ? ( dst as GLEditorTarget ).frameBuffer : this._renderer.renderTarget.uiBuffer;
		const dstSize = dstFrameBuffer.size;

		const rect = dstRect || { x: 0, y: 0, width: dstSize.x, height: dstSize.y };

		this._readFrameBuffer.setSize( s.texture.size );

		gl.bindFramebuffer( gl.FRAMEBUFFER, this._readFrameBuffer.getFrameBuffer() );
		gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, s.textarget, s.texture.getTexture(), 0 );

		gl.bindFramebuffer( gl.READ_FRAMEBUFFER, this._readFrameBuffer.getFrameBuffer() );
		gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, dstFrameBuffer.getFrameBuffer() );

		// dstRectは左上原点。GLの下原点へ反転する
		gl.blitFramebuffer(
			0, 0, s.texture.size.x, s.texture.size.y,
			rect.x, dstSize.y - rect.y - rect.height,
			rect.x + rect.width, dstSize.y - rect.y,
			gl.COLOR_BUFFER_BIT, gl.NEAREST );

		gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null );
		gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, null );

	}

	public drawTexture( texture: unknown, target: EditorTarget ) {

		const fb = ( target as GLEditorTarget ).frameBuffer;

		this._texturePass.uniforms.uSrcTexture = { value: texture as GLP.GLPowerTexture, type: "1i" };
		this._texturePass.renderTarget = fb;

		this._renderer.renderPostProcess( this._texturePostProcess, undefined, fb.size );

	}

	// GLは同期で読めるが、契約はWebGPUに合わせて非同期で揃えている
	public async readPixels( target: EditorTarget ) {

		const gl = this._gl;
		const fb = ( target as GLEditorTarget ).frameBuffer;
		const size = fb.size;
		const buffer = new Uint8Array( size.x * size.y * 4 );

		gl.bindFramebuffer( gl.FRAMEBUFFER, fb.getFrameBuffer() );
		gl.readPixels( 0, 0, size.x, size.y, gl.RGBA, gl.UNSIGNED_BYTE, buffer );
		gl.bindFramebuffer( gl.FRAMEBUFFER, null );

		return buffer;

	}

	public present() {

		const res = this._renderer.resolution;

		if ( res.x === 0 || res.y === 0 ) return;

		this._renderer.backend.blit( this._renderer.renderTarget.uiBuffer, null, res.x, res.y );

	}

	/*-------------------------------
		Resource
	-------------------------------*/

	public createTarget( opt?: { useSceneDepth?: boolean; size?: MTP.Vector } ) {

		const frameBuffer = new GLP.GLPowerFrameBuffer( this._gl, { disableDepthBuffer: true } )
			.setTexture( [ new GLP.GLPowerTexture( this._gl ).setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ) ] );

		if ( opt && opt.useSceneDepth ) {

			frameBuffer.setDepthTexture( this._renderer.renderTarget.gBuffer.depthTexture as GLP.GLPowerTexture );

		}

		frameBuffer.setSize( opt && opt.size || this._renderer.resolution );

		const target = new GLEditorTarget( frameBuffer, ! ( opt && opt.size ) );

		this._targets.push( target );

		return target;

	}

	public resize( resolution: MTP.Vector ) {

		this._fullscreenBuffer.setSize( resolution );

		for ( let i = 0; i < this._targets.length; i ++ ) {

			const target = this._targets[ i ];

			if ( target.autoResize ) {

				target.frameBuffer.setSize( resolution );

			}

		}

		for ( let i = 0; i < this._recipes.length; i ++ ) {

			this._recipes[ i ].postprocess.resize( resolution );

		}

	}

	public onDrawPass( cb: ( frame: EditorFrame, label: string ) => void ) {

		this._renderer.on( "drawPass", ( frameBuffer?: GLP.GLPowerFrameBuffer | GLP.GLPowerFrameBufferCube, label?: string ) => {

			if ( ! frameBuffer ) return;

			const textures = frameBuffer.textures;
			const textarget = "currentFace" in frameBuffer ? frameBuffer.currentFace : GL.TEXTURE_2D;

			for ( let i = 0; i < textures.length; i ++ ) {

				const name = label ? label + ( textures.length > 1 ? "_" + i : "" ) : "";

				cb( new GLEditorFrame( textures[ i ], textarget ), name );

			}

		} );

	}

	/*-------------------------------
		Recipes
	-------------------------------*/

	public materials = {

		flat: ( opt: { color: number[]; lines?: boolean; depthTest?: boolean; depthWrite?: boolean } ): MaterialContract => new Material( {
			vert: flatVert,
			frag: flatFrag,
			phase: [ "forward" ],
			drawType: opt.lines ? 'LINES' : 'TRIANGLES',
			depthTest: opt.depthTest ?? true,
			depthWrite: opt.depthWrite ?? true,
			uniforms: { uColor: { value: opt.color, type: '3fv' } },
		} ),

		mask: (): MaterialContract => new Material( {
			vert: maskVert,
			frag: maskFrag,
			phase: [ "forward" ],
			depthTest: false,
		} ),

		// 半透明で重ねるので深度は読むだけにする
		grid: ( opt: { color: number[]; params: number[] } ): MaterialContract => new Material( {
			vert: flatVert,
			frag: gridFrag,
			phase: [ "forward" ],
			depthWrite: false,
			uniforms: {
				uColor: { value: opt.color, type: '3fv' },
				uParams: { value: opt.params, type: '3fv' },
			},
		} ),

	};

	public recipes = {

		outline: ( mask: EditorTarget, color: number[] ): EditorRecipe => {

			const pass = new PostProcessPass( this._renderer.backend, {
				frag: outlineFrag,
				// 描画先はrenderFullscreenの引数で決まる
				renderTarget: null,
				uniforms: {
					uMaskTexture: { value: ( mask as GLEditorTarget ).texture, type: '1i' },
					uOutlineColor: { value: new MTP.Vector( color[ 0 ], color[ 1 ], color[ 2 ] ), type: '3fv' },
				},
			} );

			const recipe = new GLEditorRecipe( "editorOutline", pass );

			this._recipes.push( recipe );

			return recipe;

		},

	};

}

// エディタ描画のGL実装を組み立てる（@or-rendererの供給口）
export const createEditorDraw = ( engine: EngineContract<Renderer> ): EditorDrawContract => new GLEditorDraw( engine.renderer );
