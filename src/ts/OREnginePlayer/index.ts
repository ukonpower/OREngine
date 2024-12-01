import * as GLP from 'glpower';

import SceneData from '../../../data/player.json';
import { screenElm, canvas, renderer } from '../Globals';
import { OREngine } from '../OREngine';

class App {

	// elms

	private menuElm: HTMLElement;
	private rootElm: HTMLElement;
	private screenWrapElm: HTMLElement;
	private screenElm: HTMLElement;
	private exitElm: HTMLElement;
	private canvas: HTMLCanvasElement;

	private engine: OREngine;

	constructor() {

		/*-------------------------------
			Element
		-------------------------------*/

		const pn = "pointer-events:none;";
		const fc = "position:absolute;width:100%;height:100%;display:flex;justify-content:center;align-items:center;";
		const op = "opacity:0;";
		const pa = "position:absolute;";

		document.body.innerHTML = `
			<style>
				*{color:#fff;text-align:center;font-size:13px;}
				body{margin:0;font-family:sans-serif;}
				button{display:block;width:200px;margin:0 auto 10px auto;padding:10px;border:1px solid #fff;background:none;cursor:pointer;}
				#r{${fc}overflow:hidden;background:#000;}
				#cw{${pn}${fc}${op}}
				#l{${pn}${pa}width:100%;}
				#b{width:100%;height:1px;background:#fff;margin-bottom:10px;}
				#m{${pn}${op}}
				#e{${fc}${op}${pn}}
			</style>
			<div id="r">
				<div id="cw">
				</div>
				<div id="m">
					<button id="fl">1. Full Screen</button>
					<button id="pl">2. Play!</button>
				</div>
				<div id="l">
					<div id="b"></div>
					<div id="t"></div>
				</div>
				<div id="e">
				Press Esc to exit.
				</div>
			</div>
		`;

		document.title = "OREngine";

		this.rootElm = document.getElementById( 'r' )!;

		/*-------------------------------
			Canvas
		-------------------------------*/

		this.screenWrapElm = document.getElementById( 'cw' )!;

		this.screenElm = screenElm;
		this.screenWrapElm.appendChild( this.screenElm );

		this.canvas = canvas;

		/*-------------------------------
			StartElm
		-------------------------------*/

		const loadingElm = document.getElementById( 'l' )!;
		const loadingBarElm = document.getElementById( 'b' )!;
		const loadingTextElm = document.getElementById( 't' )!;
		this.menuElm = document.getElementById( 'm' )!;

		// fullscreen

		const fullScreen = document.getElementById( 'fl' ) as HTMLButtonElement;

		fullScreen.onclick = () => {

			const elem = document.documentElement;

			if ( elem.requestFullscreen ) {

				elem.requestFullscreen();

			}

		};

		this.exitElm = document.getElementById( 'e' )!;

		// play button

		const playButton = document.getElementById( 'pl' ) as HTMLButtonElement;
		playButton.disabled = true;
		playButton.onclick = this.play.bind( this );
		this.menuElm.appendChild( playButton );

		/*-------------------------------
			Engine
		-------------------------------*/

		this.engine = new OREngine();

		let shaderTotal = 0.0;
		let musicTotal = 0.0;

		const onLoadProgress = ( label: string ) => {

			const percentage = ( shaderTotal + musicTotal ) / 2.0;

			loadingBarElm.style.transform = `scaleX(${ percentage })`;

			loadingTextElm.textContent = `${label}`;

			if ( percentage == 1.0 ) {

				setTimeout( () => {

					loadingElm.style.opacity = "0";
					this.menuElm.style.opacity = "1";
					this.menuElm.style.pointerEvents = "auto";

				}, 100 );

			}

		};

		onLoadProgress( "" );


		this.engine.on( "update/music", ( buffer: AudioBuffer, freqTex: GLP.GLPowerTexture, domainTex: GLP.GLPowerTexture, progress: [number, number] ) => {

			musicTotal = progress[ 0 ] / progress[ 1 ];

			onLoadProgress( `sound/${progress[ 0 ]}` );

		} );


		this.engine.on( "loaded", () => {

			this.resize();

			setTimeout( () => {

				renderer.noDraw = true;

				this.engine.update( { forceDraw: true } );

				renderer.noDraw = false;

				renderer.compile( ( label, loaded, total ) => {

					shaderTotal = loaded / total;

					onLoadProgress( label );

				} );

			}, 1000 );

			playButton.disabled = false;

		} );

		this.engine.init( SceneData );

		/*-------------------------------
			Event
		-------------------------------*/

		window.addEventListener( 'resize', this.resize.bind( this ) );

		this.resize();

	}

	private play() {

		this.menuElm.style.opacity = "0";
		this.menuElm.style.pointerEvents = "none";

		this.screenWrapElm.style.opacity = '1';
		this.rootElm.style.cursor = 'none';

		this.engine.play();

		this.animate();

		this.resize();

	}

	private animate() {

		this.engine.update();

		if ( this.engine.frame.current > this.engine.frameSetting.duration ) {

			this.exitElm.style.opacity = '1';

			return;

		}

		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		const aspect = 16 / 9;

		// screen size

		if ( window.innerWidth / window.innerHeight < aspect ) {

			this.screenElm.style.width = window.innerWidth + 'px';
			this.screenElm.style.height = window.innerWidth / aspect + 'px';

		} else {

			this.screenElm.style.height = window.innerHeight + 'px';
			this.screenElm.style.width = window.innerHeight * aspect + 'px';

		}

		// canvas size

		this.canvas.width = 1920;
		this.canvas.height = this.canvas.width / aspect;

		this.engine.resize( new GLP.Vector( this.canvas.width, this.canvas.height ) );

	}

}

new App();
