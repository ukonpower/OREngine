// ここまで動くまではクリックとみなす距離（px）。Blender の既定のドラッグの閾値と同じ
const DRAG_THRESHOLD = 3;

// 押した瞬間のポインタ。PointerEvent（React のものを含む）をそのまま渡せる
type PointerDragStart = {
	clientX: number;
	clientY: number;
	// マウスでなければ Pointer Lock を取らない（タッチ・ペンでは意味が無い）
	pointerType?: string;
	// 右ボタンのドラッグは右クリックで取り消さない
	button?: number;
};

type PointerDragCallbacks = {
	// 押した位置からのずれ（px）。Pointer Lock 中は画面端で止まらずに積み上がる
	onMove: ( dx: number, dy: number, e: PointerEvent ) => void;
	// 離したとき。SP のスクロール等でブラウザに打ち切られたときは e.type が "pointercancel" になる
	onEnd: ( dragged: boolean, e: PointerEvent ) => void;
	// 押している間の右クリック / Esc / Pointer Lock の外れでの取り消し（Blender と同じ操作）。渡したときだけ取り消しを受け、onEnd は呼ばない
	onCancel?: () => void;
	// 閾値を越えたら Pointer Lock を取り、カーソルを隠して画面端で止まらないようにする。
	// 閾値の後で取るかを決める側は渡さずに、返り値の lock() を呼ぶ
	lock?: boolean;
};

export type PointerDragSession = {
	// Pointer Lock を取る。取れなければ（マウスでない・ブラウザに断られた）今までどおり clientX / Y の差分で動き続ける
	lock: () => void;
};

/*-------------------------------
	Pointer Lock
-------------------------------*/

// 同じ押下を親子の要素がそれぞれ追うことがある（タイムラインの中ボタンは横を親、縦を子が動かす）。
// 要素ごとにロックすると後から取った側に奪われるので、ロックは document の1か所で取り、使っているドラッグの数で外す
type LockUser = {
	// ロックが実際に掛かったか。掛かる前の pointerlockchange（前のドラッグが外したもの）で取り消さないため
	acquired: boolean;
	onLost: () => void;
};

const lockUsers = new Set<LockUser>();

// exitPointerLock は非同期で、外れるまで pointerLockElement が残る。その間に始めたドラッグをロック済みと取り違えないため
let exiting = false;

// 要求の結果を待っているか。親子のドラッグが続けて要求しても重ねて出さない
let requesting = false;

// pointerlockchange の購読は最初にロックを使うときに1度だけ足し、以後は外さない（exiting を外れた時点で戻すため）
let listening = false;

const lockTarget = () => document.documentElement;

const isLocked = () => document.pointerLockElement === lockTarget();

// ロックが掛かった / 外れたことを、使っているドラッグへ知らせる
const onPointerLockChange = () => {

	exiting = false;
	requesting = false;

	if ( isLocked() ) {

		// 要求の結果が届く前にドラッグが終わっていたら、カーソルを隠したままにしない
		if ( lockUsers.size === 0 ) {

			exiting = true;
			document.exitPointerLock();

			return;

		}

		for ( const user of lockUsers ) {

			user.acquired = true;

		}

		return;

	}

	for ( const user of Array.from( lockUsers ) ) {

		if ( user.acquired ) user.onLost();

	}

};

// 断られたとき（ブラウザが対応していない・Esc で外した直後の再要求等）。ドラッグは clientX / Y の差分で続く
const onPointerLockError = () => {

	requesting = false;

};

const acquireLock = ( user: LockUser ) => {

	if ( lockUsers.has( user ) ) return;

	if ( ! listening ) {

		document.addEventListener( "pointerlockchange", onPointerLockChange );
		document.addEventListener( "pointerlockerror", onPointerLockError );
		listening = true;

	}

	lockUsers.add( user );

	if ( isLocked() && ! exiting ) {

		user.acquired = true;

		return;

	}

	if ( requesting ) return;

	requesting = true;

	// Safari は Promise を返さず、断られたときは pointerlockerror だけが届く。断られても clientX / Y のまま続ける
	const result = lockTarget().requestPointerLock() as Promise<void> | undefined;

	if ( result ) result.catch( onPointerLockError );

};

const releaseLock = ( user: LockUser ) => {

	if ( ! lockUsers.delete( user ) ) return;

	if ( lockUsers.size > 0 ) return;

	if ( isLocked() ) {

		exiting = true;
		document.exitPointerLock();

	}

};

/*-------------------------------
	Drag
-------------------------------*/

