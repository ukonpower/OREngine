import { resolveProject } from './resolveProject.mjs';
import { ensureProjectExists } from './scaffoldProject.mjs';


const cmd = process.argv[ 2 ];
if ( ! cmd ) {

	console.error( 'Usage: tsx scripts/run.mjs <dev|build|build:static>' );
	process.exit( 1 );

}

const { projectName, projectDir } = resolveProject();
ensureProjectExists( projectDir, projectName );

const { runDev, runBuildPlayer, runBuildStatic } = await import( '../host/index.ts' );

console.log( `[orengine] project = ${projectName}` );

if ( cmd === 'dev' ) {

	await runDev( { projectDir } );

} else if ( cmd === 'build' ) {

	await runBuildPlayer( { projectDir } );

} else if ( cmd === 'build:static' ) {

	await runBuildStatic( { projectDir } );

} else {

	console.error( `unknown cmd: ${cmd}` );
	process.exit( 1 );

}
