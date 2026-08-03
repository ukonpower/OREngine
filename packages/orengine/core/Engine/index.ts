import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { ComponentResolver, OREngineDataEntity, OREngineProjectData, OREngineProjectFrame, ProjectSerializer } from '../ProjectSerializer';
import { Resources } from '../Resources';

export interface SceneTime {
	current: number;
	engine: number;
	delta: number;
	code: number;
}

export interface FramePlay {
	current: number
	playing: boolean,
}

export class Engine extends MXP.Serializable implements MXP.EngineContract<MXP.Renderer> {

	public static resources: Resources;
	public name: string;
	public enableRender: boolean;

	private _renderer: MXP.Renderer;
	private _root: MXP.Entity;
	private _uniforms: GLP.Uniforms;
	private _time: SceneTime;
	private _frame: FramePlay;
	private _frameSetting: OREngineProjectFrame;
	private _disposed: boolean;
	private _cameraEntity: MXP.Entity | null;

	constructor( createRenderer: ( engine: MXP.EngineContract ) => MXP.Renderer ) {

		super();

		this.name = "OREngine";
		this._disposed = false;

		this._uniforms = {
			uEnvMapIntensity: {
				value: 1,
				type: '1f'
			}
		};

		/*-------------------------------
			Renderer
		-------------------------------*/

		this._renderer = createRenderer( this );

		this._renderer.globalUniforms = {
			uTime: { value: 0, type: "1f" },
			uTimeF: { value: 0, type: "1f" },
			uTimeE: { value: 0, type: "1f" },
			uTimeEF: { value: 0, type: "1f" },
			uDeltaTime: { value: 0, type: "1f" },
			uResolution: { value: new GLP.Vector(), type: "2fv" },
			uAspectRatio: { value: 1.0, type: "1f" },
		};

		/*-------------------------------
			Project
		-------------------------------*/

		// time

		this._time = {
			current: new Date().getTime(),
			engine: 0,
			delta: 0,
			code: 0,
		};

		// frame

		this._frameSetting = {
			duration: 600,
			fps: 30,
		};

		this._frame = {
			current: 0,
			playing: false
		};

		this.seek( 0 );
		this.enableRender = true;
		this._cameraEntity = null;

		// root

		this._root = this.createEntity( { name: "root" } );
		this._root.initiator = "god";

		this.field( "name", () => this.name, v => this.name = v );

		this.field( "scene", () => ProjectSerializer.serializeEntity( this._root, this._createComponentResolver() ) as unknown as MXP.SerializeFieldValue, ( v: MXP.SerializeFieldValue ) => {

			ProjectSerializer.deserializeEntity( v as unknown as OREngineDataEntity, this._root, this._createComponentResolver(), this );

		} );

		this.field( "renderer",
			() => this._renderer.serialize( { mode: "export" } ),
			( v ) => this._renderer.deserialize( v )
		);

		const tl = this.fieldDir( "timeline" );
		tl.field( "duration", () => this._frameSetting.duration, ( v ) => this._frameSetting.duration = v );
		tl.field( "fps", () => this._frameSetting.fps, ( v ) => this._frameSetting.fps = v );

		/*-------------------------------
			Register
		-------------------------------*/

	}

	/*-------------------------------
		Entity Factory
	-------------------------------*/

	public createEntity( params?: Omit<MXP.EntityParams, 'engine'> ): MXP.Entity {

		return new MXP.Entity( { engine: this, ...params } );

	}

	/*-------------------------------
		Getters
	-------------------------------*/

	public get canvas() {

		return this._renderer.canvas;

	}

	public get renderer() {

		return this._renderer;

	}

	public get root() {

		return this._root;

	}

	public get frame() {

		return this._frame;

	}

	public get time() {

		return this._time;

	}

	public get frameSetting() {

		return this._frameSetting;

	}

	public get uniforms() {

		return this._uniforms;

	}

	public get disposed() {

		return this._disposed;

	}

	public set cameraEntity( entity: MXP.Entity | null ) {

		this._cameraEntity = entity;

	}

	public get cameraEntity(): MXP.Entity | null {

		return this._cameraEntity;

	}

	/*-------------------------------
		ComponentResolver
	-------------------------------*/

	private _createComponentResolver(): ComponentResolver {

		return {
			resolve: ( name ) => Engine.resources.getComponent( name ),
			getName: ( c ) => {

				const item = Engine.resources.componentList.find(
					item => c instanceof item.component
				);

				return item ? item.name : c.constructor.name;

			}
		};

	}

	/*-------------------------------
		Init Engine
	-------------------------------*/

	public init() {

		this._root.disposeRecursive();

		this._root.position.set( 0, 0, 0 );
		this._root.euler.set( 0, 0, 0 );
		this._root.scale.set( 1, 1, 1 );

		this.name = "New Project";

	}

	/*-------------------------------
		Load Project
	-------------------------------*/

	public async load( project: OREngineProjectData ) {

		this.init();

		this.deserialize( project as unknown as MXP.SerializeField );

		this.emit( "update/graph" );
		this.emit( "loaded" );

	}

	/*-------------------------------
		Update
	-------------------------------*/

