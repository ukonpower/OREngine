import * as BSP from 'basepower';
import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Camera } from '../../core/Components/Camera';
import { Mesh } from '../../core/Components/Mesh';
import { Entity, EntityUpdateEvent } from '../../core/Entity';
import { GLBackend } from '../backend/GLBackend';
import basicFrag from '../Material/shaders/basic.fs';
import { RenderCore, RenderStack, getMaterial } from '../Renderer/RenderCore';

import basicLitFrag from './shaders/basicLit.fs';

import type { EngineContract } from '../../core/Contracts/EngineContract';
import type { RendererContract } from '../../core/Contracts/RendererContract';
import type { PipelineConfig, RenderViewContract, RenderViewOptions } from '../../core/Contracts/RenderViewContract';

/*-------------------------------
	軽量レンダラー

	deferred を通らず、マテリアルのシェーダーの中でライト・影・環境光・トーンマップまで済ませて直接描く。
	G バッファ・SSAO・環境マップ・後処理を持たないので、その分のフレーム時間とコードがかからない。
	シャドウマップと1回分の描画は Renderer と同じ土台（RenderCore）を使う。

	- deferred のマテリアルは「不透明の forward」として IS_FORWARD_LIT を付けて描く。
	  シェーダーが lite_h / lite_out の part を入れていればライティングされ、入れていなければ outColor がそのまま出る
	- Material の既定のシェーダーは、ライティングを足したもの（shaders/basicLit.fs）に差し替えて描く
	- 環境光は空の2色（sky/skyColor・sky/groundColor）を向きで混ぜるだけで、環境マップは持たない
	- forward・ui のマテリアルは Renderer と同じ IS_FORWARD で描く（背後の画像・G バッファのテクスチャは渡らず、トーンマップも掛からない）
-------------------------------*/

// sky / toneMap の既定値。Renderer の空（Sky）・パイプライン設定の既定値と同じにして、同じシーンのデータを読んだときの見え方を寄せる
const DEFAULT_SKY_COLOR = [ 1.0, 1.0, 1.0 ];
const DEFAULT_GROUND_COLOR = [ 0.3, 0.3, 0.3 ];
const DEFAULT_SKY_INTENSITY = 1.0;
const DEFAULT_TONE_MAP = true;
const DEFAULT_EXPOSURE = 0;

const byRenderOrder = ( a: Entity, b: Entity ) => getMaterial( a.getComponent( Mesh )! ).renderOrder - getMaterial( b.getComponent( Mesh )! ).renderOrder;

type LiteRenderViewParams = {
	backend: GLBackend;
	offscreen: boolean;
	onDispose: ( view: LiteRenderView ) => void;
}

// offscreen のビューの描画先。エディタの重ね描き（EditorDraw）が Renderer のビュー（RenderCameraTarget）と同じ名前で読む。
// uiBuffer が最終出力、gBuffer はシーンの深度を持つもの。軽量レンダラーは1枚に直接描くので、どちらも同じフレームバッファを指す
export type LiteRenderTarget = {
	uiBuffer: GLP.GLPowerFrameBuffer;
	gBuffer: GLP.GLPowerFrameBuffer;
}

// 視点ごとの設定と、offscreen のときの描画先。G バッファなどの視点ごとの資源は持たない
export class LiteRenderView implements RenderViewContract {

	public camera: Entity | null;
	// 軽量レンダラーには切り替えるパスが無いので、受け取るだけで使わない
	public pipelineOverride: PipelineConfig | null;
	public size: MTP.Vector | null;

	// 最後に描いたときの解像度
	public readonly resolution: MTP.Vector;

	// canvas へ直接出すビューでは null
	public readonly renderTarget: LiteRenderTarget | null;

	private _onDispose: ( view: LiteRenderView ) => void;

	constructor( params: LiteRenderViewParams ) {

		this.camera = null;
		this.pipelineOverride = null;
		this.size = null;
		this.resolution = new MTP.Vector();
		this._onDispose = params.onDispose;

		if ( params.offscreen ) {

			const frameBuffer = params.backend.createFrameBuffer().setTexture( [ params.backend.createTexture() ] );

			this.renderTarget = { uiBuffer: frameBuffer, gBuffer: frameBuffer };

		} else {

			this.renderTarget = null;

		}

	}

	// 描画先を解像度に合わせる
	public fit( resolution: MTP.Vector ) {

		if ( this.resolution.x === resolution.x && this.resolution.y === resolution.y ) return;

		this.resolution.copy( resolution );

		if ( this.renderTarget ) {

			this.renderTarget.uiBuffer.setSize( resolution );

		}

	}

