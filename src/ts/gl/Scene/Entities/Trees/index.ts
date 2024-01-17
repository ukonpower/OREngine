import * as MXP from 'maxpower';
import { Tree } from '../Tree';

export class Trees extends MXP.Entity {

	private length: number;

	constructor( num: number = 1, length: number = 500 ) {

		super();

		this.length = length;

		for ( let i = 0; i < num; i ++ ) {

			const tree = new Tree();

			const posX = ( i / num ) * this.length - this.length / 2;

			tree.position.set( posX, 0.0, 0.0 );

			this.add( tree );

		}

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {
	}

}
