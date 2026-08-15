import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ensureProjectExists } from './projectTemplate';

/*
	利用側リポジトリのセットアップスクリプト。
	submodule を追加した利用側リポジトリのルートで実行する:

		npx tsx orengine/scripts/init.ts

	project/（テンプレート）・tsconfig.json・package.json の scripts を生成する。
	既存のファイル・エントリは上書きしない。
*/

const orengineRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );
const consumerRoot = process.cwd();

// 利用側リポジトリのルートで実行されているか検証し、submodule への相対パス（posix区切り）を返す
const resolveOrenginePath = () => {

	if ( consumerRoot === orengineRoot ) {

		console.error( '[orengine] run this script from your repository root (not inside the OREngine submodule)' );
		process.exit( 1 );

	}

	const rel = path.relative( consumerRoot, orengineRoot );

	if ( rel.startsWith( '..' ) || path.isAbsolute( rel ) ) {

		console.error( `[orengine] the OREngine submodule (${orengineRoot}) is not inside the current directory (${consumerRoot})` );
		console.error( '[orengine] run this script from your repository root' );
		process.exit( 1 );

	}

	return rel.split( path.sep ).join( '/' );

};

// project/ をテンプレートから生成する
const setupProject = () => {

	const projectDir = path.join( consumerRoot, 'project' );

	if ( fs.existsSync( projectDir ) ) {

		console.log( '[orengine] skip: project/ already exists' );
		return;

	}

	ensureProjectExists( projectDir, path.basename( consumerRoot ) );
	console.log( '[orengine] created: project/' );

};

// パスエイリアスを submodule に向けた tsconfig.json を生成する
const setupTsconfig = ( orengine: string ) => {

	const tsconfigPath = path.join( consumerRoot, 'tsconfig.json' );

	if ( fs.existsSync( tsconfigPath ) ) {

		console.log( '[orengine] skip: tsconfig.json already exists (add the path aliases yourself if needed)' );
		return;

	}

	// compilerOptions は submodule 側 tsconfig.json と揃える（orengine のソースも型チェック対象に入るため）
	const tsconfig = {
		compilerOptions: {
			target: 'ES2020',
			useDefineForClassFields: true,
			lib: [ 'ES2020', 'DOM', 'DOM.Iterable', 'ES2021' ],
			module: 'ESNext',
			skipLibCheck: true,
			moduleResolution: 'bundler',
			allowImportingTsExtensions: true,
			resolveJsonModule: true,
			isolatedModules: true,
			noEmit: true,
			jsx: 'react-jsx',
			strict: true,
			baseUrl: '.',
			typeRoots: [ `./${orengine}/node_modules`, `./${orengine}/node_modules/@types` ],
			types: [ '@webgpu/types', 'node', 'dom-mediacapture-transform', 'dom-webcodecs' ],
			paths: {
				'basepower': [ `./${orengine}/packages/basepower` ],
				'mathpower': [ `./${orengine}/packages/mathpower` ],
				'glpower': [ `./${orengine}/packages/glpower` ],
				'maxpower': [ `./${orengine}/packages/maxpower/webgl` ],
				'maxpower/webgpu': [ `./${orengine}/packages/maxpower/webgpu` ],
				'orengine': [ `./${orengine}/packages/orengine/index.ts` ],
				'orengine/*': [ `./${orengine}/packages/orengine/*` ],
				'@or-renderer': [ `./${orengine}/packages/maxpower/webgl/index.ts` ],
				'@or-scene': [ './project/scene.json' ],
				'@or-editor': [ './project/editor.json' ],
				'@or-resources/*': [ './project/Resources/*' ],
			},
		},
		// global.d.ts がシェーダーファイル import や vite/client の型を提供する
		include: [ 'project', `${orengine}/global.d.ts` ],
	};

	fs.writeFileSync( tsconfigPath, JSON.stringify( tsconfig, null, 2 ) + '\n' );
	console.log( '[orengine] created: tsconfig.json' );

};

// package.json に dev / player:build / editor:build の scripts と tsx を追加する
const setupPackageJson = ( orengine: string ) => {

	const pkgPath = path.join( consumerRoot, 'package.json' );

	const pkg = fs.existsSync( pkgPath )
		? JSON.parse( fs.readFileSync( pkgPath, 'utf-8' ) )
		: { name: path.basename( consumerRoot ), private: true };

	const scripts: Record<string, string> = {
		'dev': `tsx ${orengine}/scripts/run.ts dev --project project`,
		'player:build': `tsx ${orengine}/scripts/run.ts player:build --project project`,
		'editor:build': `tsx ${orengine}/scripts/run.ts editor:build --project project`,
	};

	pkg.scripts = pkg.scripts ?? {};

	for ( const [ name, cmd ] of Object.entries( scripts ) ) {

		if ( pkg.scripts[ name ] !== undefined && pkg.scripts[ name ] !== cmd ) {

			console.log( `[orengine] skip: scripts.${name} already exists in package.json` );
			continue;

		}

		pkg.scripts[ name ] = cmd;

	}

	// 実行に必要なのは tsx だけ（依存パッケージはすべて submodule 側が持つ）
	const hasTsx = pkg.dependencies?.tsx !== undefined || pkg.devDependencies?.tsx !== undefined;

	if ( ! hasTsx ) {

		pkg.devDependencies = { ...pkg.devDependencies, tsx: '^4.19.0' };

	}

	fs.writeFileSync( pkgPath, JSON.stringify( pkg, null, 2 ) + '\n' );
	console.log( '[orengine] updated: package.json' );

};

/*-------------------------------
	実行
-------------------------------*/

const orengine = resolveOrenginePath();

setupProject();
setupTsconfig( orengine );
setupPackageJson( orengine );

console.log( '' );
console.log( '[orengine] setup complete. next steps:' );

if ( ! fs.existsSync( path.join( orengineRoot, 'node_modules' ) ) ) {

	console.log( `  (cd ${orengine} && npm install)` );

}

console.log( '  npm install' );
console.log( '  npm run dev' );
