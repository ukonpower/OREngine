import * as path from 'path';
import { fileURLToPath } from 'url';

import { Plugin } from 'vite';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );

export const ProjectResolver = (): Plugin => {

	const activeProject = process.env.ORENGINE_PROJECT || 'default';

	return {
		name: 'project-resolver',
		enforce: 'pre',
		async resolveId( source, importer, options ) {

			if ( source === '~project' || source.startsWith( '~project/' ) ) {

				const replaced = source.replace(
					'~project',
					path.resolve( PROJECTS_DIR, activeProject )
				);

				const resolved = await this.resolve( replaced, importer, { ...options, skipSelf: true } );

				return resolved || replaced;

			}

		},
	};

};
