import { createEditorDraw } from '@or-renderer';
import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { AssetPreviewManager } from '../AssetPreviewManager';
import { ConstraintAxisRenderer } from '../ConstraintAxisRenderer';
import { EditorAPI } from '../EditorAPI';
import { GizmoMode } from '../Gizmo';
import { GizmoManager } from '../GizmoManager';
import { GridRenderer } from '../GridRenderer';
import { HelperManager, HelperVisibility } from '../HelperManager';
import { KeyboardHandler } from '../KeyboardHandler';
import { ModalTransformHandler } from '../ModalTransformHandler';
import { SceneExporter, SceneExporterProgress } from '../SceneExporter';
import { SelectionOutline } from '../SelectionOutline';
import { Viewport } from '../Viewport';
import { WireframeRenderer } from '../WireframeRenderer';

import type { TransformOrientation } from '../TransformUtils';

export type SelectedAssetInfo = {
	name: string;
	assetType: "component" | "material" | "shader" | "texture";
	path?: string;
} | null;

export type NavigateAssetRequest = {
	assetType: "material" | "texture" | "shader" | "component";
	name: string;
} | null;

export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

// ビューポートごとに切り替える編集用オーバーレイの表示フラグ
type ViewportHelpers = HelperVisibility & {
	grid: boolean;
	wireframe: boolean;
	gizmo: boolean;
	outline: boolean;
};

// ビューポートごとに保存する設定。ビューポートはパネルの表示中しか存在しないので、
// 未生成・破棄済みの間はここに退避しておき、生成時に適用する
type ViewportSettings = {
	cameraView: "editor" | "camera";
	preview: boolean;
	// 基準解像度（resolution/*）に掛ける倍率。Screen パネルごとに負荷と画質を選べるようにビューポート単位で持つ
	resolutionScale: number;
	helpers: ViewportHelpers;
	// null = 未設定（OrbitControls の初期姿勢のまま）
	cameraPosition: number[] | null;
	cameraTarget: number[] | null;
};

// 新しく開いた Screen の表示フラグ。ワイヤはシーン本来の見た目を覆うので既定では出さない
const DEFAULT_VIEWPORT_HELPERS: ViewportHelpers = {
	show: true,
	empty: true,
	camera: true,
	light: true,
	grid: true,
	wireframe: false,
	gizmo: true,
	outline: true,
};

// viewports/<id>/ 以下の値フィールド。破棄と React への再読込通知で同じ一覧を使う
const VIEWPORT_FIELD_NAMES = [
	"cameraView",
	"preview",
	"resolutionScale",
	...Object.keys( DEFAULT_VIEWPORT_HELPERS ).map( ( key ) => `helpers/${key}` ),
	"camera/position",
	"camera/target",
];

// 別ウィンドウに出す本番見た目のビュー。シーンカメラ固定で重ね描きもポインタ入力も無いので Viewport にはしない
type ExternalWindow = {
	window: Window;
	canvas: HTMLCanvasElement;
	view: MXP.RenderViewContract;
};

export class Editor extends MXP.Serializable {

	private _engine: Engine;
	private _selectedEntityId: string | null;
	private _unselectableEntityIds: Set<string>;
	private _selectedAsset: SelectedAssetInfo;
	private _navigateAsset: NavigateAssetRequest;
	private _propertyTarget: "entity" | "asset";
	private _audioBuffer: AudioBuffer | null;
	private _frameLoop: EditorTimelineLoop;
	private _enableRender: boolean;
	private _baseResolution: MTP.Vector;
	private _viewType: "render" | "debug";
	private _assetPreviewManager: AssetPreviewManager;
	private _externalWindow: ExternalWindow | null;
	private _modalStatus: string | null;
	private _panelLayout: MXP.SerializeFieldValue;

	private _disposed: boolean;
	private _api: EditorAPI;
	private _draw: MXP.EditorDrawContract;

	private _viewports: Viewport[];
	// 最後にポインタが入ったビューポート。キーボード操作（視点切替・フォーカス・モーダル変形）の対象
	private _activeViewport: Viewport | null;
	private _viewportSettings: Map<string, ViewportSettings>;

