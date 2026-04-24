export type CapturedLog = {
	type: 'error' | 'warn' | 'log' | 'info' | 'uncaughtError' | 'unhandledRejection';
	message: string;
	timestamp: number;
	stack?: string;
};

const MAX_ENTRIES = 500;

export const capturedLogs: CapturedLog[] = [];

let initialized = false;

function argsToString( args: any[] ): string {

	return args.map( ( arg ) => {

		if ( typeof arg === 'string' ) return arg;

		try {

			return JSON.stringify( arg );

		} catch {

			return String( arg );

		}

	} ).join( ' ' );

}

function pushLog( log: CapturedLog ): void {

	capturedLogs.push( log );

	if ( capturedLogs.length > MAX_ENTRIES ) capturedLogs.shift();

}

export function initConsoleCapture(): void {

	if ( initialized ) return;

	initialized = true;

	const origError = console.error;

	console.error = function ( ...args: any[] ) {

		pushLog( { type: 'error', message: argsToString( args ), timestamp: Date.now() } );
		origError.apply( console, args );

	};

	const origWarn = console.warn;

	console.warn = function ( ...args: any[] ) {

		pushLog( { type: 'warn', message: argsToString( args ), timestamp: Date.now() } );
		origWarn.apply( console, args );

	};

	const origLog = console.log;

	console.log = function ( ...args: any[] ) {

		pushLog( { type: 'log', message: argsToString( args ), timestamp: Date.now() } );
		origLog.apply( console, args );

	};

	const origInfo = console.info;

	console.info = function ( ...args: any[] ) {

		pushLog( { type: 'info', message: argsToString( args ), timestamp: Date.now() } );
		origInfo.apply( console, args );

	};

	window.onerror = ( message, _source, _lineno, _colno, error ) => {

		pushLog( {
			type: 'uncaughtError',
			message: String( message ),
			timestamp: Date.now(),
			stack: error?.stack,
		} );

		return false;

	};

	window.addEventListener( 'unhandledrejection', ( event ) => {

		const reason = event.reason;
		const message = reason instanceof Error ? reason.message : String( reason );
		const stack = reason instanceof Error ? reason.stack : undefined;

		pushLog( {
			type: 'unhandledRejection',
			message,
			timestamp: Date.now(),
			stack,
		} );

	} );

	const origFetch = window.fetch;

	window.fetch = async function ( ...args: Parameters<typeof fetch> ) {

		try {

			const response = await origFetch.apply( window, args );

			if ( ! response.ok ) {

				pushLog( {
					type: 'warn',
					message: `[fetch] ${response.status} ${response.statusText} - ${args[ 0 ]}`,
					timestamp: Date.now(),
				} );

			}

			return response;

		} catch ( e: any ) {

			pushLog( {
				type: 'error',
				message: `[fetch] Network error - ${args[ 0 ]}: ${e.message}`,
				timestamp: Date.now(),
			} );

			throw e;

		}

	};

}

export function clearCapturedLogs(): void {

	capturedLogs.length = 0;

}
