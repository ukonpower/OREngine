import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Camera } from 'maxpower';
import { Pointer, PointerEventArgs } from '../../utils/Pointer';

export class OrbitControls extends MXP.Component {

	private pointer: Pointer;
	private offsetPos: GLP.Vector;
	private offsetPosTmp: GLP.Vector;
	private matrixTmp: GLP.Matrix;

	constructor( targetElm: HTMLElement ) {

		super();

		this.pointer = new Pointer();
		this.offsetPos = new GLP.Vector();
		this.offsetPosTmp = new GLP.Vector();
		this.matrixTmp = new GLP.Matrix();

		this.pointer.setElement( targetElm );

		let touching = false;

		this.pointer.on( "start", ( e: PointerEventArgs ) => {

			if ( touching ) return;

			touching = true;

		} );

		this.pointer.on( "move", ( e: PointerEventArgs ) => {

			if ( ! touching ) return;

			this.offsetPos.add( { x: e.delta.x * 0.003, y: e.delta.y * 0.003 } );

		} );

		this.pointer.on( "end", ( e: PointerEventArgs ) => {

			if ( ! touching ) return;

			touching = false;

			this.offsetPos.set( 0, 0 );

		} );

	}

	protected finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		this.offsetPosTmp.set( this.offsetPos.x, - this.offsetPos.y, 0.0, 1.0 );

		entity.matrixWorld.multiply( this.matrixTmp.identity().applyPosition( this.offsetPosTmp ) );

		// calc viewmatrix

		const cameraComponent = entity.getComponent<Camera>( "camera" );

		if ( cameraComponent ) {

			cameraComponent.viewMatrix.copy( entity.matrixWorld ).inverse();

		}

	}


}
