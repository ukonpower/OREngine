import type { Renderer } from '..';
import type { PixelRect, RenderImageName } from '../../../core/Contracts/RenderViewContract';
import type { RenderView } from '../RenderView';

// render 済みの view の途中の絵（name）から、rect の画素を float のまま読む。
// 返すのは RGBA を rect.width × rect.height 個並べた配列で、行は下から上（rect と同じ左下原点）。
// Renderer のメソッドにしないのは、使わない player のバンドルから tree-shaking で落とすため
export const readRenderImage = async ( renderer: Renderer, view: RenderView, name: RenderImageName, rect: PixelRect ) => {

	if ( name !== 'lit' ) {

		throw new Error( `読み戻せない絵の名前です: ${name}` );

	}

	const gl = renderer.backend.gl;

	// lit はシェーディングバッファの 0 番。forward・透明も同じテクスチャへ重ねて描く（RenderView の forwardBuffer）
	const frameBuffer = view.renderTarget.shadingBuffer;
	const pixels = new Float32Array( rect.width * rect.height * 4 );

	// バッファは RGBA16F。float の色バッファは RGBA / FLOAT で読める（EXT_color_buffer_float）。
	// シェーディングバッファは 1 番に SSS 用の diffuse も持つので、読む添付を明示する
	gl.bindFramebuffer( gl.READ_FRAMEBUFFER, frameBuffer.getFrameBuffer() );
	gl.readBuffer( gl.COLOR_ATTACHMENT0 );
	gl.readPixels( rect.x, rect.y, rect.width, rect.height, gl.RGBA, gl.FLOAT, pixels );

	// READ に束縛したまま残すと、後でこの FBO を消したときに canvas への描画が効かなくなる（ANGLE の不具合）
	gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null );

	return pixels;

};
