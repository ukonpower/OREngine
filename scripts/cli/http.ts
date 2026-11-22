import http from 'node:http';
import https from 'node:https';

import { AGENT_ENDPOINT, AGENT_TAB_HEADER } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

import { CliError } from './args.ts';

import type { AgentHttpRequest, AgentResult, AgentServerInfo } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

// サーバーのタイムアウト（コマンドの実行＋タブを待つ時間）に対し、HTTP の応答が返ってくるまで余分に待つ時間
const CLIENT_TIMEOUT_MARGIN_MS = 5000;

type HttpResponse = { status: number; body: string; tabId: string | null };

// webgpu の dev サーバーは自己署名証明書の HTTPS なので、証明書の検証をしない
const httpRequest = ( method: 'GET' | 'POST', url: URL, body: string, timeoutMs: number ) => new Promise<HttpResponse>( ( resolve, reject ) => {

	let client: typeof http | typeof https = http;

	if ( url.protocol === 'https:' ) {

		client = https;

	}

	const req = client.request( url, {
		method,
		headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength( body ) },
		rejectUnauthorized: false,
		timeout: timeoutMs,
	}, ( res ) => {

		const chunks: Buffer[] = [];
		let tabId: string | null = null;
		const header = res.headers[ AGENT_TAB_HEADER ];

		if ( typeof header === 'string' ) tabId = header;

		res.on( 'data', ( chunk: Buffer ) => chunks.push( chunk ) );
		res.on( 'end', () => resolve( { status: res.statusCode ?? 0, body: Buffer.concat( chunks ).toString( 'utf-8' ), tabId } ) );
		res.on( 'error', reject );

	} );

	req.on( 'timeout', () => {

		req.destroy( new CliError( `dev サーバー（${url.origin}）が ${timeoutMs}ms 以内に応答しませんでした` ) );

	} );

	req.on( 'error', reject );
	req.end( body );

} );

// 接続できないときの ECONNREFUSED 等を、理由の分かるメッセージに置き換える
const toConnectionError = ( e: unknown, baseUrl: string ) => {

	if ( e instanceof CliError ) return e;

	const code = ( e as NodeJS.ErrnoException ).code;

	if ( code === 'ECONNREFUSED' || code === 'ECONNRESET' ) {

		return new CliError( `dev サーバーに接続できません（${baseUrl}）。止まったか、別のものがそのポートを使っています` );

	}

	return e;

};

export type CommandResponse = { status: number; result: AgentResult; tabId: string | null };

// コマンドを dev サーバーへ送り、応答の JSON を読む
export const sendCommand = async ( baseUrl: string, command: string, request: AgentHttpRequest ): Promise<CommandResponse> => {

	const url = new URL( `${AGENT_ENDPOINT}/${command}`, baseUrl );

	let response: HttpResponse;

	try {

		response = await httpRequest( 'POST', url, JSON.stringify( request ), ( request.timeoutMs ?? 0 ) + ( request.waitMs ?? 0 ) + CLIENT_TIMEOUT_MARGIN_MS );

	} catch ( e ) {

		throw toConnectionError( e, baseUrl );

	}

	try {

		return { status: response.status, result: JSON.parse( response.body ) as AgentResult, tabId: response.tabId };

	} catch {

		throw new CliError( `dev サーバーの応答を JSON として読めません（HTTP ${response.status}）。AgentBridge を含まない古い dev サーバーかもしれません。再起動してください\n${response.body.slice( 0, 500 )}` );

	}

};

// dev サーバーの REST から JSON を読む。見つからない（404）ときは null
export const getJson = async ( baseUrl: string, pathname: string, timeoutMs: number ): Promise<unknown> => {

	let response: HttpResponse;

	try {

		response = await httpRequest( 'GET', new URL( pathname, baseUrl ), '', timeoutMs );

	} catch ( e ) {

		throw toConnectionError( e, baseUrl );

	}

	if ( response.status === 404 ) return null;

	if ( response.status !== 200 ) {

		throw new CliError( `${pathname} が HTTP ${response.status} を返しました: ${response.body.slice( 0, 500 )}` );

	}

	return JSON.parse( response.body );

};

// dev サーバー自身とタブの状態（host/vite/plugins/AgentBridge の GET）
export const fetchServerInfo = async ( baseUrl: string, timeoutMs: number ) => {

	const info = await getJson( baseUrl, AGENT_ENDPOINT, timeoutMs ) as AgentServerInfo | null;

	if ( ! info ) {

		throw new CliError( `${baseUrl} は AgentBridge を含まない古い dev サーバーです。再起動してください` );

	}

	return info;

};
