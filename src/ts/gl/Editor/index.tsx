import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Scene } from '../Scene';

export class Editor extends GLP.EventEmitter {

	private scene: Scene;

	public selectedEntity: MXP.Entity | null = null;

	constructor( scene: Scene ) {

		super();

		this.scene = scene;

		// graph

		let updateTimer: number | null = null;

		const onUpdateGraph = () => {

			if ( updateTimer !== null ) return;

			updateTimer = window.setTimeout( () => {

				updateTimer = null;

				this.emit( "graph/update" );

			}, 10 );

		};

		this.scene.on( "graph", onUpdateGraph );

		// select

		// ////////

		// dispose

		this.scene.on( "dispose", () => {

			this.off( "graph", onUpdateGraph );

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