	public update( param?: Partial<MXP.EntityUpdateEvent> ) {

		const newTime = new Date().getTime();
		this._time.delta = ( newTime - this._time.current ) / 1000;
		this._time.current = newTime;
		this._time.engine += this._time.delta;
		this._time.code += this._time.delta * ( this._frame.playing ? 1 : 0 );
		this._frame.current = this._time.code * 60;

		const event = this.createEntityUpdateEvent( { forceDraw: param?.forceDraw } );

		this._renderer.globalUniforms.uTime.value = this._time.code;
		this._renderer.globalUniforms.uTimeF.value = this._time.code % 1;
		this._renderer.globalUniforms.uTimeE.value = this._time.engine;
		this._renderer.globalUniforms.uTimeEF.value = this._time.engine % 1;
		// タブ復帰などの巨大なdeltaでシミュレーションが暴発しないよう上限を切る
		this._renderer.globalUniforms.uDeltaTime.value = Math.min( this._time.delta, 1 / 60 );

		const updateTextures = Engine.resources.updateEveryFrameTextures;

		for ( let i = 0; i < updateTextures.length; i ++ ) {

			updateTextures[ i ].render();

		}

		this._root.update( event );
		this._root.postUpdate( event );
		this._root.updateMatrixRecursive();
		this._root.prepareRender( event );

		if ( this.enableRender ) {

			const camera = this._cameraEntity || this._findCameraEntity();

			if ( camera ) {

				this._renderer.render( this._root, camera, event );

			}

		}

		this._root.commitFrame( event );

		if ( this._frame.playing ) {

			this.emit( "update/frame/play", [ this._frame ] );

		}

		return this._time.delta;

	}

	/*-------------------------------
		CreateEntityUpdateEvent
	-------------------------------*/

	public createEntityUpdateEvent( overrideParams?: Partial<MXP.EntityUpdateEvent> ): MXP.EntityUpdateEvent {

		const defaultEvent: MXP.EntityUpdateEvent = {
			playing: this._frame.playing,
			timeElapsed: this._time.engine,
			timeDelta: this._time.delta,
			timeCode: this._time.code,
			timeCodeFrame: this._frame.current,
			resolution: this.renderer.resolution,
			renderer: this.renderer,
			forceDraw: false,
		};

		if ( overrideParams ) {

			return { ...defaultEvent, ...overrideParams };

		}

		return defaultEvent;

	}

	/*-------------------------------
		SetSize
	-------------------------------*/

	public setSize( resolution: GLP.Vector ) {

		this._renderer.resize( resolution );
		this._renderer.canvas.width = resolution.x;
		this._renderer.canvas.height = resolution.y;

		const uRes = this._renderer.globalUniforms.uResolution.value as GLP.Vector;
		uRes.copy( resolution );
		this._renderer.globalUniforms.uAspectRatio.value = resolution.x / Math.max( resolution.y, 1 );

	}

	/*-------------------------------
		Playback
	-------------------------------*/

	public play() {

		this._frame.playing = true;

		this._time.current = new Date().getTime();

	}

	public stop() {

		this._frame.playing = false;

	}

	public seek( frame: number ) {

		this._time.code = frame / 60;
		this._frame.current = frame;

		this.emit( "update/frame/play", [ this._frame ] );

	}

	/*-------------------------------
		UpdateOffline
	-------------------------------*/

	public updateOffline( frame: number, fps: number ) {

		const timeCode = frame / fps;
		const delta = 1 / fps;

		this._time.delta = delta;
		this._time.current = new Date().getTime();
		this._time.engine += delta;
		this._time.code = timeCode;
		this._frame.current = timeCode * 60;
		this._frame.playing = true;

		const event = this.createEntityUpdateEvent( { forceDraw: true } );

		this._renderer.globalUniforms.uTime.value = this._time.code;
		this._renderer.globalUniforms.uTimeF.value = this._time.code % 1;
		this._renderer.globalUniforms.uTimeE.value = this._time.engine;
		this._renderer.globalUniforms.uTimeEF.value = this._time.engine % 1;

		const updateTextures = Engine.resources.updateEveryFrameTextures;

		for ( let i = 0; i < updateTextures.length; i ++ ) {

			updateTextures[ i ].render();

		}

		this._root.update( event );
		this._root.postUpdate( event );
		this._root.updateMatrixRecursive();
		this._root.prepareRender( event );

		if ( this.enableRender ) {

			const camera = this._cameraEntity || this._findCameraEntity();

			if ( camera ) {

				this._renderer.render( this._root, camera, event );

			}

		}

		this._root.commitFrame( event );

	}

	/*-------------------------------
		CompileShaders
	-------------------------------*/

	public compileShaders( onProgress?: ( label: string, loaded: number, total: number ) => void ) {

		const event = this.createEntityUpdateEvent( { forceDraw: true } );

		const camera = this._cameraEntity || this._findCameraEntity();

		if ( ! camera ) return Promise.resolve();

		return this.renderer.compileShaders( this._root, camera, event, onProgress );

	}

	private _findCameraEntity(): MXP.Entity | null {

		let found: MXP.Entity | null = null;

		this._root.traverse( ( entity ) => {

			if ( found ) return;

			const cameras = entity.getComponentsByTag<MXP.Camera>( "camera" );

			for ( let i = 0; i < cameras.length; i ++ ) {

				if ( cameras[ i ].displayOut ) {

					found = entity;
					return;

				}

			}

		} );

		return found;

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this._disposed = true;
		this._root.disposeRecursive();

	}

}

// 初期化演算子を使うとterserに消されるのでこっちで初期化
Engine.resources = new Resources();