	private _gizmoManager: GizmoManager;
	private _helperManager: HelperManager;
	private _gridRenderer: GridRenderer;
	private _constraintAxisRenderer: ConstraintAxisRenderer;
	private _wireframeRenderer: WireframeRenderer;
	private _selectionOutline: SelectionOutline;
	private _keyboardHandler: KeyboardHandler;
	private _modalTransformHandler: ModalTransformHandler;

	private _sceneExporter: SceneExporter;
	private _isExporting: boolean;
	private _exportProgress: SceneExporterProgress | null;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._viewType = "render";
		this._selectedEntityId = null;
		this._unselectableEntityIds = new Set();
		this._selectedAsset = null;
		this._navigateAsset = null;
		this._propertyTarget = "entity";
		this._enableRender = true;
		this._baseResolution = new MTP.Vector( 1920, 1080 );
		this._externalWindow = null;
		this._modalStatus = null;
		this._panelLayout = null;
		this._disposed = false;
		this._api = new EditorAPI( this );
		this._draw = createEditorDraw( engine );
		this._viewports = [];
		this._activeViewport = null;
		this._viewportSettings = new Map();
		this._assetPreviewManager = new AssetPreviewManager( this._draw );
		this._sceneExporter = new SceneExporter( engine );
		this._isExporting = false;
		this._exportProgress = null;

		/*-------------------------------
			Modules
		-------------------------------*/

		this._gizmoManager = new GizmoManager( engine, this._draw );
		this._helperManager = new HelperManager( engine, this._draw );
		this._gridRenderer = new GridRenderer( engine, this._draw );
		this._constraintAxisRenderer = new ConstraintAxisRenderer( engine, this._draw );
		this._wireframeRenderer = new WireframeRenderer( this._draw );
		this._selectionOutline = new SelectionOutline( this._draw );

		this._modalTransformHandler = new ModalTransformHandler( {
			engine,
			getViewport: () => this._activeViewport,
			api: this._api,
			getSelectedEntity: () => this._selectedEntityId
				? engine.root.findEntityByUUID( this._selectedEntityId ) ?? null
				: null,
			isPointerBusy: () => this._viewports.some( ( v ) => v.gizmoDragging ),
			onStatusChange: ( status ) => {

				// モーダル中は毎 pointermove で呼ばれるので、文字列が変わったときだけ React へ通知する
				if ( this._modalStatus === status ) return;

				this._modalStatus = status;
				this.noticeField( "modalStatus" );

			},
		} );

		this._keyboardHandler = new KeyboardHandler( {
			onSave: () => this.save(),
			onUndo: () => this._api.undo(),
			onRedo: () => this._api.redo(),
			onPlayToggle: () => this.togglePlay(),
			onCameraViewToggle: () => this.toggleCameraView(),
			onPreviewToggle: () => {

				const viewport = this._activeViewport;

				if ( ! viewport ) return;

				this.setField( `viewports/${viewport.id}/preview`, ! viewport.editorCamera.preview );

			},
			onSyncToSceneCamera: () => this.syncToSceneCamera(),
			onFocusSelected: () => this.focusSelected(),
			// メニューは React 側の Popover に出すので、ここでは要求を投げるだけにする
			onAddEntity: () => this.emit( "request/addEntity" ),
			onTransformKey: ( e ) => this._activeViewport?.editorCamera.preview ? false : this._modalTransformHandler.handleKeyDown( e ),
		} );

		/*-------------------------------
			Audio
		-------------------------------*/

		this._audioBuffer = null;

		this._engine.on( "update/music", ( buffer: AudioBuffer ) => {

			this._audioBuffer = buffer;

		} );

		/*-------------------------------
			Loop
		-------------------------------*/

		this._frameLoop = {
			enabled: false,
			start: 0,
			end: 0,
		};

		/*-------------------------------
			Scene
		-------------------------------*/

		// 別シーンへ切り替わったら選択を外す。起動時は editor.json の選択を復元したいので、
		// 新しいシーンに同じ uuid が居る間は残す
		this._engine.on( "loaded", () => {

			if ( ! this._selectedEntityId ) return;

			const entity = this._engine.root.findEntityByUUID( this._selectedEntityId );

			if ( ! entity ) {

				this.selectEntity( null );

			}

		} );

		/*-------------------------------
			BLidge
		-------------------------------*/

