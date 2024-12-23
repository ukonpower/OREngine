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

			return fetch( "/api/data/save/" + path, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: dataStr,
			} );

		} catch ( e ) {

			console.error( e );

			return Promise.reject( e );

		}


	}

	public async get<T>( path: string ): Promise<T | undefined> {

		try {

			const res = await fetch( "/api/data/get/" + path );

			const data = await res.json() as T;

			return data;

		} catch ( e ) {

			const dataStr = localStorage.getItem( PREFIX + path );

			if ( ! dataStr ) return undefined;

			return JSON.parse( dataStr );

		}

	}

}
