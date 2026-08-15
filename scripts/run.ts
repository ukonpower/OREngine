import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ensureProjectExists } from './projectTemplate';

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );

/*-------------------------------
	設定解決
-------------------------------*/

// --project（cwd 基準。利用側リポジトリからの実行用）または ORENGINE_PROJECT からアクティブプロジェクトを決める
const resolveProject = () => {

	const flagIndex = process.argv.indexOf( '--project' );

	if ( flagIndex !== - 1 ) {

		const name = process.argv[ flagIndex + 1 ];

		if ( ! name ) {

			throw new Error( '--project requires a path' );

		}

		const projectDir = path.resolve( process.cwd(), name );

		return { projectName: path.basename( projectDir ), projectDir };

	}

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

} else if ( cmd === 'editor:build' ) {

	// CI等でサブパス配下（例: GitHub Pages の /OREngine/）へ配置するときは BASE_PATH で指定する
	await runBuildStatic( { projectDir, basePath: process.env.BASE_PATH } );

} else {

	console.error( `unknown cmd: ${cmd}` );
	process.exit( 1 );

}