		this._engine.on( "update/blidge/frame", ( e: MXP.BLidgeFrame ) => {

			this._engine.seek( e.current );

			if ( e.playing && ! this._engine.frame.playing ) {

				this._engine.play();

			} else if ( ! e.playing && this._engine.frame.playing ) {

				this._engine.stop();

			}

		} );

		/*-------------------------------
			Fields
		-------------------------------*/

		this.field( "enableRender", () => this._enableRender, v => this._enableRender = v );

		const resolutionDir = this.fieldDir( "resolution" );
		resolutionDir.field( "width", () => this._baseResolution.x, ( v: number ) => {

			this._baseResolution.x = v;
			this._resize();

		}, { step: 1 } );
		resolutionDir.field( "height", () => this._baseResolution.y, ( v: number ) => {

			this._baseResolution.y = v;
			this._resize();

		}, { step: 1 } );

		this.field( "viewType", () => this._viewType, v => {

			this._viewType = v;

			for ( const viewport of this._viewports ) {

				viewport.frameDebugger.enable = this._viewType === "debug";

			}

		} );

		const frameLoop = this.fieldDir( "frameLoop" );
		frameLoop.field( "enabled", () => this._frameLoop.enabled, v => this._frameLoop.enabled = v );
		frameLoop.field( "start", () => this._frameLoop.start, v => this._frameLoop.start = v );
		frameLoop.field( "end", () => this._frameLoop.end, v => this._frameLoop.end = v );

		this.field( "selectedEntityId", () => this._selectedEntityId, v => {

			this._selectedEntityId = v;

			if ( v ) {

				this._propertyTarget = "entity";
				this.noticeField( "propertyTarget" );

			}

		} );

		// Blenderの選択無効トグルに相当。ここに入っているエンティティはビューポートのクリックで拾わない（Hierarchyからは選択できる）
		this.field( "unselectableEntityIds", () => Array.from( this._unselectableEntityIds ), ( v: string[] ) => {

			this._unselectableEntityIds = new Set( v );

		}, { hidden: true } );

		this.field( "selectedAsset", () => this._selectedAsset, v => {

			this._selectedAsset = v;

			if ( v ) {

				this._propertyTarget = "asset";
				this.noticeField( "propertyTarget" );

			}

		} );

		this.field( "navigateAsset", () => this._navigateAsset, v => {

			this._navigateAsset = v;

		} );

		this.field( "propertyTarget", () => this._propertyTarget, v => {

			this._propertyTarget = v;

		} );

		this.field( "gizmoMode", () => this._gizmoManager.mode, ( v: GizmoMode ) => {

			this._gizmoManager.setMode( v );

		} );

		this.field( "transformOrientation", () => this._gizmoManager.orientation, ( v: TransformOrientation ) => {

			this._gizmoManager.setOrientation( v );

		} );

		// モーダル変形中だけ出るヘッダテキスト。セッション限りの状態なので editor.json には残さない
		this.field( "modalStatus", () => this._modalStatus, { noExport: true } );

		// PC パネルレイアウトのツリー。型・検証・操作は React 層（features/PanelLayout）が持ち、ここは素通しの箱。
		// null はデフォルトレイアウトを意味する
		this.field( "panelLayout", () => this._panelLayout, v => this._panelLayout = v, { hidden: true } );

		/*-------------------------------
			Animate
		-------------------------------*/

