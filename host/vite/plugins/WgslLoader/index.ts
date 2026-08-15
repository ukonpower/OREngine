import fs from 'fs';
import path from 'path';

import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';

/*-------------------------------
	.wgsl ローダー

	WGSLは shader_minifier（GLSL専用）を通せないため、GLSL側の ShaderBuilder とは別系統。
	やることは #include の展開と文字列としてのexportだけ。

	include は2形式:
	- `#include "./相対パス.wgsl"` … 近くのファイルへ分割する用
	- `#include <module:名前>`     … moduleDirs に登録したディレクトリの `名前.wgsl`（共有モジュール用）
-------------------------------*/

const INCLUDE_PATTERN = /^[ \t]*#include[ \t]+(?:"([^"]+)"|<module:(\w+)>)[ \t]*$/gm;

// <module:名前> を登録ディレクトリから探す（先勝ち）。見つからなければビルドエラー
const resolveModule = ( name: string, moduleDirs: string[], from: string ) => {

	for ( const dir of moduleDirs ) {

		const file = path.join( dir, `${name}.wgsl` );

		if ( fs.existsSync( file ) ) return file;

	}

	throw new Error( `WgslLoader: モジュールが見つかりません: <module:${name}> (${from}) 検索先: ${moduleDirs.join( ', ' )}` );

};

// #include を再帰的に展開する。同じファイルは最初の1回だけ差し込む（二重定義よけ）
const inlineIncludes = async ( file: string, code: string, moduleDirs: string[], included: Set<string>, onDep: ( dep: string ) => void ) => {

	const matches = [ ...code.matchAll( INCLUDE_PATTERN ) ];

	if ( matches.length === 0 ) return code;

	const contents = new Map<string, string>();

	for ( const match of matches ) {

		const dep = match[ 1 ]
			? path.resolve( path.dirname( file ), match[ 1 ] )
			: resolveModule( match[ 2 ], moduleDirs, file );

		onDep( dep );

		if ( included.has( dep ) ) {

			contents.set( match[ 0 ], '' );
			continue;

		}

		included.add( dep );

		let source: string;

		try {

			source = await fs.promises.readFile( dep, 'utf-8' );

		} catch {

			throw new Error( `WgslLoader: include先が見つかりません: ${dep} (${file})` );

		}

		contents.set( match[ 0 ], await inlineIncludes( dep, source, moduleDirs, included, onDep ) );

	}

	return code.replace( INCLUDE_PATTERN, ( line ) => contents.get( line ) ?? '' );

};

export interface WgslLoaderOptions {
	moduleDirs: string[];
}

export const WgslLoader = ( options: WgslLoaderOptions ): Plugin => {

	const filter = createFilter( [ '**/*.wgsl' ] );

	// include先 → それを取り込んでいるファイル。include先の変更で親を作り直すために持つ
	const importers = new Map<string, Set<string>>();

	// 変更されたファイルを取り込んでいる .wgsl を推移的に集める
	const collectImporters = ( file: string, result = new Set<string>() ) => {

		for ( const parent of importers.get( file ) ?? [] ) {

			if ( result.has( parent ) ) continue;

			result.add( parent );
			collectImporters( parent, result );

		}

		return result;

	};

	return {
		name: 'wgsl-loader',
		enforce: 'pre',

		handleHotUpdate( ctx ) {

			if ( ! ctx.file.endsWith( '.wgsl' ) ) return;

			const modules = new Set( ctx.modules );

			for ( const parent of collectImporters( ctx.file ) ) {

				for ( const mod of ctx.server.moduleGraph.getModulesByFile( parent ) ?? [] ) {

					modules.add( mod );

				}

			}

			return [ ...modules ];

		},

		async transform( code: string, id: string ) {

			if ( ! filter( id ) ) return;

			const filePath = id.split( '?' )[ 0 ];

			const source = await inlineIncludes( filePath, code, options.moduleDirs, new Set( [ filePath ] ), ( dep ) => {

				this.addWatchFile( dep );

				let parents = importers.get( dep );

				if ( ! parents ) {

					parents = new Set();
					importers.set( dep, parents );

				}

				parents.add( filePath );

			} );

			return {
				code: `export default ${JSON.stringify( source )};`,
				map: { mappings: '' }
			};

		}
	};

};
