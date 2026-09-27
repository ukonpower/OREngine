// テキスト入力欄かどうか。別ウィンドウの要素も来るので instanceof ではなく tagName で見る
const isTextInput = ( target: EventTarget | null ) => {

	const elm = target as HTMLElement | null;

	if ( ! elm ) return false;

	return elm.tagName === 'INPUT' || elm.tagName === 'TEXTAREA' || elm.isContentEditable === true;

};

// ウィンドウ内の右クリックでブラウザ標準のメニューを出さないようにし、外す関数を返す。
// 右ボタンはエディタの選択・ドラッグ・独自メニューに使うため。テキスト入力欄はコピー・貼り付けに使うので標準メニューを残す
export const preventBrowserContextMenu = ( win: Window ) => {

	const onContextMenu = ( e: MouseEvent ) => {

		if ( isTextInput( e.target ) ) return;

		e.preventDefault();

	};

	win.addEventListener( "contextmenu", onContextMenu );

	return () => {

		win.removeEventListener( "contextmenu", onContextMenu );

	};

};
