import * as GLP from 'glpower';
export class FileSystem extends GLP.EventEmitter {

	constructor() {

		super();

	}

	public set( path: string, data: any ) {

		try {

			const dataStr = JSON.stringify( data );
			localStorage.setItem( path, dataStr );

		} catch ( e ) {

			console.error( e );

		}


	}

	public get( path: string ) {

		try {

			const dataStr = localStorage.getItem( path );

			const data = JSON.stringify( dataStr );

			return data;

		} catch ( e ) {

			console.error( e );

		}


	}

}
