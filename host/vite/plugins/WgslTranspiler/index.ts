import { Plugin } from 'vite';

import { transpile } from './transpile.mjs';

import type { IncomingMessage } from 'http';

// リクエストボディを読み切る
const readBody = ( req: IncomingMessage ) => new Promise<string>( ( resolve, reject ) => {

	let body = '';

	req.on( 'data', ( chunk ) => body += chunk );
	req.on( 'end', () => resolve( body ) );
	req.on( 'error', reject );

} );

/*-------------------------------
	プラグイン本体
-------------------------------*/

// devサーバーに GLSL→WGSL のオンデマンド変換エンドポイント POST /__orengine/wgsl を生やす。
// WebGPUバックエンドは defines やライト数が実行時に決まるため、ビルド時に変換バリアントを列挙できない
export const WgslTranspiler = (): Plugin => ( {
	name: 'wgsl-transpiler',

	configureServer( server ) {

		server.middlewares.use( '/__orengine/wgsl', async ( req, res ) => {

			const send = ( status: number, body: unknown ) => {

				res.statusCode = status;
				res.setHeader( 'Content-Type', 'application/json' );
				res.end( JSON.stringify( body ) );

			};

			if ( req.method !== 'POST' ) {

				send( 405, { error: 'POST のみ受け付けます' } );

				return;

			}

			try {

				const { source, stage } = JSON.parse( await readBody( req ) );
				const result = await transpile( source, stage );

				send( result.error ? 400 : 200, result );

			} catch ( e ) {

				send( 400, { error: e instanceof Error ? e.message : String( e ) } );

			}

		} );

	},
} );
