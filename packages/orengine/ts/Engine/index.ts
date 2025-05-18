import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectData, OREngineProjectFrame, ProjectSerializer } from './ProjectSerializer';
import { Resources } from './Resources';

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

export class Engine extends MXP.Entity {

	public static resources: Resources;
	public static instances: Map<WebGL2RenderingContext, Engine>;
	public enableRender: boolean;

	private _renderer: MXP.Renderer;
	private _gl: WebGL2RenderingContext;
	private _canvas: HTMLCanvasElement | OffscreenCanvas;
	private _projectCache: OREngineProjectData | null;
	private _root: MXP.Entity;
	private _uniforms: GLP.Uniforms;
	private _time: SceneTime;
	private _frame: FramePlay;
	private _frameSetting: OREngineProjectFrame;
	private _disposed: boolean;

	constructor( gl: WebGL2RenderingContext ) {

		super();

		Engine.instances.set( gl, this );

		this._gl = gl;
		this.name = "OREngine";
		this._disposed = false;

		this._uniforms = {
			uTime: {
				value: 0,
				type: "1f"
			},
			uTimeE: {
				value: 0,
				type: '1f'
			},
			uEnvMapIntensity: {
				value: 1,
				type: '1f'
			}
		};

		/*-------------------------------
			Canvas
		-------------------------------*/

		this._canvas = gl.canvas;

		/*-------------------------------
			Renderer
		-------------------------------*/

		this._renderer = new MXP.Renderer( gl );

		/*-------------------------------
			Project
		-------------------------------*/

		this._projectCache = null;

		this.on( "update/blidge/scene", ( blidgeRoot: MXP.Entity ) => {

			if ( this._projectCache ) {

				ProjectSerializer.deserializeOverride( this._projectCache.overrides, this._root, blidgeRoot );

			}

		} );

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

		// root

		this._root = new MXP.Entity();
		this._root.initiator = "god";
		this._root.name = "root";
		this.add( this._root );

		this.field( "name", () => this.name, ( v ) => this.name = v );

		this.field( "scene", () => ProjectSerializer.serializeEntity( this._root ), ( v ) => {

			ProjectSerializer.deserializeEntity( v, this._root );

		} );

		this.field( "overrides", () => ProjectSerializer.serializeEntityOverride( this._root ), ( v ) => {

			ProjectSerializer.deserializeOverride( v, this._root, this._root );

		} );

		const tl = this.fieldDir( "timeline" );
		tl.field( "duration", () => this._frameSetting.duration, ( v ) => this._frameSetting.duration = v );
		tl.field( "fps", () => this._frameSetting.fps, ( v ) => this._frameSetting.fps = v );

		/*-------------------------------
			Register
		-------------------------------*/

	}

	public static getInstance( gl: WebGL2RenderingContext ) {

		const instance = this.instances.get( gl );

		if ( ! instance ) {

			throw new Error( "ERROR: NO ENGINE INSTANCE!!!" );

		}

		return instance;

	}

	/*-------------------------------
		Getters
	-------------------------------*/

	public get gl() {

		return this._gl;

	}

	public get canvas() {

		return this._canvas;

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

	/*-------------------------------
		Init Engine
	-------------------------------*/

	public init() {

		this._root.remove( this._renderer );
		this._root.disposeRecursive();
		this._root.add( this._renderer );

		this._root.position.set( 0, 0, 0 );
		this._root.euler.set( 0, 0, 0 );
		this._root.scale.set( 1, 1, 1 );
		this.add( this._root );

		this.name = "New Project";

	}

	/*-------------------------------
		Load Project
	-------------------------------*/

	public async load( project: OREngineProjectData ) {

		this.init();

		this.deserialize( project );

		this._projectCache = project || null;

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

		this._uniforms.uTime.value = this._time.code;
		this._uniforms.uTimeE.value = this._time.engine;

		this._root.update( event );

		if ( this.enableRender ) {

			this._renderer.render( this._root, event );

		}

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
		this._canvas.width = resolution.x;
		this._canvas.height = resolution.y;

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

		this.emit( "update/frame/play", [ this._frame ] );

	}

	/*-------------------------------
		CompileShaders
	-------------------------------*/

	public compileShaders( onProgress?: ( label: string, loaded: number, total: number ) => void ) {

		const event = this.createEntityUpdateEvent( { forceDraw: true } );

		return this.renderer.compileShaders( this._root, event, onProgress );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		super.dispose();

		this._disposed = true;
		this._root.remove( this._renderer );
		this._root.disposeRecursive();

	}

}

// 初期化演算子を使うとterserに消されるのでこっちで初期化
Engine.resources = new Resources();
Engine.instances = new Map();
