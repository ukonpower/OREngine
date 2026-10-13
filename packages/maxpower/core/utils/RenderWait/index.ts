/*-------------------------------
	描画前に待つ処理の登録口

	書き出し・shot のように1コマずつ確定させて描く経路（EntityUpdateEvent.offline）で、
	コンポーネントが update 中に始めた非同期処理（動画の seek など）を、描画の前に待たせるためのもの。
	リアルタイム再生では待てないので、登録するのは offline のときだけにする。
-------------------------------*/

const pending: Promise<unknown>[] = [];

// 次の描画の前に待ってほしい処理を登録する
export const addRenderWait = ( promise: Promise<unknown> ) => {

	pending.push( promise );

};

// 登録された処理がすべて終わるまで待つ。待っている間に登録されたものも待つ
export const waitRenderReady = async () => {

	while ( pending.length > 0 ) {

		const promises = pending.splice( 0, pending.length );

		await Promise.all( promises );

	}

};
