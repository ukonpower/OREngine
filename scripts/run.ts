import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );
const templateDir = path.join( repoRoot, 'host/template/project' );

/*-------------------------------
	設定解決
-------------------------------*/

// ORENGINE_PROJECT からアクティブプロジェクトを決める
const resolveProject = () => {

	const name = process.env.ORENGINE_PROJECT || 'demo-webgl';

	const projectDir = path.resolve( repoRoot, name );

	return { projectName: path.basename( projectDir ), projectDir };

};

// ORENGINE_RENDERER からレンダラーバックエンドを決める
const resolveRenderer = () => {

	const name = process.env.ORENGINE_RENDERER || 'webgl';

	if ( name !== 'webgl' && name !== 'webgpu' && name !== 'headless' ) {

		throw new Error( `unknown renderer: ${name} (expected webgl, webgpu or headless)` );

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

	console.error( 'Usage: tsx scripts/run.ts <dev|player:build|editor:build>' );
	process.exit( 1 );

}

const { projectName, projectDir } = resolveProject();
const renderer = resolveRenderer();
ensureProjectExists( projectDir, projectName );

const { runDev, runBuildPlayer, runBuildStatic } = await import( '../host/index.ts' );

console.log( `[orengine] project = ${projectName}` );

if ( cmd === 'dev' ) {

	console.log( `[orengine] renderer = ${renderer}` );

	await runDev( { projectDir, renderer } );

} else if ( cmd === 'player:build' ) {

	console.log( `[orengine] renderer = ${renderer}` );

	await runBuildPlayer( { projectDir, renderer } );

	// playerバンドルを自己解凍html（64k配布形式）にパックする
	const playerJs = path.join( projectDir, 'dist/player/index.js' );
	const packedHtml = path.join( projectDir, 'dist/player/out.html' );
	execFileSync( 'node', [ path.join( repoRoot, 'tools/compeko.js' ), playerJs, packedHtml ], { stdio: 'inherit' } );

} else if ( cmd === 'editor:build' ) {

	// CI等でサブパス配下（例: GitHub Pages の /OREngine/）へ配置するときは BASE_PATH で指定する
	await runBuildStatic( { projectDir, basePath: process.env.BASE_PATH } );

} else {

	console.error( `unknown cmd: ${cmd}` );
	process.exit( 1 );

}
