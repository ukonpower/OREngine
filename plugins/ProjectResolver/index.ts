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

		},
	};

};
