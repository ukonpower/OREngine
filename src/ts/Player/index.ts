import * as GLP from 'glpower';
import { Engine } from 'orengine';

import SceneData from '../../../data/scene.json';
import { initResouces } from '../Resources';

import { gl } from '~/ts/Globals';

/*-------------------------------
	Resources
-------------------------------*/

initResouces();

/*-------------------------------
	HTML
-------------------------------*/

const opacity0 = "opacity:0;";
const pointerEventsNone = "pointer-events:none;";
const positionAbsolute = "position:absolute;";
const full = positionAbsolute + "width:100%;height:100%;";
const fullFlexCenter = full + "display:flex;justify-content:center;align-items:center;";

document.body.innerHTML = `
	<style>
		*{color:#fff;font-size:13px;text-align:center;}
		body{margin:0;font-family:sans-serif;}
		button{display:block;width:200px;margin:0 auto 10px auto;padding:10px;border:1px solid #fff;background:none;cursor:pointer;}
		#r{${fullFlexCenter}overflow:hidden;background:#000;}
		#cw{${pointerEventsNone}${fullFlexCenter}${opacity0}}
		canvas{${full}object-fit:contain;}
		#l{${pointerEventsNone}${positionAbsolute}width:100%;}
		#b{width:100%;height:1px;background:#fff;margin-bottom:10px;}
		#m{${pointerEventsNone}${opacity0}}
		#e{${fullFlexCenter}${opacity0}${pointerEventsNone}}
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

/*-------------------------------
	DOM
-------------------------------*/

const rootElm = document.getElementById( 'r' )!;
const screenWrapElm = document.getElementById( 'cw' )!;
const menuElm = document.getElementById( 'm' )!;
const loadingElm = document.getElementById( 'l' )!;
const exitElm = document.getElementById( 'e' )!;

/*-------------------------------
	Engine
-------------------------------*/

const engine = new Engine( gl );
engine.setSize( new GLP.Vector( 1920, 1080 ) );

// canvas

if ( engine.canvas instanceof HTMLCanvasElement ) {

	screenWrapElm.appendChild( engine.canvas );

}

/*-------------------------------
	Full Screen
-------------------------------*/

const fullScreen = document.getElementById( 'fl' ) as HTMLButtonElement;
fullScreen.onclick = () => {

	const elem = document.documentElement;
	if ( elem.requestFullscreen ) {

		elem.requestFullscreen();

	}

};

/*-------------------------------
	Play
-------------------------------*/

const playButton = document.getElementById( 'pl' ) as HTMLButtonElement;
playButton.disabled = true;
playButton.onclick = () => {

	menuElm.style.opacity = "0";
	menuElm.style.pointerEvents = "none";
	screenWrapElm.style.opacity = '1';
	rootElm.style.cursor = 'none';
	engine.play();


	// アニメーション関数
	function animate() {

		engine.update();

		if ( engine.frame.current > engine._frameSetting.duration ) {

			exitElm.style.opacity = '1';
			return;

		}

		window.requestAnimationFrame( animate );

	}

	animate();

};


/*-------------------------------
	Load
-------------------------------*/

engine.on( 'loaded', () => {

	loadingElm.style.opacity = "0";
	menuElm.style.opacity = "1";
	menuElm.style.pointerEvents = "auto";
	playButton.disabled = false;

} );

engine.load( SceneData );
