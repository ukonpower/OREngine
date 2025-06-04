import fs from 'fs';

import bodyParser from 'body-parser';
import { Plugin } from 'vite';

const OUTPATH = "./data";

export const OREngineFileSystemPlugin = (): Plugin => ( {
	name: 'OREngineFileSystemPlugin',
	enforce: 'pre',
	configureServer( server ) {

		server.middlewares.use( bodyParser.urlencoded( { extended: false } ) );
		server.middlewares.use( bodyParser.json() );

		// get data

		server.middlewares.use( "/api/data/save", ( req, res ) => {

			const fliePath = req.url;

			try {

				fs.writeFileSync( OUTPATH + fliePath, JSON.stringify( ( req as any ).body, null, '\t' ) );

			} catch ( e ) {

				console.log( e );

			}

			res.end( "ok" );

		} );

		// save data

		server.middlewares.use( "/api/data/get", ( req, res ) => {

			res.setHeader( 'Content-Type', 'application/json' );

			const fliePath = req.url;

			try {

				const data = fs.readFileSync( OUTPATH + fliePath, "utf-8" );


				res.setHeader( 'Content-Type', 'application/json' ).end( data );

			} catch ( e ) {

				res.statusCode = 400;
				res.end( {
					status: "ERROR",
					payload: "NODATA",
				} );

				console.log( e );

			}

		} );

	},
} );
