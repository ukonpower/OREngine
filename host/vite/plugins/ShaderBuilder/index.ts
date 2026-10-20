import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';

import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';

const exec = util.promisify( childProcess.exec );

const SHADER_EXT = /\.(vs|fs|vert|frag|glsl)$/;
const SKIP_DIRS = new Set( [ 'node_modules', 'dist', 'tmp', '.git' ] );

export interface ShaderBuilderOptions {
	scanDirs: string[];
	// player ビルド用。シェーダー文字列をバンドル先頭の配列1つにまとめて出す（「シェーダーの集約」の節）
	groupShaders?: boolean;
}

/*-------------------------------
	#include 解決
-------------------------------*/

// 実行時のシェーダー結合をビルド時に前倒しして解決する。
// minifierには結合済みの完成形シェーダーを渡す必要がある（minifierは各入力ファイルを
// 独立したシェーダーとして扱うため、ファイルを跨ぐリネーム・未使用削除は成立しない）
const SHADER_PARSER_DIR = path.resolve( fileURLToPath( import.meta.url ), '../../../../../packages/maxpower/webgl/backend/ShaderParser' );

// #include <prefix:名前> の prefix → 検索ディレクトリとファイル名suffixの対応。
// ファイル名は名前から一意に決まるため、モジュール/partの追加時にローダーの変更は不要
const INCLUDE_DIRS = new Map<string, { dir: string; suffix: string }>( [
	[ 'module', { dir: 'shaderModules', suffix: '.module.glsl' } ],
	[ 'part', { dir: 'shaderParts', suffix: '.part.glsl' } ],
] );

