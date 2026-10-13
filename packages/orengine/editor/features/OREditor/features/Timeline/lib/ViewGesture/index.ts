// タイムラインの表示を動かす操作。pan は表示を動かす量（px。正で右・下へ）、zoom は表示の範囲にかける倍率（1 より大きいと広がる＝縮小）。
// linked は縦横そろえた拡大縮小（ホイール・ピンチ）か、軸ごとの拡大縮小（Ctrl+2本指）か
export type ViewGesture =
	| { type: "pan", x: number, y: number }
	| { type: "zoom", x: number, y: number, linked: boolean };

// マウスのホイール1段で拡大縮小する倍率
const MOUSE_ZOOM_STEP = 1.1;

// マウスのホイール1段でスクロールする量（px）。Blender の view2d.scroll_* と同じ
const MOUSE_SCROLL_STEP = 40;

// wheelDelta を持たないブラウザで、Windows 等のマウスのホイール1段の量（100 前後）と、トラックパッドの小さな量を分ける境目（px）
const MOUSE_WHEEL_MIN_DELTA = 50;

// Chrome / Safari の wheelDelta の、ホイール1段あたりの量
const WHEEL_DELTA_PER_STEP = 120;

// Chrome / Safari はトラックパッドの wheelDelta を、delta（px）のこの倍数で送ってくる（向きは逆）
const TRACKPAD_WHEEL_DELTA_SCALE = - 3;

// トラックパッドの入力が来てからこの間（ms）は、大きな量が来てもトラックパッドとみなす（勢いよく払ったときと慣性の分）
const TRACKPAD_HOLD_MS = 200;

// トラックパッドの 1px あたりの拡大縮小の効き（指数）
const TRACKPAD_ZOOM_SPEED = 0.005;

// ピンチの量 1 あたりの拡大縮小の効き（指数）
const PINCH_ZOOM_SPEED = 0.01;

// 中ボタンのドラッグ 1px あたりの拡大縮小の効き（指数）
const DRAG_ZOOM_SPEED = 0.005;

// ピンチは ctrlKey 付きの wheel として届くので、Ctrl を実際に押しているかはキーのイベントで別に追う
let controlHeld = false;
let lastTrackpadTime = - Infinity;

// 同じ wheel を子（カーブ表示・キー表示）と親（TimelineControls）がそれぞれ読むので、読み替えた結果を使い回して食い違わないようにする
const gestureCache = new WeakMap<WheelEvent, ViewGesture>();

// 軸ごとの拡大縮小・横スクロールに切り替える修飾キー（Blender の Ctrl）。macOS では Cmd でもよい
// （Ctrl+2本指は macOS のアクセシビリティのズームに取られることがあるため）
export const hasZoomModifier = ( e: { ctrlKey: boolean, metaKey: boolean } ) => {

	return e.ctrlKey || e.metaKey;

};

// Ctrl を押しているかを追い始める。返した関数で止める
export const watchControlKey = () => {

	const onKeyDown = ( e: KeyboardEvent ) => {

		if ( e.key == "Control" ) controlHeld = true;

	};

	const onKeyUp = ( e: KeyboardEvent ) => {

		if ( e.key == "Control" ) controlHeld = false;

	};

	const onBlur = () => {

		controlHeld = false;

	};

	// エディタのショートカットが伝播を止めても拾えるよう capture で受ける
	window.addEventListener( "keydown", onKeyDown, { capture: true } );
	window.addEventListener( "keyup", onKeyUp, { capture: true } );
	window.addEventListener( "blur", onBlur );

	return () => {

		window.removeEventListener( "keydown", onKeyDown, { capture: true } );
		window.removeEventListener( "keyup", onKeyUp, { capture: true } );
		window.removeEventListener( "blur", onBlur );

	};

};

