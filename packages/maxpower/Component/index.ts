import * as GLP from 'glpower';

import { Entity, EntityFinalizeEvent } from '../Entity';

export type ComponentUpdateEvent = EntityFinalizeEvent & {
	entity: Entity,
}

export type BuiltInComponents =
	'camera' |
	'cameraShadowMap' |
	'perspective' |
	"orthographic" |
	'material' |
	'geometry' |
	'light' |
	'blidger' |
	'scenePostProcess' |
	'postProcess' |
	'gpuCompute' |
( string & {} );

export class Component extends GLP.EventEmitter {

	protected entity: Entity | null;

	constructor() {

		super();

		this.entity = null;

	}

	public setEntity( entity: Entity | null ) {

		const beforeEntity = this.entity;

		this.entity = entity;

		this.setEntityImpl( this.entity, beforeEntity );

	}

	public preUpdate( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.preUpdateImpl( event );

		}

	}

	public update( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.updateImpl( event );

		}

	}

	public postUpdate( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.postUpdateImpl( event );

		}

	}

	protected setEntityImpl( entity: Entity | null, prevEntity: Entity | null ) {}

	protected preUpdateImpl( event: ComponentUpdateEvent ) {}

	protected updateImpl( event: ComponentUpdateEvent ) {}

	protected postUpdateImpl( event: ComponentUpdateEvent ) {}

	public finalize( event: ComponentUpdateEvent ) {

		if ( this.entity ) {

			this.finalizeImpl( event );

		}

	}

	protected finalizeImpl( event: ComponentUpdateEvent ) {}

	public dispose() {

		this.emit( 'dispose' );

	}

}
