import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { screenElm, canvas, power, renderer } from '../Globals';
import { OREngine } from '../OREngine';
import { OREngineProjectData } from '../OREngine/IO/ProjectSerializer';
import { FrameDebugger } from '../OREngine/utils/FrameDebugger';
import { Keyboard, PressedKeys } from '../OREngine/utils/Keyboard';

import { FileSystem } from './FileSystem';

export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

export class OREngineGUICore extends MXP.Serializable {

	// canvas

	public screenElm: HTMLDivElement;
	public canvas: HTMLCanvasElement;
	public canvasWrapElm: HTMLElement | null;

	// filesystem

	private fileSystem: FileSystem;

	// data

	public resolutionScale: number;
	public viewType: "render" | "debug";
	public projects: Map<string, OREngineProjectData>;
	public currentProject: OREngineProjectData | null;

	// debugger

	private frameDebugger: FrameDebugger;

	// keyboard

	private keyBoard: Keyboard;

	// scene

	public engine: OREngine;

	// selected

	public selectedEntityId: MXP.Entity | null;

	// sound

	public audioBuffer: AudioBuffer | null;

	// loop

	private frameLoop: EditorTimelineLoop;

	// dispose

	private disposed: boolean;

	constructor() {

		super();

		// canvas

		this.screenElm = screenElm;
		this.canvas = canvas;
		this.canvasWrapElm = null;
		this.resolutionScale = 0.5;

		// scene

		this.engine = new OREngine();

		// view

		this.viewType = "render";

		// filesystem

		this.fileSystem = new FileSystem();

		// projects

		this.projects = new Map();

		this.currentProject = null;

		// keyboard

		this.keyBoard = new Keyboard();

		this.keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.projectSave();

			}

