import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Scene } from '../Scene';

import { EditorDataManager, OREngineEditorData } from './EditorDataManager';
import { EditorResources } from './EditorResources';
import { FileSystem } from './FileSystem';

export class Editor extends GLP.EventEmitter {

	// resources

	public resources: EditorResources;

	// scene

	private scene: Scene;
	public selectedEntity: MXP.Entity | null = null;

	// filesystem

	private fileSystem: FileSystem;

	// editor data

	public data: EditorDataManager;

	constructor( scene: Scene ) {

		super();

		this.scene = scene;

		// resources

		this.resources = new EditorResources();

		// filesystem

		this.fileSystem = new FileSystem();

		// data

		this.data = new EditorDataManager();

		const localEditorData = this.fileSystem.get<OREngineEditorData>( "editor/data" );

		if ( localEditorData ) {

			this.data.load( localEditorData );

		}

		// blidge

		const onKeyDown = ( e: KeyboardEvent ) => {

			if ( e.key == "e" ) {

				this.save();

			}

		};

		window.addEventListener( "keydown", onKeyDown );

		// graph

		let updateTimer: number | null = null;

		const onChanged = ( type: string, opt?: any ) => {

			if ( updateTimer !== null ) return;

			updateTimer = window.setTimeout( () => {

				updateTimer = null;

				this.emit( "changed", [ type, opt ] );

			}, 10 );

		};

		this.scene.on( "changed", onChanged );

		// dispose

		this.scene.on( "dispose", () => {

			window.removeEventListener( "keydown", onKeyDown );

			this.off( "changed", onChanged );

		} );

	}

	public select( entity: MXP.Entity | null ) {

		this.selectedEntity = entity;

		this.emit( "control/select", [ entity ] );

	}

	// blidge

	public changeBlidgeConnection() {

	}

	// save

	public save() {

		const editorData = this.data.serialize();

		this.fileSystem.set( "editor/data", editorData );

		console.log( editorData );

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
