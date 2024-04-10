import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, power, resource } from '../../Globals';
import { OREngineProjectData } from '../IO/ProjectSerializer';
import { ProjectScene } from '../ProjectScene';
import { OREngineResource } from '../ProjectScene/Resources';
import { FrameDebugger } from '../ProjectScene/utils/FrameDebugger';
import { Keyboard, PressedKeys } from '../ProjectScene/utils/Keyboard';

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

	public scene: ProjectScene;

	// canvas

	public canvas: HTMLCanvasElement;
	public canvasWrapElm: HTMLElement | null;
	public resolutionScale: number;

	// veiw

	public viewType: OREngineEditorViewType;

	// frame debugger

	private frameDebugger: FrameDebugger;

	// sound

	public audioBuffer: AudioBuffer | null;

	// dispose

	private disposed: boolean;

	constructor() {

		super();

		// canvas

		this.canvas = canvas;
		this.canvasWrapElm = null;
		this.resolutionScale = 0.5;

		// scene

		this.scene = new ProjectScene();

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

				this.emit( "update/graph", [ type, opt ] );

			}, 10 );

		};

		this.scene.on( "update/graph", onChanged );

		this.scene.on( "dispose", () => {

			this.off( "update/graph", onChanged );

		} );

		// data

		this.data = new EditorDataManager();
		this.unsaved = false;

		// frameDebugger

		this.frameDebugger = new FrameDebugger( power, this.canvas );

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

		this.fileSystem.get<OREngineEditorData>( "editor.json" ).then( ( data ) => {

			if ( data ) {

				this.data.setEditorData( data );

			}

			this.openProject( this.data.settings.currentProjectName || "NewProject" );

			this.setResolutionScale( this.data.settings.resolutionScale || 0.5 );

			this.setViewType( this.data.settings.viewType || "render" );

		} );

		// sound

		this.audioBuffer = null;

		this.scene.on( "update/music", ( buffer: AudioBuffer ) => {

			this.audioBuffer = buffer;

		} );

		// animate

		this.animate();

	}

	private animate() {

		if ( this.disposed ) return;

		// update

		this.scene.update();

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

	public selectEntity( entity: MXP.Entity | null ) {

		this.selectedEntity = entity;

		this.emit( "action/select", [ entity ] );

	}

	public openProject( name: string ) {

		let project = this.data.getProject( name );

		if ( project ) {

			this.scene.init( project );

		} else {

			this.scene.init();
			project = this.scene.export( name );
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

	// resolution

	public setResolutionScale( scale: number ) {

		this.data.settings.resolutionScale = scale;

		this.resolutionScale = scale;

		this.resize();

	}

	public save() {

		if ( ! this.currentProject ) return;

		const projectName = this.currentProject.setting.name;

		this.data.settings.currentProjectName = projectName;
		this.data.setProject( this.scene.export( projectName ) );

		const editorData = this.data.serialize();
		this.fileSystem.set( "editor.json", editorData );

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