	public dispose() {

		if ( this.renderTarget ) {

			this.renderTarget.uiBuffer.textures.forEach( ( texture ) => texture.dispose() );
			this.renderTarget.uiBuffer.dispose();

		}

		this._onDispose( this );

	}

}

// 描画対象の振り分け・ライトの収集・1回分の描画は、Renderer と共有する土台（RenderCore）が持つ
export class LiteRenderer extends RenderCore implements RendererContract {

	// views

	private _views: LiteRenderView[];

	// frame（prepareScene で集め、同フレームの render が使う）

	private _stack: RenderStack;

	// sky / toneMap

	private _skyColor: MTP.Vector;
	private _groundColor: MTP.Vector;
	private _skyIntensity: number;
	private _toneMap: boolean;
	private _exposure: number;

	// マテリアルへ渡す環境光・トーンマップの uniform（lite_h.part.glsl の宣言と一致させる）

	private _litUniforms: BSP.Uniforms;
	private _litSkyColor: MTP.Vector;
	private _litGroundColor: MTP.Vector;

	constructor( backend: GLBackend, _engine: EngineContract ) {

		super( backend );

		this._views = [];
		this._stack = this._createRenderStack();

		// sky / toneMap

		this._skyColor = new MTP.Vector();
		this._groundColor = new MTP.Vector();
		this._skyIntensity = DEFAULT_SKY_INTENSITY;
		this._toneMap = DEFAULT_TONE_MAP;
		this._exposure = DEFAULT_EXPOSURE;
		this._resetSettings();

		this._litSkyColor = new MTP.Vector();
		this._litGroundColor = new MTP.Vector();

		this._litUniforms = {
			uLiteSkyColor: { value: this._litSkyColor, type: '3fv' },
			uLiteGroundColor: { value: this._litGroundColor, type: '3fv' },
			uLiteToneMap: { value: 1, type: '1f' },
			uLiteExposure: { value: 1, type: '1f' },
		};

		// フィールド名は Renderer と同じにして、シーンの renderer の設定をそのまま読めるようにする

		const skyDir = this.fieldDir( "sky" );

		skyDir.field( "skyColor",
			() => this._skyColor.getElm( "vec3" ),
			( v: number[] ) => {

				this._skyColor.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: "color" } }
		);

