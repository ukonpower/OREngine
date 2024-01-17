import * as GLP from 'glpower';

import poleFrag from './shaders/pole.fs';
import poleVert from './shaders/pole.vs';
import { globalUniforms, power } from '~/ts/Globals';
import { Modeler } from '~/ts/libs/Modeler';
import { Entity } from 'maxpower/Entity';
import { hotGet } from 'maxpower/Utils/Hot';
import { CylinderGeometry } from 'maxpower/Component/Geometry/CylinderGeometry';

export class Pole extends Entity {

	public nextPole: Pole | null;
	public gaishi: Entity[];

	constructor() {

		super();

		const height = 10;

		this.nextPole = null;

		this.gaishi = [];

		// model

		const model = new Entity();
		const modeler = new Modeler( power );

		// pole

		const pole = new Entity();
		pole.addComponent( "geometry", new CylinderGeometry( 0.30, 0.20, height ) );
		pole.position.y += height / 2;
		model.add( pole );

		// ashiba

		const ashiba = new Entity();
		const ashibaGeo = new CylinderGeometry( 0.03, 0.03, 0.4 );
		ashibaGeo.setAttribute( 'oPos', new Float32Array( ( ()=>{

			const r: number[] = [];
			for ( let i = 0; i < 8; i ++ ) {

				for ( let j = 0; j < 2; j ++ ) {

					r.push( ( j - 0.5 ) * 0.6, ( i + j * 0.5 ) * 0.8, 0 );

				}

			}

			return r;

		} )() ), 3, { instanceDivisor: 1 } );
		ashiba.addComponent( "geometry", ashibaGeo );
		ashiba.addComponent( "material", new GLP.Material( {
			vert: poleVert,
			defines: { 'ASHIBA': '' }
		} ) );
		ashiba.position.set( 0.0, 2.5, 0.0 );
		model.add( ashiba );

		// sasae

		const sasae = new Entity();
		sasae.addComponent( "geometry", new GLP.CubeGeometry( 2.5, 0.2, 0.15 ) );
		sasae.position.set( 0.3, height * 0.85, 0.3 );
		sasae.quaternion.setFromEuler( new GLP.Euler( 0, Math.PI / 2, 0 ) );
		model.add( sasae );

		// gaishi

		for ( let i = 0; i < 3; i ++ ) {

			const gaishi = new Entity();
			gaishi.addComponent( "geometry", new CylinderGeometry( 0.09, 0.09, 0.24 ) );
			gaishi.position.set( ( i / 2 - 0.5 ) * 2, 0.25, 0.0 );
			sasae.add( gaishi );

			gaishi.updateMatrix( true );

			const gaishiDummy = new Entity();
			gaishiDummy.applyMatrix( gaishi.matrixWorld );
			this.add( gaishiDummy );
			this.gaishi.push( gaishiDummy );

		}

		// henatsu

		const henatsu = new Entity();
		henatsu.addComponent( "geometry", new CylinderGeometry( 0.4, 0.4, 1.0 ) );
		henatsu.position.set( 0.3, height * 0.7, 0.3 );
		henatsu.quaternion.setFromEuler( new GLP.Euler( 0, Math.PI / 2, 0 ) );
		model.add( henatsu );

		// modeling

		this.addComponent( "geometry", modeler.bakeEntity( model ) );
		this.addComponent( "material", new GLP.Material( {
			name: "pole",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'poleFrag', poleFrag ),
			vert: hotGet( 'poleVert', poleVert ),
		} ) );

	}

}
