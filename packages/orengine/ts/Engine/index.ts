import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectData, SceneSerializer, OREngineProjectFrame } from './ProjectSerializer';
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

	public static resources: Resources = new Resources();
	public static instances: Map<WebGL2RenderingContext, Engine> = new Map();

	public enableRender: boolean;
	private _renderer: MXP.Renderer;
	private _gl: WebGL2RenderingContext;
	private _canvasWrapElm: HTMLElement;
	private _canvas: HTMLCanvasElement | OffscreenCanvas;
	private _projectCache: OREngineProjectData | null;
	private _projectSerializer: SceneSerializer;
	public _root: MXP.Entity;
	public _time: SceneTime;
	public _frame: FramePlay;
	public _frameSetting: OREngineProjectFrame;
	private _disposed: boolean;

	constructor( gl: WebGL2RenderingContext ) {

		super();

		this._gl = gl;
		this.name = "OREngine";
		this._disposed = false;

		/*-------------------------------
			Canvas
		-------------------------------*/

		this._canvas = gl.canvas;
		this._canvasWrapElm = document.createElement( "div" );
		this._canvasWrapElm.setAttribute( "style", "position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;" );
		this._canvasWrapElm.setAttribute( "data-time", new Date().getTime().toString() );

		if ( "childNodes" in this._canvas ) {

			this._canvasWrapElm.appendChild( this._canvas );

		}

		const onResize = () => {

			this.resize();

		};

		const resizeObserver = new ResizeObserver( onResize );
		resizeObserver.observe( this._canvasWrapElm );

		/*-------------------------------
			Renderer
		-------------------------------*/

		this._renderer = new MXP.Renderer( gl );

		/*-------------------------------
			Project
		-------------------------------*/

		this._projectCache = null;

		this._projectSerializer = new SceneSerializer();

		this.on( "update/blidge/scene", ( blidgeRoot: MXP.Entity ) => {

			if ( this._projectCache ) {

				this._projectSerializer.applyOverride( this._root, blidgeRoot, this._projectCache.objectOverride );

			}

		} );

		this.on( "update/music", ( buffer: AudioBuffer, freqTex: GLP.GLPowerTexture, domainTex: GLP.GLPowerTexture ) => {

			// globalUniforms.music.uMusicFreqTex.value = freqTex;
			// globalUniforms.music.uMusicDomainTex.value = domainTex;

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
		this.field( "objectOverride", () => this._projectSerializer.serialize( this._root ).objectOverride );
		this.field( "scene", () => this._projectSerializer.serialize( this._root ).scene );

		const tl = this.fieldDir( "timeline" );
		tl.field( "duration", () => this._frameSetting.duration, ( v ) => this._frameSetting.duration = v );
		tl.field( "fps", () => this._frameSetting.fps, ( v ) => this._frameSetting.fps = v );

		/*-------------------------------
			Dispose
		-------------------------------*/

		const onDispose = () => {

			resizeObserver.disconnect();

		};

		this.once( "dispose", onDispose );

		/*-------------------------------
			Resize
		-------------------------------*/

		this.setSize( new GLP.Vector( 1920, 1080 ) );

		/*-------------------------------
			Register
		-------------------------------*/

		Engine.instances.set( gl, this );

	}

	public static getInstance( gl: WebGL2RenderingContext ) {

		const instance = this.instances.get( gl );

		if ( ! instance ) {

			throw new Error( "ERROR: NO ENGINE INSTANCE!!!" );

		}

		return instance;

	}

	public get gl() {

		return this._gl;

	}

	public get canvasWrapElm() {

		return this._canvasWrapElm;

	}

	public get canvas() {

		return this._canvas;

	}

	public get renderer() {

		return this._renderer;

	}

	public get disposed() {

		return this._disposed;

	}

	public init( project?: OREngineProjectData ) {

		this._root.remove( this._renderer );
		this._root.disposeRecursive();
		this._root.add( this._renderer );

		this._root.position.set( 0, 0, 0 );
		this._root.euler.set( 0, 0, 0 );
		this._root.scale.set( 1, 1, 1 );
		this.add( this._root );

		this._projectCache = project || null;

		if ( project ) {

			this.name = project.name;
			this.deserialize( project );
			this._projectSerializer.deserialize( project, this._root );

		} else {

			this.name = "New Project";

		}

		this.emit( "update/graph" );
		this.emit( "loaded" );

	}

	public update( param?: Undefineder<MXP.EntityUpdateEvent> ) {

		const newTime = new Date().getTime();
		this._time.delta = ( newTime - this._time.current ) / 1000;
		this._time.current = newTime;
		this._time.engine += this._time.delta;
		this._time.code += this._time.delta * ( this._frame.playing ? 1 : 0 );
		this._frame.current = this._time.code * 60;

		if ( this._frame.playing ) {

			this.emit( "update/frame/play", [ this._frame ] );

		}

		const event: MXP.EntityUpdateEvent = {
			playing: this._frame.playing,
			timeElapsed: this._time.engine,
			timeDelta: this._time.delta,
			timeCode: this._time.code,
			timeCodeFrame: this._frame.current,
			resolution: this.renderer.resolution,
			renderer: this.renderer,
			forceDraw: param && param.forceDraw,
		};

		this._root.update( event );

		const renderStack = this._root.finalize( event );

		if ( this.enableRender ) {

			this._renderer.render( event, renderStack );

		}

		return this._time.delta;

	}

	public setSize( resolution: GLP.Vector ) {

		this._renderer.resize( resolution );
		this._canvas.width = resolution.x;
		this._canvas.height = resolution.y;

	}

	public resize() {

		const wrapperRect = this.canvasWrapElm.getBoundingClientRect();
		const canvasAspect = this._canvas.width / this._canvas.height;
		const wrapperAspect = wrapperRect.width / wrapperRect.height;

		if ( ! ( "style" in this._canvas ) ) return;

		if ( canvasAspect > wrapperAspect ) {

			this._canvas.style.width = "100%";
			this._canvas.style.height = "auto";

		} else {

			this._canvas.style.width = "auto";
			this._canvas.style.height = "100%";

		}

	}

	// api

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

	// dispose

	public dispose() {

		super.dispose();

		this._disposed = true;
		this._root.remove( this._renderer );
		this._root.disposeRecursive();

	}

}
