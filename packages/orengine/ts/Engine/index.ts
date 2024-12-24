import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectData, SceneSerializer, OREngineProjectFrame } from './IO/ProjectSerializer';

import { renderer, globalUniforms } from '~/ts/Globals';
import { initResouces } from '~/ts/Resources/init';

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

	// project

	private projectCache: OREngineProjectData | null;
	private projectSerializer: SceneSerializer;

	// entities

	public root: MXP.Entity;

	// time

	public time: SceneTime;

	// frame

	public frame: FramePlay;
	public frameSetting: OREngineProjectFrame;

	// renderer

	private _canvasWrapElm: HTMLElement;
	private _canvas: HTMLCanvasElement;
	public enableRender: boolean;

	private _disposed: boolean;

	constructor( canvas: HTMLCanvasElement ) {

		super();

		this.name = "";

		this._disposed = false;

		// resources

		initResouces();

		// project

		this.projectCache = null;

		this.projectSerializer = new SceneSerializer();

		this.on( "update/blidge/scene", ( blidgeRoot: MXP.Entity ) => {

			if ( this.projectCache ) {

				this.projectSerializer.applyOverride( this.root, blidgeRoot, this.projectCache.objectOverride );

			}

		} );

		this.on( "update/music", ( buffer: AudioBuffer, freqTex: GLP.GLPowerTexture, domainTex: GLP.GLPowerTexture ) => {

			// globalUniforms.music.uMusicFreqTex.value = freqTex;
			// globalUniforms.music.uMusicDomainTex.value = domainTex;

		} );

		// time

		this.time = {
			current: new Date().getTime(),
			engine: 0,
			delta: 0,
			code: 0,
		};

		// frame

		this.frameSetting = {
			duration: 600,
			fps: 30,
		};

		this.frame = {
			current: 0,
			playing: false
		};

		this.seek( 0 );
		this.enableRender = true;

		// root

		this.root = new MXP.Entity();
		this.root.initiator = "god";
		this.root.name = "root";
		this.add( this.root );

		this.field( "name", () => this.name, ( v ) => this.name = v );
		this.field( "objectOverride", () => this.projectSerializer.serialize( this.root ).objectOverride );
		this.field( "scene", () => this.projectSerializer.serialize( this.root ).scene );

		const tl = this.fieldDir( "timeline" );
		tl.field( "duration", () => this.frameSetting.duration, ( v ) => this.frameSetting.duration = v );
		tl.field( "fps", () => this.frameSetting.fps, ( v ) => this.frameSetting.fps = v );

		/*-------------------------------
			Canvas
		-------------------------------*/

		this._canvas = canvas;
		this._canvasWrapElm = document.createElement( "div" );
		this._canvasWrapElm.setAttribute( "style", "position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;" );
		this._canvasWrapElm.setAttribute( "data-time", new Date().getTime().toString() );
		this._canvasWrapElm.appendChild( this._canvas );

		const onResize = () => {

			this.resize();

		};

		const resizeObserver = new ResizeObserver( onResize );
		resizeObserver.observe( this._canvasWrapElm );

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


	}

	public get canvasWrapElm() {

		return this._canvasWrapElm;

	}

	public get disposed() {

		return this._disposed;

	}

	public init( project?: OREngineProjectData ) {

		this.root.remove( renderer );
		this.root.disposeRecursive();
		this.root.add( renderer );

		this.root.position.set( 0, 0, 0 );
		this.root.euler.set( 0, 0, 0 );
		this.root.scale.set( 1, 1, 1 );
		this.add( this.root );

		this.projectCache = project || null;

		if ( project ) {

			this.name = project.name;
			this.deserialize( project );
			this.projectSerializer.deserialize( project, this.root );

		} else {

			this.name = "New Project";

		}

		this.emit( "update/graph" );
		this.emit( "loaded" );

	}

	public update( param?: Undefineder<MXP.EntityUpdateEvent> ) {

		const newTime = new Date().getTime();
		this.time.delta = ( newTime - this.time.current ) / 1000;
		this.time.current = newTime;

		if ( this.frame.playing ) {

			this.frame.current = this.frame.current + this.frameSetting.fps * this.time.delta;

			this.emit( "update/frame/play", [ this.frame ] );

		}


		this.time.code = this.frame.current / this.frameSetting.fps;
		this.time.engine += this.time.delta;

		globalUniforms.time.uTime.value = this.time.code;
		globalUniforms.time.uTimeF.value = this.time.code % 1;
		globalUniforms.time.uTimeE.value = this.time.engine;
		globalUniforms.time.uTimeEF.value = this.time.engine % 1;

		const event: MXP.EntityUpdateEvent = {
			timElapsed: this.time.engine,
			timeDelta: this.time.delta,
			timeCode: this.time.code,
			timeCodeFrame: this.frame.current,
			forceDraw: param && param.forceDraw,
			playing: this.frame.playing,
		};

		this.root.update( event );

		const renderStack = this.root.finalize( event );


		if ( this.enableRender ) {

			renderer.render( event, renderStack );

		}

		return this.time.delta;

	}

	public setSize( resolution: GLP.Vector ) {

		globalUniforms.resolution.uResolution.value.copy( resolution );
		globalUniforms.resolution.uAspectRatio.value = resolution.x / resolution.y;
		renderer.resize( resolution );

		this._canvas.width = resolution.x;
		this._canvas.height = resolution.y;

	}

	public resize() {

		const wrapperRect = this.canvasWrapElm.getBoundingClientRect();
		const canvasAspect = this._canvas.width / this._canvas.height;
		const wrapperAspect = wrapperRect.width / wrapperRect.height;

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

		this.frame.playing = true;

		this.time.current = new Date().getTime();

	}

	public stop() {

		this.frame.playing = false;

	}

	public seek( frame: number ) {

		this.frame.current = frame;

		this.emit( "update/frame/play", [ this.frame ] );

	}

	// dispose

	public dispose() {

		this._disposed = true;

		this.root.remove( renderer );

		super.dispose();

		this.emit( "dispose" );


	}

}
