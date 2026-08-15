import * as MXP from 'maxpower';
import { Engine } from 'orengine';

// サンプルコンポーネント。エンティティに立方体のメッシュを与える
export class SampleCube extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const geometry = new MXP.CubeGeometry( { width: 1, height: 1, depth: 1 } );

		const material = new MXP.Material( {
			uniforms: MXP.UniformsUtils.merge( engine.uniforms ),
		} );

		this.entity.addComponent( MXP.Mesh, { geometry, material } );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
