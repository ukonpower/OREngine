import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class BLidgerAnimationReceiver extends MXP.Component {

	public animations: Map<string, GLP.FCurveGroup>;

	public uniforms: GLP.Uniforms;
	private registeredUniforms: GLP.Uniforms[];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.animations = new Map();

		this.uniforms = {};
		this.registeredUniforms = [];

	}

	public registerUniforms( uniforms: GLP.Uniforms ) {

		this.unregisterUniforms( uniforms );

		this.registeredUniforms.push( uniforms );

		this.assignUniforms( uniforms );

		return uniforms;

	}

	public unregisterUniforms( uniforms: GLP.Uniforms ) {

		const index = this.registeredUniforms.indexOf( uniforms );

		if ( index !== - 1 ) {

			this.registeredUniforms.splice( index, 1 );

		}

	}

	private assignUniforms( targetUniforms: GLP.Uniforms ) {

		Object.keys( this.uniforms ).forEach( ( name ) => {

			targetUniforms[ name ] = this.uniforms[ name ];

		} );

	}

	public setEntityImpl( entity: MXP.Entity ): void {

		const onAddBlidger = ( blidger: MXP.BLidger ) => {

			this.animations = blidger.animations;

			this.uniforms = blidger.uniforms;

			this.registeredUniforms.forEach( ( uniforms ) => {

				this.assignUniforms( uniforms );

			} );

		};

		const blidger = entity.getComponent( MXP.BLidger );

		if ( blidger ) {

			onAddBlidger( blidger );

		}

		// onAddcomponent

		const onEntityAddComponent = ( component: MXP.Component ) => {

			if ( component instanceof MXP.BLidger ) {

				onAddBlidger( component );

			}

		};

		entity.on( "component/add", onEntityAddComponent );

		const onUnset = () => {

			entity.off( "component/add", onEntityAddComponent );

		};

		this.once( "unsetEntity", onUnset );

	}

	protected unsetEntityImpl( prevEntity: MXP.Entity ): void {

		this.emit( "unsetEntity", [ prevEntity ] );

	}

}