			if ( e.key == ' ' ) {

				if ( this.engine.frame.playing ) {

					this.engine.stop( );

				} else {

					this.engine.play();

				}

			}

		} );

		// graph

		let updateTimer: number | null = null;

		const onChanged = ( type: string, opt?: any ) => {

			if ( updateTimer !== null ) return;

			updateTimer = window.setTimeout( () => {

				updateTimer = null;

				this.emit( "update/graph", [ type, opt ] );

			}, 10 );

		};

		this.engine.on( "update/graph", onChanged );

		this.engine.on( "dispose", () => {

			this.off( "update/graph", onChanged );

		} );

		// frameDebugger

		this.frameDebugger = new FrameDebugger( power, this.canvas );

		renderer.on( 'drawPass', ( rt?: GLP.GLPowerFrameBuffer, label?: string ) => {

			if ( this.frameDebugger && this.frameDebugger.enable && rt ) {

				this.frameDebugger.push( rt, label );

			}

		} );

		// resize

		window.addEventListener( 'resize', this.resize.bind( this ) );

		setTimeout( () => {

			this.resize();

		}, 100 );

		// load setting

		this.fileSystem.get<MXP.SerializedFields>( "editor.json" ).then( ( data ) => {

			if ( data ) {

				this.deserialize( data );

			}

		} );

		// selected

		this.selectedEntityId = null;

		// sound

		this.audioBuffer = null;

		this.engine.on( "update/music", ( buffer: AudioBuffer ) => {

			this.audioBuffer = buffer;

		} );

		// loop

		this.frameLoop = {
			enabled: false,
			start: 0,
			end: 0,
		};

		// blidge

		this.engine.on( "update/blidge/frame", ( e: MXP.BLidgeFrame ) => {

			this.engine.seek( e.current );

			if ( e.playing && ! this.engine.frame.playing ) {

				this.engine.play();

			} else if ( ! e.playing && this.engine.frame.playing ) {

				this.engine.stop();

			}

		} );

		/*-------------------------------
			Fields
		-------------------------------*/

		this.field( "projects", () => Array.from( this.projects.values() ), v => {

			this.projects = new Map( v.map( ( project ) => [ project.name, project ] ) );

		} );

		this.field( "enableRender", () => this.engine.enableRender, v => this.engine.enableRender = v );

		this.field( "projectName", () => this.currentProject && this.currentProject.name || "", v => {

			if ( this.currentProject ) {

				this.currentProject.name = v;

			}

		} );

		this.field( "openedProject", () => this.currentProject && this.currentProject.name, v => {

			if ( this.currentProject === null ) {

				this.projectOpen( v || "" );

			} else if ( v !== this.currentProject.name && v ) {

				this.projectOpen( v );

			}

		} );

		this.field( "resolutionScale", () => this.resolutionScale, v => {

			this.resolutionScale = v;

			this.resize();

		} );

		this.field( "viewType", () => this.viewType, v => {

			this.viewType = v;

			if ( this.viewType === "debug" ) {

				this.frameDebugger.enable = true;

			} else {

				this.frameDebugger.enable = false;

			}

		} );

		const frameLoop = this.fieldDir( "frameLoop" );
		frameLoop.field( "enabled", () => this.frameLoop.enabled, v => this.frameLoop.enabled = v );
		frameLoop.field( "start", () => this.frameLoop.start, v => this.frameLoop.start = v );
		frameLoop.field( "end", () => this.frameLoop.end, v => this.frameLoop.end = v );

		this.field( "selectedEntityId", () => this.selectedEntityId, v => {

			this.selectedEntityId = v;

		} );

		// dispose

		this.disposed = false;

		// animate

		this.animate();

	}

	private animate() {

		if ( this.disposed ) return;

		// update

		this.engine.update();

		if ( this.engine.frame.playing ) {

			if ( this.engine.frame.current < 0 || this.engine.frame.current > this.engine.frameSetting.duration ) {

				this.engine.frame.current = 0;

			}

			// loop

			if ( this.frameLoop.enabled ) {

				if ( this.engine.frame.current < this.frameLoop.start || this.engine.frame.current > this.frameLoop.end ) {

					this.engine.frame.current = this.frameLoop.start;

				}

			}

		}

		// debugger

		if ( this.frameDebugger && this.frameDebugger.enable ) {

			this.frameDebugger.draw();

		}

		window.requestAnimationFrame( this.animate.bind( this ) );


	}

	/*-------------------------------
		API
	-------------------------------*/

	public setWrapperElm( elm: HTMLElement ) {

		this.canvasWrapElm = elm;

		this.resize();

	}

	// controls

	public selectEntity( entity: MXP.Entity | null ) {

		this.setField( "selectedEntityId", entity ? entity.uuid : null );

	}

	public createEntity( parentEntity: MXP.Entity, name: string ) {

		const newEntity = new MXP.Entity();

		newEntity.name = name;
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

	// project

	public projectOpen( name: string ) {

		const project = this.projects.get( name );

		if ( project ) {

			this.engine.init( project );
			this.currentProject = project;

		} else {

			this.engine.init();
			this.currentProject = this.engine.serialize();
			this.projectSave();

		}

		document.title = name;

		this.emit( "loadedProject" );
		// this.noticePropsChanged( "openedProject" );

	}

	public projectDelete( name: string ) {

		this.projects.delete( name );
		const project = this.projects.values().next().value;

		if ( project ) {

			this.projectOpen( project.name );

		} else {

			this.projectOpen( "" );

		}

	}

	public projectSave() {

		this.projects.set( this.engine.name, this.engine.serialize( true ) );

		this.fileSystem.set( "editor.json", {
			...this.serialize(),
		} );

	}

	// export

	public exportCurrentScene() {

		return this.fileSystem.set( "player.json", this.engine.serialize( true ) );

	}

	/*-------------------------------
		Resize
	-------------------------------*/

	private resize() {

		const aspect = 16 / 9;

		// wrap size

		const wrapWidth = this.canvasWrapElm ? this.canvasWrapElm.clientWidth : 16;
		const wrapHeight = this.canvasWrapElm ? this.canvasWrapElm.clientHeight : 9;
		const wrapAspect = wrapWidth / wrapHeight;

		// screen size


		let screenWidth = wrapWidth;
		let screenHeight = wrapHeight;

		if ( aspect < wrapAspect ) {

			screenWidth = wrapHeight * aspect;

		} else {

			screenHeight = wrapWidth / aspect;

		}

		this.screenElm.style.width = screenWidth + 'px';
		this.screenElm.style.height = screenHeight + 'px';

		// canvas resolution

		const canvasWidth = 1920;
		const canvasHeight = canvasWidth / aspect;

		this.canvas.width = 1920 * this.resolutionScale;
		this.canvas.height = canvasHeight * this.resolutionScale;

		// resize

		const resolution = new GLP.Vector( canvas.width, canvas.height );
		this.engine.resize( resolution );

		// debugegr

		this.frameDebugger.resize( resolution );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disposed = true;

		this.screenElm.remove();
		this.engine.disposeRecursive();
		this.keyBoard.dispose();
		this.frameDebugger.dispose();

	}

}
