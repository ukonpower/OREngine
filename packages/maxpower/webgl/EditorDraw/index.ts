import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Mesh } from '../../core/Components/Mesh';
import { EditorDrawContract, EditorFrame, EditorRect, EditorRecipe, EditorRenderEntitiesParam, EditorTarget } from '../../core/Contracts/EditorDrawContract';
import { GL } from '../backend/GLBackend';
import { Material } from '../Material';
import { PostProcess } from '../PostProcess';
import { PostProcessPass } from '../PostProcess/PostProcessPass';
import { Renderer } from '../Renderer';
import { RenderView } from '../Renderer/RenderView';

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
	public texture: GLP.GLPowerTexture;
	// キューブマップのフェイス指定を含むアタッチ先
	public readonly textarget: number;

	constructor( texture: GLP.GLPowerTexture, textarget: number ) {

		this.texture = texture;
		this.textarget = textarget;

	}

}

// 描画先ターゲット。解像度追従のものは、使うビューの大きさに合わせて実体を切り替える
class GLEditorTarget extends GLEditorFrame implements EditorTarget {

	public readonly isEditorTarget = true;
	public frameBuffer: GLP.GLPowerFrameBuffer;
	// sizeを指定せず作られたターゲットは解像度に追従する
	public readonly autoResize: boolean;

	private _gl: WebGL2RenderingContext;

	// サイズ別の実体（キーは "幅x高さ"）。Screen パネルごとに解像度が違うと同じターゲットを
	// パネル間で交互に使うので、毎回作り直さずに済むよう作り置きして切り替える
	private _entries: Map<string, GLP.GLPowerFrameBuffer>;

	constructor( gl: WebGL2RenderingContext, size: MTP.Vector, autoResize: boolean ) {

		const frameBuffer = createFrameBuffer( gl, size );

		super( frameBuffer.textures[ 0 ], GL.TEXTURE_2D );

		this.frameBuffer = frameBuffer;
		this.autoResize = autoResize;
		this._gl = gl;
		this._entries = new Map( [[ sizeKey( frameBuffer.size ), frameBuffer ]] );

	}

	// 指定サイズの実体を使う。無ければ作る
	public setSize( size: MTP.Vector ) {

		const key = sizeKey( size );

		if ( key === sizeKey( this.frameBuffer.size ) ) return;

		let frameBuffer = this._entries.get( key );

		if ( ! frameBuffer ) {

			frameBuffer = createFrameBuffer( this._gl, size );
			this._entries.set( key, frameBuffer );

		}

		this.frameBuffer = frameBuffer;
		this.texture = frameBuffer.textures[ 0 ];

	}

	// 作り置きを捨てて、指定サイズの実体だけにする（解像度の設定が変わって古いサイズが要らなくなったとき）
	public reset( size: MTP.Vector ) {

		const key = sizeKey( size );
		const keep = this._entries.get( key ) || createFrameBuffer( this._gl, size );

		this._entries.forEach( ( frameBuffer, k ) => {

			if ( k === key ) return;

			// 深度はビューの G-Buffer から借りている（renderEntities の useSceneDepth）ので、色テクスチャと FBO だけ捨てる
			frameBuffer.textures[ 0 ].dispose();
			frameBuffer.dispose();

		} );

		this._entries = new Map( [[ key, keep ]] );
		this.frameBuffer = keep;
		this.texture = keep.textures[ 0 ];

	}

}

const sizeKey = ( size: MTP.Vector ) => `${Math.max( Math.floor( size.x ), 1 )}x${Math.max( Math.floor( size.y ), 1 )}`;

const createFrameBuffer = ( gl: WebGL2RenderingContext, size: MTP.Vector ) => {

	const frameBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } )
		.setTexture( [ new GLP.GLPowerTexture( gl ).setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ) ] );

	frameBuffer.setSize( Math.max( Math.floor( size.x ), 1 ), Math.max( Math.floor( size.y ), 1 ) );

	return frameBuffer;

};

class GLEditorRecipe implements EditorRecipe {

