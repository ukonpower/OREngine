import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { Plugin } from 'vite';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );

export const ProjectResolver = (): Plugin => {

	const activeProject = process.env.ORENGINE_PROJECT || 'DemoProject';
	const PROJECT_DIR = process.env.ORENGINE_PROJECT_DIR
		? path.resolve( process.env.ORENGINE_PROJECT_DIR )
		: path.resolve( PROJECTS_DIR, activeProject );

	const projectNodeModules = path.join( PROJECT_DIR, 'node_modules' );

	return {
		name: 'project-resolver',
		enforce: 'pre',
		async resolveId( source, importer, options ) {

			if ( source === '~project' || source.startsWith( '~project/' ) ) {

				const replaced = source.replace(
					'~project',
					PROJECT_DIR
				);

				const resolved = await this.resolve( replaced, importer, { ...options, skipSelf: true } );

				return resolved || replaced;

			}

			// プロジェクト側のnode_modulesからモジュールを解決
			if ( ! source.startsWith( '.' ) && ! source.startsWith( '/' ) && ! source.startsWith( '~' ) ) {

				const pkgName = source.startsWith( '@' )
					? source.split( '/' ).slice( 0, 2 ).join( '/' )
					: source.split( '/' )[ 0 ];

				const pkgDir = path.join( projectNodeModules, pkgName );

				if ( fs.existsSync( pkgDir ) ) {

					const resolved = await this.resolve(
						path.join( projectNodeModules, source ),
						importer,
						{ ...options, skipSelf: true }
					);

					return resolved || undefined;

				}

			}

		},
	};

};
