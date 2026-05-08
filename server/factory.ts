import express from 'express';


import { HeadlessBrowser } from './headless/HeadlessBrowser';
import { ProjectManager } from './Project';
import { createComponentsRouter } from './routes/components';
import { createEditorRouter } from './routes/editor';
import { createProjectsRouter } from './routes/projects';
import { createSceneRouter } from './routes/scene';
import { createTexturesRouter } from './routes/textures';
import { getWSBridge, initWSBridge } from './ws';

import type { Server } from 'http';


export interface OrengineServerOptions {
	projectDir: string;
	port?: number;
}

export interface OrengineServerHandle {
	server: Server;
	projectManager: ProjectManager;
	enableHeadlessFallback: ( opts: { url: string; idleTimeoutMs?: number } ) => void;
	close: () => Promise<void>;
}

export const startOrengineServer = ( opts: OrengineServerOptions ): Promise<OrengineServerHandle> => {

	const pm = new ProjectManager( opts.projectDir );
	const port = opts.port ?? ( Number( process.env.ORENGINE_SERVER_PORT ) || 3001 );

	const app = express();
	app.use( express.json( { limit: '50mb' } ) );

	app.use( '/api', createProjectsRouter( pm ) );
	app.use( '/api', createSceneRouter( pm ) );
	app.use( '/api', createComponentsRouter( pm ) );
	app.use( '/api', createTexturesRouter( pm ) );
	app.use( '/api', createEditorRouter( pm ) );

	return new Promise( ( resolve ) => {

		const server = app.listen( port, () => {

			console.log( `OREngine Server running on port ${port} (project: ${pm.name})` );
			initWSBridge( server );

			let headless: HeadlessBrowser | null = null;

			resolve( {
				server,
				projectManager: pm,
				enableHeadlessFallback: ( { url, idleTimeoutMs } ) => {

					headless = new HeadlessBrowser( { url, idleTimeoutMs } );
					getWSBridge()?.setHeadlessFallback( headless );

				},
				close: () => new Promise( ( done ) => {

					Promise.resolve( headless?.close() ).finally( () => {

						server.close( () => done() );

					} );

				} ),
			} );

		} );

	} );

};
