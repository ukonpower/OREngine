// noteSound の楽器の共通部品。ShaderBuilder が noteSound の楽器にだけ、music.module.glsl の後ろ（楽器の .glsl の前）に足す。
// コードの楽器に入れないのは、使わない struct でも minifier が楽器ごとに型名を配り直して deflate が効かず、
// music シーンの packed が 148B 増えたため

// noteSound が受け取るノート1つ
struct Note {
	// MIDI の番号（69 が A4 の 440Hz）。noteFreq で周波数にする
	float pitch;
	// 強さ（0〜1）
	float velocity;
	// 鳴らす長さ（秒）。帯の終わりからはみ出したノートは、帯の終わりで切った長さ
	float length;
	// ノートのある帯の数値（Song.clipParam と同じ）
	vec4 clipParam;
};

// ノートを離してからの秒（鳴らしている間は 0）。楽器の index.ts の release の間はノートを離した後も noteSound が呼ばれるので、
// 余韻の減り方はこれで書く（例: exp( - noteRelease( n, t ) * 8.0 )）
float noteRelease( Note n, float t ) {

	return max( 0.0, t - n.length );

}
