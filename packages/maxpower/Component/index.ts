import * as GLP from 'glpower';

import { Entity, EntityFinalizeEvent } from '../Entity';

import { ValueOpt } from '~/ts/components/ui/Property/Value';

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
} & ValueOpt

export type ComponentProps = {[key: string]: { value: any, opt?: ComponentPropsOpt, } | ComponentProps}
export type ComponentSetProps = {[key: string]: any }

export type ComponentParams = {
	disableEdit?: boolean
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
		this.disableEdit = params.disableEdit || false;

		this.entity = null;

		this.uuid = GLP.ID.genUUID();

	}

	public getProperties(): ComponentProps | null {

		return null;

	}

	public getPropertyValues() {

		const propertyValue:ComponentSetProps = {};

		const _ = ( path: string, props: ComponentProps ): ComponentSetProps => {

			Object.keys( props || {} ).forEach( ( key ) => {

				const path_ = path + key;

				const prop = props[ key ];

				if ( "value" in prop ) {

					propertyValue[ path_ ] = props[ key ].value;

				} else {

					_( path_ + "/", prop );

				}

			} );

			return props;

		};

		_( "", this.getProperties() || {} );

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
