import * as fs from 'fs';
import * as http from 'http';
import * as net from 'net';
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
	// 実際に listen したポート。opts.port が使用中ならそれより後ろの空き番号になる
	port: number;
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

// server を host:port で listen する。失敗したらそのエラーを返す
const listen = ( server: net.Server, port: number, host?: string ) => new Promise<NodeJS.ErrnoException | undefined>( ( resolve ) => {

	const onError = ( error: NodeJS.ErrnoException ) => {

		server.off( 'listening', onListening );
		resolve( error );

	};

	const onListening = () => {

		server.off( 'error', onError );
		resolve( undefined );

	};

	server.once( 'error', onError );
	server.once( 'listening', onListening );
	server.listen( port, host );

} );

// port から順に試し、IPv4 / IPv6 のどちらでも使われていない最初のポートで立てる。
// 空きの確認と listen を分けると、同時に起動した別の dev サーバーとその間で同じ番号を取り合うため、listen の成否そのもので判定する
const listenOnFreePort = async ( app: express.Express, port: number ) => {

	for ( let candidate = port; candidate <= 65535; candidate ++ ) {

		// macOS では 0.0.0.0 が使用中でも ::（listen の既定）には重ねて listen できてしまい、localhost への接続が相手に奪われる。
		// vite は 0.0.0.0 で立つので、IPv4 側を先に押さえて使用中を検知し、本番の listen が終わるまで他に取らせない
		const ipv4Guard = net.createServer();
		const guardError = await listen( ipv4Guard, candidate, '0.0.0.0' );

		if ( guardError && guardError.code !== 'EADDRINUSE' ) {

			throw guardError;

		}

		if ( ! guardError ) {

			const server = http.createServer( app );
			const error = await listen( server, candidate );

			await new Promise( ( done ) => ipv4Guard.close( done ) );

			if ( ! error ) {

				return { server, port: candidate };

			}

			if ( error.code !== 'EADDRINUSE' ) {

				throw error;

			}

		}

		console.log( `OREngine Server: port ${candidate} is in use, trying another one...` );

	}

	throw new Error( `OREngine Server: no available port from ${port}` );

};

export const startOrengineServer = async ( opts: OrengineServerOptions ): Promise<OrengineServerHandle> => {

	const pm = new ProjectManager( opts.projectDir );
	const port = opts.port ?? ( Number( process.env.ORENGINE_SERVER_PORT ) || 3001 );

	const app = express();
	app.use( express.json( { limit: '50mb' } ) );

	app.use( '/api', createSceneRouter( pm ) );

	// 組み込み route を先に載せ、プロジェクト側が既存のパスを奪えないようにする
	await mountEditorExtension( app, opts.projectDir );

	const { server, port: boundPort } = await listenOnFreePort( app, port );

	console.log( `OREngine Server running on port ${boundPort} (project: ${pm.name})` );

	return {
		server,
		port: boundPort,
		projectManager: pm,
		close: () => new Promise( ( done ) => {

			server.close( () => done() );

		} ),
	};

};
