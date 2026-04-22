import express from 'express';
import type { Server } from 'http';

import { ProjectManager } from './Project';
import { createComponentsRouter } from './routes/components';
import { createEditorRouter } from './routes/editor';
import { createProjectsRouter } from './routes/projects';
import { createSceneRouter } from './routes/scene';
import { createTexturesRouter } from './routes/textures';
import { initWSBridge } from './ws';


export interface OrengineServerOptions {
	projectDir: string;
	port?: number;
}

export interface OrengineServerHandle {
	server: Server;
	projectManager: ProjectManager;
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

			resolve( {
				server,
				projectManager: pm,
				close: () => new Promise( ( done ) => {

					server.close( () => done() );

				} ),
			} );

		} );

	} );

};
