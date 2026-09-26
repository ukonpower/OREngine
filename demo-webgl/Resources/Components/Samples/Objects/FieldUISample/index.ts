import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

// フィールド UI（同じディレクトリの editor.tsx）のサンプル。speed で Y 軸まわりに回し、wave の振幅で上下に揺らす
export class FieldUISample extends MXP.Component {

	private speed: number;
	private wave: number;
	private rotQuaternion: MTP.Quaternion;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.speed = 1;
		this.wave = 0.5;
		this.rotQuaternion = new MTP.Quaternion();

		this.field( "speed", () => this.speed, ( v: number ) => this.speed = v, { step: 0.1 } );
		this.field( "wave", () => this.wave, ( v: number ) => this.wave = v, { step: 0.05, min: 0 } );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.rotQuaternion.setFromEuler( new MTP.Euler( 0, event.timeDelta * this.speed, 0 ) );
		this.entity.quaternion.multiply( this.rotQuaternion );

		this.entity.position.y = Math.sin( event.timeElapsed * 2.0 ) * this.wave;

	}

}
