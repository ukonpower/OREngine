import { spawn } from 'node:child_process';

import { resolveProject } from './resolveProject.mjs';
import { ensureProjectExists } from './scaffoldProject.mjs';

const cmd = process.argv[ 2 ];
if ( ! cmd ) {

	console.error( 'Usage: node scripts/run.mjs <dev|build|build:static|install>' );
	process.exit( 1 );

}

const { projectName, projectDir } = resolveProject();
ensureProjectExists( projectDir, projectName );

const args = cmd === 'install'
	? [ '--prefix', projectName, 'install' ]
	: [ '--prefix', projectName, 'run', cmd ];

console.log( `[orengine] project = ${projectName}` );
const child = spawn( 'npm', args, { stdio: 'inherit' } );
child.on( 'exit', ( code ) => process.exit( code ?? 0 ) );
