import * as GLP from 'glpower';

import SceneData from '../../../../data/player.json';
import { canvas } from '../GLGlobals';
import { ProjectScene } from '../ProjectScene';

class App {

	// elms

	private startElm: HTMLElement;
	private rootElm: HTMLElement;
	private canvasWrapElm: HTMLElement;
	private canvas: HTMLCanvasElement;

	private scene: ProjectScene;

	constructor() {

		/*-------------------------------
			Element
		-------------------------------*/

		document.body.innerHTML = `
			<style>
				body{margin:0;}
				button{display:block;width:200px;margin:0 auto 10px auto;padding:10px;border:1px solid #fff;background:none;color:#fff;cursor:pointer;}
				canvas{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
				.r{width:100%;height:100%;position:relative;overflow:hidden;display:flex;background:#000;}
				.cw{position:relative;flex:1 1 100%;display:none;}
				.s{width:100vw;height:100vh;display:flex;flex-direction:column;justify-content:center;}
			</style>
		`;

		document.title = "OREngine";

		this.rootElm = document.createElement( 'div' );
		this.rootElm.classList.add( 'r' );
		document.body.appendChild( this.rootElm );

		/*-------------------------------
			Canvas
		-------------------------------*/

		this.canvasWrapElm = document.createElement( 'div' );
		this.canvasWrapElm.classList.add( 'cw' );
		this.rootElm.appendChild( this.canvasWrapElm );

		this.canvas = canvas;
		this.canvasWrapElm.appendChild( this.canvas );

		/*-------------------------------
			StartElm
		-------------------------------*/

		this.startElm = document.createElement( 'div' );
		this.startElm.classList.add( "s" );
		this.rootElm.appendChild( this.startElm );

		// fullscreen

		const fullScreen = document.createElement( 'button' );
		fullScreen.innerText = '1. Full Screen';
		fullScreen.onclick = () => {

			const elem = document.documentElement;

			if ( elem.requestFullscreen ) {

				elem.requestFullscreen();

			}

		};

		this.startElm.appendChild( fullScreen );

		// play button

		const playButton = document.createElement( 'button' );
		playButton.innerText = 'ready...';
		playButton.disabled = true;
		playButton.onclick = this.play.bind( this );
		this.startElm.appendChild( playButton );

		/*-------------------------------
			Scene
		-------------------------------*/

		this.scene = new ProjectScene();

		this.scene.on( "loaded", () => {

			this.resize();

			this.scene.update( { forceDraw: true } );

			playButton.innerText = '2. Play!';
			playButton.disabled = false;

		} );

		this.scene.init( SceneData );

		this.resize();

		/*-------------------------------
			Event
		-------------------------------*/

		window.addEventListener( 'resize', this.resize.bind( this ) );

		this.resize();

	}

	private play() {

		this.startElm.style.display = "none";
		this.canvasWrapElm.style.display = 'block';
		this.canvasWrapElm.style.cursor = 'none';

		this.scene.play();

		this.resize();
		this.animate();

	}

	private animate() {

		this.scene.update();

		// loop --------------------

		if ( this.scene.frame.playing ) {

			if ( this.scene.frame.current > this.scene.frameSetting.duration ) {

				this.scene.frame.current = 0;

			}

		}

		// -------------------------

		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		const aspect = 16 / 7;
		const scale = 1.0;

		this.canvas.width = 1920 * scale;
		this.canvas.height = this.canvas.width / aspect;

		if ( window.innerWidth / window.innerHeight < aspect ) {

			this.canvas.style.width = window.innerWidth + 'px';
			this.canvas.style.height = window.innerWidth / aspect + 'px';

		} else {

			this.canvas.style.height = window.innerHeight + 'px';
			this.canvas.style.width = window.innerHeight * aspect + 'px';

		}

		this.scene.resize( new GLP.Vector( this.canvas.width, this.canvas.height ) );

	}

}

new App();
