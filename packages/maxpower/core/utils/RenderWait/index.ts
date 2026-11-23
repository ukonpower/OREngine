/*-------------------------------
	描画前に待つ処理の登録口

	エディタが「描いてよい状態」になるまで待つ非同期処理を登録する。待つのは書き出し・シーン CLI の shot と、
	シーン CLI がタブを受付可にする前（読み込み直後に後から作られるエンティティを「見つからない」としないため）。
	- 読み込み（BLidge のシーン・外部のメッシュなど一度で終わるもの）: いつ登録してもよい
	- 1コマずつ確定させて描く経路（EntityUpdateEvent.offline）で update 中に始めた処理（動画の seek など）: offline のときだけ登録する。
	  リアルタイム再生では待てないため
	待つのは dev サーバーのエディタだけなので、production のビルド（player・静的エディタ）では登録しない（player に登録口のコードを入れないため。呼び出しは引数の評価だけが残る）
-------------------------------*/

const pending: Promise<unknown>[] = [];

// 描く前に待ってほしい処理を登録する
export const addRenderWait = ( promise: Promise<unknown> ) => {

	if ( process.env.NODE_ENV === 'development' ) {

		pending.push( promise );

	}

};

// 登録された処理がすべて終わるまで待つ。待っている間に登録されたものも待つ
export const waitRenderReady = async () => {

	while ( pending.length > 0 ) {

		const promises = pending.splice( 0, pending.length );

		await Promise.all( promises );

	}

};
