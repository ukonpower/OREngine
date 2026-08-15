// サーバーAPI経由のファイル書き込みを記録し、直後のwatchリロードを抑制するための共有レジストリ
const recent = new Map<string, number>();

export const markWritten = ( filePath: string ) => {

	recent.set( filePath, Date.now() );

};

// watcherのコールドスタート時はイベント到達が1秒を超えることがあるため窓は広めに取る
export const wasRecentlyWritten = ( filePath: string, windowMs = 3000 ) => {

	const t = recent.get( filePath );
	return t !== undefined && Date.now() - t < windowMs;

};
