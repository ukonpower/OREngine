import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { build, createServer, InlineConfig } from 'vite';

import { startOrengineServer, OrengineServerHandle } from './server/factory';
import { createDevConfig, createPlayerConfig, createStaticConfig } from './vite/configs';

import type { RendererName } from './vite/configs';
import type { ViteDevServer } from 'vite';

const orengineRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );


export interface HostRunOptions {
	projectDir: string;
	port?: number;
	apiPort?: number;
	basePath?: string;
	https?: { cert: Buffer | string; key: Buffer | string };
	// dev / player で有効。static は webgl 固定
	renderer?: RendererName;
}

export interface DevHandle {
	vite: ViteDevServer;
	api: OrengineServerHandle;
	close: () => Promise<void>;
}

export const runDev = async ( opts: HostRunOptions ): Promise<DevHandle> => {

	const api = await startOrengineServer( {
		projectDir: opts.projectDir,
		port: opts.apiPort,
	} );

	const vite = await createServer( createDevConfig( opts ) as InlineConfig );
	await vite.listen();
	vite.printUrls();

	const close = async () => {

		await vite.close();
		await api.close();

	};

	const handleSignal = async () => {

		try {

			await close();

		} finally {

			process.exit( 0 );

		}

	};

	process.once( 'SIGINT', handleSignal );
	process.once( 'SIGTERM', handleSignal );

	return { vite, api, close };

};

// playerバンドルをビルドし、compeko で自己解凍 html（64k配布形式）にパックする
export const runBuildPlayer = async ( opts: HostRunOptions ) => {

	const result = await build( createPlayerConfig( opts ) as InlineConfig );

	const playerJs = path.join( opts.projectDir, 'dist/player/index.js' );
	const packedHtml = path.join( opts.projectDir, 'dist/player/out.html' );
	execFileSync( 'node', [ path.join( orengineRoot, 'tools/compeko.js' ), playerJs, packedHtml ], { stdio: 'inherit' } );

	return result;

};

export const runBuildStatic = async ( opts: HostRunOptions ) => {

	return build( createStaticConfig( opts ) as InlineConfig );

};
