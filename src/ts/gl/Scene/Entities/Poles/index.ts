import * as GLP from 'glpower';
import { Pole } from '../Pole';
import { Wire } from '../Wire';
import { Modeler } from '~/ts/libs/Modeler';
import { power } from '~/ts/Globals';

import basicVert from '~/shaders/basic.vs';
import basicFrag from '~/shaders/basic.fs';
import { Entity } from 'maxpower/Entity';

export class Poles extends Entity {

	private length: number;

	constructor( num: number = 10, length: number = 500 ) {

		super();

		this.length = length;

		let prev: Pole | null = null;

		const wiresModel = new Entity();


		for ( let i = 0; i < num; i ++ ) {

			const pole = new Pole();

			const posX = ( i / num ) * this.length - this.length / 2;

			pole.position.set( posX, 0, 0 );

			this.add( pole );

			if ( prev ) {

				pole.gaishi.forEach( ( c, i ) => {

					const wire = new Wire();
					wiresModel.add( wire );
					if ( prev ) {

						wire.entityToEntity( prev.gaishi[ i ], c );

					}

				} );

			}

			prev = pole;

		}

		const wires = new Entity();
		wires.addComponent( "geometry", new Modeler( power ).bakeEntity( wiresModel ) );
		wires.addComponent( "material", new GLP.Material( {
			name: "wires",
			vert: basicVert,
			frag: basicFrag,
			type: [ "deferred", "shadowMap" ]
		} ) );

		this.add( wires );

	}

}
