import * as BSP from 'basepower';
import * as MTP from 'mathpower';

import { Component, ComponentParams } from '../../Component';
import { BLidger } from '../BLidger';

import type { Entity } from '../../Entity';

export class BLidgerAnimationReceiver extends Component {

	public animations: Map<string, MTP.FCurveGroup>;

	public uniforms: BSP.Uniforms;
	private registeredUniforms: BSP.Uniforms[];

	constructor( params: ComponentParams ) {

		super( params );

		this.animations = new Map();

		this.uniforms = {};
		this.registeredUniforms = [];

	}

	public registerUniforms( uniforms: BSP.Uniforms ) {

		this.unregisterUniforms( uniforms );

		this.registeredUniforms.push( uniforms );

		this.assignUniforms( uniforms );

		return uniforms;

	}

	public unregisterUniforms( uniforms: BSP.Uniforms ) {

		const index = this.registeredUniforms.indexOf( uniforms );

		if ( index !== - 1 ) {

			this.registeredUniforms.splice( index, 1 );

		}

	}

	private assignUniforms( targetUniforms: BSP.Uniforms ) {

		Object.keys( this.uniforms ).forEach( ( name ) => {

			targetUniforms[ name ] = this.uniforms[ name ];

		} );

	}

	public setEntityImpl( entity: Entity ): void {

		const onAddBlidger = ( blidger: BLidger ) => {

			this.animations = blidger.animations;

			this.uniforms = blidger.uniforms;

			this.registeredUniforms.forEach( ( uniforms ) => {

				this.assignUniforms( uniforms );

			} );

		};

		const blidger = entity.getComponent( BLidger );

		if ( blidger ) {

			onAddBlidger( blidger );

		}

		// onAddcomponent

		const onEntityAddComponent = ( component: Component ) => {

			if ( component instanceof BLidger ) {

				onAddBlidger( component );

			}

		};

		entity.on( "component/add", onEntityAddComponent );

		const onUnset = () => {

			entity.off( "component/add", onEntityAddComponent );

		};

		this.once( "unsetEntity", onUnset );

	}

	protected unsetEntityImpl( prevEntity: Entity ): void {

		this.emit( "unsetEntity", [ prevEntity ] );

	}

}
