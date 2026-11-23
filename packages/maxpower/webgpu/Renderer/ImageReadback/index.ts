import type { Renderer } from '..';
import type { PixelRect, RenderImageName } from '../../../core/Contracts/RenderViewContract';
import type { RenderView } from '../RenderView';

// copyTextureToBuffer は行のバイト数を 256 の倍数にそろえることを求める
const BYTES_PER_ROW_ALIGNMENT = 256;

// rgba16float の 1 画素のバイト数（2 バイト × 4）
const BYTES_PER_PIXEL = 8;

// 半精度浮動小数（IEEE 754 binary16）のビット列を number へ戻す。
// Float16Array は Chromium でもまだ新しいので頼らない
const halfToFloat = ( bits: number ) => {

	const sign = ( bits & 0x8000 ) !== 0 ? - 1 : 1;
	const exponent = ( bits >> 10 ) & 0x1f;
	const fraction = bits & 0x3ff;

	if ( exponent === 0 ) {

		return sign * Math.pow( 2, - 14 ) * ( fraction / 1024 );

	}

	if ( exponent === 0x1f ) {

		if ( fraction === 0 ) {

			return sign * Infinity;

		}

		return NaN;

	}

	return sign * Math.pow( 2, exponent - 15 ) * ( 1 + fraction / 1024 );

};

// render 済みの view の途中の絵（name）から、rect の画素を float のまま読む。
// 返すのは RGBA を rect.width × rect.height 個並べた配列で、行は下から上（rect と同じ左下原点。webgl 版と同じ形）。
// Renderer のメソッドにしないのは、使わない player のバンドルから tree-shaking で落とすため
export const readRenderImage = async ( renderer: Renderer, view: RenderView, name: RenderImageName, rect: PixelRect ) => {

	if ( name !== 'lit' ) {

		throw new Error( `読み戻せない絵の名前です: ${name}` );

	}

	const device = renderer.device;
	const targets = view.targets;

	// lit はシーンバッファ。forward・透明も同じテクスチャへ重ねて描く（Renderer の _renderForward）
	const texture = targets.scene;

	if ( ! device || ! texture ) {

		throw new Error( 'まだ描画されていないビューです（device か描画先がありません）' );

	}

	// 下のデコードは半精度 4 成分を前提にしている（SCENE_FORMAT）
	if ( texture.format !== 'rgba16float' ) {

		throw new Error( `シーンバッファの形式が rgba16float ではありません: ${texture.format}` );

	}

	const bytesPerRow = Math.ceil( rect.width * BYTES_PER_PIXEL / BYTES_PER_ROW_ALIGNMENT ) * BYTES_PER_ROW_ALIGNMENT;

	const buffer = device.createBuffer( {
		label: 'readRenderImage',
		size: bytesPerRow * rect.height,
		usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
	} );

	// テクスチャは左上原点なので、左下原点の rect の上端の行から写す
	const top = targets.height - rect.y - rect.height;

	// 描画を submit した後に写す。キューは submit の順に実行されるので、この view の直近の render の結果が入る
	const encoder = device.createCommandEncoder();

	encoder.copyTextureToBuffer(
		{ texture, origin: [ rect.x, top ] },
		{ buffer, bytesPerRow },
		[ rect.width, rect.height ]
	);

	device.queue.submit( [ encoder.finish() ] );

	await buffer.mapAsync( GPUMapMode.READ );

	const halves = new Uint16Array( buffer.getMappedRange() );
	const halvesPerRow = bytesPerRow / 2;
	const pixels = new Float32Array( rect.width * rect.height * 4 );

	for ( let row = 0; row < rect.height; row ++ ) {

		// 写した行は上から下へ並んでいるので、返す配列（下から上）へは逆順に入れる
		const sourceRow = rect.height - 1 - row;

		for ( let i = 0; i < rect.width * 4; i ++ ) {

			pixels[ row * rect.width * 4 + i ] = halfToFloat( halves[ sourceRow * halvesPerRow + i ] );

		}

	}

	buffer.unmap();
	buffer.destroy();

	return pixels;

};
