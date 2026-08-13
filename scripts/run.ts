import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );
const templateDir = path.join( repoRoot, 'host/template/project' );

type OREngineConfig = {
	project?: string;
	renderer?: string;
};

/*-------------------------------
	設定解決
-------------------------------*/

const readConfig = (): OREngineConfig => {

	const cfgPath = path.join( repoRoot, 'orengine.config.json' );

	return fs.existsSync( cfgPath ) ? JSON.parse( fs.readFileSync( cfgPath, 'utf-8' ) ) : {};

};

// ORENGINE_PROJECT または orengine.config.json からアクティブプロジェクトを決める
const resolveProject = ( cfg: OREngineConfig ) => {

	const name = process.env.ORENGINE_PROJECT || cfg.project;

	if ( ! name ) throw new Error( 'project name is empty. set orengine.config.json project or ORENGINE_PROJECT' );

	const projectDir = path.resolve( repoRoot, name );

	return { projectName: path.basename( projectDir ), projectDir };

};

// ORENGINE_RENDERER または orengine.config.json からレンダラーバックエンドを決める
const resolveRenderer = ( cfg: OREngineConfig ) => {

	const name = process.env.ORENGINE_RENDERER || cfg.renderer || 'webgl';

	if ( name !== 'webgl' && name !== 'webgpu' ) {

		throw new Error( `unknown renderer: ${name} (expected webgl or webgpu)` );

	}

	return name;

};

/*-------------------------------
	雛形生成（プロジェクトが無ければテンプレートからコピー）
-------------------------------*/

const copyDir = ( src: string, dst: string, replacements: Record<string, string> ) => {

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

const ensureProjectExists = ( projectDir: string, projectName: string ) => {

	if ( fs.existsSync( projectDir ) ) return;

	console.log( `[orengine] creating new project from template: ${projectName}` );
	copyDir( templateDir, projectDir, { PROJECT_NAME: projectName } );

};

/*-------------------------------
	実行
-------------------------------*/

const cmd = process.argv[ 2 ];
if ( ! cmd ) {

	console.error( 'Usage: tsx scripts/run.ts <dev|build|build:static>' );
	process.exit( 1 );

}

const config = readConfig();
const { projectName, projectDir } = resolveProject( config );
const renderer = resolveRenderer( config );
ensureProjectExists( projectDir, projectName );

const { runDev, runBuildPlayer, runBuildStatic } = await import( '../host/index.ts' );

console.log( `[orengine] project = ${projectName}` );

if ( cmd === 'dev' ) {

	console.log( `[orengine] renderer = ${renderer}` );

	await runDev( { projectDir, renderer } );

} else if ( cmd === 'build' ) {

	console.log( `[orengine] renderer = ${renderer}` );

	await runBuildPlayer( { projectDir, renderer } );

	// playerバンドルを自己解凍html（64k配布形式）にパックする
	const playerJs = path.join( projectDir, 'dist/player/index.js' );
	const packedHtml = path.join( projectDir, 'dist/player/out.html' );
	execFileSync( 'node', [ path.join( repoRoot, 'tools/compeko.js' ), playerJs, packedHtml ], { stdio: 'inherit' } );

} else if ( cmd === 'build:static' ) {

	await runBuildStatic( { projectDir } );

} else {

	console.error( `unknown cmd: ${cmd}` );
	process.exit( 1 );

}
