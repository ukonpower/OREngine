import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

// スポットライト。円錐の減衰とシャドウを確認する
export class SpotLight extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.position.set( - 4, 6, 3 );
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );
		this.entity.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( Math.PI / 2 ) ) );

		const light = this.entity.addComponent( MXP.Light );

		light.lightType = 'spot';
		light.near = 0.5;
		light.far = 30;
		light.angle = Math.PI * 0.35;
		light.blend = 0.6;
		light.distance = 20;
		light.decay = 1.5;
		light.color.set( 0.5, 0.7, 1.0 );
		light.intensity = 3.0;
		light.castShadow = true;
		light.updateProjectionMatrix();

	}

}
