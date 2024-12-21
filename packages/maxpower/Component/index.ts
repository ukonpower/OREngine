import { Entity, EntityFinalizeEvent } from '../Entity';
import { Serializable } from '../Serializable';

export type ComponentUpdateEvent = EntityFinalizeEvent & {
	entity: Entity,
}

export type ComponentParams<TArgs = void> = TArgs extends void
  ? { entity: Entity; args?: TArgs }
  : { entity: Entity; args: TArgs };

export class Component extends Serializable {

	public disableEdit: boolean;
	protected _entity: Entity;
	protected _enabled: boolean;
	protected _tag: string;

	constructor( params: ComponentParams<any> ) {

		super();

		this.disableEdit = false;
		this._entity = params.entity;
		this._enabled = true;
		this._tag = "";

		this.field( "enabled", () => this.enabled, value => this.enabled = value, {
			hidden: true,
			noExport: true
		} );

		this.field( "tag", () => this.tag, value => this._tag = value, {
			readOnly: true,
			noExport: true,
			hidden: ( item ) => item == "",
		} );

	}

	public get tag() {

		return this._tag;

	}

	public get entity() {

		return this._entity;

	}

	public set enabled( value: boolean ) {

		this._enabled = value;

	}

	public get enabled() {

		return this._enabled;

	}

	public preUpdate( event: ComponentUpdateEvent ) {

		if ( this._entity && this.enabled ) {

			this.preUpdateImpl( event );

		}

	}

	public update( event: ComponentUpdateEvent ) {

		if ( this._entity && this.enabled ) {

			this.updateImpl( event );

		}

	}

	public postUpdate( event: ComponentUpdateEvent ) {

		if ( this._entity && this.enabled ) {

			this.postUpdateImpl( event );

		}

	}

	public finalize( event: ComponentUpdateEvent ) {

		if ( this._entity && this.enabled ) {

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
