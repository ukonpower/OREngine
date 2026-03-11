export type CapturedLog = {
	type: 'error' | 'warn' | 'uncaughtError' | 'unhandledRejection';
	message: string;
	timestamp: number;
	stack?: string;
};

const MAX_ENTRIES = 100;

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

}

export function clearCapturedLogs(): void {

	capturedLogs.length = 0;

}
