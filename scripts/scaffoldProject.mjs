import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { repoRoot } from './resolveProject.mjs';

const templateDir = path.resolve( fileURLToPath( import.meta.url ), '../templates/project' );

const copyDir = ( src, dst, replacements ) => {

	fs.mkdirSync( dst, { recursive: true } );

	for ( const entry of fs.readdirSync( src, { withFileTypes: true } ) ) {

		const s = path.join( src, entry.name );
		const d = path.join( dst, entry.name );

		if ( entry.isDirectory() ) {

			copyDir( s, d, replacements );

		} else {

			let content = fs.readFileSync( s, 'utf-8' );
			for ( const [ k, v ] of Object.entries( replacements ) ) {

				content = content.split( `{{${k}}}` ).join( v );

			}
			fs.writeFileSync( d, content );

		}

	}

};

const appendGitignoreLines = ( lines ) => {

	const p = path.join( repoRoot, '.gitignore' );
	const cur = fs.existsSync( p ) ? fs.readFileSync( p, 'utf-8' ) : '';
	const missing = lines.filter( l => ! cur.split( '\n' ).includes( l ) );
	if ( missing.length === 0 ) return;
	const sep = cur.endsWith( '\n' ) ? '' : '\n';
	fs.writeFileSync( p, cur + sep + missing.join( '\n' ) + '\n' );

};

export const ensureProjectExists = ( projectDir, projectName ) => {

	if ( fs.existsSync( projectDir ) ) return false;

	console.log( `[orengine] scaffolding new project: ${projectName}` );
	copyDir( templateDir, projectDir, { PROJECT_NAME: projectName } );

	appendGitignoreLines( [
		`${projectName}/Resources/_data/`,
	] );

	return true;

};
