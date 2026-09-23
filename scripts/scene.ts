import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { AGENT_ENDPOINT } from '../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

import type { AgentHttpRequest, AgentOptions, AgentResult } from '../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

// dev サーバー（host/vite/plugins/AgentBridge）経由で、開いているエディタタブにコマンドを実行させる CLI
//   npx tsx <orengine>/scripts/scene.ts <command> [args...] [--timeout <ms>] [--url <devServerUrl>]
// 外部プロジェクト（submodule で OREngine を取り込む構成）からも同じ形で呼べるよう、npm scripts ではなく直接実行を正式な呼び方にしている

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );

// AgentBridge プラグインが書き出す情報ファイル（host/vite/configs.ts の infoFile と一致させる）
const INFO_FILE = path.join( repoRoot, 'tmp/dev-server.json' );

// サーバーのタイムアウトに対し、HTTP の応答が返ってくるまで余分に待つ時間
const CLIENT_TIMEOUT_MARGIN_MS = 5000;

type CommandSpec = {
	usage: string;
	description: string;
	timeoutMs: number;
};

const COMMANDS: { [ name: string ]: CommandSpec } = {
	status: { usage: 'status', description: '接続先のタブ・シーン名・未保存の変更の有無', timeoutMs: 5000 },
	tree: { usage: 'tree', description: '展開後の全エンティティ（ワールド座標・前方ベクトル・境界ボックス・コンポーネント）', timeoutMs: 10000 },
	get: { usage: 'get <entity>', description: '1エンティティのフィールドと全コンポーネントのフィールド値（<entity> は uuid か root/... の名前パス）', timeoutMs: 10000 },
	// 全コンポーネントを一度ずつ生成してフィールド定義を読むので他より長く待つ
	components: { usage: 'components', description: '登録済みコンポーネントの一覧とフィールド定義', timeoutMs: 30000 },
	errors: { usage: 'errors', description: 'シェーダーエラー・GPU エラー・コンソールのエラー・解決できなかったコンポーネント', timeoutMs: 5000 },
};

class CliError extends Error {}

/*-------------------------------
	Args
-------------------------------*/

// `--key value` / `--flag` を options に、それ以外を位置引数に分ける
const parseArgs = ( argv: string[] ) => {

	const args: string[] = [];
	const options: AgentOptions = {};

	for ( let i = 0; i < argv.length; i ++ ) {

		const arg = argv[ i ];

		if ( ! arg.startsWith( '--' ) ) {

			args.push( arg );
			continue;

		}

		const key = arg.slice( 2 );
		const next = argv[ i + 1 ];

		if ( next === undefined || next.startsWith( '--' ) ) {

			options[ key ] = true;

		} else {

			options[ key ] = next;
			i ++;

		}

	}

	return { args, options };

};

const usageText = () => {

	const lines = [ 'Usage: npx tsx <orengine>/scripts/scene.ts <command> [args...] [--timeout <ms>] [--url <devServerUrl>]', '', 'Commands:' ];

	for ( const spec of Object.values( COMMANDS ) ) {

		lines.push( `  ${spec.usage.padEnd( 16 )} ${spec.description}` );

	}

	return lines.join( '\n' );

};

/*-------------------------------
	Dev server
-------------------------------*/

// --url > ORENGINE_DEV_URL > 起動中の dev サーバーが書き出した情報ファイル
const resolveDevServerUrl = ( options: AgentOptions ) => {

	if ( typeof options.url === 'string' ) return options.url;

	if ( process.env.ORENGINE_DEV_URL ) return process.env.ORENGINE_DEV_URL;

	if ( ! fs.existsSync( INFO_FILE ) ) {

		throw new CliError( 'dev サーバーが起動していません（npm run dev / npm run wgpu で起動してください）' );

	}

	const info = JSON.parse( fs.readFileSync( INFO_FILE, 'utf-8' ) ) as { url: string };

	return info.url;

};

