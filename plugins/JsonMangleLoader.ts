import fs from 'fs';
import path from 'path';

import { Plugin } from 'vite';

export let nameCache: Record<string, any> | undefined = {};

const nameCacheFile = path.resolve( __dirname, 'name-cache.json' );

if ( fs.existsSync( nameCacheFile ) ) {

	nameCache = JSON.parse( fs.readFileSync( nameCacheFile, 'utf-8' ) );

}

/**
 * terserのnameCacheを保存するプラグイン
 * terserがnameCacheを勝手にいじくってくれるのでそれを保存するだけ
 */
export function SaveNameCache(): Plugin {

	return {
		name: 'save-name-cache',
		closeBundle() {

		  fs.writeFileSync( nameCacheFile, JSON.stringify( nameCache, null, 2 ), 'utf-8' );
		  console.log( "TerserのnameCacheを保存しました" );

		}
	};

}


/**
 * 保存されたnameCacheをもとにjson内のプロパティ名を置換してくれる訓
 */
export function MangledJsonLoader(): Plugin {

	return {
		name: 'json-mangle-loader',

		configResolved() {

			// name-cacheファイルを読み込む
			const nameCacheFile = path.resolve( process.cwd(), 'name-cache.json' );
			if ( fs.existsSync( nameCacheFile ) ) {

				nameCache = JSON.parse( fs.readFileSync( nameCacheFile, 'utf-8' ) );

			}

		},

		transform( code: string, id: string ) {

			// .jsonファイルのみを処理
			if ( ! id.endsWith( '.json' ) ) return null;

			try {

				const result = code;

				// propsとvarsの両方のプロパティを処理
				for ( const props of [ nameCache?.props?.props || {}, nameCache?.vars?.props || {} ] ) {

					for ( const [ key, mangled ] of Object.entries( props ) ) {

						// componentsの配列内のnameプロパティの値のみを置換
						const original = key.replace( '$', '' );
						const regex = new RegExp( `("components":\\s*\\[(?:[^\\[\\]]|\\[[^\\[\\]]*\\])*?"name":\\s*)(["'/])${original}\\2`, 'g' );
						// result = result.replace( regex, `$1$2${mangled}$2` );

					}

				}

				return {
					code: result,
					map: null
				};

			} catch ( error ) {

				console.error( 'JSONの置換処理中にエラーが発生しました:', error );
				return null;

			}

		}
	};

}