		this._animate();

	}

	/*-------------------------------
		Bootstrap
	-------------------------------*/

	public bootstrap( editorData?: MXP.SerializeField ) {

		if ( editorData ) {

			this.deserialize( editorData );

		}

		this._resize();

	}

	// ビューポートのフィールドは id ごとに動的なので、保存データにある id の分を先に用意してから流し込む
	public deserialize( props: MXP.SerializeField ) {

		for ( const key of Object.keys( props ) ) {

			const match = key.match( /^viewports\/([^/]+)\// );

			if ( match ) this._registerViewportFields( match[ 1 ] );

		}

		super.deserialize( props );

	}

	/*-------------------------------
		Getters
	-------------------------------*/

	public get engine() {

		return this._engine;

	}

	public get api() {

		return this._api;

	}

	public get audioBuffer() {

		return this._audioBuffer;

	}

	public get disposed() {

		return this._disposed;

	}

	public get viewports(): readonly Viewport[] {

		return this._viewports;

	}

	public get activeViewport() {

		return this._activeViewport;

	}

	public get assetPreviewManager() {

		return this._assetPreviewManager;

	}

	public get draw() {

		return this._draw;

	}

	/*-------------------------------
		Viewport
	-------------------------------*/

	// 表示 canvas に紐づくビューポートを作る。表示先が無くなったら作った側が dispose する
	public createViewport( id: string, canvas: HTMLCanvasElement ): Viewport {

		this._registerViewportFields( id );

		const settings = this._viewportSettings.get( id )!;
		const engine = this._engine;

		const viewport: Viewport = new Viewport( {
			id,
			engine,
			draw: this._draw,
			canvas,
			gizmoManager: this._gizmoManager,
			helperManager: this._helperManager,
			api: this._api,
			getSelectedEntityId: () => this._selectedEntityId,
			isEntitySelectable: ( entity ) => ! this._unselectableEntityIds.has( entity.uuid ),
			isGizmoVisible: () => settings.helpers.gizmo,
			getHelperVisibility: () => settings.helpers,
			onSelectEntity: ( entity ) => this.selectEntity( entity ),
			isModalActive: () => this._modalTransformHandler.active,
			onEscapeToEditorCamera: () => this._escapeToEditorCamera( viewport ),
			onActivate: () => {

				this._activeViewport = viewport;

			},
			onDispose: () => {

				const editorCamera = viewport.editorCamera;
				const orbit = editorCamera.orbitControls;

				settings.cameraView = editorCamera.view;
				settings.preview = editorCamera.preview;
				settings.cameraPosition = [ orbit.eye.x, orbit.eye.y, orbit.eye.z ];
				settings.cameraTarget = [ orbit.target.x, orbit.target.y, orbit.target.z ];

				this._viewports.splice( this._viewports.indexOf( viewport ), 1 );

				if ( this._activeViewport === viewport ) {

					this._activeViewport = this._viewports[ 0 ] ?? null;

				}

			},
		} );

		viewport.editorCamera.setView( settings.cameraView, engine );
		viewport.editorCamera.setPreview( settings.preview, engine );

		if ( settings.cameraPosition || settings.cameraTarget ) {

			this._setOrbit( viewport, settings.cameraPosition, settings.cameraTarget );

		}

		viewport.frameDebugger.enable = this._viewType === "debug";
		viewport.resize( this._viewportResolution( settings ) );

		this._viewports.push( viewport );

		if ( ! this._activeViewport ) this._activeViewport = viewport;

		// 退避値からビューポートの実値へ読み先が変わるので React に取り直させる。
		// 新しい id はここで初めてフィールドができ、先に描画された Screen は値を持っていないのでそれも含めて通知する
		for ( const name of VIEWPORT_FIELD_NAMES ) {

			this.noticeField( `viewports/${id}/${name}` );

		}

		return viewport;

	}

	// keep に無く、生きてもいないビューポートの設定を捨てる（閉じた Screen タブの分を保存データに残さないため）
	public pruneViewportSettings( keep: ReadonlySet<string> ) {

		for ( const id of this._viewportSettings.keys() ) {

			if ( keep.has( id ) || this._viewports.some( ( v ) => v.id === id ) ) continue;

			this._viewportSettings.delete( id );

			for ( const name of [ "", "helpers/", "camera/", ...VIEWPORT_FIELD_NAMES ] ) {

				this.removeField( `viewports/${id}/${name}` );

			}

		}

	}

	// ビューポート設定のフィールドを id ごとに用意する。ビューポートが生きていればその実値を、無ければ退避値を読み書きする
	private _registerViewportFields( id: string ) {

		if ( this._viewportSettings.has( id ) ) return;

		const settings: ViewportSettings = {
			cameraView: "editor",
			preview: false,
			resolutionScale: 1.0,
			helpers: { ...DEFAULT_VIEWPORT_HELPERS },
			cameraPosition: null,
			cameraTarget: null,
		};
		this._viewportSettings.set( id, settings );

		const live = () => this._viewports.find( ( v ) => v.id === id ) ?? null;
		const engine = this._engine;
		const dir = this.fieldDir( `viewports/${id}` );

		dir.field( "cameraView", () => live()?.editorCamera.view ?? settings.cameraView, ( v: "editor" | "camera" ) => {

			const viewport = live();

			if ( viewport ) {

				viewport.editorCamera.setView( v, engine );

			} else {

				settings.cameraView = v;

			}

		} );

		dir.field( "preview", () => live()?.editorCamera.preview ?? settings.preview, ( v: boolean ) => {

			const viewport = live();

			if ( viewport ) {

				viewport.editorCamera.setPreview( v, engine );

			} else {

				settings.preview = v;

			}

		} );

		// ビューポートが無い間も同じ値を使うので、生死に関わらず退避値を正とする
		dir.field( "resolutionScale", () => settings.resolutionScale, ( v: number ) => {

			settings.resolutionScale = Number( v );

			// 他のサイズで作り置きしたエディタ描画のバッファも捨てたいので、ビューポート単体でなく全体を合わせ直す
			this._resize();

		} );

		// 描画のたびに退避値を読むので、resolutionScale と同じく生死に関わらず退避値を正とする
		const helpersDir = dir.dir( "helpers" );

		for ( const key of Object.keys( DEFAULT_VIEWPORT_HELPERS ) as ( keyof ViewportHelpers )[] ) {

			helpersDir.field( key, () => settings.helpers[ key ], ( v: boolean ) => {

				settings.helpers[ key ] = v;

			} );

		}

		const cameraDir = dir.dir( "camera" );

		cameraDir.field( "position", () => {

			const viewport = live();

			if ( ! viewport ) return settings.cameraPosition;

			const eye = viewport.editorCamera.orbitControls.eye;

			return [ eye.x, eye.y, eye.z ];

		}, ( v: number[] | null ) => {

			const viewport = live();

			if ( viewport ) {

				this._setOrbit( viewport, v, null );

			} else {

				settings.cameraPosition = v;

			}

		} );

		cameraDir.field( "target", () => {

			const viewport = live();

			if ( ! viewport ) return settings.cameraTarget;

			const target = viewport.editorCamera.orbitControls.target;

			return [ target.x, target.y, target.z ];

		}, ( v: number[] | null ) => {

			const viewport = live();

			if ( viewport ) {

				this._setOrbit( viewport, null, v );

			} else {

				settings.cameraTarget = v;

			}

		} );

	}

	// オービットの視点・注視点を片方ずつでも更新できるようにする（省いた側は現在値を保つ）
	private _setOrbit( viewport: Viewport, position: number[] | null, target: number[] | null ) {

		const orbit = viewport.editorCamera.orbitControls;

		orbit.setPosition(
			position ? new MTP.Vector( position[ 0 ], position[ 1 ], position[ 2 ] ) : orbit.eye.clone(),
			target ? new MTP.Vector( target[ 0 ], target[ 1 ], target[ 2 ] ) : orbit.target.clone(),
		);

	}

	// プレビュー・シーンカメラ視点から抜けてエディタカメラで見る
	private _escapeToEditorCamera( viewport: Viewport ) {

		if ( viewport.editorCamera.preview ) {

			this.setField( `viewports/${viewport.id}/preview`, false );

		}

		this.setField( `viewports/${viewport.id}/cameraView`, "editor" );

	}

	/*-------------------------------
		Animate
	-------------------------------*/

	private _animate() {

		if ( this._disposed ) return;

		if ( ! this._isExporting ) {

			for ( const viewport of this._viewports ) {

				viewport.editorCamera.updateBeforeRender( this._engine );

			}

			this._engine.update();

			this._helperManager.sync( this._engine, this._selectedEntityId );

			const selectedEntity = this._selectedEntityId
				? this._engine.root.findEntityByUUID( this._selectedEntityId ) ?? null
				: null;

			for ( const viewport of this._viewports ) {

				if ( this._enableRender ) {

					this._engine.render( viewport.view );

				}

				this._renderOverlay( viewport, selectedEntity );

				this._draw.drawToCanvas( viewport.view, viewport.canvas );

			}

			const external = this._externalWindow;

			if ( external ) {

				if ( this._enableRender ) {

					this._engine.render( external.view );

				}

				this._draw.drawToCanvas( external.view, external.canvas );

			}

			if ( this._engine.frame.playing ) {

				if ( this._engine.frame.current < 0 || this._engine.frame.current > this._engine.frameSetting.duration ) {

					this._engine.seek( 0 );

				}

				if ( this._frameLoop.enabled ) {

					if ( this._engine.frame.current < this._frameLoop.start || this._engine.frame.current > this._frameLoop.end ) {

						this._engine.seek( this._frameLoop.start );

					}

				}

			}

		}

		window.requestAnimationFrame( this._animate.bind( this ) );

	}

	// シーン描画の上にビューポートの編集用オーバーレイ（グリッド・ヘルパー・ギズモ・アウトライン）を重ねる
	private _renderOverlay( viewport: Viewport, selectedEntity: MXP.Entity | null ) {

		const cameraEntity = viewport.editorCamera.getCameraEntity( this._engine );
		const preview = viewport.editorCamera.preview;
		const view = viewport.view;
		const helpers = this._viewportSettings.get( viewport.id )!.helpers;

		if ( ! preview ) {

			// ヘルパーやワイヤより先に敷いて、上に載る線を隠さないようにする
			if ( helpers.grid ) {

				this._gridRenderer.render( view, cameraEntity, this._engine );

			}

			this._helperManager.render( view, cameraEntity, helpers );

			if ( helpers.wireframe ) {

				this._wireframeRenderer.render( view, cameraEntity, this._engine );

			}

		}

		// 非表示のときもターゲット無しで呼び、ギズモの visible とヒット判定を落とす。
		// モーダル変形中はギズモが変形結果に追従してちらつくので出さない
		const hideGizmo = preview || ! helpers.gizmo || this._modalTransformHandler.active;

		this._gizmoManager.render(
			view,
			hideGizmo ? null : selectedEntity,
			cameraEntity,
			this._engine
		);

		if ( ! preview ) {

			this._constraintAxisRenderer.render( view, this._modalTransformHandler.constraintDisplay, cameraEntity, this._engine );

			if ( helpers.outline ) {

				this._selectionOutline.render( view, selectedEntity, cameraEntity );

			}

		}

		// canvas へ出す前にuiバッファへ描き込む（後ではwebgpuの画面に反映されない）
		if ( viewport.frameDebugger.enable ) {

			viewport.frameDebugger.draw();

		}

	}

	/*-------------------------------
		Export
	-------------------------------*/

	public get isExporting() {

		return this._isExporting;

	}

	public get exportProgress() {

		return this._exportProgress;

	}

	public async exportMP4() {

		if ( this._isExporting ) return;

		this._isExporting = true;
		this._exportProgress = null;
		this.emit( "update/export" );

		const wasPlaying = this._engine.frame.playing;
		this._engine.stop();

		try {

			const blob = await this._sceneExporter.export(
				{
					fps: this._engine.frameSetting.fps,
					duration: this._engine.frameSetting.duration,
					resolution: this._baseResolution.clone(),
				},
				( progress ) => {

					this._exportProgress = progress;
					this.emit( "update/export" );

				}
			);

			SceneExporter.download( blob );

		} catch ( e ) {

			console.error( "Export failed:", e );

		}

		this._isExporting = false;
		this._exportProgress = null;
		this.emit( "update/export" );

		if ( wasPlaying ) {

			this._engine.play();

		}

	}

	/*-------------------------------
		Controls
	-------------------------------*/

	public selectEntity( entity: MXP.Entity | null ) {

		this.setField( "selectedEntityId", entity ? entity.uuid : null );

	}

	// 再生 / 停止を切り替える
	public togglePlay() {

		if ( this._engine.frame.playing ) {

			this._engine.stop();

		} else {

			this._engine.play();

		}

		// Engine は再生中の毎フレームしか update/frame/play を出さず、停止した瞬間は通知されない。
		// 64k ランタイムに通知を足さずに済むよう、再生状態を表示する UI のためにエディタ側で通知する
		this._engine.emit( "update/frame/play", [ this._engine.frame ] );

	}

	// アクティブなビューポートのエディタカメラをシーンカメラの視点・画角へ合わせる
	public syncToSceneCamera() {

		const viewport = this._activeViewport;

		if ( ! viewport ) return;

		this._escapeToEditorCamera( viewport );

		viewport.editorCamera.syncFromSceneCamera( this._engine );

	}

	// アクティブなビューポートの視点をエディタカメラとシーンカメラで切り替える
	public toggleCameraView() {

		const viewport = this._activeViewport;

		if ( ! viewport ) return;

		// プレビュー中はプレビューを抜けてエディタカメラへ戻る
		if ( viewport.editorCamera.preview ) {

			this._escapeToEditorCamera( viewport );

		} else {

			this.setField( `viewports/${viewport.id}/cameraView`, viewport.editorCamera.view === "editor" ? "camera" : "editor" );

		}

	}

	// 選択中のエンティティが画面に収まる位置までアクティブなビューポートのエディタカメラを寄せる
	public focusSelected() {

		const viewport = this._activeViewport;

		if ( ! viewport || viewport.editorCamera.preview ) return;

		const entity = this._selectedEntityId
			? this._engine.root.findEntityByUUID( this._selectedEntityId ) ?? null
			: null;

		if ( ! entity ) return;

		// シーンカメラ視点のままでは寄れないのでエディタカメラへ戻してからフォーカスする
		this.setField( `viewports/${viewport.id}/cameraView`, "editor" );

		viewport.editorCamera.focus( entity );

	}

	public createEntity( parentEntity: MXP.Entity, name: string ) {

		const newEntity = this._engine.createEntity( { name } );
		newEntity.initiator = "user";
		parentEntity.add( newEntity );

		return newEntity;

	}

	public deleteEntity( entity: MXP.Entity ) {

		entity.disposeRecursive();

		const parent = entity.parent;

		if ( parent ) {

			parent.remove( entity );

		}

	}

	/*-------------------------------
		Export
	-------------------------------*/

	public save() {

		this.emit( "save", [ this.exportEngine(), this.exportEditor() ] );

	}

	public exportEditor() {

		return this.serialize( { mode: "export" } );

	}

	public exportEngine() {

		return this._engine.serialize( { mode: "export" } );

	}

	/*-------------------------------
		External Window
	-------------------------------*/

	// シーンカメラの本番見た目を別ウィンドウに出す。すでに開いていればそのウィンドウを前に出すだけ
	public openInExternalWindow() {

		if ( this._externalWindow ) {

			this._externalWindow.window.focus();

			return;

		}

		const win = window.open( "", "_blank" );

		if ( ! win ) return;

		const canvas = win.document.createElement( "canvas" );
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.style.objectFit = "contain";
		canvas.style.cursor = "none";

		win.document.body.style.margin = "0";
		win.document.body.style.background = "#000";
		win.document.body.appendChild( canvas );

		// camera 未指定＝シーンカメラ、override 無し＝本番パイプライン
		const view = this._engine.createView( { offscreen: true } );

		this._externalWindow = { window: win, canvas, view };

		win.addEventListener( "unload", () => {

			this.closeExternalWindow();

		} );

		this._resize();

	}

	public closeExternalWindow() {

		const external = this._externalWindow;

		if ( ! external ) return;

		this._externalWindow = null;

		external.view.dispose();
		external.window.close();

	}

	/*-------------------------------
		Resize
	-------------------------------*/

	// renderer・別ウィンドウは基準解像度のまま描き、各ビューポートだけ自分の倍率で縮める
	private _resize() {

		const resolution = this._baseResolution;

		this.engine.setSize( resolution );

		this._draw.resize( resolution );

		for ( const viewport of this._viewports ) {

			viewport.resize( this._viewportResolution( this._viewportSettings.get( viewport.id )! ) );

		}

		if ( this._externalWindow ) {

			// drawToCanvas は等倍で写すので、表示 canvas の画素数は描画解像度と一致させる
			this._externalWindow.canvas.width = resolution.x;
			this._externalWindow.canvas.height = resolution.y;

		}

	}

	private _viewportResolution( settings: ViewportSettings ) {

		return this._baseResolution.clone().multiply( settings.resolutionScale );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this._disposed = true;
		this._api.dispose();
		this._keyboardHandler.dispose();
		this._modalTransformHandler.dispose();
		this._assetPreviewManager.dispose();
		this.closeExternalWindow();

		// dispose で配列から抜けるので複製を回す
		for ( const viewport of [ ...this._viewports ] ) {

			viewport.dispose();

		}

	}

}
