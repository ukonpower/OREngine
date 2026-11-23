import * as BSP from 'basepower';
import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Camera } from '../../core/Components/Camera';
import { Light } from '../../core/Components/Light';
import { Mesh } from '../../core/Components/Mesh';
import { Entity, EntityUpdateEvent } from '../../core/Entity';
import { isOfflineTimeJump } from '../../core/utils/TimeJump';
import { GL, GLBackend } from '../backend/GLBackend';
import { PostProcessPipeline } from '../Components/PostProcessPipeline';
import { MaterialDrawPass } from '../Material';

import { PMREMRender } from './PMREMRender';
import { RenderCore, RenderOption, RenderStack, getMaterial } from './RenderCore';
import { RenderCameraTarget, RenderView } from './RenderView';
import { Sky } from './Sky';

import type { EngineContract } from '../../core/Contracts/EngineContract';
import type { RendererContract } from '../../core/Contracts/RendererContract';
import type { PipelineConfig, RenderViewContract, RenderViewOptions } from '../../core/Contracts/RenderViewContract';

export { TextureUnitCounter, setUniforms } from './RenderCore';
export type { CollectedLights, RenderStack } from './RenderCore';

// envmap

type EnvMapCamera = {
	entity: Entity,
	camera: Camera,
}

// scene.json に renderer/pipeline が無いときの値。reset でもここへ戻る
const createDefaultPipelineConfig = (): PipelineConfig => ( {
	motionBlur: true,
	motionBlurPower: 1.0,
	ssr: true,
	ssao: true,
	lightShaft: true,
	dof: true,
	toneMap: true,
	exposure: 0,
	bloom: true,
	bloomThreshold: 1.0,
	bloomBrightness: 1.0,
	sss: false,
	sssRadius: 0.05,
} );

const byRenderOrder = ( a: Entity, b: Entity ) => getMaterial( a.getComponent( Mesh )! ).renderOrder - getMaterial( b.getComponent( Mesh )! ).renderOrder;

// 描画対象の振り分け・ライトの収集・1回分の描画は、軽量レンダラーと共有する土台（RenderCore）が持つ
export class Renderer extends RenderCore implements RendererContract {

	// views

	private _views: RenderView[];

	// pipeline config（シーン本来の値・シリアライズ対象。ビューごとの上書きは RenderView が重ねる）
	private _pipelineConfig: PipelineConfig;

	// envmap

	private _envMapCameras: EnvMapCamera[];
	private _envMapRenderTarget: GLP.GLPowerFrameBufferCube;
	private _envMapCube: GLP.GLPowerTextureCube;
	private _pmremRender: PMREMRender;
	// 直前の prepareScene の時刻（event.timeElapsed）。offline で時刻が飛んだかを見る
	private _prevTimeElapsed?: number;

	// frame（prepareScene で集め、同フレームの render が使う）

	private _stack: RenderStack;

	// sky（reset で作り直すため engine を保持する）

	public sky: Sky;
	private _engine: EngineContract;

