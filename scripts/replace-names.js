import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ディレクトリ名を取得
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

// name-cache.jsonのパス
const nameCacheFile = path.resolve( __dirname, '../plugins/MangleManager/name-cache.json' );
// ビルド後のJSファイルのパス
const buildJsFile = path.resolve( __dirname, '../dist/build/index.js' );

// name-cache.jsonを読み込む
const nameCache = JSON.parse( fs.readFileSync( nameCacheFile, 'utf-8' ) );

// ビルド後のJSファイルを読み込む
let jsContent = fs.readFileSync( buildJsFile, 'utf-8' );

// 置換用のマップを作成
const replaceMap = new Map();

// varsのプロパティを処理
if ( nameCache.vars && nameCache.vars.props ) {

	Object.entries( nameCache.vars.props ).forEach( ( [ key, value ] ) => {

		const originalName = key.replace( '$', '' );
		replaceMap.set( originalName, value );

	} );

}

// propsのプロパティを処理
if ( nameCache.props && nameCache.props.props ) {

	Object.entries( nameCache.props.props ).forEach( ( [ key, value ] ) => {

		const originalName = key.replace( '$', '' );
		replaceMap.set( originalName, value );

	} );

}

// 置換を実行
let replacedCount = 0;
replaceMap.forEach( ( shortName, originalName ) => {

	// 変数名として認識されるパターンを置換するための正規表現
	const regex = new RegExp( `\\b${originalName}\\b`, 'g' );
	const beforeCount = jsContent.match( regex )?.length || 0;

	if ( beforeCount > 0 ) {

		jsContent = jsContent.replace( regex, shortName );
		const afterCount = jsContent.match( new RegExp( `\\b${shortName}\\b`, 'g' ) )?.length || 0;
		replacedCount += beforeCount;
		console.log( `置換: ${originalName} -> ${shortName} (${beforeCount}箇所)` );

	}

} );

// 置換結果を保存
fs.writeFileSync( buildJsFile, jsContent );
console.log( `合計 ${replacedCount} 箇所の変数名を置換しました。` );
