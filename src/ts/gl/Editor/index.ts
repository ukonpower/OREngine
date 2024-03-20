import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, gl, resource } from '../../Globals';
import { OREngineProjectData } from '../IO/ProjectSerializer';
import { Scene } from '../Scene';
import { OREngineResource } from '../Scene/Resources';
import { FrameDebugger } from '../Scene/utils/FrameDebugger';
import { Keyboard, PressedKeys } from '../Scene/utils/Keyboard';

import { EditorDataManager, OREngineEditorData, OREngineEditorViewType } from './EditorDataManager';
import { FileSystem } from './FileSystem';

export class GLEditor extends GLP.EventEmitter {

	// resources

	public resource: OREngineResource;

	// project

	public currentProject: OREngineProjectData | null;

	// scene

	public selectedEntity: MXP.Entity | null = null;

	// filesystem

	private fileSystem: FileSystem;

	// data

	public data: EditorDataManager;
	private unsaved: boolean;

	// keyboard

	private keyBoard: Keyboard;

	// scene

	public scene: Scene;

	// canvas

	public canvas: HTMLCanvasElement;
	public canvasWrapElm: HTMLElement | null;
	public resolutionScale: number;

	// state

	public viewType: OREngineEditorViewType;
	private disposed: boolean;

	// frame debugger

	private frameDebugger: FrameDebugger;

	constructor() {

		super();

		// canvas

		this.canvas = canvas;
		this.canvasWrapElm = null;
		this.resolutionScale = 0.5;

		// scene

		this.scene = new Scene();

		// view

		this.viewType = "render";

		// project

		this.currentProject = null;

		// resource

		this.resource = resource;

		// filesystem

		this.fileSystem = new FileSystem();

		// keyboard

		this.keyBoard = new Keyboard();

		this.keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.save();

			}

		} );

		// graph

		let updateTimer: number | null = null;

		const onChanged = ( type: string, opt?: any ) => {

			if ( updateTimer !== null ) return;

			updateTimer = window.setTimeout( () => {

				updateTimer = null;

				this.unsaved = true;

				this.emit( "changed", [ type, opt ] );

			}, 10 );

		};

		this.scene.on( "changed", onChanged );

		this.scene.on( "dispose", () => {

			this.off( "changed", onChanged );

		} );

		// data

		this.data = new EditorDataManager();
		this.unsaved = false;

		const localEditorData = this.fileSystem.get<OREngineEditorData>( "editor/data" );

		if ( localEditorData ) {

			this.data.setEditorData( localEditorData );

		}

		// frameDebugger

		this.frameDebugger = new FrameDebugger( gl, this.canvas );

		this.scene.renderer.on( 'drawPass', ( rt?: GLP.GLPowerFrameBuffer, label?: string ) => {

			if ( this.frameDebugger && this.frameDebugger.enable && rt ) {

				this.frameDebugger.push( rt, label );

			}

		} );

		// unload

		const onBeforeUnload = ( e: BeforeUnloadEvent ) => {

			if ( this.unsaved ) {

				e.preventDefault();
				e.returnValue = "";

			}

		};

		window.addEventListener( "beforeunload", onBeforeUnload );

		// dispose

		this.disposed = false;

		this.once( 'dispose', () => {

			window.removeEventListener( "beforeunload", onBeforeUnload );

		} );

		// resize

		window.addEventListener( 'resize', this.resize.bind( this ) );

		setTimeout( () => {

			this.resize();

		}, 100 );

		// load setting

		this.openProject( this.data.settings.currentProjectName || "NewProject" );

		this.setResolutionScale( this.data.settings.resolutionScale || 0.5 );

		this.setViewType( this.data.settings.viewType || "render" );

		// animate

		this.animate();

	}

	private animate() {

		if ( this.disposed ) return;

		this.scene.update();

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

	public selectEntity( entity: MXP.Entity | null ) {

		this.selectedEntity = entity;

		this.emit( "control/select", [ entity ] );

	}

	public openProject( name: string ) {

		let project = this.data.getProject( name );

		if ( project ) {

			this.scene.loadProject( project );

		} else {

			this.scene.loadProject();
			project = this.scene.exportProject( name );
			this.data.setProject( project );

		}

		this.currentProject = project;

		this.data.settings.currentProjectName = this.currentProject.setting.name;

		this.selectEntity( null );

	}

	public setViewType( type: OREngineEditorViewType ) {

		this.data.settings.viewType = this.viewType = type;

		if ( this.viewType === "debug" ) {

			this.frameDebugger.enable = true;

		} else {

			this.frameDebugger.enable = false;

		}

	}

	public setResolutionScale( scale: number ) {

		this.data.settings.resolutionScale = scale;

		this.resolutionScale = scale;

		this.resize();

	}

	public save() {

		if ( ! this.currentProject ) return;

		const projectName = this.currentProject.setting.name;

		this.data.settings.currentProjectName = projectName;
		this.data.setProject( this.scene.exportProject( projectName ) );

		const editorData = this.data.serialize();
		this.fileSystem.set( "editor/data", editorData );

		this.unsaved = false;

	}

	/*-------------------------------
		Resize
	-------------------------------*/

	private resize() {

		const wrapWidth = this.canvasWrapElm ? this.canvasWrapElm.clientWidth : 16;
		const wrapHeight = this.canvasWrapElm ? this.canvasWrapElm.clientHeight : 9;
		const wrapAspect = wrapWidth / wrapHeight;

		const canvasPixelWidth = 1920;
		const canvasPixelHeight = 1080;
		const canvasPixelAspect = canvasPixelWidth / canvasPixelHeight;

		let canvasWidth = wrapWidth;
		let canvasHeight = wrapHeight;

		if ( canvasPixelAspect < wrapAspect ) {

			canvasWidth = wrapHeight * canvasPixelAspect;

		} else {

			canvasHeight = wrapWidth / canvasPixelAspect;

		}

		this.canvas.style.width = canvasWidth + 'px';
		this.canvas.style.height = canvasHeight + 'px';

		this.canvas.width = canvasPixelWidth * this.resolutionScale;
		this.canvas.height = canvasPixelHeight * this.resolutionScale;

		const resolution = new GLP.Vector( this.canvas.width, this.canvas.height );

		this.scene.resize( resolution );

		this.frameDebugger.resize( resolution );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disposed = true;

		this.scene.dispose();
		this.keyBoard.dispose();
		this.scene.dispose();
		this.frameDebugger.dispose();

	}

}