		skyDir.field( "groundColor",
			() => this._groundColor.getElm( "vec3" ),
			( v: number[] ) => {

				this._groundColor.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: "color" } }
		);

		skyDir.field( "intensity",
			() => this._skyIntensity,
			( v: number ) => {

				this._skyIntensity = v;

			},
			{ step: 0.1 }
		);

		const toneMapDir = this.fieldDir( "pipeline" ).dir( "toneMap" );

		toneMapDir.field( "enabled", () => this._toneMap, ( v: boolean ) => {

			this._toneMap = v;

		} );

		toneMapDir.field( "exposure", () => this._exposure, ( v: number ) => {

			this._exposure = v;

		}, { step: 0.1 } );

	}

	/*-------------------------------
		View
	-------------------------------*/

	public createView( opt?: RenderViewOptions ): LiteRenderView {

		let offscreen = false;

		if ( opt && opt.offscreen ) {

			offscreen = true;

		}

		const view = new LiteRenderView( {
			backend: this.backend,
			offscreen,
			onDispose: ( v ) => {

				this._views.splice( this._views.indexOf( v ), 1 );

			},
		} );

		this._views.push( view );

		return view;

	}

	/*-------------------------------
		PrepareScene
	-------------------------------*/

	// フレーム1回。描画対象の収集と、視点に依らない資源（ライト・spot のシャドウ）の更新
	public prepareScene( root: Entity, _event: EntityUpdateEvent ) {

		if ( this.resolution.x === 0 || this.resolution.y === 0 ) return;

		if ( import.meta.env.DEV ) {

			const timerResults = this.backend.collectTimerQueries();

			if ( timerResults ) {

				this.emit( "timer", [ timerResults ] );

			}

		}

		const stack = this._stack = this._createRenderStack();
		this._sceneCamera = null;

		this._collectRenderStack( root, true, stack );

		stack.forward.sort( byRenderOrder );
		stack.transparent.sort( byRenderOrder );

		// 既定のシェーダーのマテリアルを、ライティング付きのものへ差し替える。
		// basicLit.fs は IS_FORWARD_LIT 以外のパスでは basic.fs と同じ中身なので、差し替えたままにしてよい
		for ( let i = 0; i < stack.deferred.length; i ++ ) {

			const material = getMaterial( stack.deferred[ i ].getComponent( Mesh )! );

			if ( material.frag === basicFrag ) {

				material.frag = basicLitFrag;
				material.requestUpdate();

			}

		}

		// directional は描くビューのカメラ基準で範囲が変わるので、render でビューごとに描く
		const shadowMapLightList = this._collectLights( stack.light );

		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const info = shadowMapLightList[ i ];

			this.renderCamera( "shadowMap", info.component.entity, stack.shadowMap, info.renderTarget!, this.resolution );

		}

		// 環境光・トーンマップの uniform

		this._litSkyColor.copy( this._skyColor ).multiply( this._skyIntensity );
		this._litGroundColor.copy( this._groundColor ).multiply( this._skyIntensity );
		this._litUniforms.uLiteToneMap.value = this._toneMap ? 1 : 0;
		// 露出を EV で受け、トーンマップ前に掛ける倍率 2^exposure にする（PipelinePostProcess の setExposure と同じ）
		this._litUniforms.uLiteExposure.value = Math.pow( 2, this._exposure );

	}

	/*-------------------------------
		Render
	-------------------------------*/

	// view の視点でシーンを描く。出力は view の renderTarget（offscreen）か canvas。prepareScene の後に呼ぶ
	public render( viewContract: RenderViewContract, _event: EntityUpdateEvent ) {

		const view = viewContract as LiteRenderView;

		view.fit( view.size || this.resolution );

		const resolution = view.resolution;

		if ( resolution.x === 0 || resolution.y === 0 ) return;

		const cameraEntity = view.camera || this._sceneCamera;

		if ( ! cameraEntity ) return;

		const cameraComponent = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ];

		if ( ! cameraComponent ) return;

		const stack = this._stack;
		let output: GLP.GLPowerFrameBuffer | null = null;

		if ( view.renderTarget ) {

			output = view.renderTarget.uiBuffer;

		}

		this.backend.setBlendEnabled( false );

		// shadowmap（directional）

		this._renderDirectionalShadowMaps( cameraComponent, stack.shadowMap, this.resolution );

		// deferred のマテリアル。不透明の forward として、シェーダーの中でライティングまで済ませて描く

		this.renderCamera( "forwardLit", cameraEntity, stack.deferred, output, resolution, {
			uniformOverride: this._litUniforms,
		} );

		// forward（不透明）

		if ( stack.forward.length > 0 ) {

			this.renderCamera( "forward", cameraEntity, stack.forward, output, resolution, { disableClear: true } );

		}

		// forward（透明）・ui

		this.backend.setBlendEnabled( true );

		if ( stack.transparent.length > 0 ) {

			this.renderCamera( "forward", cameraEntity, stack.transparent, output, resolution, { disableClear: true } );

		}

		if ( stack.ui.length > 0 ) {

			this.renderCamera( "forward", cameraEntity, stack.ui, output, resolution, { disableClear: true } );

		}

		this.backend.setBlendEnabled( false );

	}

	public resize( resolution: MTP.Vector ) {

		this.resolution.copy( resolution );

	}

	private _resetSettings() {

		this._skyColor.set( DEFAULT_SKY_COLOR[ 0 ], DEFAULT_SKY_COLOR[ 1 ], DEFAULT_SKY_COLOR[ 2 ] );
		this._groundColor.set( DEFAULT_GROUND_COLOR[ 0 ], DEFAULT_GROUND_COLOR[ 1 ], DEFAULT_GROUND_COLOR[ 2 ] );
		this._skyIntensity = DEFAULT_SKY_INTENSITY;
		this._toneMap = DEFAULT_TONE_MAP;
		this._exposure = DEFAULT_EXPOSURE;

	}

	public reset() {

		this._resetSettings();
		this._resetCaches();

	}

}

export type LiteRendererOptions = {
	// canvas の MSAA を使うか（既定 true）。後処理の FXAA が無いので、輪郭は canvas の MSAA で滑らかにする。
	// エディタは offscreen のビューを canvas へ blit して出すが、MSAA の canvas へは blit できないので false にする
	antialias?: boolean;
}

// canvas と WebGL2 コンテキストを用意して軽量レンダラーを組み立てる。
// 毎フレーム全体を描き直すので、前のフレームの絵は残さない（preserveDrawingBuffer を切ると、タイル型の GPU で写しが1回減る）
export const createLiteRenderer = ( engine: EngineContract, options?: LiteRendererOptions ): LiteRenderer => {

	let antialias = true;

	if ( options && options.antialias === false ) {

		antialias = false;

	}

	const canvas = document.createElement( "canvas" );
	const gl = canvas.getContext( "webgl2", { antialias, preserveDrawingBuffer: false } )!;

	return new LiteRenderer( new GLBackend( gl ), engine );

};
