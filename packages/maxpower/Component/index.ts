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

	public readonly uuid: string;

	private _enabled: boolean;

	protected entity: Entity | null;

	constructor() {

		super();

		this._enabled = true;

		this.entity = null;

		this.uuid = GLP.ID.genUUID();

	}

	public set enabled( enabled: boolean ) {

		this._enabled = enabled;

		this.noticeChanged( 'enabled' );

	}

	public get enabled() {

		return this._enabled;

	}

	private noticeChanged( type?: string ) {

		this.emit( 'changed', [ type ] );

		if ( this.entity ) {

			this.entity.noticeChanged( "component" );

		}

	}

	public setEntity( entity: Entity | null ) {

		const beforeEntity = this.entity;

		this.entity = entity;

		this.setEntityImpl( this.entity, beforeEntity );

	}

	public preUpdate( event: ComponentUpdateEvent ) {

		if ( this.entity && this.enabled ) {

			this.preUpdateImpl( event );

		}

	}

	public update( event: ComponentUpdateEvent ) {

		if ( this.entity && this.enabled ) {

			this.updateImpl( event );

		}

	}

	public postUpdate( event: ComponentUpdateEvent ) {

		if ( this.entity && this.enabled ) {

			this.postUpdateImpl( event );

		}

	}

	public finalize( event: ComponentUpdateEvent ) {

		if ( this.entity && this.enabled ) {

			this.finalizeImpl( event );

		}

	}

	protected setEntityImpl( entity: Entity | null, prevEntity: Entity | null ) {}

	protected preUpdateImpl( event: ComponentUpdateEvent ) {}

	protected updateImpl( event: ComponentUpdateEvent ) {}

	protected postUpdateImpl( event: ComponentUpdateEvent ) {}

	protected finalizeImpl( event: ComponentUpdateEvent ) {}

	public dispose() {

		this.emit( 'dispose' );

	}

}
