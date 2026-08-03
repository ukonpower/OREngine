import * as GLP from 'glpower';

import { SCENE_FORMAT } from '../Bindings';
import { onShaderReload, requestShaderReload } from '../hotReload';
import { Material } from '../Material';

import { EditorPass } from './EditorPass';
import copyWgsl from './shaders/copy.wgsl';
import flatWgsl from './shaders/flat.wgsl';
import maskWgsl from './shaders/mask.wgsl';
import outlineWgsl from './shaders/outline.wgsl';

import type { EditorDraw, EditorFrame, EditorRect, EditorRecipe, EditorRenderEntitiesParam, EditorTarget } from '../../core/EditorDraw';
import type { EngineContract } from '../../core/Engine';
import type { MaterialBase } from '../../core/Material';
import type { Renderer } from '../Renderer';

// HMRで差し替わるシェーダーソース。playerでは初期値のまま使われる
let hotCopyWgsl = copyWgsl;
let hotOutlineWgsl = outlineWgsl;

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/copy.wgsl', ( m ) => {

		if ( m ) hotCopyWgsl = m.default;

		requestShaderReload();

	} );

	import.meta.hot.accept( './shaders/outline.wgsl', ( m ) => {

		if ( m ) hotOutlineWgsl = m.default;

		requestShaderReload();

	} );

}

/*-------------------------------
	エディタ描画のWebGPU実装

	重ね描きの流れは webgl 側と同じで、レンダラーが最後に画面へ出したテクスチャ（uiView）へ
	gizmo / wireframe / outline を描き足し、present で出し直す。

	中間ターゲットはすべてシーンと同じ rgba16float に揃えている。
	エディタ用マテリアルのパイプラインを書式ごとに増やさずに済み、
	blit の転写元と転写先の書式も常に一致するため。
-------------------------------*/

const TARGET_USAGE = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_SRC;

class GPUEditorFrame implements EditorFrame {

	public readonly isEditorFrame = true;
	public view: GPUTextureView;
	public width: number;
	public height: number;

	constructor( view: GPUTextureView, width: number, height: number ) {

		this.view = view;
		this.width = width;
		this.height = height;

	}

}

class GPUEditorTarget extends GPUEditorFrame implements EditorTarget {

	public readonly isEditorTarget = true;
	public texture: GPUTexture | null;
	// sizeを指定せず作られたターゲットは解像度に追従する
	public readonly autoResize: boolean;
	public readonly useSceneDepth: boolean;

	constructor( texture: GPUTexture | null, autoResize: boolean, useSceneDepth: boolean ) {

		super( texture ? texture.createView() : ( null as unknown as GPUTextureView ), texture ? texture.width : 0, texture ? texture.height : 0 );

		this.texture = texture;
		this.autoResize = autoResize;
		this.useSceneDepth = useSceneDepth;

	}

	public setTexture( texture: GPUTexture ) {

		this.texture?.destroy();

		this.texture = texture;
		this.view = texture.createView();
		this.width = texture.width;
		this.height = texture.height;

	}

}

class GPUEditorRecipe implements EditorRecipe {

	public readonly isEditorRecipe = true;
	public readonly mask: GPUEditorTarget;
	public readonly uniforms: GLP.Uniforms;

	constructor( mask: GPUEditorTarget, color: number[] ) {

		this.mask = mask;
		this.uniforms = {
			uResolution: { value: new GLP.Vector(), type: '2fv' },
			uOutlineColor: { value: new GLP.Vector( color[ 0 ], color[ 1 ], color[ 2 ] ), type: '3fv' },
		};

	}

}

export class WebGPUEditorDraw implements EditorDraw {

	private _renderer: Renderer;
	private _resolution: GLP.Vector;

	private _targets: GPUEditorTarget[];

	// uiバッファは読み書きを同時にできないため、フルスクリーンパスはここを経由して戻す
	private _fullscreenTarget: GPUEditorTarget;

	private _copyPass: EditorPass | null;
	private _outlinePass: EditorPass | null;

	constructor( renderer: Renderer ) {

		this._renderer = renderer;
		this._resolution = new GLP.Vector();
		this._targets = [];
		this._fullscreenTarget = new GPUEditorTarget( null, true, false );
		this._copyPass = null;
		this._outlinePass = null;

		if ( import.meta.hot ) {

			// パスを捨てておけば、次に使われるときに差し替え済みのソースで作り直される
			onShaderReload( () => {

				this._copyPass?.dispose();
				this._outlinePass?.dispose();
				this._copyPass = null;
				this._outlinePass = null;

			} );

		}

	}

