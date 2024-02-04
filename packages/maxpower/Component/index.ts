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

export type ComponentParams = {
	name?: string;
}

export class Component extends GLP.EventEmitter {

	public readonly uuid: string;

	public name: string;

	private _enabled: boolean;

	public entity: Entity | null;

	constructor( params?: ComponentParams ) {

		super();

		params = params ?? {};

		this.name = params.name ?? '';

		this._enabled = true;

		this.entity = null;

		this.uuid = GLP.ID.genUUID();

	}

	public set enabled( enabled: boolean ) {

		this._enabled = enabled;

	}

	public get enabled() {

		return this._enabled;

	}

	public get property(): ComponentProps | null {

		return null;

	}

	public set property( props: {[key: string]: {value: any}} ) {
	}

	public get export(): ComponentProps | null {

		return this.property;

	}

	public noticeChanged( type?: string ) {

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
