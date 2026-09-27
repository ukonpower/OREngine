import * as MTP from 'mathpower';

import { suppressNextContextMenu } from '../PointerDrag';

import type { EditModal } from '../Editor';
import type { ModalTransformMode } from '../ModalTransformHandler';

// 点の座標（カーブならキーの時刻, 値）と画面座標（px）の対応。回転・伸縮は画面の px の上で計算する
// （時間と値のように縦横で単位も縮尺も違う座標は、値のまま回すと見た目の角度と合わない）
export type PointScreenMapping = {
	toScreen: ( point: MTP.IVector2 ) => MTP.IVector2;
	toPoint: ( screen: MTP.IVector2 ) => MTP.IVector2;
};

// 点（キー・ハンドル、パスの頂点・ハンドル）の行き先。owner は点の属する点（キー・頂点）の座標（動かす前）
export type PointTransform = ( point: MTP.IVector2, owner: MTP.IVector2 ) => MTP.IVector2;

type PointAxis = "x" | "y";

// 動かせる軸。"x" は横にだけ動かし、X / Y の拘束は受けない（カーブエディタのキー表示）
export type PointTransformAxes = "xy" | "x";

type PointTransformModalParams = {
	mode: ModalTransformMode;
	// 開始時の対応を使い続ける（途中で表示の範囲が変わっても、掴んだ点がポインタから逃げないように）
	mapping: PointScreenMapping;
	// 開始時のポインタ（画面座標）
	pointer: MTP.IVector2;
	// 回転・伸縮の中心（点の座標）。ポインタの角度・距離もここから測る
	center: MTP.IVector2;
	// true なら、点ごとに属する点を中心に回す・伸縮する（ハンドルだけを選んでいるとき）
	individual: boolean;
	axes: PointTransformAxes;
	// 状態の表示に出す軸の名前（拘束中の軸）と、移動量の小数の桁数
	axisLabels: { x: string, y: string };
	digits: { x: number, y: number };
	onChange: ( transform: PointTransform ) => void;
	onStatus: ( status: string | null ) => void;
	onConfirm: () => void;
	onCancel: () => void;
};

// 伸縮の倍率の分母（開始時のポインタと中心の距離, px）の下限。ModalTransformHandler の MIN_CENTER_DISTANCE と同じ
const MIN_CENTER_DISTANCE = 1.0;

// ポインタでの伸縮の倍率の下限。ModalTransformHandler の MIN_SCALE_RATIO と同じ（数値入力にはかけない）
const MIN_SCALE_RATIO = 0.001;

// 2D の点（カーブエディタのキー、フィールド UI の点など）の G / R / S。ビューポートの ModalTransformHandler と同じ操作感で、
// ポインタに追従し、左クリック / Enter で確定、右クリック / Esc で取り消す。X / Y で軸に拘束し、数値入力を受ける。
// 作った側が Editor.beginEditModal で登録すると、ポインタの位置によらずキーボードを先に受ける
export class PointTransformModal implements EditModal {

	private _params: PointTransformModalParams;
	private _pointer: MTP.IVector2;
	private _constraint: PointAxis | null;
	private _numberBuffer: string;
	private _disposeListeners: () => void;

	constructor( params: PointTransformModalParams ) {

		this._params = params;
		this._pointer = { ...params.pointer };
		this._constraint = null;
		this._numberBuffer = "";

		const onMove = ( e: PointerEvent ) => {

			e.stopPropagation();

			this._pointer = { x: e.clientX, y: e.clientY };
			this._update();

		};

		const onDown = ( e: PointerEvent ) => {

			e.preventDefault();
			e.stopPropagation();

			if ( e.button === 2 ) {

				// この右クリックで、ポインタの下のメニュー（ブラウザ・プロパティの行など）が開かないようにする
				suppressNextContextMenu();

				this._end( false );

			} else if ( e.button === 0 ) {

				this._end( true );

			}

		};

		// capture フェーズで奪って、点を出している領域のクリック（タイムラインの時刻合わせ・点の選択等）へ届かせない
		window.addEventListener( "pointermove", onMove, { capture: true } );
		window.addEventListener( "pointerdown", onDown, { capture: true } );

		this._disposeListeners = () => {

			window.removeEventListener( "pointermove", onMove, { capture: true } );
			window.removeEventListener( "pointerdown", onDown, { capture: true } );

		};

		this._update();

	}