type HttpResponse = { status: number; body: string };

// webgpu の dev サーバーは自己署名証明書の HTTPS なので、証明書の検証をしない
const post = ( url: URL, body: string, timeoutMs: number ) => new Promise<HttpResponse>( ( resolve, reject ) => {

	let client: typeof http | typeof https = http;

	if ( url.protocol === 'https:' ) {

		client = https;

	}

	const req = client.request( url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength( body ) },
		rejectUnauthorized: false,
		timeout: timeoutMs,
	}, ( res ) => {

		const chunks: Buffer[] = [];

		res.on( 'data', ( chunk: Buffer ) => chunks.push( chunk ) );
		res.on( 'end', () => resolve( { status: res.statusCode ?? 0, body: Buffer.concat( chunks ).toString( 'utf-8' ) } ) );
		res.on( 'error', reject );

	} );

	req.on( 'timeout', () => {

		req.destroy( new CliError( `dev サーバーが ${timeoutMs}ms 以内に応答しませんでした` ) );

	} );

	req.on( 'error', reject );
	req.end( body );

} );

/*-------------------------------
	Main
-------------------------------*/

const main = async () => {

	const [ command, ...rest ] = process.argv.slice( 2 );

	if ( ! command || command === 'help' || command === '--help' ) {

		console.log( usageText() );
		return;

	}

	const spec = COMMANDS[ command ];

	if ( ! spec ) {

		throw new CliError( `不明なコマンドです: ${command}\n\n${usageText()}` );

	}

	const { args, options } = parseArgs( rest );

	let timeoutMs = spec.timeoutMs;

	if ( typeof options.timeout === 'string' ) {

		timeoutMs = Number( options.timeout );

		if ( ! Number.isFinite( timeoutMs ) || timeoutMs <= 0 ) {

			throw new CliError( `--timeout はミリ秒の正の数で指定してください: ${options.timeout}` );

		}

	}

	// CLI 自身のオプションはタブへ渡さない
	delete options.timeout;
	const baseUrl = resolveDevServerUrl( options );
	delete options.url;

	const request: AgentHttpRequest = { args, options, timeoutMs };
	const url = new URL( `${AGENT_ENDPOINT}/${command}`, baseUrl );

	let response: HttpResponse;

	try {

		response = await post( url, JSON.stringify( request ), timeoutMs + CLIENT_TIMEOUT_MARGIN_MS );

	} catch ( e ) {

		if ( e instanceof CliError ) throw e;

		const code = ( e as NodeJS.ErrnoException ).code;

		if ( code === 'ECONNREFUSED' || code === 'ECONNRESET' ) {

			throw new CliError( `dev サーバーに接続できません（${baseUrl}）。起動していないか、前回の停止時の情報が残っています（npm run dev / npm run wgpu で起動してください）` );

		}

		throw e;

	}

	let result: AgentResult;

	try {

		result = JSON.parse( response.body ) as AgentResult;

	} catch {

		throw new CliError( `dev サーバーの応答を JSON として読めません（HTTP ${response.status}）。AgentBridge を含まない古い dev サーバーかもしれません。再起動してください\n${response.body.slice( 0, 500 )}` );

	}

	if ( ! result.ok ) {

		const lines = [ result.error ];

		if ( result.candidates !== undefined ) {

			lines.push( 'candidates:', JSON.stringify( result.candidates, null, 2 ) );

		}

		throw new CliError( lines.join( '\n' ) );

	}

	// process.exit を呼ばずに終わらせる（大きな出力がパイプに書き切られる前に切れないように）
	process.stdout.write( JSON.stringify( result.result, null, 2 ) + '\n' );

};

main().catch( ( e ) => {

	if ( e instanceof CliError ) {

		console.error( `[scene] ${e.message}` );

	} else {

		console.error( e );

	}

	process.exitCode = 1;

} );
