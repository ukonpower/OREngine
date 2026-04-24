import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class CameraOrbitAnim extends MXP.Component {

	private time: number;
	private radius: number;
	private heightAmp: number;
	private speed: number;
	private baseHeight: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.time = 0;
		this.radius = 6.0;
		this.heightAmp = 2.0;
		this.speed = 0.3;
		this.baseHeight = 1.5;

		this.field( "radius", () => this.radius, v => this.radius = v as number );
		this.field( "heightAmp", () => this.heightAmp, v => this.heightAmp = v as number );
		this.field( "speed", () => this.speed, v => this.speed = v as number );
		this.field( "baseHeight", () => this.baseHeight, v => this.baseHeight = v as number );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.time += event.timeDelta;

		const angle = this.time * this.speed;

		const x = Math.cos( angle ) * this.radius;
		const z = Math.sin( angle ) * this.radius;
		const y = this.baseHeight + Math.sin( angle * 1.7 ) * this.heightAmp;

		this.entity.position.set( x, y, z );
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );

	}

}
