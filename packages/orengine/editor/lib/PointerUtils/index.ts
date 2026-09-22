import * as MTP from 'mathpower';

// canvas 要素の中で実際に描画されている矩形（object-fit: contain 相当のレターボックス）を求める
export const getContentRect = ( canvas: HTMLCanvasElement ) => {

	const rect = canvas.getBoundingClientRect();
	const canvasAspect = canvas.width / canvas.height;
	const rectAspect = rect.width / rect.height;

	let contentWidth = rect.width;
	let contentHeight = rect.height;
	let offsetX = 0;
	let offsetY = 0;

	if ( rectAspect > canvasAspect ) {

		contentWidth = rect.height * canvasAspect;
		offsetX = ( rect.width - contentWidth ) / 2;

	} else {

		contentHeight = rect.width / canvasAspect;
		offsetY = ( rect.height - contentHeight ) / 2;

	}

	return { left: rect.left + offsetX, top: rect.top + offsetY, width: contentWidth, height: contentHeight };

};

// クライアント座標を canvas の描画領域基準の NDC に変換する
export const clientToNDC = ( canvas: HTMLCanvasElement, clientX: number, clientY: number ): MTP.Vector => {

	const content = getContentRect( canvas );

	const x = ( ( clientX - content.left ) / content.width ) * 2 - 1;
	const y = - ( ( clientY - content.top ) / content.height ) * 2 + 1;

	return new MTP.Vector( x, y );

};

// NDC をクライアント座標へ逆変換する（clientToNDC の逆写像）
export const ndcToClient = ( canvas: HTMLCanvasElement, ndcX: number, ndcY: number ): MTP.Vector => {

	const content = getContentRect( canvas );

	const x = ( ndcX + 1 ) / 2 * content.width + content.left;
	const y = ( 1 - ndcY ) / 2 * content.height + content.top;

	return new MTP.Vector( x, y );

};
