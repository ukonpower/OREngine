import { Keyboard, PressedKeys } from '../../Engine/Keyboard';

import { GizmoMode } from '../Gizmo';

export type KeyboardHandlerCallbacks = {
	onSave: () => void;
	onUndo: () => void;
	onRedo: () => void;
	onPlayToggle: () => void;
	onSetGizmoMode: ( mode: GizmoMode ) => void;
};

export class KeyboardHandler {

	private _keyboard: Keyboard;

	constructor( callbacks: KeyboardHandlerCallbacks ) {

		this._keyboard = new Keyboard();

		this._keyboard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				callbacks.onSave();

			}

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "z" ] ) {

				e.preventDefault();

				if ( pressedKeys[ "Shift" ] ) {

					callbacks.onRedo();

				} else {

					callbacks.onUndo();

				}

			}

			if ( e.key == ' ' ) {

				callbacks.onPlayToggle();

			}

			if ( e.key === 'q' ) callbacks.onSetGizmoMode( 'select' );
			if ( e.key === 'w' ) callbacks.onSetGizmoMode( 'translate' );
			if ( e.key === 'e' ) callbacks.onSetGizmoMode( 'rotate' );
			if ( e.key === 'r' ) callbacks.onSetGizmoMode( 'scale' );

		} );

	}

	public dispose() {

		this._keyboard.dispose();

	}

}
