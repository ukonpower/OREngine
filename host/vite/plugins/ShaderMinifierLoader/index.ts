import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';

const exec = util.promisify( childProcess.exec );

const SHADER_EXT = /\.(vs|fs|vert|frag|glsl)$/;
const SKIP_DIRS = new Set( [ 'node_modules', 'dist', 'tmp', '.git' ] );

// preserveリスト抽出時に識別子として扱わないGLSLキーワード・組み込み型
const GLSL_KEYWORDS = new Set( (
	'void float int bool vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 ' +
	'mat2 mat3 mat4 sampler2D samplerCube sampler3D if else for while do ' +
	'return break continue discard struct uniform in out inout const ' +
	'precision highp mediump lowp true false layout flat attribute varying ' +
	'define ifdef ifndef endif elif include pragma version es main defined'
).split( ' ' ) );

export interface ShaderMinifierLoaderOptions {
	scanDirs: string[];
}

// scanDirs以下のシェーダーファイルを再帰的に収集する
const collectShaderFiles = ( scanDirs: string[] ) => {

	const files: string[] = [];

	const walk = ( dir: string ) => {

		let entries: fs.Dirent[];

		try {

			entries = fs.readdirSync( dir, { withFileTypes: true } );

		} catch {

			return;

		}

		for ( const entry of entries ) {

			if ( entry.isDirectory() ) {

				if ( SKIP_DIRS.has( entry.name ) || entry.name.startsWith( '.' ) ) continue;

				walk( path.join( dir, entry.name ) );

			} else if ( SHADER_EXT.test( entry.name ) ) {

				files.push( path.join( dir, entry.name ) );

			}

		}

	};

	for ( const dir of scanDirs ) walk( dir );

	return [ ...new Set( files ) ];

};

// minify結果をデバッグ用にダンプする。ファイル名は元パス（cwd基準）のスラッシュを__に置換したもの
const DUMP_DIR = './tmp/shader-minified';

const dumpBatchResult = async ( result: Map<string, string> ) => {

	await fs.promises.rm( DUMP_DIR, { recursive: true, force: true } );
	await fs.promises.mkdir( DUMP_DIR, { recursive: true } );

	for ( const [ file, code ] of result ) {

		const name = path.relative( process.cwd(), file ).replaceAll( path.sep, '__' );

		await fs.promises.writeFile( path.join( DUMP_DIR, name ), code );

	}

};

const preprocess = ( code: string ) => {

	code = code.replaceAll( '\\n', '\n' );
	code = code.replaceAll( '\\t', '\t' );
	code = code.replaceAll( 'precision highp float;', '//[\nprecision highp float;\n//]\n' );

	return code;

};