// マウスのホイールの1段か。ブラウザはマウスとトラックパッドを区別して渡さないので、量の出方で見分ける
const isMouseWheel = ( e: WheelEvent ) => {

	if ( e.deltaMode != WheelEvent.DOM_DELTA_PIXEL ) return true;

	if ( e.timeStamp - lastTrackpadTime < TRACKPAD_HOLD_MS ) return false;

	// マウスのホイールは1段ごとに片方の軸だけが動く
	if ( e.deltaX != 0 && e.deltaY != 0 ) return false;

	const delta = e.deltaX + e.deltaY;

	// wheelDelta は標準外のため型に無い
	const legacy = e as WheelEvent & { wheelDeltaX?: number, wheelDeltaY?: number };

	if ( legacy.wheelDeltaX === undefined || legacy.wheelDeltaY === undefined ) {

		return Math.abs( delta ) >= MOUSE_WHEEL_MIN_DELTA;

	}

	// macOS のマウスはスクロールの加速で delta が端数の px になりトラックパッドと見分けられないが、wheelDelta は段数×120 のまま届く
	const wheelDelta = legacy.wheelDeltaX + legacy.wheelDeltaY;

	if ( wheelDelta == delta * TRACKPAD_WHEEL_DELTA_SCALE ) return false;

	return wheelDelta != 0 && wheelDelta % WHEEL_DELTA_PER_STEP == 0;

};

// マウスのホイール: そのままで拡大縮小、Ctrl（Cmd）で横・Shift で縦にスクロール（Blender と同じ）。量は段数によらず1段ぶん
const readMouseWheel = ( e: WheelEvent ): ViewGesture => {

	// macOS は Shift+ホイールを横の量で送ってくるので、動いた方の量を使う
	let delta = e.deltaY;

	if ( delta == 0 ) delta = e.deltaX;

	const scroll = Math.sign( delta ) * MOUSE_SCROLL_STEP;

	if ( hasZoomModifier( e ) ) return { type: "pan", x: scroll, y: 0 };

	if ( e.shiftKey ) return { type: "pan", x: 0, y: scroll };

	// 横に傾けるホイール
	if ( e.deltaY == 0 ) return { type: "pan", x: scroll, y: 0 };

	let factor = MOUSE_ZOOM_STEP;

	if ( e.deltaY < 0 ) factor = 1 / MOUSE_ZOOM_STEP;

	return { type: "zoom", x: factor, y: factor, linked: true };

};

// トラックパッド: 2本指で縦横にパン、ピンチで縦横そろえて拡大縮小、Ctrl（Cmd）+2本指で縦横それぞれを拡大縮小（Blender と同じ）
const readTrackpad = ( e: WheelEvent ): ViewGesture => {

	lastTrackpadTime = e.timeStamp;

	if ( e.ctrlKey && ! controlHeld ) {

		const factor = Math.exp( e.deltaY * PINCH_ZOOM_SPEED );

		return { type: "zoom", x: factor, y: factor, linked: true };

	}

	// 指を左・下へ動かすと拡大する（範囲を狭める）。向きは実機で触って決めたもので、中ボタンのドラッグ（Blender と同じ右・上で拡大）とは逆。
	// ナチュラルスクロールでは指を左へ動かすと deltaX が正、下へ動かすと deltaY が負になる
	if ( hasZoomModifier( e ) ) {

		return {
			type: "zoom",
			x: Math.exp( - e.deltaX * TRACKPAD_ZOOM_SPEED ),
			y: Math.exp( e.deltaY * TRACKPAD_ZOOM_SPEED ),
			linked: false,
		};

	}

	return { type: "pan", x: e.deltaX, y: e.deltaY };

};

// wheel を表示を動かす操作に読み替える
export const readWheelGesture = ( e: WheelEvent ) => {

	const cached = gestureCache.get( e );

	if ( cached ) return cached;

	// keyup を取りこぼしても（ウィンドウの外で離した等）次の wheel で戻す
	if ( ! e.ctrlKey ) controlHeld = false;

	let gesture: ViewGesture;

	// ピンチは ctrlKey 付きの小さな量で来るので、マウスの判定より先に見る
	if ( e.ctrlKey && ! controlHeld ) {

		gesture = readTrackpad( e );

	} else if ( isMouseWheel( e ) ) {

		gesture = readMouseWheel( e );

	} else {

		gesture = readTrackpad( e );

	}

	gestureCache.set( e, gesture );

	return gesture;

};

// 中ボタンのドラッグで拡大縮小するときの、ずれ（px）に対する倍率。右・上へ動かすと拡大する（範囲を狭める）ので、横は -dx、縦は dy を渡す
export const dragZoomFactor = ( delta: number ) => {

	return Math.exp( delta * DRAG_ZOOM_SPEED );

};
