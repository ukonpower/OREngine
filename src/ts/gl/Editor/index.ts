import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectData } from '../IO/ProjectSerializer';
import { Scene } from '../Scene';
import { Keyboard, PressedKeys } from '../Scene/utils/Keyboard';

import { EditorDataManager, OREngineEditorData } from './EditorDataManager';
import { FileSystem } from './FileSystem';
import { OREngineResource } from './OREngineResource';

import { resource } from '~/ts/Globals';

export class Editor extends GLP.EventEmitter {

	// resources

	public resource: OREngineResource;

	// project

	public currentProject: OREngineProjectData | null;

	// scene

	private scene: Scene;
	public selectedEntity: MXP.Entity | null = null;

	// filesystem

	private fileSystem: FileSystem;

	// data

	public data: EditorDataManager;
	private unsaved: boolean;

	// keyboard

	private keyBoard: Keyboard;

	constructor( scene: Scene ) {

		super();

		// project

		this.currentProject = null;

		// scene

		this.scene = scene;

		// resource

		this.resource = resource;

		// filesystem

		this.fileSystem = new FileSystem();

		// keyboard

		this.keyBoard = new Keyboard();

		this.keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( pressedKeys[ "Meta" ] && pressedKeys[ "s" ] ) {

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

		if ( this.data.settings.currentProjectName ) {

			this.openProject( this.data.settings.currentProjectName );

		}

		// unload

		const onBeforeUnload = ( e: BeforeUnloadEvent ) => {

			if ( this.unsaved ) {

				e.preventDefault();
				e.returnValue = "";

			}

		};

		window.addEventListener( "beforeunload", onBeforeUnload );

		// dispose

		this.once( 'dispose', () => {

			window.removeEventListener( "beforeunload", onBeforeUnload );

		} );

	}

	public select( entity: MXP.Entity | null ) {

		this.selectedEntity = entity;

		this.emit( "control/select", [ entity ] );

	}

	// project

	public openProject( name: string ) {

		this.save();

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
		this.select( null );

		this.save();

	}

	/*-------------------------------
		Save
	-------------------------------*/

	private save() {

		if ( ! this.currentProject ) return;

		const projectName = this.currentProject.setting.name;

		this.data.settings.currentProjectName = projectName;
		this.data.setProject( this.scene.exportProject( projectName ) );

		const editorData = this.data.serialize();
		this.fileSystem.set( "editor/data", editorData );

		this.unsaved = false;

	}

	public dispose() {

		this.keyBoard.dispose();
		this.scene.dispose();

		this.emit( 'dispose' );

	}

}
