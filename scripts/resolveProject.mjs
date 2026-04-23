import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );

export const resolveProject = () => {

	let name = process.env.ORENGINE_PROJECT;

	if ( ! name ) {

		const cfgPath = path.join( repoRoot, 'orengine.config.json' );
		if ( ! fs.existsSync( cfgPath ) ) {

			throw new Error( 'orengine.config.json not found and ORENGINE_PROJECT not set' );

		}

		name = JSON.parse( fs.readFileSync( cfgPath, 'utf-8' ) ).project;

	}

	if ( ! name ) throw new Error( 'project name is empty' );

	const projectDir = path.resolve( repoRoot, name );

	return {
		projectName: path.basename( projectDir ),
		projectDir,
		exists: fs.existsSync( projectDir ),
	};

};
