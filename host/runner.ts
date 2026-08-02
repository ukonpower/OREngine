import { build, createServer, InlineConfig } from 'vite';

import { startOrengineServer, OrengineServerHandle } from './server/factory';
import { createDevConfig, createPlayerConfig, createStaticConfig } from './vite/configs';

import type { RendererName } from './vite/configs';
import type { ViteDevServer } from 'vite';


export interface HostRunOptions {
	projectDir: string;
	port?: number;
	apiPort?: number;
	basePath?: string;
	https?: { cert: Buffer | string; key: Buffer | string };
	// dev のみ有効。player / static は webgl 固定
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

export const runBuildPlayer = async ( opts: HostRunOptions ) => {

	return build( createPlayerConfig( opts ) as InlineConfig );

};

export const runBuildStatic = async ( opts: HostRunOptions ) => {

	return build( createStaticConfig( opts ) as InlineConfig );

};