	/*-------------------------------
		Key
	-------------------------------*/

	// モーダル中のキーはすべて消費する（ほかのショートカットへ渡さない）
	public handleKeyDown( e: KeyboardEvent ) {

		const key = e.key.toLowerCase();

		if ( e.key === "Enter" ) {

			this._end( true );

		} else if ( e.key === "Escape" ) {

			this._end( false );

		} else if ( key === "x" || key === "y" ) {

			this._toggleConstraint( key );

		} else {

			this._inputNumber( e.key );

		}

		return true;

	}

	// 同じ軸のキーをもう一度押すと解除する。横にしか動かせないときと回転では拘束しない
	private _toggleConstraint( axis: PointAxis ) {

		if ( this._params.axes === "x" || this._params.mode === "rotate" ) return;

		if ( this._constraint === axis ) {

			this._constraint = null;

		} else {

			this._constraint = axis;

		}

		this._update();

	}

	// 数値入力のバッファ操作。ModalTransformHandler の _inputNumber と同じ規則
	private _inputNumber( key: string ) {

		if ( key.length === 1 && key >= "0" && key <= "9" ) {

			this._numberBuffer += key;

		} else if ( key === "." ) {

			if ( this._numberBuffer.includes( "." ) ) return;

			this._numberBuffer += ".";

		} else if ( key === "-" ) {

			if ( this._numberBuffer.startsWith( "-" ) ) {

				this._numberBuffer = this._numberBuffer.slice( 1 );

			} else {

				this._numberBuffer = "-" + this._numberBuffer;

			}

		} else if ( key === "Backspace" ) {

			if ( this._numberBuffer === "" ) return;

			this._numberBuffer = this._numberBuffer.slice( 0, - 1 );

		} else {

			return;

		}

		this._update();

	}

	/*-------------------------------
		Transform
	-------------------------------*/

	// 今のポインタ（または数値入力）で行き先を作り直して渡し、状態の表示を更新する
	private _update() {

		const mode = this._params.mode;

		let numeric: number | null = null;

		if ( this._numberBuffer !== "" ) numeric = parseFloat( this._numberBuffer );

		// "-" や "." だけの途中状態は、数値が揃うまで動かさない
		if ( numeric !== null && Number.isNaN( numeric ) ) {

			this._params.onChange( ( point ) => point );
			this._params.onStatus( this._statusText( "" ) );

			return;

		}

		if ( mode === "translate" ) {

			this._translate( numeric );

		} else if ( mode === "rotate" ) {

			this._rotate( numeric );

		} else {

			this._scale( numeric );

		}

	}

	private _translate( numeric: number | null ) {

		const params = this._params;

		let offset = { x: 0, y: 0 };

		if ( numeric !== null ) {

			// 数値は拘束の軸（拘束が無ければ x）の量として扱う（Blender の第1成分と同じ）
			if ( this._constraint === "y" ) {

				offset = { x: 0, y: numeric };

			} else {

				offset = { x: numeric, y: 0 };

			}

		} else {

			let dx = this._pointer.x - params.pointer.x;
			let dy = this._pointer.y - params.pointer.y;

			if ( this._constraint === "x" || params.axes === "x" ) dy = 0;
			if ( this._constraint === "y" ) dx = 0;

			const from = params.mapping.toPoint( params.pointer );
			const to = params.mapping.toPoint( { x: params.pointer.x + dx, y: params.pointer.y + dy } );

			offset = { x: to.x - from.x, y: to.y - from.y };

		}

		params.onChange( ( point ) => ( { x: point.x + offset.x, y: point.y + offset.y } ) );

		let amount = offset.x.toFixed( params.digits.x );

		if ( params.axes === "xy" ) amount += ", " + offset.y.toFixed( params.digits.y );

		this._params.onStatus( this._statusText( amount ) );

	}

