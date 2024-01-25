import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Scene } from '../Scene';

import { EditorResources } from './EditorResources';

export class Editor extends GLP.EventEmitter {

	private scene: Scene;

	public resources: EditorResources;

	public selectedEntity: MXP.Entity | null = null;

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

		// select

		// ////////

		// dispose

		this.scene.on( "dispose", () => {

			this.off( "changed", onChanged );

		} );

	}

	public select( entity: MXP.Entity | null ) {

		this.selectedEntity = entity;

		this.emit( "control/select", [ entity ] );

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
