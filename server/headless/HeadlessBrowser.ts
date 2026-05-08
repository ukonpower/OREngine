export interface HeadlessBrowserOptions {
	url: string;
	idleTimeoutMs?: number;
	launchTimeoutMs?: number;
}

// Playwright ヘッドレス Chromium を遅延起動して、エディタ ws の primary client として動作させる。
// idle 時間を超えたら自動で close する。
export class HeadlessBrowser {

	private _opts: HeadlessBrowserOptions;
	private _browser: { close: () => Promise<void> } | null = null;
	private _starting: Promise<void> | null = null;
	private _idleTimer: NodeJS.Timeout | null = null;
	private _idleMs: number;

	constructor( opts: HeadlessBrowserOptions ) {

		this._opts = opts;
		this._idleMs = opts.idleTimeoutMs ?? 5 * 60 * 1000;

	}

	public get isRunning(): boolean {

		return !! this._browser;

	}

	public async ensureStarted(): Promise<void> {

		if ( this._browser ) {

			this._touchIdle();
			return;

		}

		if ( ! this._starting ) this._starting = this._start();

		try {

			await this._starting;

		} finally {

			this._starting = null;

		}

		this._touchIdle();

	}

	public touch(): void {

		if ( this._browser ) this._touchIdle();

	}

	public async close(): Promise<void> {

		if ( this._idleTimer ) {

			clearTimeout( this._idleTimer );
			this._idleTimer = null;

		}

		const browser = this._browser;
		this._browser = null;

		if ( browser ) {

			try {

				await browser.close();

			} catch { /* swallow */ }

		}

	}

	private async _start(): Promise<void> {

		let chromium: any;

		try {

			( { chromium } = await import( 'playwright' as string ) );

		} catch ( err: any ) {

			throw new Error( `Headless fallback requires "playwright" devDependency: ${err?.message || err}` );

		}

		const browser = await chromium.launch( {
			headless: true,
			args: [ '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist' ],
		} );

		const context = await browser.newContext( { viewport: { width: 1280, height: 720 } } );
		const page = await context.newPage();

		page.on( 'console', ( msg: { type: () => string; text: () => string } ) => {

			if ( msg.type() === 'error' ) {

				console.warn( `[headless] ${msg.text()}` );

			}

		} );

		await page.goto( this._opts.url, { waitUntil: 'load', timeout: this._opts.launchTimeoutMs ?? 30000 } );

		this._browser = browser;

	}

	private _touchIdle(): void {

		if ( this._idleTimer ) clearTimeout( this._idleTimer );

		this._idleTimer = setTimeout( () => {

			this.close().catch( () => { /* swallow */ } );

		}, this._idleMs );

	}

}
