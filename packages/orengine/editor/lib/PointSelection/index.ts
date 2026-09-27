import { suppressNextContextMenu } from '../PointerDrag';

import type { Editor, EditModal } from '../Editor';

// 選んでいる点の集まり。点を表す ID の文字列の作り方は使う側が決める（カーブエディタは "<カーブ ID>:<番号>" 等）
export type PointSelection = Set<string>;

// refs がすべて選ばれているか
export const isAllSelected = ( selection: PointSelection, refs: string[] ) => {

	for ( const ref of refs ) {

		if ( ! selection.has( ref ) ) return false;

	}

	return refs.length > 0;

};

export type PressSelectionResult = {
	selection: PointSelection;
	active: string | null;
	// 押す前から選ばれていたか（ドラッグせずに離したら、押した点だけを選び直すため）
	wasSelected: boolean;
};

// 点の印を右ボタンで押したときの選び方（Blender の右クリック選択）。Shift は足し引きし、それ以外は押した点が選ばれていなければそれだけを選ぶ。
// pressedActive は押した点のうちアクティブになれるもの（カーブエディタならキー1つを指すときのそのキー）で、無ければ null。
// 選ばれているがアクティブでない点の Shift は、外さずにアクティブにする（Blender の3Dビューと同じ。選んだ中からアクティブを選び直せるように）
export const pressSelection = ( current: PointSelection, active: string | null, refs: string[], pressedActive: string | null, shift: boolean ): PressSelectionResult => {

	const wasSelected = isAllSelected( current, refs );

	let nextActive = active;

	if ( pressedActive ) nextActive = pressedActive;

	if ( shift && wasSelected && pressedActive && pressedActive != active ) {

		return { selection: current, active: pressedActive, wasSelected };

	}

	if ( shift ) {

		const next = new Set( current );

		for ( const ref of refs ) {

			if ( wasSelected ) {

				next.delete( ref );

			} else {

				next.add( ref );

			}

		}

		return { selection: next, active: nextActive, wasSelected };

	}

	if ( ! wasSelected ) {

		return { selection: new Set( refs ), active: pressedActive, wasSelected };

	}

	return { selection: current, active: nextActive, wasSelected };

};

// 矩形選択で囲んだ refs を選ぶ。add なら今の選択に足す（Shift）
export const boxSelection = ( current: PointSelection, refs: string[], add: boolean ) => {

	let next: PointSelection = new Set();

	if ( add ) next = new Set( current );

	for ( const ref of refs ) {

		next.add( ref );

	}

	return next;

};

type BoxSelectWaitParams = {
	editor: Editor;
	// 点を出している領域。この中での左ドラッグ1回を矩形選択にする（ドラッグは作った側が領域の pointerdown で受ける）
	area: HTMLElement;
	// 待機が終わったとき（左ドラッグを始めた・取り消した）
	onEnd: () => void;
};

// B の矩形選択の待機。作ると Editor に編集モーダルとして登録し、end で外す。
// 右クリック・Esc・領域の外での左クリックで取り消す
export class BoxSelectWait implements EditModal {

	private _editor: Editor;
	private _onEnd: () => void;
	private _ended: boolean;
	private _disposeListeners: () => void;

	constructor( params: BoxSelectWaitParams ) {

		this._editor = params.editor;
		this._onEnd = params.onEnd;
		this._ended = false;

		const onDown = ( e: PointerEvent ) => {

			if ( e.button == 2 ) {

				e.preventDefault();
				e.stopPropagation();
				suppressNextContextMenu();
				this.end();

				return;

			}

			if ( e.button == 0 && e.target instanceof Node && params.area.contains( e.target ) ) return;

			this.end();

		};

		window.addEventListener( "pointerdown", onDown, { capture: true } );

		this._disposeListeners = () => {

			window.removeEventListener( "pointerdown", onDown, { capture: true } );

		};

		this._editor.beginEditModal( this );

	}

	public handleKeyDown( e: KeyboardEvent ) {

		if ( e.key != "Escape" ) return false;

		this.end();

		return true;

	}

	// 待機を終える。2回目以降は何もしない
	public end() {

		if ( this._ended ) return;

		this._ended = true;
		this._disposeListeners();
		this._editor.endEditModal( this );
		this._onEnd();

	}

}
