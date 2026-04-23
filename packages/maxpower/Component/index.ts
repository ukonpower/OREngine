import { Entity, EntityFinalizeEvent } from '../Entity';
import { Serializable } from '../Serializable';

import type { Engine } from '../Engine';

export type ComponentUpdateEvent = EntityFinalizeEvent & {
}

export type ComponentParams<TArgs = void> = TArgs extends void
  ? { entity: Entity; engine: Engine; args?: TArgs }
  : { entity: Entity; engine: Engine; args: TArgs };

export class Component extends Serializable {

	public disableEdit: boolean;
	public order: number;
	protected _entity: Entity;
	protected _engine: Engine;
	protected _enabled: boolean;
	protected _tag: string;
	protected _disposed: boolean;

	constructor( params: ComponentParams<any> ) {

		super();

		this.disableEdit = false;
		this._entity = params.entity;
		this._engine = params.engine;
		this._enabled = true;
		this._disposed = false;
		this._tag = "";
		this.order = 0;

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

	public get engine() {

		return this._engine;

	}

	public set enabled( value: boolean ) {

		this._enabled = value;

	}

	public get enabled() {

		return this._enabled;

	}

	// onUpdate

	public update( event: ComponentUpdateEvent ) {

		if ( ! this.enabled ) return;

		this.updateImpl( event );

	}

	protected updateImpl( _event: ComponentUpdateEvent ) {}

	// postUpdate

	public postUpdate( event: ComponentUpdateEvent ) {

		if ( ! this.enabled ) return;

		this.postUpdateImpl( event );

	}

	protected postUpdateImpl( _event: ComponentUpdateEvent ) {}

	// beforeRender

	public beforeRender( event: ComponentUpdateEvent ) {

		if ( ! this.enabled ) return;

		this.beforeRenderImpl( event );

	}

	protected beforeRenderImpl( _event: ComponentUpdateEvent ) {}

	// afterRender

	public afterRender( event: ComponentUpdateEvent ) {

		if ( ! this.enabled ) return;

		this.afterRenderImpl( event );

	}

	protected afterRenderImpl( _event: ComponentUpdateEvent ) {}

	public dispose() {

		this._disposed = true;

		this.emit( 'dispose' );

	}

}
