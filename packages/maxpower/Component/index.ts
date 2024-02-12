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

export type ComponentPropsOpt = {
	readOnly?: boolean,
	precision?: number,
}

export type ComponentProps = {[key: string]: { value: any, opt?: ComponentPropsOpt}}
export type ComponentSetProps = {[key: string]: any }

export type ComponentParams = {
	distableEdit?: boolean
}

export class Component extends GLP.EventEmitter {

	public readonly uuid: string;

	public entity: Entity | null;

	public enabled: boolean;
	public disableEdit: boolean;

	constructor( params?: ComponentParams ) {

		super();

		params = params ?? {};

		this.enabled = true;
		this.disableEdit = params.distableEdit || false;

		this.entity = null;

		this.uuid = GLP.ID.genUUID();

	}

	public getProperties(): ComponentProps | null {

		return null;

	}

	public getPropertyValues() {

		const currentProps = this.getProperties() || {};
		const propertyValue:ComponentSetProps = {};

		Object.keys( currentProps || {} ).forEach( ( key ) => {

			propertyValue[ key ] = currentProps[ key ].value;

		} );

		return propertyValue;

	}

	public setPropertyValues( props: ComponentSetProps ) {
	}

	public export(): ComponentProps | null {

		return this.getPropertyValues();

	}

	public noticeChanged( type?: string ) {

		this.emit( 'changed', [ type ] );

		if ( this.entity ) {

			this.entity.noticeRecursiveParent( "changed", [ "component" ] );

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
