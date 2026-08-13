import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join( path.dirname( fileURLToPath( import.meta.url ) ), '../..' );
const staticDir = path.join( rootDir, 'storybook-static' );

// ポートの決定権は playwright.config.ts 側にあり、webServer の env で渡される
const port = Number( process.env.VRT_PORT ) || 6007;

const mimeTypes: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.ttf': 'font/ttf',
	'.wasm': 'application/wasm',
	'.map': 'application/json; charset=utf-8',
};

// storybook-static をそのまま配る。ビルド済みの静的ファイル専用なので書き込み系は扱わない
const server = http.createServer( ( req, res ) => {

	const requestPath = decodeURIComponent( ( req.url || '/' ).split( '?' )[ 0 ] );
	const filePath = path.join( staticDir, requestPath === '/' ? 'index.html' : requestPath );

	// staticDir の外へ抜ける参照を弾く
	if ( ! filePath.startsWith( staticDir ) ) {

		res.writeHead( 403 ).end( 'Forbidden' );

		return;

	}

	fs.readFile( filePath, ( err, data ) => {

		if ( err ) {

			res.writeHead( 404 ).end( 'Not Found' );

			return;

		}

		res.writeHead( 200, { 'Content-Type': mimeTypes[ path.extname( filePath ) ] || 'application/octet-stream' } );
		res.end( data );

	} );

} );

if ( ! fs.existsSync( staticDir ) ) {

	throw new Error( `storybook-static が見つかりません。先に npm run build-storybook を実行してください: ${staticDir}` );

}

server.listen( port, '127.0.0.1' );
