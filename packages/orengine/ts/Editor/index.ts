import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../Engine';
import { OREngineProjectData } from '../Engine/IO/ProjectSerializer';
import { FrameDebugger } from '../Engine/utils/FrameDebugger';
import { Keyboard, PressedKeys } from '../Engine/utils/Keyboard';

import { FileSystem } from './FileSystem';

import { power, renderer } from '~/ts/Globals';

export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

export class Editor extends MXP.Serializable {

	private _engine: Engine;
	private _fileSystem: FileSystem;
	private _keyBoard: Keyboard;
	private _selectedEntityId: MXP.Entity | null;
	private _audioBuffer: AudioBuffer | null;
	private _frameLoop: EditorTimelineLoop;
	private _resolutionScale: number;
	private _viewType: "render" | "debug";
	private _projects: Map<string, OREngineProjectData>;
	private _currentProject: OREngineProjectData | null;
	private _frameDebugger: FrameDebugger;
	private _disposed: boolean;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._fileSystem = new FileSystem();
		this._projects = new Map();
		this._viewType = "render";
		this._selectedEntityId = null;
		this._currentProject = null;
		this._resolutionScale = 1.0;
		this._disposed = false;

		/*-------------------------------
			KeyEvents
		-------------------------------*/

		this._keyBoard = new Keyboard();

		this._keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.projectSave();

			}

			if ( e.key == ' ' ) {

				if ( this._engine.frame.playing ) {

					this._engine.stop( );

				} else {

					this._engine.play();

				}

			}

		} );


		/*-------------------------------
			Frame Debugger
		-------------------------------*/

		this._frameDebugger = new FrameDebugger( power, engine.canvas );

		renderer.on( 'drawPass', ( rt?: GLP.GLPowerFrameBuffer, label?: string ) => {

			if ( this._frameDebugger && this._frameDebugger.enable && rt ) {

				this._frameDebugger.push( rt, label );

			}

		} );

		/*-------------------------------
			Load
		-------------------------------*/

		this._fileSystem.get<MXP.SerializedFields>( "editor.json" ).then( ( data ) => {

			if ( data ) {

				this.deserialize( data );

			}

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

		this.field( "projects", () => Array.from( this._projects.values() ), v => {

			this._projects = new Map( v.map( ( project ) => [ project.name, project ] ) );

		} );

		this.field( "enableRender", () => this._engine.enableRender, v => this._engine.enableRender = v );

		this.field( "projectName", () => this._currentProject && this._currentProject.name || "", v => {

			if ( this._currentProject ) {

				this._currentProject.name = v;

			}

		} );

		this.field( "openedProject", () => this._currentProject && this._currentProject.name, v => {

			if ( this._currentProject === null ) {

				this.projectOpen( v || "" );

			} else if ( v !== this._currentProject.name && v ) {

				this.projectOpen( v );

			}

		} );

		this.field( "resolutionScale", () => this._resolutionScale, v => {

			this._resolutionScale = Number( v );

			this.resize();

		} );

		this.field( "viewType", () => this._viewType, v => {

			this._viewType = v;

			if ( this._viewType === "debug" ) {

				this._frameDebugger.enable = true;

			} else {

				this._frameDebugger.enable = false;

			}

		} );

		const frameLoop = this.fieldDir( "frameLoop" );
		frameLoop.field( "enabled", () => this._frameLoop.enabled, v => this._frameLoop.enabled = v );
		frameLoop.field( "start", () => this._frameLoop.start, v => this._frameLoop.start = v );
		frameLoop.field( "end", () => this._frameLoop.end, v => this._frameLoop.end = v );

		this.field( "selectedEntityId", () => this._selectedEntityId, v => {

			this._selectedEntityId = v;

		} );

		// animate

		this.animate();

	}

	public get engine() {

		return this._engine;

	}

	public get audioBuffer() {

		return this._audioBuffer;

	}

	public get disposed() {

		return this._disposed;

	}

	private animate() {

		if ( this._disposed ) return;

		// update

		this._engine.update();

		if ( this._engine.frame.playing ) {

			if ( this._engine.frame.current < 0 || this._engine.frame.current > this._engine.frameSetting.duration ) {

				this._engine.frame.current = 0;

			}

			// loop

			if ( this._frameLoop.enabled ) {

				if ( this._engine.frame.current < this._frameLoop.start || this._engine.frame.current > this._frameLoop.end ) {

					this._engine.frame.current = this._frameLoop.start;

				}

			}

		}

		// debugger

		if ( this._frameDebugger && this._frameDebugger.enable ) {

			this._frameDebugger.draw();

		}

		window.requestAnimationFrame( this.animate.bind( this ) );

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

		const project = this._projects.get( name );

		if ( project ) {

			this._engine.init( project );
			this._currentProject = project;

		} else {

			this._engine.init();
			this._currentProject = this._engine.serialize();
			this.projectSave();

		}

		document.title = name;

		this.emit( "loadedProject" );
		// this.noticePropsChanged( "openedProject" );

	}

	public projectDelete( name: string ) {

		this._projects.delete( name );
		const project = this._projects.values().next().value;

		if ( project ) {

			this.projectOpen( project.name );

		} else {

			this.projectOpen( "" );

		}

	}

	public projectSave() {

		this._projects.set( this._engine.name, this._engine.serialize( true ) );

		this._fileSystem.set( "editor.json", {
			...this.serialize(),
		} );

	}

	// export

	public exportCurrentScene() {

		return this._fileSystem.set( "player.json", this._engine.serialize( true ) );

	}

	/*-------------------------------
		Resize
	-------------------------------*/

	private resize() {

		const resolution = new GLP.Vector( 1920, 1080 );

		// debugegr

		this._frameDebugger.resize( resolution );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this._disposed = true;
		this._keyBoard.dispose();
		this._frameDebugger.dispose();

	}

}