	private _rotate( numeric: number | null ) {

		const params = this._params;
		const center = params.mapping.toScreen( params.center );

		let angle = 0;

		if ( numeric !== null ) {

			angle = numeric * Math.PI / 180;

		} else {

			angle = screenAngle( this._pointer, center ) - screenAngle( params.pointer, center );

		}

		const cos = Math.cos( angle );
		const sin = Math.sin( angle );

		this._params.onStatus( this._statusText( ( angle * 180 / Math.PI ).toFixed( 1 ) ) );

		// 回していないときは、画面座標との往復で出る誤差（とその丸め）で値が変わらないようにそのまま返す
		if ( angle === 0 ) {

			params.onChange( ( point ) => point );

			return;

		}

		params.onChange( ( point, owner ) => {

			let pivotPoint = params.center;

			if ( params.individual ) pivotPoint = owner;

			const pivot = params.mapping.toScreen( pivotPoint );
			const screen = params.mapping.toScreen( point );
			const dx = screen.x - pivot.x;
			const dy = screen.y - pivot.y;

			// 画面の y は下向きなので、見た目の反時計回りに回すように符号を合わせる
			return params.mapping.toPoint( {
				x: pivot.x + dx * cos + dy * sin,
				y: pivot.y - dx * sin + dy * cos,
			} );

		} );

	}

	private _scale( numeric: number | null ) {

		const params = this._params;
		const center = params.mapping.toScreen( params.center );

		let ratio = 1;

		if ( numeric !== null ) {

			// 数値入力は負の値（反転）を許すので下限をかけない
			ratio = numeric;

		} else {

			let startDistance = Math.hypot( params.pointer.x - center.x, params.pointer.y - center.y );
			let distance = Math.hypot( this._pointer.x - center.x, this._pointer.y - center.y );

			// 横にしか動かせないときは、横の距離で測る
			if ( params.axes === "x" ) {

				startDistance = Math.abs( params.pointer.x - center.x );
				distance = Math.abs( this._pointer.x - center.x );

			}

			ratio = Math.max( MIN_SCALE_RATIO, distance / Math.max( MIN_CENTER_DISTANCE, startDistance ) );

		}

		let ratioX = ratio;
		let ratioY = ratio;

		if ( this._constraint === "x" || params.axes === "x" ) ratioY = 1;
		if ( this._constraint === "y" ) ratioX = 1;

		params.onChange( ( point, owner ) => {

			let pivotPoint = params.center;

			if ( params.individual ) pivotPoint = owner;

			const pivot = params.mapping.toScreen( pivotPoint );
			const screen = params.mapping.toScreen( point );
			const scaled = params.mapping.toPoint( {
				x: pivot.x + ( screen.x - pivot.x ) * ratioX,
				y: pivot.y + ( screen.y - pivot.y ) * ratioY,
			} );

			// 伸縮しない軸は、画面座標との往復で出る誤差（とその丸め）で値が変わらないようにそのまま残す
			let x = scaled.x;
			let y = scaled.y;

			if ( ratioX === 1 ) x = point.x;
			if ( ratioY === 1 ) y = point.y;

			return { x, y };

		} );

		this._params.onStatus( this._statusText( ratio.toFixed( 3 ) ) );

	}

	/*-------------------------------
		Status
	-------------------------------*/

	// ModalTransformHandler と同じ形の表示。数値入力中の値は [] で囲む
	private _statusText( amount: string ) {

		const mode = this._params.mode;

		let label = "Scale";
		let unit = "";

		if ( mode === "translate" ) label = "Move";

		if ( mode === "rotate" ) {

			label = "Rot";
			unit = "°";

		}

		let value = amount;

		if ( this._numberBuffer !== "" ) value = `[${this._numberBuffer}]`;

		return `${label}: ${value}${unit} (${this._constraintText()})`;

	}

	private _constraintText() {

		const labels = this._params.axisLabels;

		if ( this._params.axes === "x" || this._constraint === "x" ) return labels.x;
		if ( this._constraint === "y" ) return labels.y;
		if ( this._params.mode === "rotate" ) return "view";
		if ( this._params.mode === "scale" ) return "uniform";

		return "free";

	}

	/*-------------------------------
		End
	-------------------------------*/

	private _end( confirm: boolean ) {

		this._disposeListeners();
		this._params.onStatus( null );

		if ( confirm ) {

			this._params.onConfirm();

		} else {

			this._params.onCancel();

		}

	}

	// 外から終える（点を出している領域が消えたとき）。取り消しとして扱う
	public cancel() {

		this._end( false );

	}

}

// 中心から見たポインタの角度。y を反転して画面上の反時計回りを正にする（ModalTransformHandler の _screenAngle と同じ）
const screenAngle = ( pointer: MTP.IVector2, center: MTP.IVector2 ) => {

	return Math.atan2( - ( pointer.y - center.y ), pointer.x - center.x );

};
