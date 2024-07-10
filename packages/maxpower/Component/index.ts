import * as GLP from 'glpower';

import { Entity, EntityFinalizeEvent } from '../Entity';
import { Exportable } from '../Exportable';

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

type ComponentInitiator = 'user' | 'script';

export type ComponentParams = {
	keyOverride?: string,
	disableEdit?: boolean
}

export class Component extends Exportable {

	public readonly uuid: string;
	public entity: Entity | null;
	public enabled: boolean;
	public disableEdit: boolean;
	public initiator?: ComponentInitiator;

	constructor( params?: ComponentParams ) {

		super();

		params = params ?? {};

		this.enabled = true;
		this.keyOverride = params.keyOverride || null;
		this.disableEdit = params.disableEdit || false;
		this.entity = null;
		this.uuid = GLP.ID.genUUID();
		this.initiator = 'script';

	}

	public noticeChanged( type?: string ) {

		this.emit( 'changed', [ type ] );

		if ( this.entity ) {

			this.entity.noticeParent( "update/graph", [ "component" ] );

		}

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
