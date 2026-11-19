// 軽量レンダラー（LiteRenderer）でライト・影・環境光・トーンマップまで自分で済ませるシェーダーが、frag_h と module:common の後に入れる。
// frag_h は module:common より前に置く（lite_out が呼ぶ viewDirection の引数を、minify が uniform の直接参照に置き換えることがあるため）。
// main の終わりの frag_out の直前に lite_out を入れる。入れていないシェーダーは、軽量レンダラーでは outColor をそのまま出す
#ifdef IS_FORWARD_LIT

	#include <module:light>
	#include <module:tonemap>

	// 空と地面の色（LiteRenderer が sky/intensity を掛けて渡す）
	uniform vec3 uLiteSkyColor;
	uniform vec3 uLiteGroundColor;
	// トーンマップを掛けるか（0 / 1）と、その前に掛ける露出の倍率。colorCollection.fs の uToneMap / uExposure と同じ意味
	uniform float uLiteToneMap;
	uniform float uLiteExposure;

	// くぼみの暗がり。1 で暗がりなし、0 で真っ暗。SSAO が無いので、シェーダーが自分で計算した値を lite_out の前に入れる
	float outOcclusion = 1.0;

	// dir の向きから届く環境光。空の色の決め方は defaultSky.fs と同じ（地面の色から、空の色の 2 倍へ）。
	// 環境マップをぼかして引く代わりに、blur（0〜1）が大きいほど上下の差を縮める。
	// 1 のときの 2/3 は、高さに比例して変わる空を半球で受けたときの明るさに当たる
	vec3 liteEnvLight( vec3 dir, float blur ) {

		float t = clamp( dir.y * mix( 1.0, 2.0 / 3.0, blur ) * 0.5 + 0.5, 0.0, 1.0 );

		return mix( uLiteGroundColor, uLiteSkyColor * 2.0, t );

	}

#endif
