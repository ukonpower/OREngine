import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class FrameDebugger extends GLP.EventEmitter {

	private _draw: MXP.EditorDraw;
	private _elm: HTMLCanvasElement;

	// buffers

	private _outTarget: MXP.EditorTarget;
	private _frameLabels: string[];

	// status

	private _enable: boolean;

	private _resolution: GLP.Vector;
	private _count: number;
	private _total: number;
	private _tile: GLP.Vector;
	private _tilePixelSize: GLP.Vector;
	private _tileInv: GLP.Vector;

	// controls

	private _focus: string | null;
	private _prevFrameLabels: string[];
	private _labelCount: Map<string, number>;

	// label overlay

	private _overlay: HTMLDivElement;

	constructor( canvas: HTMLCanvasElement, draw: MXP.EditorDraw ) {

		super();

		this._draw = draw;
		this._elm = canvas;

		this._outTarget = draw.createTarget();

		this._enable = false;
		this._count = 0;
		this._total = 1;
		this._tile = new GLP.Vector( 1, 1 );
		this._tilePixelSize = new GLP.Vector( 1, 1 );
		this._tileInv = new GLP.Vector( 1, 1 );

		this._focus = null;
		this._frameLabels = [];
		this._prevFrameLabels = [];
		this._labelCount = new Map();

		this._resolution = new GLP.Vector();

		// label overlay

		this._overlay = document.createElement( "div" );
		this._overlay.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;color:#fff;font-family:'Courier New',monospace;font-weight:500;mix-blend-mode:difference;";

		// パス出力の取り込み

		draw.onDrawPass( ( frame, label ) => this._push( frame, label ) );

		// click

		const touchStartPos = new GLP.Vector( 0, 0 );

		const onClick = this._onClick.bind( this );

		const onPointerDown = ( e: PointerEvent ) => {

			touchStartPos.set( e.clientX, e.clientY );

		};

		const onPointerUp = ( e: PointerEvent ) => {

			const endPos = new GLP.Vector( e.clientX, e.clientY );

			if ( touchStartPos.clone().sub( endPos ).length( ) < 10 ) {

				onClick( e );

			}

		};

		this._elm.addEventListener( "pointerdown", onPointerDown );
		this._elm.addEventListener( "pointerup", onPointerUp );

		// esc

		const onKeydown = ( e: KeyboardEvent ) => {

			if ( e.key === "Escape" ) {

				this._focus = null;

				this._clear();

			}

			if ( e.key == "ArrowRight" ) {

				if ( this._focus !== null ) {

					const idx = this._prevFrameLabels.indexOf( this._focus );
					const next = Math.min( idx + 1, this._prevFrameLabels.length - 1 );
					this._focus = this._prevFrameLabels[ next ] ?? this._focus;

				}

			}

			if ( e.key == "ArrowLeft" ) {

				if ( this._focus !== null ) {

					const idx = this._prevFrameLabels.indexOf( this._focus );
					const prev = Math.max( idx - 1, 0 );
					this._focus = this._prevFrameLabels[ prev ] ?? this._focus;

				}

			}

		};

		window.addEventListener( "keydown", onKeydown );

		this.once( "dispose", () => {

			this._elm.removeEventListener( "pointerdown", onPointerDown );
			this._elm.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( "keydown", onKeydown );
			this._overlay.remove();

		} );

	}

	private _calcTilePos( num: number ) {

		const x = num % this._tile.x * this._tileInv.x * this._resolution.x;
		const y = Math.floor( num / this._tile.x ) * this._tileInv.y * this._resolution.y;

		return { x, y };

	}

	// 1パス分の出力をタイル位置へ取り込む
	private _push( frame: MXP.EditorFrame, label: string ) {

		if ( ! this._enable ) return;

		const baseLabel = label || String( this._count );
		const occurrence = this._labelCount.get( baseLabel ) || 0;
		this._labelCount.set( baseLabel, occurrence + 1 );
		const uniqueLabel = occurrence > 0 ? baseLabel + "#" + occurrence : baseLabel;

		if ( this._focus == null || this._focus == uniqueLabel ) {

			let { x, y } = this._calcTilePos( this._count );

			if ( this._focus !== null ) {

				x = 0;
				y = 0;

			}

			this._draw.blit( frame, this._outTarget, {
				x, y,
				width: this._tilePixelSize.x,
				height: this._tilePixelSize.y,
			} );

			this._frameLabels.push( uniqueLabel );

		}

		this._count ++;

	}

	public draw() {

		this._draw.blit( this._outTarget, null );

		this._drawLabels();

		this._clear();

	}

	// ラベルはDOMオーバーレイで出す（契約からテクスチャアップロードを外すため）
	private _drawLabels() {

		const parent = this._elm.parentElement;

		if ( ! parent ) return;

		if ( this._overlay.parentElement !== parent ) {

			parent.appendChild( this._overlay );

		}

		this._overlay.style.fontSize = Math.max( 10, this._elm.clientHeight / 1080 * 28 ) + "px";
		this._overlay.replaceChildren( ...this._frameLabels.map( ( label, i ) => {

			const elm = document.createElement( "div" );
			elm.textContent = label;
			elm.style.cssText = "position:absolute;transform:translateY(-100%);white-space:nowrap;";
			elm.style.left = ( i % this._tile.x ) * this._tileInv.x * 100 + "%";
			elm.style.top = ( Math.floor( i / this._tile.x ) + 1 ) * this._tileInv.y * 100 + "%";
			elm.style.paddingLeft = "5px";

			return elm;

		} ) );

	}

	private _clear() {

		// calc status

		this._total = this._count;

		this._prevFrameLabels = this._frameLabels;

		// フレーム外から呼ばれると_countが0のことがある。タイル0分割はゼロ除算になるので最低1を保証する
		const sqrt = Math.sqrt( this._focus !== null ? 1 : Math.max( this._total, 1 ) );
		this._tile.set( Math.round( sqrt ), Math.ceil( sqrt ) );
		this._tileInv.set( 1.0, 1.0 ).divide( this._tile );
		this._tilePixelSize.copy( this._tileInv ).multiply( this._resolution );

		this._frameLabels = [];
		this._count = 0;
		this._labelCount.clear();

	}

	public reflesh() {

		this.resize( this._resolution );

	}

	public resize( resolution: GLP.Vector ) {

		this._resolution.copy( resolution );

	}

	private _onClick( e: MouseEvent ) {

		if ( ! this._enable ) {

			return;

		}

		this.reflesh();

		if ( this._focus === null ) {

			const tileSize = new GLP.Vector( this._elm.clientWidth / this._tile.x, this._elm.clientHeight / this._tile.y );

			const x = Math.floor( ( e.offsetX ) / tileSize.x );
			const y = Math.floor( ( e.offsetY ) / tileSize.y );
			const index = x + y * this._tile.x;

			if ( index >= 0 && index < this._prevFrameLabels.length ) {

				this._focus = this._prevFrameLabels[ index ];

			}

		}

		this._clear();

	}

	public set enable( value: boolean ) {

		this._enable = value;

		if ( value ) {

			this.reflesh();

		} else {

			this._overlay.remove();

		}

	}

	public get enable( ) {

		return this._enable;

	}

	public dispose( ) {

		this.emit( "dispose" );

	}

}
