import { Keyboard, PressedKeys } from '../../../../core/Keyboard';

export type KeyboardHandlerCallbacks = {
	onSave: () => void;
	onUndo: () => void;
	onRedo: () => void;
	onPlayToggle: () => void;
	onCameraViewToggle: () => void;
	onPreviewToggle: () => void;
	onSyncToSceneCamera: () => void;
	onFocusSelected: () => void;
	onTransformKey: ( e: KeyboardEvent ) => boolean;
};

// テキスト入力中かどうか（エディタのショートカットを奪わないための判定）
const isTextInputFocused = (): boolean => {

	const elm = document.activeElement as HTMLElement | null;

	if ( ! elm ) return false;

	return elm.tagName === 'INPUT' || elm.tagName === 'TEXTAREA' || elm.isContentEditable;

};

export class KeyboardHandler {

	private _keyboard: Keyboard;

	constructor( callbacks: KeyboardHandlerCallbacks ) {

		this._keyboard = new Keyboard();

		this._keyboard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( e.isComposing ) return;

			const cmd = pressedKeys[ "Meta" ] || pressedKeys[ "Control" ];

			// 保存だけはブラウザの保存ダイアログを抑止するため入力欄フォーカス中でも受ける
			if ( cmd && pressedKeys[ "s" ] ) {

				e.preventDefault();

				callbacks.onSave();

			}

			// 入力欄では undo もブラウザネイティブのテキスト undo に譲る
			if ( isTextInputFocused() ) return;

			// モーダル変形中は他のショートカットを一切通さない（Space での再生開始などを防ぐ）
			if ( callbacks.onTransformKey( e ) ) return;

			if ( cmd && pressedKeys[ "z" ] ) {

				e.preventDefault();

				if ( pressedKeys[ "Shift" ] ) {

					callbacks.onRedo();

				} else {

					callbacks.onUndo();

				}

			}

			if ( e.key == ' ' && ! cmd ) {

				callbacks.onPlayToggle();

			}

			// Blender の Numpad 0 相当。テンキーの無いキーボード向けに数字の 0 も受ける
			if ( ( e.code === 'Numpad0' || e.key === '0' ) && ! cmd ) {

				callbacks.onCameraViewToggle();

			}

			// ヘッダーのカメラアイコンと同じプレビュー（本番同等の見た目）の切り替え
			if ( e.key === '9' && ! cmd ) {

				callbacks.onPreviewToggle();

			}

			// モーダル変形中の Escape は上の onTransformKey がキャンセルとして消費するのでここには来ない
			if ( e.key === 'Escape' && ! cmd ) {

				callbacks.onSyncToSceneCamera();

			}

			// Blender の Numpad . 相当。テンキーの無いキーボード向けに '.' も受ける
			if ( ( e.code === 'NumpadDecimal' || e.key === '.' ) && ! cmd ) {

				callbacks.onFocusSelected();

			}

		} );

	}

	public dispose() {

		this._keyboard.dispose();

	}

}
