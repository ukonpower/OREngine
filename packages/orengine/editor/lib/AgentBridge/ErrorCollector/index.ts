export type CollectedError = {
	time: string;
	source: 'console' | 'uncaught';
	message: string;
};

// 古いものから捨てる。エラーが毎フレーム出続けても直近の様子が分かる程度の件数
const MAX_ENTRIES = 200;

const entries: CollectedError[] = [];

let installed = false;

// console.error の引数を1行の文字列にまとめる
const formatArg = ( arg: unknown ) => {

	if ( arg instanceof Error ) {

		return arg.stack ?? `${arg.name}: ${arg.message}`;

	}

	if ( typeof arg === 'string' ) {

		return arg;

	}

	try {

		return JSON.stringify( arg );

	} catch {

		return String( arg );

	}

};

const push = ( source: CollectedError[ 'source' ], message: string ) => {

	entries.push( { time: new Date().toISOString(), source, message } );

	if ( entries.length > MAX_ENTRIES ) {

		entries.splice( 0, entries.length - MAX_ENTRIES );

	}

};

// console.error と未捕捉の例外をリングバッファに溜め始める。何度呼んでも1回だけ仕込む
export const installErrorCollector = () => {

	if ( installed ) return;

	installed = true;

	const original = console.error.bind( console );

	console.error = ( ...args: unknown[] ) => {

		push( 'console', args.map( formatArg ).join( ' ' ) );

		original( ...args );

	};

	window.addEventListener( 'error', ( e ) => {

		push( 'uncaught', e.error ? formatArg( e.error ) : e.message );

	} );

	window.addEventListener( 'unhandledrejection', ( e ) => {

		push( 'uncaught', formatArg( e.reason ) );

	} );

};

export const getCollectedErrors = (): readonly CollectedError[] => entries;
