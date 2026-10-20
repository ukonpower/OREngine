// Music の生成シェーダーの共通部品。ShaderBuilder が楽器の index.glsl の先頭に足すので、楽器の側では include しない。
// 1頂点が1サンプルで、music_main.part.glsl の main が trackSound を呼んで左右の音を transform feedback で書き出す

// かたまりの中のサンプルの番号（Music の generator.ts が 0, 1, 2, … を入れる）
in float aIndex;

// 左右の音。名前は Music の generator.ts の transformFeedbackVaryings と一致させる
out float o_left;
out float o_right;

// かたまりの頭の、曲の頭からの秒
uniform float uBlockTime;
uniform float uSampleRate;
uniform float uBPM;

// trackSound が受け取る、今のサンプルの曲の中での位置
struct Song {
	// 曲の頭からの秒
	float time;
	// 曲の頭からの拍
	float beat;
	// 1拍の秒（60 / BPM）
	float beatSec;
	// 帯の中の拍。帯は曲全体に1つなので beat と同じ
	float clipBeat;
};

// のこぎり波。x は周期の数（周波数 × 秒）で、-1〜1 を返す
float saw( float x ) {

	return fract( - x ) * 2.0 - 1.0;

}

// 0〜1 の擬似乱数。同じ x なら同じ値を返す
float whiteNoise( float x ) {

	return fract( sin( dot( vec2( x ), vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

}

// MIDI の音高（69 が A4 の 440Hz）の周波数
float noteFreq( float pitch ) {

	return 440.0 * exp2( ( pitch - 69.0 ) / 12.0 );

}
