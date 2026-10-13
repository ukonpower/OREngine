import { createRenderer } from '@or-renderer';
import * as MTP from 'mathpower';
import { Engine, OREngineProjectData } from 'orengine';


export interface StartPlayerOptions {
	sceneData: OREngineProjectData;
	initResourceInstances: ( engine: Engine ) => void;
	title?: string;
	size?: { width: number; height: number };
	// スタート画面を出さず、コンパイルが終わったら再生を始める（ギャラリー等の埋め込み用）
	autoPlay?: boolean;
	// 終端まで行ったら先頭へ戻って再生を続ける
	loop?: boolean;
}

// スタート画面を出し、シェーダーのコンパイル後に再生ボタンで再生を始める
export const startPlayer = ( opts: StartPlayerOptions ): Engine => {

	// 要素はすべて body の grid の同じセルに重ねて中央に置く（後ろの要素ほど手前に出る）。
	// 表示の切り替えは hidden 属性で行う。packed サイズを抑えるため CSS は最小限にし、空白を入れない
	document.body.innerHTML =
		'<style>' +
		'body{margin:0;height:100vh;display:grid;place-items:center;background:#000;color:#fff;font:13px sans-serif}' +
		'body>*{grid-area:1/1}' +
		'canvas{width:100vw;height:100vh;object-fit:contain}' +
		'button{display:block;width:200px;margin:9px;padding:9px;color:#fff;background:none;border:1px solid}' +
		'#b{width:100vw;height:1px;background:#fff}' +
		'</style>' +
		'<div id=b></div>' +
		'<div id=m hidden><button id=f>Full Screen</button><button id=p>Play</button></div>' +
		'<div id=e hidden>Press Esc to exit</div>';

	document.title = opts.title ?? 'OREngine';

	const menuElm = document.getElementById( 'm' )!;
	const loadingBarElm = document.getElementById( 'b' )!;
	const exitElm = document.getElementById( 'e' )!;

	const engine = new Engine( createRenderer );
	const view = engine.createView();
	opts.initResourceInstances( engine );

	const size = opts.size ?? { width: 1920, height: 1080 };
	engine.setSize( new MTP.Vector( size.width, size.height ) );

	// 終了時の文言より奥に出すため先頭に置く。コンパイル中の描画は見せない
	const canvas = engine.canvas;
	canvas.hidden = true;
	document.body.prepend( canvas );

	document.getElementById( 'f' )!.onclick = () => {

		document.documentElement.requestFullscreen();

	};

	const play = () => {

		menuElm.hidden = true;
		canvas.hidden = false;
		document.body.style.cursor = 'none';
		engine.play();

		function animate() {

			engine.update();
			engine.render( view );

			if ( engine.frame.current > engine.frameSetting.duration ) {

				if ( opts.loop ) {

					engine.seek( 0 );

				} else {

					exitElm.hidden = false;
					return;

				}

			}

			window.requestAnimationFrame( animate );

		}

		animate();

	};

	document.getElementById( 'p' )!.onclick = play;

	engine.load( opts.sceneData );

	const item = Engine.resources.getComponent( 'BLidgeClient' );
	const blidgeClient = item && engine.root.getComponent( item.component );

	const compile = () => {

		engine.compileShaders( view, ( loaded: number, total: number ) => {

			loadingBarElm.style.transform = `scaleX(${loaded / total})`;

		} ).then( () => {

			loadingBarElm.hidden = true;

			if ( opts.autoPlay ) {

				play();
				return;

			}

			menuElm.hidden = false;

		} );

	};

	if ( blidgeClient ) {

		blidgeClient.on( 'loaded', compile );

	} else {

		compile();

	}

	return engine;

};