	public readonly isEditorRecipe = true;
	public readonly postprocess: PostProcess;
	public readonly pass: PostProcessPass;
	// マスクの実体は描くビューの大きさで切り替わるので、描く直前に uniform へ入れ直す
	public readonly mask: GLEditorTarget;

	constructor( name: string, pass: PostProcessPass, mask: GLEditorTarget ) {

		this.pass = pass;
		this.mask = mask;
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

	// blitのsrcを任意テクスチャに差し替えるための読み出し用FB
	private _readFrameBuffer: GLP.GLPowerFrameBuffer;
	// uiバッファは読み書きを同時にできないため、フルスクリーンパスはここを経由して戻す
	private _fullscreenTarget: GLEditorTarget;

	private _texturePass: PostProcessPass;
	private _texturePostProcess: PostProcess;

	// readView の転写先。使われるまで作らない
	private _viewTarget: GLEditorTarget | null;

	constructor( renderer: Renderer ) {

		this._renderer = renderer;
		this._gl = renderer.backend.gl;

		this._targets = [];

		this._readFrameBuffer = new GLP.GLPowerFrameBuffer( this._gl, { disableDepthBuffer: true } );

		this._fullscreenTarget = new GLEditorTarget( this._gl, renderer.resolution, true );

		this._texturePass = new PostProcessPass( renderer.backend, { frag: textureFrag, renderTarget: null } );
		this._texturePostProcess = new PostProcess( { name: "editorTexture", passes: [ this._texturePass ] } );

		this._viewTarget = null;

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	public renderEntities( opt: EditorRenderEntitiesParam ) {

		const renderer = this._renderer;
		const view = opt.view as RenderView;

		if ( opt.target ) this._fitToView( opt.target as GLEditorTarget, view );

		const target = opt.target ? ( opt.target as GLEditorTarget ).frameBuffer : view.renderTarget.uiBuffer;
		const override = opt.materialOverride as Material | undefined;
		const restore: ( MaterialContract | null )[] = [];

		// シーン深度はビューごとに違うので、描く直前にそのビューの G-Buffer から借りる
		if ( opt.target && opt.useSceneDepth ) {

			target.setDepthTexture( view.renderTarget.gBuffer.depthTexture );

		}

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

		// renderCamera はブレンド状態を触らないので、ランタイムの ui パスと同じくここで有効にする。
		// グリッドのような半透明マテリアルが α を無視して上書きされるのを防ぐ
		renderer.backend.setBlendEnabled( true );

		renderer.renderCamera(
			"forward",
			opt.camera,
			opt.entities,
			target,
			view.resolution,
			// uiバッファへはシーンの上に重ねるためクリアせず、自前ターゲットは毎回クリアする
			{ disableClear: opt.target === null }
		);

		renderer.backend.setBlendEnabled( false );

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

	public renderFullscreen( view: RenderView, recipe: EditorRecipe, target: EditorTarget | null ) {

		const r = recipe as GLEditorRecipe;
		const renderer = this._renderer;

		this._fitToView( r.mask, view );

		r.pass.uniforms.uMaskTexture.value = r.mask.texture;

		if ( target ) {

			const dst = target as GLEditorTarget;

			this._fitToView( dst, view );

			const fb = dst.frameBuffer;

			this._setPassResolution( r.pass, fb.size );
			r.pass.renderTarget = fb;

			renderer.renderPostProcess( r.postprocess, undefined, fb.size );

			return;

		}

		const ui = view.renderTarget.uiBuffer;
		const res = view.resolution;

		this._fullscreenTarget.setSize( res );
		this._setPassResolution( r.pass, res );
		r.pass.renderTarget = this._fullscreenTarget.frameBuffer;

		renderer.renderPostProcess( r.postprocess, ui, res );
		renderer.backend.blit( this._fullscreenTarget.frameBuffer, ui, res.x, res.y );

	}

	public blit( view: RenderView, src: EditorFrame, dst: EditorTarget | null, dstRect?: EditorRect ) {

		const gl = this._gl;
		const s = src as GLEditorFrame;

		if ( dst ) this._fitToView( dst as GLEditorTarget, view );

		// dst省略時はuiバッファへ描く（drawToCanvas で画面に出る。webgpu側と同じ契約）
		const dstFrameBuffer = dst ? ( dst as GLEditorTarget ).frameBuffer : view.renderTarget.uiBuffer;
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

	public drawToCanvas( view: RenderView, canvas: HTMLCanvasElement ) {

		const renderer = this._renderer;
		const res = view.resolution;

		// GL コンテキストは renderer の canvas に縛られていて他の canvas へ直接描けないので、
		// いったん default framebuffer へ出してから 2D で写す（preserveDrawingBuffer 済みなので同期で読める）
		renderer.backend.blit( view.renderTarget.uiBuffer, null, res.x, res.y );

		if ( canvas !== renderer.canvas ) {

			// ビューが renderer の canvas より小さいと、default framebuffer の左下（GLの原点）にだけ描かれる。
			// drawImage は左上原点なので、その矩形を下端から切り出す
			const sy = renderer.canvas.height - res.y;

			canvas.getContext( '2d' )!.drawImage( renderer.canvas, 0, sy, res.x, res.y, 0, 0, res.x, res.y );

		}

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

	// uiBuffer をターゲットへ写してから readPixels で読む（読み戻しの経路を webgpu 側と揃えるため）
	public readView( view: RenderView ) {

		if ( ! this._viewTarget ) this._viewTarget = this.createTarget();

		this.blit( view, new GLEditorFrame( view.renderTarget.uiBuffer.textures[ 0 ], GL.TEXTURE_2D ), this._viewTarget );

		return this.readPixels( this._viewTarget );

	}

	/*-------------------------------
		Resource
	-------------------------------*/

	public createTarget( opt?: { size?: MTP.Vector } ) {

		const target = new GLEditorTarget( this._gl, opt && opt.size || this._renderer.resolution, ! ( opt && opt.size ) );

		this._targets.push( target );

		return target;

	}

	// 解像度追従のターゲットは使うビューの大きさへ都度合わせるので、ここでは作り置きを捨てるだけにする
	public resize( resolution: MTP.Vector ) {

		this._fullscreenTarget.reset( resolution );

		for ( let i = 0; i < this._targets.length; i ++ ) {

			const target = this._targets[ i ];

			if ( target.autoResize ) target.reset( resolution );

		}

	}

	// 解像度追従のターゲットを、描画先ビューの大きさに合わせる
	private _fitToView( target: GLEditorTarget, view: RenderView ) {

		if ( ! target.autoResize ) return;

		target.setSize( view.resolution );

	}

	// PostProcessPass.resize は描画先の作り直しまで行うので、uPPResolution の値だけ書き換える
	private _setPassResolution( pass: PostProcessPass, size: MTP.Vector ) {

		pass.resolution.copy( size );
		pass.resolutionInv.set( 1.0 / size.x, 1.0 / size.y );

	}

	public onDrawPass( cb: ( frame: EditorFrame, label: string ) => void ) {

		const listener = ( frameBuffer?: GLP.GLPowerFrameBuffer | GLP.GLPowerFrameBufferCube, label?: string ) => {

			if ( ! frameBuffer ) return;

			const textures = frameBuffer.textures;
			const textarget = "currentFace" in frameBuffer ? frameBuffer.currentFace : GL.TEXTURE_2D;

			for ( let i = 0; i < textures.length; i ++ ) {

				const name = label ? label + ( textures.length > 1 ? "_" + i : "" ) : "";

				cb( new GLEditorFrame( textures[ i ], textarget ), name );

			}

		};

		this._renderer.on( "drawPass", listener );

		return () => this._renderer.off( "drawPass", listener );

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

			return new GLEditorRecipe( "editorOutline", pass, mask as GLEditorTarget );

		},

	};

}

// エディタ描画のGL実装を組み立てる（@or-rendererの供給口）
export const createEditorDraw = ( engine: EngineContract<Renderer> ): EditorDrawContract => new GLEditorDraw( engine.renderer );
