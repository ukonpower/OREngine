import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

import express from 'express';


import { ProjectManager } from './Project';
import { createSceneRouter } from './routes/scene';

import type { Server } from 'http';


export interface OrengineServerOptions {
	projectDir: string;
	port?: number;
}

export interface OrengineServerHandle {
	server: Server;
	projectManager: ProjectManager;
	close: () => Promise<void>;
}

// プロジェクトの editor/server.ts に渡す文脈
export interface EditorServerContext {
	projectDir: string;
}

// <projectDir>/editor/server.ts の default export。渡された router に足した route が /api/ext 配下に生える
export type EditorServerExtension = ( router: express.Router, ctx: EditorServerContext ) => void | Promise<void>;

// プロジェクトのエディタ拡張 route を /api/ext へマウントする。editor/server.ts が無ければ何もしない
const mountEditorExtension = async ( app: express.Express, projectDir: string ) => {

	const file = path.join( projectDir, 'editor', 'server.ts' );

	if ( ! fs.existsSync( file ) ) return;

	// host は tsx 経由で動くので .ts をそのまま動的 import できる
	const mod = await import( pathToFileURL( file ).href );
	const extension: EditorServerExtension | undefined = mod.default;

	if ( ! extension ) {

		console.warn( `[orengine] ${file} に default export がありません` );
		return;

	}

	const router = express.Router();
	await extension( router, { projectDir } );
	app.use( '/api/ext', router );

	console.log( `OREngine Server extension loaded: ${file}` );

};

export const startOrengineServer = async ( opts: OrengineServerOptions ): Promise<OrengineServerHandle> => {

	const pm = new ProjectManager( opts.projectDir );
	const port = opts.port ?? ( Number( process.env.ORENGINE_SERVER_PORT ) || 3001 );

	const app = express();
	app.use( express.json( { limit: '50mb' } ) );

	app.use( '/api', createSceneRouter( pm ) );

	// 組み込み route を先に載せ、プロジェクト側が既存のパスを奪えないようにする
	await mountEditorExtension( app, opts.projectDir );

	return new Promise( ( resolve ) => {

		const server = app.listen( port, () => {

			console.log( `OREngine Server running on port ${port} (project: ${pm.name})` );

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
