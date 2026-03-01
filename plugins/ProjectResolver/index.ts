import * as fs from 'fs';
import * as path from 'path';

import * as chokidar from 'chokidar';
import { Plugin, ViteDevServer } from 'vite';

const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );
const ACTIVE_FILE = path.join( PROJECTS_DIR, '.active' );

const readActiveProject = (): string => {

	try {

		return fs.readFileSync( ACTIVE_FILE, 'utf-8' ).trim();

	} catch {

		return process.env.ORENGINE_PROJECT || 'default';

	}

};

export const ProjectResolver = (): Plugin => {

	let activeProject = readActiveProject();
	let server: ViteDevServer | undefined;

	return {
		name: 'project-resolver',
		enforce: 'pre',
		configureServer( _server ) {

			server = _server;

			if ( ! fs.existsSync( PROJECTS_DIR ) ) {

				fs.mkdirSync( PROJECTS_DIR, { recursive: true } );

			}

			const watcher = chokidar.watch( ACTIVE_FILE, {
				ignoreInitial: true,
			} );

			watcher.on( 'change', () => {

				const newProject = readActiveProject();

				if ( newProject !== activeProject ) {

					activeProject = newProject;

					console.log( `[ProjectResolver] Active project changed to: ${activeProject}` );

					server!.moduleGraph.invalidateAll();
					server!.ws.send( { type: 'full-reload' } );

				}

			} );

			watcher.on( 'add', () => {

				activeProject = readActiveProject();

			} );

		},
		resolveId( source ) {

			if ( source === '~project' || source.startsWith( '~project/' ) ) {

				const resolved = source.replace(
					'~project',
					path.resolve( PROJECTS_DIR, activeProject )
				);

				return resolved;

			}

		},
	};

};
