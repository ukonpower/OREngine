import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Scene } from '../Scene';

import { EditorResources } from './EditorResources';
import { EditorState } from './EditorState';
import { FileSystem } from './FileSystem';
import { Serializer } from './Serializer';

import { blidge } from '~/ts/Globals';

export class Editor extends GLP.EventEmitter {

	// resources

	public resources: EditorResources;

	// scene

	private scene: Scene;
	public selectedEntity: MXP.Entity | null = null;

	// serializer

	public serializer: Serializer;
	public fileSystem: FileSystem;

	// blidge

	public blidge: MXP.BLidge;

	// state

	public state: EditorState;

	constructor( scene: Scene ) {

		super();

		this.scene = scene;

		// resources

		this.resources = new EditorResources();

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

		// serializer

		this.serializer = new Serializer();

		// fileSystem

		this.fileSystem = new FileSystem();

		// state

		this.state = new EditorState();

		this.state.root = scene;

		// blidge

		this.blidge = blidge;

		this.state.blidgeConnection.blidge = this.blidge;

		if ( this.state.blidgeConnection.enabled ) {

			blidge.connect( this.state.blidgeConnection.url, this.state.blidgeConnection.gltfPath );

		}

		const onKeyDown = ( e: KeyboardEvent ) => {

			if ( e.key == "e" ) {

				const data = this.serializer.serialize( this.state );

				console.log( data );


			}

		};

		window.addEventListener( "keydown", onKeyDown );

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

		const data = this.serializer.serialize( this.state );

		this.fileSystem.set( "editor/save", data );

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
