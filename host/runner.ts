import fs from 'node:fs';
import path from 'node:path';

import { build, createServer, InlineConfig } from 'vite';

import { startOrengineServer, OrengineServerHandle } from '../server/factory';
import { createDevConfig, createPlayerConfig, createStaticConfig } from '../vite-configs';

import type { ViteDevServer } from 'vite';


export interface HostRunOptions {
	projectDir: string;
	port?: number;
	apiPort?: number;
	basePath?: string;
	https?: { cert: Buffer | string; key: Buffer | string };
	headlessFallback?: boolean;
}

export interface DevHandle {
	vite: ViteDevServer;
	api: OrengineServerHandle;
	close: () => Promise<void>;
}

const ensureDataReady = ( projectDir: string ) => {

	const dataDir = path.join( projectDir, 'Resources/_data' );
	const componentList = path.join( dataDir, 'componentList.ts' );
	if ( ! fs.existsSync( componentList ) ) {

		console.warn( `[orengine/host] Resources/_data is not generated yet at ${dataDir}.` );
		console.warn( '[orengine/host] Run "build:static" or "dev" first to generate it before "build".' );

	}

};

export const runDev = async ( opts: HostRunOptions ): Promise<DevHandle> => {

	const api = await startOrengineServer( {
		projectDir: opts.projectDir,
		port: opts.apiPort,
	} );

	const vite = await createServer( createDevConfig( opts ) as InlineConfig );
	await vite.listen();
	vite.printUrls();

	if ( opts.headlessFallback !== false ) {

		const url = vite.resolvedUrls?.local[ 0 ];

		if ( url ) api.enableHeadlessFallback( { url } );

	}

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

export const runBuildPlayer = async ( opts: HostRunOptions ) => {

	ensureDataReady( opts.projectDir );
	return build( createPlayerConfig( opts ) as InlineConfig );

};

export const runBuildStatic = async ( opts: HostRunOptions ) => {

	return build( createStaticConfig( opts ) as InlineConfig );

};