	constructor( backend: GLBackend, engine: EngineContract ) {

		super( backend );

		this._views = [];
		this._stack = this._createRenderStack();


		// envmap

		// 空や放射の 1 を超える明るさを環境光に残すため半精度浮動小数にする（既定の 8bit では 1 で切れる）。
		// webgpu の ENVMAP_FORMAT（rgba16float）と揃える
		const envMap = backend.createCubeTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } );
		this._envMapCube = envMap;
		this._envMapRenderTarget = backend.createCubeFrameBuffer().setTexture( [ envMap ] );
		this._envMapRenderTarget.setSize( 256, 256 );

		const origin = new MTP.Vector( 0, 0, 0 );
		const up = new MTP.Vector( 0, - 1, 0 );

		const lookAtMatrices = [
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 1, 0, 0 ), up ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, 1, 0 ), new MTP.Vector( 0, 0, 1 ) ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, 0, 1 ), up ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( - 1, 0, 0 ), up ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, - 1, 0 ), new MTP.Vector( 0, 0, - 1 ) ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, 0, - 1 ), up ),
		];

		this._envMapCameras = [];

		for ( let i = 0; i < 6; i ++ ) {

			const entity = engine.createEntity( { name: "envMapCamera/" + i } );
			const camera = entity.addComponent( Camera );
			camera.fov = 90;
			camera.near = 0.1;
			camera.far = 1000;
			camera.aspect = 1;
			entity.applyMatrix( lookAtMatrices[ i ].clone() );
			camera.updateViewMatrix();
			camera.updateProjectionMatrix();
			this._envMapCameras.push( { entity, camera } );

		}

		// pmrem

		this._pmremRender = new PMREMRender( backend, {
			input: [ envMap ],
			resolution: new MTP.Vector( 256 * 3, 256 * 4 ),
		} );


		// sky

		this._engine = engine;
		this.sky = new Sky( engine );

		// pipeline config

		this._pipelineConfig = createDefaultPipelineConfig();

		// sky fields

		const skyDir = this.fieldDir( "sky" );

		skyDir.field( "skyColor",
			() => this.sky.color.getElm( "vec3" ),
			( v: number[] ) => {

				this.sky.color.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: "color" } }
		);

		skyDir.field( "groundColor",
			() => this.sky.groundColor.getElm( "vec3" ),
			( v: number[] ) => {

				this.sky.groundColor.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: "color" } }
		);

		skyDir.field( "intensity",
			() => this.sky.intensity,
			( v: number ) => {

				this.sky.intensity = v;

			},
			{ step: 0.1 }
		);

		skyDir.field( "reset", () => () => {

			this._resetSky();

			this.noticeField( "sky/skyColor" );
			this.noticeField( "sky/groundColor" );
			this.noticeField( "sky/intensity" );

		}, undefined, { label: "Reset to Default" } );

		const pipeline = this.fieldDir( "pipeline" );

		( [ "motionBlur", "ssr", "ssao", "dof", "lightShaft", "toneMap", "bloom" ] as const ).forEach( ( key ) => {

			const dir = pipeline.dir( key );

			dir.field( "enabled", () => this._pipelineConfig[ key ] ?? true, ( v: boolean ) => {

				this.applyPipelineConfig( { [ key ]: v } );

			} );

			if ( key === "motionBlur" ) {

				dir.field( "power", () => this._pipelineConfig.motionBlurPower ?? 1, ( v: number ) => {

					this.applyPipelineConfig( { motionBlurPower: v } );

				}, { step: 0.1 } );

			}

			if ( key === "toneMap" ) {

				dir.field( "exposure", () => this._pipelineConfig.exposure ?? 0, ( v: number ) => {

					this.applyPipelineConfig( { exposure: v } );

				}, { step: 0.1 } );

			}

			if ( key === "bloom" ) {

				dir.field( "threshold", () => this._pipelineConfig.bloomThreshold ?? 1, ( v: number ) => {

					this.applyPipelineConfig( { bloomThreshold: v } );

				}, { step: 0.1 } );

				dir.field( "brightness", () => this._pipelineConfig.bloomBrightness ?? 1, ( v: number ) => {

					this.applyPipelineConfig( { bloomBrightness: v } );

				}, { step: 0.1 } );

			}

		} );

		// sss は使う作品だけが有効にするので、他のパスと違い既定はオフ
		const sss = pipeline.dir( "sss" );

		sss.field( "enabled", () => this._pipelineConfig.sss ?? false, ( v: boolean ) => {

			this.applyPipelineConfig( { sss: v } );

		} );

		sss.field( "radius", () => this._pipelineConfig.sssRadius ?? 0.05, ( v: number ) => {

			this.applyPipelineConfig( { sssRadius: v } );

		}, { step: 0.01 } );

	}

	/*-------------------------------
		View
	-------------------------------*/

	public createView( opt?: RenderViewOptions ): RenderView {

		const view = new RenderView( {
			backend: this.backend,
			envMap: this._pmremRender.renderTarget.textures[ 0 ],
			envMapCube: this._envMapCube,
			sceneConfig: this._pipelineConfig,
			resolution: this.resolution,
			offscreen: opt?.offscreen ?? false,
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

	// フレーム1回。描画対象の収集と、視点に依らない資源（ライト・spot のシャドウ・環境マップ）の更新
	public prepareScene( root: Entity, event: EntityUpdateEvent ) {

		if ( this.resolution.x === 0 || this.resolution.y === 0 ) return;

		if ( import.meta.env.DEV ) {

			const timerResults = this.backend.collectTimerQueries();

			if ( timerResults ) {

				this.emit( "timer", [ timerResults ] );

			}

		}

		/*-------------------------------
			Get RenderStack
		-------------------------------*/

		const stack = this._stack = this._createRenderStack();
		this._sceneCamera = null;

		this._collectRenderStack( root, true, stack );
		this._collectRenderStack( this.sky.entity, true, stack );

		stack.forward.sort( byRenderOrder );
		stack.transparent.sort( byRenderOrder );

		/*-------------------------------
			UpdateLight
		-------------------------------*/

		// directional は描くビューのカメラ基準で範囲が変わるので、render でビューごとに描く
		const shadowMapLightList = this._collectLights( stack.light );

		// shadowmap

		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const info = shadowMapLightList[ i ];

			this.renderCamera( "shadowMap", info.component.entity, stack.shadowMap, info.renderTarget!, this.resolution );

		}

		// envmap

		// shot が時刻を飛ばして撮り始めたら、それまでのコマの積算を捨てる（撮るたびに同じ絵にするため）。
		// offline で時刻を飛ばすのは dev サーバーの shot だけなので、player には入れない
		if ( import.meta.env.DEV ) {

			if ( isOfflineTimeJump( this._prevTimeElapsed, event ) ) {

				this._pmremRender.discardHistory();

			}

			this._prevTimeElapsed = event.timeElapsed;

		}

		for ( let i = 0; i < this._envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = this._envMapCameras[ i ];

			this._envMapRenderTarget.face( i );

			this.renderCamera( "envMap", cameraEntity, stack.envMap, this._envMapRenderTarget, this.resolution );

		}

		this.renderPostProcess( this._pmremRender.postprocess, undefined, this._pmremRender.resolution );

		this._pmremRender.swap();

	}

	/*-------------------------------
		Render
	-------------------------------*/

	// view の視点でシーンを描く。最終出力は view の uiBuffer（offscreen）か canvas。prepareScene の後に呼ぶ
	public render( viewContract: RenderViewContract, _event: EntityUpdateEvent ) {

		const view = viewContract as RenderView;

		view.fit( view.size || this.resolution );

		const resolution = view.resolution;

		if ( resolution.x === 0 || resolution.y === 0 ) return;

		const cameraEntity = view.camera || this._sceneCamera;

		if ( ! cameraEntity ) return;

		const cameraComponent = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ];

		if ( ! cameraComponent ) return;

		const stack = this._stack;
		const rt = view.renderTarget;

		this.backend.setBlendEnabled( false );

		// shadowmap（directional）

		this._renderDirectionalShadowMaps( cameraComponent, stack.shadowMap, this.resolution );


		// deferred

		this.renderCamera( "deferred", cameraEntity, stack.deferred, rt.gBuffer, resolution );

		// 不透明の forward は位置・法線・速度だけを先に書き、シェーディング前の SSR・SSAO などに deferred と同じ面として見せる
		if ( stack.forward.length > 0 ) {

			this.renderCamera( "forwardPrepass", cameraEntity, stack.forward, rt.gBuffer, resolution, { disableClear: true } );

		}

		this.renderPostProcess( view.deferredRenderer.postprocess, undefined, resolution, { cameraOverride: {
			viewMatrix: cameraComponent.viewMatrix,
			viewMatrixPrev: cameraComponent.viewMatrixPrev,
			projectionMatrix: cameraComponent.projectionMatrix,
			projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
			cameraMatrixWorld: cameraEntity.matrixWorld,
			cameraNear: cameraComponent.near,
			cameraFar: cameraComponent.far,
		} } );

		view.deferredRenderer.update();

		// forward

		const forwardUniforms: BSP.Uniforms = {
			uDeferredTexture: {
				value: rt.refractionBuffer.textures[ 0 ],
				type: '1i'
			},
			uDeferredResolution: {
				value: rt.shadingBuffer.size,
				type: '2fv'
			},
			uEnvMap: {
				value: this._pmremRender.renderTarget.textures[ 0 ],
				type: '1i'
			},
			// gBufferのうちforwardBufferにアタッチされていない（フィードバックしない）テクスチャのみ公開する
			uGbufferNormal: {
				value: rt.normalBuffer.textures[ 0 ],
				type: '1i'
			},
			uGbufferAlbedo: {
				value: rt.gBuffer.textures[ 2 ],
				type: '1i'
			},
			uGbufferMaterial: {
				value: rt.gBuffer.textures[ 3 ],
				type: '1i'
			}
		};

		// 不透明は混ぜずに色だけを上書きする。gBuffer の段で書いた深度と同じ面を描くので、同じ深度で通す
		if ( stack.forward.length > 0 ) {

			// refractionBuffer を deferred 結果（shadingBuffer[0]）で満たす
			this._copyToRefraction( rt );

			this.backend.setDepthFunc( GL.LEQUAL );

			this.renderCamera( "forward", cameraEntity, stack.forward, rt.forwardBuffer, resolution, {
				uniformOverride: forwardUniforms,
				disableClear: true,
			} );

			this.backend.setDepthFunc( GL.LESS );

		}

		// 次のフレームの SSR が引く。SSR はシェーディングより前に走るので、今フレームのシーンはまだ無い。
		// 透明の forward は SSR の当たり判定（gBuffer の段の位置）に入らないので、色にも入れないよう描く前に写す
		this.backend.blit( rt.shadingBuffer, rt.prevSceneBuffer, resolution.x, resolution.y, true, true );

		// 透明は renderOrder ごとにまとめて描き、まとまりの前で refractionBuffer へそこまでの結果を写す
		const transparentGroups: Entity[][] = [];
		let currentOrder: number | null = null;

		for ( const ent of stack.transparent ) {

			const o = getMaterial( ent.getComponent( Mesh )! ).renderOrder;

			if ( currentOrder === null || o !== currentOrder ) {

				transparentGroups.push( [] );
				currentOrder = o;

			}

			transparentGroups[ transparentGroups.length - 1 ].push( ent );

		}

		this.backend.setBlendEnabled( true );

		for ( let gi = 0; gi < transparentGroups.length; gi ++ ) {

			this._copyToRefraction( rt );

			this.renderCamera( "forward", cameraEntity, transparentGroups[ gi ], rt.forwardBuffer, resolution, {
				uniformOverride: forwardUniforms,
				disableClear: true,
			} );

		}

		this.backend.setBlendEnabled( false );

		// scene（トーンマップを切っていても後続のパスが HDR を受け取れるよう、入力にシェーディングバッファを渡す）

		this.renderPostProcess( view.pipelinePostProcess.postprocess, rt.shadingBuffer, resolution, { cameraOverride: {
			viewMatrix: cameraComponent.viewMatrix,
			projectionMatrix: cameraComponent.projectionMatrix,
			cameraMatrixWorld: cameraEntity.matrixWorld,
			cameraNear: cameraComponent.near,
			cameraFar: cameraComponent.far,
		} } );

		view.pipelinePostProcess.update( cameraComponent );

		let backBuffer = view.pipelinePostProcess.postprocess.output ? view.pipelinePostProcess.postprocess.output : undefined;

		// postprocess（プロジェクト側のパス。どの視点で見ていてもシーンカメラのものを掛ける）

		const userPipeline = ( this._sceneCamera || cameraEntity ).getComponent( PostProcessPipeline );
		const userPostProcess = view.fitUserPostProcess( userPipeline ? userPipeline.params : null );

		if ( userPostProcess && userPostProcess.hasOutput ) {

			this.renderPostProcess( userPostProcess, backBuffer, resolution, {
				cameraOverride: {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				},
			} );

			backBuffer = userPostProcess.output || undefined;

		}

		// ui（offscreen なら uiBuffer に留め、そうでなければ canvas へ）

		const output = view.offscreen ? rt.uiBuffer : null;

		if ( backBuffer ) {

			const size = backBuffer.size;

			this.backend.blit( backBuffer, output, size.x, size.y );

		}

		this.backend.setBlendEnabled( true );

		this.renderCamera( "forward", cameraEntity, stack.ui, output, resolution, {
			uniformOverride: {
				uDeferredTexture: {
					value: rt.refractionBuffer.textures[ 0 ],
					type: '1i'
				} },
			disableClear: true
		} );

		this.backend.setBlendEnabled( false );

	}

	public renderCamera( renderType: MaterialDrawPass, cameraEntity: Entity, entities: Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: MTP.Vector, renderOption?: RenderOption ) {

		if ( renderType == "deferred" || renderType == "envMap" ) {

			const camera = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ] || cameraEntity.getComponent( Light )!;

			this.sky.followCamera( cameraEntity, camera );

		}

		super.renderCamera( renderType, cameraEntity, entities, renderTarget, canvasSize, renderOption );

	}

	private _copyToRefraction( rt: RenderCameraTarget ) {

		const size = rt.shadingBuffer.size;

		this.backend.blit( rt.shadingBuffer, rt.refractionBuffer, size.x, size.y, true, true );

	}

	public applyPipelineConfig( config: PipelineConfig ): void {

		Object.assign( this._pipelineConfig, config );

		for ( let i = 0; i < this._views.length; i ++ ) {

			this._views[ i ].applyPipelineConfig();

		}

	}

	public get pipelineConfig(): PipelineConfig {

		return this._pipelineConfig;

	}

	public resize( resolution: MTP.Vector ) {

		this.resolution.copy( resolution );

		for ( let i = 0; i < this._views.length; i ++ ) {

			const view = this._views[ i ];

			view.fit( view.size || resolution );

		}

	}

	// 空は値を書き戻すのではなく作り直す。既定値が Sky のコンストラクタ一箇所に集まり、
	// シーン側のコンポーネントが差し替えたマテリアルも一緒に外れる
	private _resetSky() {

		this.sky.entity.disposeRecursive();
		this.sky = new Sky( this._engine );

	}

	public reset() {

		this._resetSky();
		this.applyPipelineConfig( createDefaultPipelineConfig() );

		this._resetCaches();

	}

}

// WebGLバックエンドを前提にしたEngineContract型。コンポーネントからは `engine as GLEngine` で参照する
export type GLEngine = EngineContract<Renderer>;

// canvasとWebGL2コンテキストを用意してWebGLレンダラーを組み立てる（@or-rendererの供給口）
export const createRenderer = ( engine: EngineContract ): Renderer => {

	const canvas = document.createElement( "canvas" );
	const gl = canvas.getContext( "webgl2", { antialias: false, preserveDrawingBuffer: true } )!;

	return new Renderer( new GLBackend( gl ), engine );

};
