import type { Plugin, ViteDevServer } from 'vite';


type ViteError = {
	file: string;
	message: string;
	plugin?: string;
	timestamp: number;
};

type HmrEvent = {
	file: string;
	moduleCount: number;
	timestamp: number;
};

const SERVER_URL = `http://localhost:${process.env.ORENGINE_SERVER_PORT || 3001}`;

export const ViteErrorReporter = (): Plugin => {

	const reportError = ( file: string, message: string, plugin?: string ) => {

		const error: ViteError = { file, message, plugin, timestamp: Date.now() };

		fetch( `${SERVER_URL}/api/internal/vite-errors`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( error ),
		} ).catch( () => {} );

	};

	const reportHmr = ( file: string, moduleCount: number ) => {

		const event: HmrEvent = { file, moduleCount, timestamp: Date.now() };

		fetch( `${SERVER_URL}/api/internal/hmr-events`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( event ),
		} ).catch( () => {} );

	};

	return {
		name: 'vite-error-reporter',
		enforce: 'post',

		configureServer( server: ViteDevServer ) {

			const origTransformRequest = server.transformRequest.bind( server );

			server.transformRequest = async ( ...args: Parameters<ViteDevServer['transformRequest']> ) => {

				try {

					return await origTransformRequest( ...args );

				} catch ( e: any ) {

					reportError( args[ 0 ], e.message, e.plugin );
					throw e;

				}

			};

		},

		handleHotUpdate( { file, modules } ) {

			reportHmr( file, modules.length );

		},
	};

};
