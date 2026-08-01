import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';

import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';

const exec = util.promisify( childProcess.exec );

const SHADER_EXT = /\.(vs|fs|vert|frag|glsl)$/;
const SKIP_DIRS = new Set( [ 'node_modules', 'dist', 'tmp', '.git', 'spikes' ] );

export interface ShaderBuilderOptions {
	scanDirs: string[];
}

/*-------------------------------
	#include 解決
-------------------------------*/

// 実行時のシェーダー結合をビルド時に前倒しするための include キー → ファイルの対応表。
// minifierには結合済みの完成形シェーダーを渡す必要がある（minifierは各入力ファイルを
// 独立したシェーダーとして扱うため、ファイルを跨ぐリネーム・未使用削除は成立しない）
const SHADER_PARSER_DIR = path.resolve( fileURLToPath( import.meta.url ), '../../../../../packages/maxpower/shader/ShaderParser' );

const INCLUDE_FILES = new Map<string, string>( [
	[ 'common', 'shaderModules/common.module.glsl' ],
	[ 'sdf', 'shaderModules/sdf.module.glsl' ],
	[ 'rotate', 'shaderModules/rotate.module.glsl' ],
	[ 'random', 'shaderModules/random.module.glsl' ],
	[ 'noise_simplex', 'shaderModules/noiseSimplex.module.glsl' ],
	[ 'noise_cyclic', 'shaderModules/noiseCyclic.module.glsl' ],
	[ 'noise_value', 'shaderModules/noiseValue.module.glsl' ],
	[ 'light', 'shaderModules/light.module.glsl' ],
	[ 'pmrem', 'shaderModules/pmrem.module.glsl' ],
	[ 'rm_normal', 'shaderModules/raymarch_normal.module.glsl' ],
	[ 'lighting_light', 'shaderParts/lighting_light.part.glsl' ],
	[ 'lighting_env', 'shaderParts/lighting_env.part.glsl' ],
	[ 'lighting_forwardIn', 'shaderParts/lighting_forwardIn.part.glsl' ],
	[ 'vert_h', 'shaderParts/vert_h.part.glsl' ],
	[ 'vert_in', 'shaderParts/vert_in.part.glsl' ],
	[ 'vert_out', 'shaderParts/vert_out.part.glsl' ],
	[ 'frag_h', 'shaderParts/frag_h.part.glsl' ],
	[ 'frag_in', 'shaderParts/frag_in.part.glsl' ],
	[ 'frag_out', 'shaderParts/frag_out.part.glsl' ],
	[ 'rm_h', 'shaderParts/raymarch_h.part.glsl' ],
	[ 'rm_ray_obj', 'shaderParts/raymarch_ray_object.part.glsl' ],
	[ 'rm_ray_world', 'shaderParts/raymarch_ray_world.part.glsl' ],
	[ 'rm_out_obj', 'shaderParts/raymarch_out_obj.part.glsl' ],
	[ 'uni_time', 'shaderParts/uniform_time.part.glsl' ],
] );

// #include<key> を対応するモジュール/partファイルの中身に置換する。未知のキーは空文字（実行時挙動と同一）
const inlineIncludes = async ( code: string ) => {

	const includePattern = /#include\s?<([\S]*)>/g;
	const keys = [ ...code.matchAll( includePattern ) ].map( ( m ) => m[ 1 ] );

	const contents = new Map<string, string>();

	for ( const key of new Set( keys ) ) {

		const file = INCLUDE_FILES.get( key );

		contents.set( key, file ? await fs.promises.readFile( path.join( SHADER_PARSER_DIR, file ), 'utf-8' ) : '' );

	}

	return code.replace( includePattern, ( _, key: string ) => contents.get( key ) ?? '' );

};

/*-------------------------------
	シェーダー収集・前処理
-------------------------------*/

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

// include解決＋前処理を行い、minifierに渡せる完成形のシェーダーソースを作る
const composeShader = async ( code: string ) => {

	return preprocess( await inlineIncludes( code ) );

};

