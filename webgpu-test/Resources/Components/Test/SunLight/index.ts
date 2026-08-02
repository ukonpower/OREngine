import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

// 平行光源。シャドウマップは正射影で撮る
export class SunLight extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.position.set( 5, 8, 4 );
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );
		this.entity.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( Math.PI / 2 ) ) );

		const light = this.entity.addComponent( MXP.Light );

		light.lightType = 'directional';
		light.cameraType = 'orthographic';
		light.orthWidth = 18;
		light.orthHeight = 18;
		light.near = 0.1;
		light.far = 30;
		light.color.set( 1.0, 0.95, 0.85 );
		light.intensity = 0.6;
		light.castShadow = true;
		light.updateProjectionMatrix();

	}

}