// #include <module:xxx> / <part:xxx> を対応ファイルの中身に置換する。解決できないincludeはビルドエラー
const inlineIncludes = async ( code: string ) => {

	const includePattern = /#include\s?<([\S]*)>/g;
	const keys = [ ...code.matchAll( includePattern ) ].map( ( m ) => m[ 1 ] );

	const contents = new Map<string, string>();

	for ( const key of new Set( keys ) ) {

		const [ prefix, name ] = key.split( ':' );
		const target = name ? INCLUDE_DIRS.get( prefix ) : undefined;

		if ( ! target ) {

			throw new Error( `ShaderBuilder: 不正なincludeです: #include <${key}>（#include <module:名前> / <part:名前> の形式で書く）` );

		}

		const file = path.join( SHADER_PARSER_DIR, target.dir, name + target.suffix );

		try {

			contents.set( key, await fs.promises.readFile( file, 'utf-8' ) );

		} catch {

			throw new Error( `ShaderBuilder: include先が見つかりません: #include <${key}> (${file})` );

		}

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

/*-------------------------------
	楽器（Music）
-------------------------------*/

// Music の楽器の .glsl。楽器は音色の関数（trackSound / noteSound）だけを書き、生成シェーダーの宣言と main はここで前後に足す。
// minifier には完成形を渡す必要がある（上の「#include 解決」）ので、実行時でなくビルド時に足す。
// 種類の名前 Instruments は builtin の Music/instrument.ts の INSTRUMENT_KIND と一致させる
const INSTRUMENT_SHADER = /\/Library\/Instruments\/([^/]+)\/index\.glsl$/;

// 楽器の関数の名前。Music が実行時に完成形の文字列からどちらが定義されているかを読むので、minifier に改名させない
const INSTRUMENT_FUNCTIONS = [ 'noteSound', 'trackSound' ];

// 楽器の .glsl を保存したときにページへ知らせるイベントの名前。builtin の Music/instrument.ts の INSTRUMENT_HOT_EVENT と一致させる
const INSTRUMENT_HOT_EVENT = 'orengine:instrument';

const wrapInstrument = ( code: string, file: string ) => {

	if ( ! INSTRUMENT_SHADER.test( file ) ) return code;

	return `#include <module:music>\n${code}\n#include <part:music_main>\n`;

};

// 楽器の .glsl のモジュールを、保存されたら自分だけ差し替わる（self-accept）ようにし、新しい完成形を楽器の名前と一緒にページへ知らせる。
// 楽器の index.ts まで更新が伝わると registry の glob を通ってページ全体の読み直しになり、全トラックを作り直すことになるため
const instrumentHotCode = ( file: string ) => {

	const match = file.match( INSTRUMENT_SHADER );

	if ( ! match ) return '';

	const detail = `{ name: ${JSON.stringify( match[ 1 ] )}, shader: mod.default }`;

	return `
if ( import.meta.hot ) {
	import.meta.hot.accept( ( mod ) => {
		if ( mod ) window.dispatchEvent( new CustomEvent( ${JSON.stringify( INSTRUMENT_HOT_EVENT )}, { detail: ${detail} } ) );
	} );
}
`;

};

// include解決＋前処理を行い、minifierに渡せる完成形のシェーダーソースを作る
const composeShader = async ( code: string, file: string ) => {

	return preprocess( await inlineIncludes( wrapInstrument( code, file ) ) );

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
	minify
-------------------------------*/

// files を shader_minifier の1回の実行で minify し、絶対パス → minify 済みコードを返す。失敗したら null（呼び出し側が生 GLSL に戻す）。
// keepNames は main に加えて改名させない名前
const minifyFiles = async ( label: string, files: string[], sources: Map<string, string>, keepNames: string[], warn: ( msg: string ) => void ) => {

	const batchDir = path.join( './tmp', `shader_batch_${Date.now()}_${label}` );
	await fs.promises.mkdir( batchDir, { recursive: true } );

	try {

		// ファイル名をminifierの変数名規則（非英数字→_）と1:1対応させて出力を引き当てる
		const varNameToFile = new Map<string, string>();
		const inputPaths: string[] = [];
		const groupSources: string[] = [];

		for ( let i = 0; i < files.length; i ++ ) {

			const file = files[ i ];
			const inputName = `s${i}_${path.basename( file ).replace( /[^A-Za-z0-9_.]/g, '_' )}`;
			const inputPath = path.join( batchDir, inputName );
			const source = sources.get( file ) !;

			await fs.promises.writeFile( inputPath, source );

			varNameToFile.set( inputName.replace( /[^A-Za-z0-9_]/g, '_' ), file );
			inputPaths.push( inputPath );
			groupSources.push( source );

		}

		const outputPath = path.join( batchDir, 'out.js' );
		// --no-overloading: minifierは別関数ファミリ（hashvとfbm等）に同じ短縮名を割り当てることがあり、
		// 同一シグネチャのオーバーロードが衝突して二重定義になるため無効化する
		// --no-renaming-list はデフォルトリスト（main を含む）を置き換える。
		// main を外すと未使用削除のルートが消え全関数が削除されるため必ず含める
		const noRenamingList = [ 'main', ...keepNames, ...extractUniformStructFieldNames( groupSources ) ];
		const args = `--format js --preserve-externals --no-overloading --no-renaming-list ${noRenamingList.join( ',' )}`;
		// 実行コマンドは ORENGINE_SHADER_MINIFIER で上書きできる（例: "mono /path/to/shader_minifier.exe"）
		const bin = process.env.ORENGINE_SHADER_MINIFIER
			?? ( process.platform === 'darwin' ? 'mono ~/Documents/application/shader_minifier/shader_minifier.exe' : 'shader_minifier.exe' );

		try {

			await exec( `${bin} ${inputPaths.join( ' ' )} -o ${outputPath} ${args}` );

		} catch ( e: any ) {

			// shader_minifier が無い環境やminifyエラー時は生GLSLにフォールバックする
			warn( `ShaderBuilder: minify をスキップしました。packed サイズは本番相当より大きくなります。shader_minifier のパスは ORENGINE_SHADER_MINIFIER で指定できます (${e.message})` );

			return null;

		}

		const output = await fs.promises.readFile( outputPath, 'utf-8' );
		const result = new Map<string, string>();

		for ( const match of output.matchAll( /var (\w+) = `([\s\S]*?)`/g ) ) {

			const file = varNameToFile.get( match[ 1 ] );

			if ( file ) result.set( file, match[ 2 ] );

		}

		if ( result.size !== files.length ) {

			warn( `ShaderBuilder: minify出力の対応付けに失敗しました (${result.size}/${files.length}) 生GLSLにフォールバックします` );

			return null;

		}

		return result;

	} finally {

		await fs.promises.rm( batchDir, { recursive: true, force: true } );

	}

};

/*-------------------------------
	シェーダーの集約（player ビルド）
-------------------------------*/

// compeko の deflate は 32KB より前を参照できないため、各モジュールの位置に散らばったシェーダーは
// 共通部品（include したモジュール）の重複が取れない。player ビルドではシェーダーを1か所に並べて重複を近づける。
// 仮想モジュールの named export に集めても、terser が1回しか使わない定数を使用箇所へ展開し直して散らばるため、
// 各シェーダーモジュールはプレースホルダーを返し、tree-shaking 後のチャンクで配列の参照に置き換える
const PLACEHOLDER_PATTERN = /"__OR_SHADER_(\d+)__"/g;

const shaderPlaceholder = ( index: number ) => `__OR_SHADER_${index}__`;

const compareText = ( a: string, b: string ) => {

	if ( a < b ) return - 1;
	if ( a > b ) return 1;

	return 0;

};

// ファイル名順に並べる。packed で import 順・パス順・中身順・大きさ順と比べて最も小さかった。
// 同じ系統のパス（dofBlur / dofBokeh …）や、コンポーネントごとの main.fs 同士が隣り合う
const compareShaderFiles = ( a: string, b: string ) => {

	return compareText( path.basename( a ), path.basename( b ) ) || compareText( a, b );

};

// チャンク中のプレースホルダーを、チャンクの先頭に置いたシェーダーの配列の参照に置き換える
const groupShadersInChunk = ( code: string, batch: Map<string, string> ) => {

	const files = [ ...batch.keys() ];
	const used = new Set<string>();

	for ( const match of code.matchAll( PLACEHOLDER_PATTERN ) ) {

		used.add( files[ Number( match[ 1 ] ) ] );

	}

	if ( used.size === 0 ) return null;

	const ordered = [ ...used ].sort( compareShaderFiles );
	const shaders = ordered.map( ( file ) => batch.get( file ) );

	const replaced = code.replace( PLACEHOLDER_PATTERN, ( _, index: string ) => {

		return `__orShaders[${ordered.indexOf( files[ Number( index ) ] )}]`;

	} );

	// rollup が引用符を変えて出力した等で置き換え損ねると、シェーダーの代わりにプレースホルダーが実行時に渡ってしまう
	if ( replaced.includes( '__OR_SHADER_' ) ) {

		throw new Error( 'ShaderBuilder: シェーダーのプレースホルダーを置き換えられませんでした' );

	}

	return `const __orShaders = ${JSON.stringify( shaders )};\n${replaced}`;

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

	// 全シェーダーを一括minifyした結果（絶対パス→minify済みコード）。楽器だけは別の回で minify する（runBatchMinify）
	let batchPromise: Promise<Map<string, string>> | null = null;

	const runBatchMinify = async ( warn: ( msg: string ) => void ) => {

		// module/partは実行時に単体で使われることはなく、include解決で各シェーダーに焼き込まれる
		const targetFiles = collectShaderFiles( options.scanDirs )
			.filter( ( f ) => ! f.endsWith( '.part.glsl' ) && ! f.endsWith( '.module.glsl' ) );

		const sources = new Map<string, string>();

		for ( const file of targetFiles ) {

			sources.set( file, await composeShader( await fs.promises.readFile( file, 'utf-8' ), file ) );

		}

		const finish = async ( result: Map<string, string> ) => {

			try {

				await dumpBatchResult( result );

			} catch { /* ダンプ失敗はminify結果に影響させない */ }

			return result;

		};

		const rawFallback = () => finish( new Map( sources ) );

		if ( targetFiles.length === 0 ) return rawFallback();

		// 楽器は別の回で minify する。minifier は1回の中で struct の型名を全ファイル通しで割り当てるので、
		// 楽器を同じ回に入れると、楽器を足しただけでほかのシェーダーの型名が変わり、Music を置かないシーンの packed まで変わる
		const instrumentFiles: string[] = [];
		const otherFiles: string[] = [];

		for ( const file of targetFiles ) {

			if ( INSTRUMENT_SHADER.test( file ) ) {

				instrumentFiles.push( file );

			} else {

				otherFiles.push( file );

			}

		}

		const result = new Map<string, string>();

		const groups: { name: string, files: string[], keepNames: string[] }[] = [
			{ name: 'shaders', files: otherFiles, keepNames: [] },
			{ name: 'instruments', files: instrumentFiles, keepNames: INSTRUMENT_FUNCTIONS },
		];

		for ( const group of groups ) {

			if ( group.files.length === 0 ) continue;

			const groupResult = await minifyFiles( group.name, group.files, sources, group.keepNames, warn );

			if ( ! groupResult ) return rawFallback();

			for ( const [ file, code ] of groupResult ) {

				result.set( file, code );

			}

		}

		return finish( result );

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

			// 楽器は別の回で minify する（runBatchMinify）ので、楽器を保存してもほかのシェーダーの minify 結果は変わらない。
			// 保存した楽器のモジュールだけを更新に含め、自分で差し替わらせる（instrumentHotCode）。
			// ほかのシェーダーのモジュールまで含めると、HMR を受けないモジュール（Material 等）があるためページ全体の読み直しになる
			if ( INSTRUMENT_SHADER.test( ctx.file ) ) return ctx.modules;

			const modules = new Set( ctx.modules );

			for ( const mod of ctx.server.moduleGraph.idToModuleMap.values() ) {

				if ( mod.file && isShaderFile( mod.file ) ) modules.add( mod );

			}

			return [ ...modules ];

		},

		async renderChunk( code ) {

			if ( ! options.groupShaders || ! batchPromise ) return null;

			const grouped = groupShadersInChunk( code, await batchPromise );

			if ( grouped === null ) return null;

			return { code: grouped, map: null };

		},

		async transform( code: string, id: string ) {

			if ( ! filter( id ) ) return;

			const filePath = id.split( '?' )[ 0 ];

			// player ビルドには HMR が無いので、楽器の差し替えのコードを足さない
			let hotCode = '';

			if ( ! options.groupShaders ) {

				hotCode = instrumentHotCode( filePath );

			}

			if ( skip ) {

				return {
					code: `export default ${JSON.stringify( await composeShader( code, filePath ) )};${hotCode}`,
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
					code: `export default ${JSON.stringify( await composeShader( code, filePath ) )};${hotCode}`,
					map: { mappings: '' }
				};

			}

			if ( options.groupShaders ) {

				const placeholder = shaderPlaceholder( [ ...batch.keys() ].indexOf( filePath ) );

				return {
					code: `export default ${JSON.stringify( placeholder )};`,
					map: { mappings: '' }
				};

			}

			return {
				code: `export default ${JSON.stringify( minified )};${hotCode}`,
				map: { mappings: '' }
			};

		}
	};

};
