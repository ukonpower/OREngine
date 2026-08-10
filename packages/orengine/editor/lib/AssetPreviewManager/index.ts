import * as MTP from 'mathpower';
import { EventEmitter } from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';

const PREVIEW_SIZE = 128;

// 読み出しが非同期になったため、出来上がったらイベントで知らせて描き直してもらう
export class AssetPreviewManager extends EventEmitter {

	private _draw: MXP.EditorDrawContract;
	private _target: MXP.EditorTarget;
	private _cache: Map<string, string>;
	private _pending: Set<string>;
	private _canvas2d: HTMLCanvasElement;
	private _ctx2d: CanvasRenderingContext2D;

	constructor( draw: MXP.EditorDrawContract ) {

		super();

		this._draw = draw;
		this._cache = new Map();
		this._pending = new Set();
		this._canvas2d = document.createElement( 'canvas' );
		this._canvas2d.width = PREVIEW_SIZE;
		this._canvas2d.height = PREVIEW_SIZE;
		this._ctx2d = this._canvas2d.getContext( '2d' )!;

		this._target = draw.createTarget( { size: new MTP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ) } );

	}

	// 未生成なら読み出しを始めて null を返す。出来上がると "update" が飛ぶ
	public getTexturePreview( name: string ): string | null {

		const key = "tex:" + name;
		const cached = this._cache.get( key );
		if ( cached ) return cached;

		if ( this._pending.has( key ) ) return null;

		const texture = Engine.resources.getTexture( name );
		if ( ! texture ) return null;

		this._pending.add( key );

		this._draw.drawTexture( texture, this._target );

		this._draw.readPixels( this._target ).then( ( pixels ) => {

			this._pending.delete( key );
			this._cache.set( key, this._toDataURL( pixels ) );
			this.emit( "update" );

		} );

		return null;

	}

	public invalidate( key: string ): void {

		this._cache.delete( key );

	}

	public invalidateAll(): void {

		this._cache.clear();
		this._pending.clear();

	}

	// 読み出したピクセルは下原点なので上下反転して2Dキャンバスへ載せる
	private _toDataURL( pixels: Uint8Array ): string {

		const imageData = this._ctx2d.createImageData( PREVIEW_SIZE, PREVIEW_SIZE );

		for ( let y = 0; y < PREVIEW_SIZE; y ++ ) {

			const srcRow = ( PREVIEW_SIZE - 1 - y ) * PREVIEW_SIZE * 4;
			const dstRow = y * PREVIEW_SIZE * 4;

			for ( let x = 0; x < PREVIEW_SIZE * 4; x ++ ) {

				imageData.data[ dstRow + x ] = pixels[ srcRow + x ];

			}

		}

		this._ctx2d.putImageData( imageData, 0, 0 );
		return this._canvas2d.toDataURL();

	}

	public dispose(): void {

		this._cache.clear();
		this._pending.clear();
		this.off( "update" );

	}

}
