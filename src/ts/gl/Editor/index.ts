import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, resource, power, renderer } from '../GLGlobals';
import { ProjectScene } from '../ProjectScene';
import { FrameDebugger } from '../ProjectScene/utils/FrameDebugger';
import { Keyboard, PressedKeys } from '../ProjectScene/utils/Keyboard';
import { OREngineResource } from '../Resources';

import { EditorDataManager, OREngineEditorData, OREngineEditorViewType } from './EditorDataManager';
import { FileSystem } from './FileSystem';

export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

export class GLEditor extends MXP.Exportable {

	// canvas

	public canvas: HTMLCanvasElement;
	public canvasWrapElm: HTMLElement | null;
	public resolutionScale: number;

	// resources

	public resource: OREngineResource;

	// filesystem

	private fileSystem: FileSystem;

	// data

	private unsaved: boolean;
	public dataManager: EditorDataManager;

	// keyboard

	private keyBoard: Keyboard;

	// scene

	public scene: ProjectScene;

	// view

	private viewType: OREngineEditorViewType;
	private frameDebugger: FrameDebugger;

	// selected

	public selectedEntity: MXP.Entity | null;

	// sound

	public audioBuffer: AudioBuffer | null;

	// loop

	private frameLoop: EditorTimelineLoop;

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

		// resource

		this.resource = resource;

		// filesystem

		this.fileSystem = new FileSystem();

		// keyboard

		this.keyBoard = new Keyboard();

		this.keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.projectSave();

			}

			if ( e.key == ' ' ) {

				if ( this.scene.frame.playing ) {

					this.scene.stop( );

				} else {

					this.scene.play();

				}

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

		this.dataManager = new EditorDataManager();
		this.unsaved = false;

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

		this.fileSystem.get<OREngineEditorData>( "editor.json" ).then( ( data ) => {

			if ( data ) {

				this.dataManager.setEditorData( data );

			}

			this.projectOpen( this.dataManager.settings.currentProjectName || '' );

			this.setProps( this.dataManager.settings );

		} );

		// selected

		this.selectedEntity = null;

		// sound

		this.audioBuffer = null;

		this.scene.on( "update/music", ( buffer: AudioBuffer ) => {

			this.audioBuffer = buffer;

		} );

		// loop

		this.frameLoop = {
			enabled: false,
			start: 0,
			end: 0,
		};

		// blidge

		this.scene.on( "update/blidge/frame", ( e: MXP.BLidgeFrame ) => {

			this.scene.seek( e.current );

			if ( e.playing && ! this.scene.frame.playing ) {

				this.scene.play();

			} else if ( ! e.playing && this.scene.frame.playing ) {

				this.scene.stop();

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

		// animate

		this.animate();

	}

	private animate() {

		if ( this.disposed ) return;

		// update

		this.scene.update();

		if ( this.scene.frame.playing ) {

			if ( this.scene.frame.current < 0 || this.scene.frame.current > this.scene.frameSetting.duration ) {

				this.scene.frame.current = 0;

			}

			// loop

			if ( this.frameLoop.enabled ) {

				if ( this.scene.frame.current < this.frameLoop.start || this.scene.frame.current > this.frameLoop.end ) {

					this.scene.frame.current = this.frameLoop.start;

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
		Props
	-------------------------------*/

	public getProps(): MXP.ExportableProps {

		return {
			enableRender: {
				value: this.scene.enableRender,
			},
			currentProjectName: {
				value: this.scene.name,
			},
			resolutionScale: {
				value: this.resolutionScale,
			},
			viewType: {
				value: this.viewType
			},
			frameLoop: {
				enabled: {
					value: this.frameLoop.enabled,
				},
				start: {
					value: this.frameLoop.start,
				},
				end: {
					value: this.frameLoop.end,
				}
			}
		};

	}

	public setPropsImpl( props: MXP.ExportablePropsSerialized ) {

		// render

		this.scene.enableRender = props[ "enableRender" ];

		// viewtype

		this.viewType = this.dataManager.settings.viewType = props[ "viewType" ];

		if ( this.viewType === "debug" ) {

			this.frameDebugger.enable = true;

		} else {

			this.frameDebugger.enable = false;

		}

		//  scale

		const scale = props[ "resolutionScale" ];

		this.dataManager.settings.resolutionScale = scale;

		this.resolutionScale = scale;

		this.resize();

		// name

		const project = this.dataManager.getProject( this.scene.name );

		if ( project ) {

			project.setting.name = props[ "currentProjectName" ];

		}

		this.scene.name = props[ "currentProjectName" ];

		// frameLoop
		this.frameLoop.enabled = props[ "frameLoop/enabled" ];

		this.frameLoop.start = Math.max( 0, props[ "frameLoop/start" ] || 0 );
		this.frameLoop.end = Math.min( this.scene.frameSetting.duration, Math.max( this.frameLoop.start, props[ "frameLoop/end" ] ) || 100 );

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

		this.selectedEntity = entity;

		this.emit( "action/select", [ entity ] );

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

		let project = this.dataManager.getProject( name );

		if ( project ) {

			this.scene.init( project );

		} else {

			this.scene.init();
			project = this.scene.export();
			this.dataManager.setProject( project );

		}

		document.title = name;

		this.emit( "action/loadProject" );

		this.selectEntity( null );

	}

	public projectDelete( name: string ) {

		this.dataManager.deleteProject( name );

		const project = this.dataManager.projects[ 0 ];

		this.projectOpen( project && project.setting.name || '' );

	}

	public projectSave() {

		this.dataManager.setProject( this.scene.export() );
		this.dataManager.setSetting( this.getPropsSerialized() );

		this.fileSystem.set( "editor.json", this.dataManager.serialize() );

		this.unsaved = false;

	}

	// export

	public exportCurrentScene() {

		return this.fileSystem.set( "player.json", this.scene.export() );

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

		this.scene.disposeRecursive();
		this.keyBoard.dispose();
		this.frameDebugger.dispose();

	}

}
