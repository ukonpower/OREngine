import * as GLP from 'glpower';

import { Entity, EntityFinalizeEvent } from '../Entity';
import { Serializable, TypedSerializableProps } from '../Serializable';

export type ComponentUpdateEvent = EntityFinalizeEvent & {
	entity: Entity,
}

export type ComponentParams = {
	idOverride?: string,
	disableEdit?: boolean
}

export class Component extends Serializable {

	public readonly uuid: string;

	public entity: Entity | null;
	public disableEdit: boolean;

	protected enabled_: boolean;

	constructor( params?: ComponentParams ) {

		super();

		params = params ?? {};

		this.resourceIdOverride = params.idOverride || null;
		this.uuid = GLP.ID.genUUID();
		this.entity = null;
		this.disableEdit = params.disableEdit || false;
		this.enabled_ = true;


	}

	public get props() {

		return {
			enabled: {
				value: this.enabled,
			}
		};

	}

	protected deserializer( props: TypedSerializableProps<this> ): void {

		this.enabled = props.enabled.value;

	}

	public static get tag() {

		return "";

	}

	public get tag() {

		return ( this.constructor as typeof Component ).tag;

	}

	public set enabled( value: boolean ) {

		this.enabled_ = value;

	}

	public get enabled() {

		return this.enabled_;

	}

	public setEntity( entity: Entity ) {

		this.entity = entity;

		this.setEntityImpl( this.entity );

	}

	public unsetEntity() {

		if ( this.entity === null ) return;

		const beforeEntity = this.entity;

		this.entity = null;

		this.unsetEntityImpl( beforeEntity );

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

	protected setEntityImpl( entity: Entity ) {}

	protected unsetEntityImpl( prevEntity: Entity ) {}

	protected preUpdateImpl( event: ComponentUpdateEvent ) {}

	protected updateImpl( event: ComponentUpdateEvent ) {}

	protected postUpdateImpl( event: ComponentUpdateEvent ) {}

	protected finalizeImpl( event: ComponentUpdateEvent ) {}

	public dispose() {

		this.emit( 'dispose' );

	}

}
