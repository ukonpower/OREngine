import * as MXP from 'maxpower';

import fragSrc from './shaders/main.fs';

// BLidger が作ったキューブのメッシュへ独自マテリアルを差し込む。demo-webgpu の OREngineCube と同じ素材
export class OREngineCube extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.material = new MXP.Material( {
			name: "OREngineCube",
			phase: [ "shadowMap", "deferred" ],
			frag: MXP.hotGet( "OREngineCubeFrag", fragSrc ),
		} );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = this.material;

		}

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/main.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( "OREngineCubeFrag", module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

}
