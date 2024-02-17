import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import skyboxFrag from './shaders/skybox.fs';

interface SkyBoxParams extends MXP.ComponentParams {
}

export class SkyBox extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor( param?: SkyBoxParams ) {

		param = param || {};

		super();

		this.geometry = new MXP.SphereGeometry( { radius: 100, widthSegments: 16, heightSegments: 16 } );
		this.material = new MXP.Material( {
			frag: skyboxFrag,
			cullFace: false,
		} );

	}

	protected setEntityImpl( entity: MXP.Entity | null, prevEntity: MXP.Entity | null ): void {

		if ( entity ) {

			entity.addComponent( "geometry", this.geometry );
			entity.addComponent( "material", this.material );

		}

	}

}