// partファイル群から識別子を抽出する。partはminifyされず生のまま実行時に結合されるため、
// partが参照・宣言する名前はminify対象ファイル側でもリネームせず保持する必要がある
const extractPartIdentifiers = ( partCodes: string[] ) => {

	const names = new Set<string>();

	for ( let code of partCodes ) {

		code = code.replace( /\/\/.*$/gm, '' ).replace( /\/\*[\s\S]*?\*\//g, '' );

		for ( const match of code.matchAll( /[A-Za-z_][A-Za-z0-9_]*/g ) ) {

			const word = match[ 0 ];

			// 全て大文字の語はマクロ（NUM_LIGHT_DIR等）とみなして除外する
			if ( GLSL_KEYWORDS.has( word ) || word.startsWith( 'gl_' ) || word === word.toUpperCase() ) continue;

			names.add( word );

		}

	}

	return [ ...names ];

};

export const ShaderMinifierLoader = ( options: ShaderMinifierLoaderOptions ): Plugin => {

	const filter = createFilter( [
		'**/*.vs',
		'**/*.fs',
		'**/*.vert',
		'**/*.frag',
		'**/*.glsl',
	] );

	const skip = process.env.SKIP_SHADER_MINIFIER === 'true';

	// 全シェーダーを1回のinvocationで一括minifyした結果（絶対パス→minify済みコード）。
	// ファイルごとに個別にminifyするとリネームがファイル間で食い違いシンボル解決が壊れるため、
	// 必ず全ファイルを同一のシンボルテーブルで処理する
	let batchPromise: Promise<Map<string, string>> | null = null;

	const runBatchMinify = async ( warn: ( msg: string ) => void ) => {

		const allFiles = collectShaderFiles( options.scanDirs );
		const partFiles = allFiles.filter( ( f ) => f.endsWith( '.part.glsl' ) );
		const targetFiles = allFiles.filter( ( f ) => ! f.endsWith( '.part.glsl' ) );

		const sources = new Map<string, string>();

		for ( const file of targetFiles ) {

			sources.set( file, preprocess( await fs.promises.readFile( file, 'utf-8' ) ) );

		}

		const finish = async ( result: Map<string, string> ) => {

			try {

				await dumpBatchResult( result );

			} catch { /* ダンプ失敗はminify結果に影響させない */ }

			return result;

		};

		const rawFallback = () => finish( new Map( sources ) );

		if ( targetFiles.length === 0 ) return rawFallback();

		const partCodes = await Promise.all( partFiles.map( ( f ) => fs.promises.readFile( f, 'utf-8' ) ) );
		const noRenamingList = [ 'main', 'D', ...extractPartIdentifiers( partCodes ) ];

		const batchDir = path.join( './tmp', `shader_batch_${Date.now()}` );
		await fs.promises.mkdir( batchDir, { recursive: true } );

		try {

			// ファイル名をminifierの変数名規則（非英数字→_）と1:1対応させて出力を引き当てる
			const varNameToFile = new Map<string, string>();
			const inputPaths: string[] = [];

			for ( let i = 0; i < targetFiles.length; i ++ ) {

				const file = targetFiles[ i ];
				const inputName = `s${i}_${path.basename( file ).replace( /[^A-Za-z0-9_.]/g, '_' )}`;
				const inputPath = path.join( batchDir, inputName );

				await fs.promises.writeFile( inputPath, sources.get( file ) ! );

				varNameToFile.set( inputName.replace( /[^A-Za-z0-9_]/g, '_' ), file );
				inputPaths.push( inputPath );

			}

			const outputPath = path.join( batchDir, 'out.js' );
			// --no-remove-unused は付けない: バッチ全体の使用解析で未使用コードを削除させる。
			// partが参照するシンボルは --no-renaming-list が削除からも保護する（実測確認済み）
			const args = `--format js --preserve-externals --no-renaming-list ${noRenamingList.join( ',' )}`;
			const bin = process.platform === 'darwin' ? 'mono ~/Documents/application/shader_minifier/shader_minifier.exe' : 'shader_minifier.exe';

			try {

				await exec( `${bin} ${inputPaths.join( ' ' )} -o ${outputPath} ${args}` );

			} catch ( e: any ) {

				// shader_minifier が無い環境やminifyエラー時は生GLSLにフォールバックする
				warn( `ShaderMinifierLoader: minify をスキップしました (${e.message})` );

				return rawFallback();

			}

			const output = await fs.promises.readFile( outputPath, 'utf-8' );
			const result = new Map<string, string>();

			for ( const match of output.matchAll( /var (\w+) = `([\s\S]*?)`/g ) ) {

				const file = varNameToFile.get( match[ 1 ] );

				if ( file ) result.set( file, match[ 2 ] );

			}

			if ( result.size !== targetFiles.length ) {

				warn( `ShaderMinifierLoader: minify出力の対応付けに失敗しました (${result.size}/${targetFiles.length}) 生GLSLにフォールバックします` );

				return rawFallback();

			}

			return finish( result );

		} finally {

			await fs.promises.rm( batchDir, { recursive: true, force: true } );

		}

	};

	const isShaderFile = ( file: string ) => SHADER_EXT.test( file );

	return {
		name: 'shaderMinifier',
		enforce: 'pre',

		// シェーダーファイルの追加・削除・変更でバッチ全体を無効化する
		watchChange( id ) {

			if ( isShaderFile( id ) ) {

				batchPromise = null;

			}

		},

		// 1ファイルの変更でも全シェーダーのリネーム結果が変わりうるため、
		// module graph上の全シェーダーモジュールを再変換対象にする
		handleHotUpdate( ctx ) {

			if ( ! isShaderFile( ctx.file ) ) return;

			batchPromise = null;

			const modules = new Set( ctx.modules );

			for ( const mod of ctx.server.moduleGraph.idToModuleMap.values() ) {

				if ( mod.file && isShaderFile( mod.file ) ) modules.add( mod );

			}

			return [ ...modules ];

		},

		async transform( code: string, id: string ) {

			if ( ! filter( id ) ) return;

			const filePath = id.split( '?' )[ 0 ];

			if ( filePath.endsWith( '.part.glsl' ) ) {

				return {
					code: `export default ${JSON.stringify( code.replaceAll( /[\n]+/g, '' ) )};`,
					map: { mappings: '' }
				};

			}

			if ( skip ) {

				return {
					code: `export default ${JSON.stringify( preprocess( code ) )};`,
					map: { mappings: '' }
				};

			}

			if ( ! batchPromise ) {

				batchPromise = runBatchMinify( ( msg ) => this.warn( msg ) );

			}

			const batch = await batchPromise;
			const minified = batch.get( filePath );

			if ( minified === undefined ) {

				this.warn( `ShaderMinifierLoader: バッチ対象外のシェーダーです。生GLSLを使用します: ${filePath}` );

				return {
					code: `export default ${JSON.stringify( preprocess( code ) )};`,
					map: { mappings: '' }
				};

			}

			return {
				code: `export default ${JSON.stringify( minified )};`,
				map: { mappings: '' }
			};

		}
	};

};
