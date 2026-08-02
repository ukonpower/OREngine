import fs from 'fs';
import path from 'path';

import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';

/*-------------------------------
	.wgsl ローダー

	WGSLは shader_minifier（GLSL専用）を通せないため、GLSL側の ShaderBuilder とは別系統。
	やることは #include の展開と文字列としてのexportだけ。

	include は `#include "./相対パス.wgsl"` で書く。GLSL側の `#include<key>` と違い
	キーの登録表を持たないので、共通部分を足すのにローダーを触る必要がない。
-------------------------------*/

const INCLUDE_PATTERN = /^[ \t]*#include[ \t]+"([^"]+)"[ \t]*$/gm;

// #include を再帰的に展開する。同じファイルは最初の1回だけ差し込む（二重定義よけ）
const inlineIncludes = async ( file: string, code: string, included: Set<string>, onDep: ( dep: string ) => void ) => {

	const matches = [ ...code.matchAll( INCLUDE_PATTERN ) ];

	if ( matches.length === 0 ) return code;

	const contents = new Map<string, string>();

	for ( const match of matches ) {

		const dep = path.resolve( path.dirname( file ), match[ 1 ] );

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

			throw new Error( `WgslLoader: include先が見つかりません: ${match[ 1 ]} (${file})` );

		}

		contents.set( match[ 0 ], await inlineIncludes( dep, source, included, onDep ) );

	}

	return code.replace( INCLUDE_PATTERN, ( line ) => contents.get( line ) ?? '' );

};

export const WgslLoader = (): Plugin => {

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

			const source = await inlineIncludes( filePath, code, new Set( [ filePath ] ), ( dep ) => {

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
