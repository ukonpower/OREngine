import * as GLP from 'glpower';

const PREFIX = "orengine/";

export class FileSystem extends GLP.EventEmitter {

	constructor() {

		super();

	}

	public set( path: string, data: any ) {

		try {

			const dataStr = JSON.stringify( data );
			localStorage.setItem( PREFIX + path, dataStr );

		} catch ( e ) {

			console.error( e );

		}


	}

	public get<T>( path: string ): T | undefined {

		try {

			const dataStr = localStorage.getItem( PREFIX + path );

			if ( ! dataStr ) return undefined;

			const data = JSON.parse( dataStr );

			return data;

		} catch ( e ) {

			console.error( e );

		}

		return undefined;


	}

}
