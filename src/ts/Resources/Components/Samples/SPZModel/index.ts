import * as MXP from 'maxpower';

import { gl } from '~/ts/Globals';

export class SPZModel extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const loader = new MXP.SPZLoader( gl );

		loader.load( 'cup.spz' ).then( ( result ) => {

			console.log( result );


		} );

	}

}