// ポインタを押してから離すまでを追う。ずれが DRAG_THRESHOLD に届くまでは onMove を呼ばず、クリックとして終える
export const trackPointerDrag = ( start: PointerDragStart, callbacks: PointerDragCallbacks ): PointerDragSession => {

	let dragged = false;
	let ended = false;

	// 押した位置からのずれ。ロック中は clientX / Y が止まるので、差分を自前で積む
	let dx = 0;
	let dy = 0;
	let lastX = start.clientX;
	let lastY = start.clientY;

	const lockUser: LockUser = {
		acquired: false,
		onLost: () => {

			// 取り消しを受けない側は、ロックが外れても clientX / Y の差分で続ける
			if ( callbacks.onCancel ) {

				cancel();

			} else {

				releaseLock( lockUser );

			}

		},
	};

	const lock = () => {

		if ( ended || start.pointerType !== "mouse" ) return;

		acquireLock( lockUser );

	};

	const dispose = () => {

		ended = true;

		window.removeEventListener( "pointermove", onMove );
		window.removeEventListener( "pointerup", onUp );
		window.removeEventListener( "pointercancel", onUp );
		window.removeEventListener( "keydown", onKeyDown, { capture: true } );

		releaseLock( lockUser );

	};

	const cancel = () => {

		dispose();

		if ( callbacks.onCancel ) callbacks.onCancel();

	};

	const onMove = ( e: PointerEvent ) => {

		// 左ボタンを押したままの右ボタンは pointerdown ではなく buttons の変わった pointermove として届く
		if ( callbacks.onCancel && start.button !== 2 && ( e.buttons & 2 ) !== 0 ) {

			e.preventDefault();
			e.stopPropagation();

			cancel();
			suppressNextContextMenu();

			return;

		}

		// movementX / Y はロック中だけ使う。iOS Safari のタッチでは 0 になるため
		if ( isLocked() ) {

			dx += e.movementX;
			dy += e.movementY;

		} else {

			dx += e.clientX - lastX;
			dy += e.clientY - lastY;

		}

		lastX = e.clientX;
		lastY = e.clientY;

		if ( ! dragged && Math.hypot( dx, dy ) < DRAG_THRESHOLD ) return;

		if ( ! dragged && callbacks.lock ) lock();

		dragged = true;

		callbacks.onMove( dx, dy, e );

	};

	const onUp = ( e: PointerEvent ) => {

		dispose();

		callbacks.onEnd( dragged, e );

	};

	// capture で受けて止め、エディタの Escape ショートカット（シーンカメラへの同期）へ届かせない。
	// ロック中の Esc はブラウザがロックの解除に使うので、そちらは pointerlockchange（lockUser.onLost）で受ける
	const onKeyDown = ( e: KeyboardEvent ) => {

		if ( e.key !== "Escape" ) return;

		e.preventDefault();
		e.stopPropagation();

		cancel();

	};

	window.addEventListener( "pointermove", onMove );
	window.addEventListener( "pointerup", onUp );
	window.addEventListener( "pointercancel", onUp );

	if ( callbacks.onCancel ) window.addEventListener( "keydown", onKeyDown, { capture: true } );

	return { lock };

};

// 押した位置と今の位置を対角とする矩形（画面座標）
export const dragRect = ( start: { clientX: number, clientY: number }, current: { clientX: number, clientY: number } ) => {

	return {
		left: Math.min( start.clientX, current.clientX ),
		top: Math.min( start.clientY, current.clientY ),
		right: Math.max( start.clientX, current.clientX ),
		bottom: Math.max( start.clientY, current.clientY ),
	};

};

// 右クリックで取り消した操作のあとに、同じ右クリックでメニューが開かないよう次の contextmenu を1回だけ止める。
// メニューは macOS では右ボタンを押したとき、Windows では離したときに届くので、どちらでも拾えるよう次の押下まで待つ。
// contextmenu が来ないまま次のボタンが押されたら止めるのをやめ、そのクリックのメニューは通す
export const suppressNextContextMenu = () => {

	const onContextMenu = ( e: MouseEvent ) => {

		e.preventDefault();
		e.stopPropagation();

		dispose();

	};

	const dispose = () => {

		window.removeEventListener( "contextmenu", onContextMenu, { capture: true } );
		window.removeEventListener( "pointerdown", dispose, { capture: true } );

	};

	// 押している最中のこの pointerdown の配信中に足したリスナーは、この配信では呼ばれない
	window.addEventListener( "contextmenu", onContextMenu, { capture: true } );
	window.addEventListener( "pointerdown", dispose, { capture: true } );

};