	// deviceはレンダラーの初期化が終わるまで存在しないので、最初に触ったときに組み立てる
	private _ready() {

		const device = this._renderer.device;

		if ( ! device ) return null;

		if ( ! this._copyPass ) {

			this._copyPass = new EditorPass( device, {
				name: 'editor/copy',
				wgsl: hotCopyWgsl,
				inputCount: 1,
				format: SCENE_FORMAT,
			} );

			this._outlinePass = new EditorPass( device, {
				name: 'editor/outline',
				wgsl: hotOutlineWgsl,
				inputCount: 2,
				format: SCENE_FORMAT,
				uniforms: {
					uResolution: { value: new GLP.Vector(), type: '2fv' },
					uOutlineColor: { value: new GLP.Vector(), type: '3fv' },
				},
			} );

			// device待ちの間に作られたターゲットにここで実体を持たせる
			this._allocate( device, this._fullscreenTarget, this._renderer.resolution );

			for ( let i = 0; i < this._targets.length; i ++ ) {

				const target = this._targets[ i ];

				if ( ! target.texture ) this._allocate( device, target, this._renderer.resolution );

			}

		}

		return device;

	}

	private _allocate( device: GPUDevice, target: GPUEditorTarget, size: GLP.Vector ) {

		target.setTexture( device.createTexture( {
			label: 'editorTarget',
			size: [ Math.max( Math.floor( size.x ), 1 ), Math.max( Math.floor( size.y ), 1 ) ],
			format: SCENE_FORMAT,
			usage: TARGET_USAGE,
		} ) );

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	public renderEntities( opt: EditorRenderEntitiesParam ) {

		const device = this._ready();

		if ( ! device ) return;

		const target = opt.target as GPUEditorTarget | null;
		const view = target ? target.view : this._renderer.uiView;

		if ( ! view ) return;

		this._renderer.renderEditorEntities( {
			entities: opt.entities,
			view,
			format: SCENE_FORMAT,
			// uiへの重ね描きと、シーン深度を借りたターゲットだけ深度テストする
			depthView: ( target === null || target.useSceneDepth ) ? this._renderer.sceneDepthView : null,
			// uiバッファへはシーンの上に重ねるためクリアせず、自前ターゲットは毎回クリアする
			clear: target !== null,
			material: ( opt.materialOverride as Material | undefined ) || null,
			depthCompare: opt.depthCompare || 'less',
		} );

	}

	public renderFullscreen( recipe: EditorRecipe, target: EditorTarget | null ) {

		const device = this._ready();

		if ( ! device || ! this._outlinePass || ! this._copyPass ) return;

		const r = recipe as GPUEditorRecipe;
		const dst = target as GPUEditorTarget | null;
		const view = dst ? dst.view : this._renderer.uiView;

		if ( ! view || ! r.mask.view || ! this._fullscreenTarget.view ) return;

		( r.uniforms.uResolution.value as GLP.Vector ).set(
			dst ? dst.width : this._resolution.x,
			dst ? dst.height : this._resolution.y
		);

		// 読み書きが同じテクスチャにならないよう、経由バッファへ描いてから戻す
		this._outlinePass.render( this._fullscreenTarget.view, [ view, r.mask.view ], { uniforms: r.uniforms, clear: true } );
		this._copyPass.render( view, [ this._fullscreenTarget.view ], { clear: true } );

	}

	public blit( src: EditorFrame, dst: EditorTarget | null, dstRect?: EditorRect ) {

		const device = this._ready();

		if ( ! device || ! this._copyPass ) return;

		const s = src as GPUEditorFrame;
		const target = dst as GPUEditorTarget | null;
		const view = target ? target.view : this._renderer.uiView;

		if ( ! view || ! s.view ) return;

		let rect = dstRect;

		// WebGPUのsetViewportは範囲外を許さないため、GLのviewportと同じ寛容さになるよう
		// ターゲット内へ収め、空になった転写はスキップする
		if ( rect ) {

			const w = target ? target.width : this._renderer.resolution.x;
			const h = target ? target.height : this._renderer.resolution.y;
			const x = Math.min( Math.max( rect.x, 0 ), w );
			const y = Math.min( Math.max( rect.y, 0 ), h );
			const width = Math.min( rect.width, w - x );
			const height = Math.min( rect.height, h - y );

			// 否定形で比較し、NaNの混入もここで弾く（setViewportはnon-finiteをエラーにする）
			if ( ! ( width > 0 ) || ! ( height > 0 ) ) return;

			rect = { x, y, width, height };

		}

		// フレーム記録中（drawPass通知経由）はレンダラーのencoderへ差し込み、
		// パス出力直後の内容を写す。フレーム外では自前でsubmitする
		this._copyPass.render( view, [ s.view ], { rect, encoder: this._renderer.frameEncoder || undefined } );

	}

	public drawTexture( texture: unknown, target: EditorTarget ) {

		const device = this._ready();
		const dst = target as GPUEditorTarget;

		if ( ! device || ! this._copyPass || ! dst.view ) return;

		const source = texture as { createView?: () => GPUTextureView };

		// テクスチャリソースはまだ webgl 専用（TexProcedural）なので、webgpuプロジェクトでは
		// ここに来ない。来た場合もゴミが残らないようターゲットを空にしておく
		if ( ! source || typeof source.createView !== 'function' ) {

			this._clear( device, dst.view );

			return;

		}

		this._copyPass.render( dst.view, [ source.createView() ], { clear: true } );

	}

	private _clear( device: GPUDevice, view: GPUTextureView ) {

		const encoder = device.createCommandEncoder();

		encoder.beginRenderPass( {
			label: 'editorClear',
			colorAttachments: [ {
				view,
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: 'clear',
				storeOp: 'store',
			} ],
		} ).end();

		device.queue.submit( [ encoder.finish() ] );

	}

	// WebGPUの読み戻しはバッファのマッピング待ちが要るため非同期。契約側も Promise で揃えている
	public async readPixels( target: EditorTarget ) {

		const device = this._ready();
		const t = target as GPUEditorTarget;

		if ( ! device || ! t.texture ) return new Uint8Array( Math.max( t.width * t.height * 4, 4 ) );

		// copyTextureToBuffer は行あたり256バイト境界を要求する
		const bytesPerRow = Math.ceil( t.width * 8 / 256 ) * 256;

		const buffer = device.createBuffer( {
			label: 'editorReadback',
			size: bytesPerRow * t.height,
			usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
		} );

		const encoder = device.createCommandEncoder();

		encoder.copyTextureToBuffer(
			{ texture: t.texture },
			{ buffer, bytesPerRow },
			{ width: t.width, height: t.height }
		);

		device.queue.submit( [ encoder.finish() ] );

		await buffer.mapAsync( GPUMapMode.READ );

		const source = new Uint16Array( buffer.getMappedRange() );
		const out = new Uint8Array( t.width * t.height * 4 );

		// 読み出し結果は行0が上。共有側がGLの下原点前提で反転するので、ここで揃えておく
		for ( let y = 0; y < t.height; y ++ ) {

			const row = ( t.height - 1 - y ) * bytesPerRow / 2;

			for ( let x = 0; x < t.width * 4; x ++ ) {

				const v = halfToFloat( source[ row + x ] );

				out[ y * t.width * 4 + x ] = Math.round( Math.min( Math.max( v, 0 ), 1 ) * 255 );

			}

		}

		buffer.unmap();
		buffer.destroy();

		return out;

	}

	public present() {

		this._renderer.presentToCanvas();

	}

	/*-------------------------------
		Resource
	-------------------------------*/

	public createTarget( opt?: { useSceneDepth?: boolean; size?: GLP.Vector } ) {

		const device = this._ready();
		const size = opt && opt.size || this._renderer.resolution;
		const target = new GPUEditorTarget( null, ! ( opt && opt.size ), !! ( opt && opt.useSceneDepth ) );

		if ( device ) this._allocate( device, target, size );

		this._targets.push( target );

		return target;

	}

	public resize( resolution: GLP.Vector ) {

		this._resolution.copy( resolution );

		const device = this._ready();

		if ( ! device ) return;

		this._allocate( device, this._fullscreenTarget, resolution );

		for ( let i = 0; i < this._targets.length; i ++ ) {

			const target = this._targets[ i ];

			if ( target.autoResize ) this._allocate( device, target, resolution );

		}

	}

	public onDrawPass( cb: ( frame: EditorFrame, label: string ) => void ) {

		this._renderer.on( 'drawPass', ( view?: GPUTextureView, width?: number, height?: number, label?: string ) => {

			if ( ! view ) return;

			cb( new GPUEditorFrame( view, width || 1, height || 1 ), label || '' );

		} );

	}

	/*-------------------------------
		Recipes
	-------------------------------*/

	public materials = {

		flat: ( opt: { color: number[]; lines?: boolean; depthTest?: boolean; depthWrite?: boolean } ): MaterialBase => new Material( {
			name: 'editorFlat',
			wgsl: flatWgsl,
			phase: [ 'forward' ],
			drawType: opt.lines ? 'LINES' : 'TRIANGLES',
			depthTest: opt.depthTest ?? true,
			depthWrite: opt.depthWrite ?? true,
			// colorは参照のまま保持し、書き換えが描画に反映されるようにする
			uniforms: { uColor: { value: opt.color, type: '3fv' } },
		} ),

		mask: (): MaterialBase => new Material( {
			name: 'editorMask',
			wgsl: maskWgsl,
			phase: [ 'forward' ],
			depthTest: false,
		} ),

	};

	public recipes = {

		outline: ( mask: EditorTarget, color: number[] ): EditorRecipe =>
			new GPUEditorRecipe( mask as GPUEditorTarget, color ),

	};

}

// 16bit float を数値へ戻す（読み戻した rgba16float を8bitへ詰め直すため）
const halfToFloat = ( value: number ) => {

	const sign = ( value & 0x8000 ) ? - 1 : 1;
	const exponent = ( value & 0x7C00 ) >> 10;
	const fraction = value & 0x03FF;

	if ( exponent === 0 ) return sign * Math.pow( 2, - 14 ) * ( fraction / 1024 );

	if ( exponent === 0x1F ) return fraction ? NaN : sign * Infinity;

	return sign * Math.pow( 2, exponent - 15 ) * ( 1 + fraction / 1024 );

};

// エディタ描画のWebGPU実装を組み立てる（@or-rendererの供給口）
export const createEditorDraw = ( engine: EngineContract<Renderer> ): EditorDraw => new WebGPUEditorDraw( engine.renderer );