// uniform宣言に使われる構造体のフィールド名を抽出する。
// CPU側は 'directionalLight[0].direction' のような元の名前でuniform locationを引くため、
// これらのフィールドはリネームさせない（--preserve-externals はuniform変数名しか保護しない）
const extractUniformStructFieldNames = ( sources: Iterable<string> ) => {

	const structBodies = new Map<string, string>();
	const uniformTypes = new Set<string>();

	for ( let code of sources ) {

		code = code.replace( /\/\/.*$/gm, '' ).replace( /\/\*[\s\S]*?\*\//g, '' );

		for ( const m of code.matchAll( /struct\s+(\w+)\s*\{([^}]*)\}/g ) ) structBodies.set( m[ 1 ], m[ 2 ] );

		for ( const m of code.matchAll( /uniform\s+(\w+)/g ) ) uniformTypes.add( m[ 1 ] );

	}

	const fields = new Set<string>();
	const visited = new Set<string>();

	// ネストした構造体フィールドも 'a.b.c' 形式で参照されうるため再帰的にたどる
	const visit = ( type: string ) => {

		if ( visited.has( type ) ) return;

		visited.add( type );

		const body = structBodies.get( type );

		if ( ! body ) return;

		for ( const m of body.matchAll( /(\w+)\s+(\w+)\s*(?:\[[^\]]*\])?\s*;/g ) ) {

			fields.add( m[ 2 ] );
			visit( m[ 1 ] );

		}

	};

	for ( const type of uniformTypes ) visit( type );

	return [ ...fields ];

};

/*-------------------------------
	プラグイン本体
-------------------------------*/

export const ShaderBuilder = ( options: ShaderBuilderOptions ): Plugin => {

	const filter = createFilter( [
		'**/*.vs',
		'**/*.fs',
		'**/*.vert',
		'**/*.frag',
		'**/*.glsl',
	] );

	const skip = process.env.SKIP_SHADER_MINIFIER === 'true';

	// 全シェーダーを1回のinvocationで一括minifyした結果（絶対パス→minify済みコード）
	let batchPromise: Promise<Map<string, string>> | null = null;

	const runBatchMinify = async ( warn: ( msg: string ) => void ) => {

		// module/partは実行時に単体で使われることはなく、include解決で各シェーダーに焼き込まれる
		const targetFiles = collectShaderFiles( options.scanDirs )
			.filter( ( f ) => ! f.endsWith( '.part.glsl' ) && ! f.endsWith( '.module.glsl' ) );

		const sources = new Map<string, string>();

		for ( const file of targetFiles ) {

			sources.set( file, await composeShader( await fs.promises.readFile( file, 'utf-8' ) ) );

		}

		const finish = async ( result: Map<string, string> ) => {

			try {

				await dumpBatchResult( result );

			} catch { /* ダンプ失敗はminify結果に影響させない */ }

			return result;

		};

		const rawFallback = () => finish( new Map( sources ) );

		if ( targetFiles.length === 0 ) return rawFallback();

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
			// --no-overloading: minifierは別関数ファミリ（hashvとfbm等）に同じ短縮名を割り当てることがあり、
			// 同一シグネチャのオーバーロードが衝突して二重定義になるため無効化する
			// --no-renaming-list はデフォルトリスト（main を含む）を置き換える。
			// main を外すと未使用削除のルートが消え全関数が削除されるため必ず含める
			const noRenamingList = [ 'main', ...extractUniformStructFieldNames( sources.values() ) ];
			const args = `--format js --preserve-externals --no-overloading --no-renaming-list ${noRenamingList.join( ',' )}`;
			const bin = process.platform === 'darwin' ? 'mono ~/Documents/application/shader_minifier/shader_minifier.exe' : 'shader_minifier.exe';

			try {

				await exec( `${bin} ${inputPaths.join( ' ' )} -o ${outputPath} ${args}` );

			} catch ( e: any ) {

				// shader_minifier が無い環境やminifyエラー時は生GLSLにフォールバックする
				warn( `ShaderBuilder: minify をスキップしました (${e.message})` );

				return rawFallback();

			}

			const output = await fs.promises.readFile( outputPath, 'utf-8' );
			const result = new Map<string, string>();

			for ( const match of output.matchAll( /var (\w+) = `([\s\S]*?)`/g ) ) {

				const file = varNameToFile.get( match[ 1 ] );

				if ( file ) result.set( file, match[ 2 ] );

			}

			if ( result.size !== targetFiles.length ) {

				warn( `ShaderBuilder: minify出力の対応付けに失敗しました (${result.size}/${targetFiles.length}) 生GLSLにフォールバックします` );

				return rawFallback();

			}

			return finish( result );

		} finally {

			await fs.promises.rm( batchDir, { recursive: true, force: true } );

		}

	};

	const isShaderFile = ( file: string ) => SHADER_EXT.test( file );

	return {
		name: 'shader-builder',
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

			if ( skip ) {

				return {
					code: `export default ${JSON.stringify( await composeShader( code ) )};`,
					map: { mappings: '' }
				};

			}

			if ( ! batchPromise ) {

				batchPromise = runBatchMinify( ( msg ) => this.warn( msg ) );

			}

			const batch = await batchPromise;
			const minified = batch.get( filePath );

			if ( minified === undefined ) {

				this.warn( `ShaderBuilder: バッチ対象外のシェーダーです。生GLSLを使用します: ${filePath}` );

				return {
					code: `export default ${JSON.stringify( await composeShader( code ) )};`,
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
