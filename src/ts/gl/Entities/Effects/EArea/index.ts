import * as GLP from 'glpower';
import { EBorder } from '../EBorder';
import { ECross } from '../ECross';
import { EGridDots } from '../EGridDots';
import { ERing } from '../ERing';
import { EGridLine } from '../EGridLine';
import { Entity, EntityUpdateEvent } from 'maxpower/Entity';

export class EArea extends Entity {

	private effects: Entity[];
	private range: GLP.Vector;

	constructor( num = 50.0, range = new GLP.Vector( 10, 5, 5 ) ) {

		super();

		this.range = range;

		this.effects = [];

		const getEffect = ( ) => {

			const t = Math.floor( Math.random() * 5.0 );

			if ( t == 0 ) {

				return new EBorder();

			} else if ( t == 1 ) {

				return new ECross();

			} else if ( t == 2 ) {

				const gridType = Math.random() < 0.5 ? 'circle' : 'square';

				return new EGridDots( gridType, undefined, undefined, Math.random() );

			} else if ( t == 3 ) {

				const ringType = Math.random() < 0.5 ? 'line' : 'dash';

				return new ERing( ringType );

			} else if ( t == 4 ) {

				const s = ( Math.random() * 0.5 + 0.5 ) * 4.0;

				return new EGridLine( Math.random() < 0.5 ? 'dash' : 'line', new GLP.Vector( 6, 6 ), new GLP.Vector( s, s ) );

			}

			return new Entity();

		};

		for ( let i = 0; i < num; i ++ ) {

			const effect = getEffect();
			effect.position.set( range.x * Math.random(), range.y * Math.random(), range.z * Math.random() );
			effect.position.sub( range.clone().divide( 2.0 ) );

			effect.scale.multiply( Math.random() * 0.8 + 0.2 );

			this.effects.push( effect );

			this.add( effect );

		}

	}

	protected updateImpl( event: EntityUpdateEvent ): void {

		for ( let i = 0; i < this.effects.length; i ++ ) {

			const effect = this.effects[ i ];

			effect.position.x += event.deltaTime * 0.5;

			if ( effect.position.x > this.range.x / 2 ) {

				effect.position.x = - this.range.x / 2;

			}

		}

	}

}
