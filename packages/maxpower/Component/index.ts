import { Entity, EntityFinalizeEvent } from '../Entity';
import { Resource } from '../Resource';

export type ComponentUpdateEvent = EntityFinalizeEvent & {
	entity: Entity,
}

export interface ComponentParams{
    entity: Entity;
    args?: any;
}

export class Component extends Resource {

	public entity: Entity;
	public disableEdit: boolean;
	protected _enabled: boolean;

	constructor( params: ComponentParams ) {

		super();

		this.entity = params.entity;
		this._enabled = true;
		this.disableEdit = false;

		this.field( "enabled", () => this.enabled, value => this.enabled = value, {
			hidden: true,
		} );

	}

	public static get tag() {

		return "";

	}

	public get tag() {

		return ( this.constructor as typeof Component ).tag;

	}

	public set enabled( value: boolean ) {

		this._enabled = value;

	}

	public get enabled() {

		return this._enabled;

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

	protected preUpdateImpl( event: ComponentUpdateEvent ) {}

	protected updateImpl( event: ComponentUpdateEvent ) {}

	protected postUpdateImpl( event: ComponentUpdateEvent ) {}

	protected finalizeImpl( event: ComponentUpdateEvent ) {}

	public dispose() {

		this.emit( 'dispose' );

	}

}
