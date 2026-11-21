// noteSound の楽器の trackSound。ShaderBuilder が楽器の index.glsl の後ろ（main の前）に足す。
// Music の notes.ts がノートを同時に鳴らせる数（maxNotes）の枠に割り当てて uNotes に入れるので、
// 枠ごとに今のサンプルで鳴っているノートを1つだけ探して noteSound を足し合わせる

// 1行が1つの枠で、枠の中は開始の順。ノート1つに1画素で ( 開始, 止める時刻, 長さ, 音高 )（時刻は曲の頭からの秒）。
// 並びは Music の notes.ts の buildNoteTexture と一致させる
// 頂点シェーダーの sampler の既定の精度は lowp で、端末によっては時刻の float が丸まるので highp にする
uniform highp sampler2D uNotes;

vec2 trackSound( Song s ) {

	vec2 o = vec2( 0.0 );

	// ノートの時刻は曲の頭からの秒。ノートは帯と一緒に動くので、帯の中身が置いた位置によらないことは変わらない
	float time = uBlockTime + aIndex / uSampleRate;

	ivec2 size = textureSize( uNotes, 0 );
	int count = size.x;

	for ( int slot = 0; slot < size.y; slot ++ ) {

		// 開始が今より後の最初のノートを二分探索で探す。その1つ前が、今鳴っているかもしれないノート
		int low = 0;
		int high = count;

		while ( low < high ) {

			int mid = ( low + high ) / 2;

			if ( texelFetch( uNotes, ivec2( mid, slot ), 0 ).x <= time ) {

				low = mid + 1;

			} else {

				high = mid;

			}

		}

		if ( low == 0 ) continue;

		vec4 timing = texelFetch( uNotes, ivec2( low - 1, slot ), 0 );

		if ( time >= timing.y ) continue;

		Note n;
		n.pitch = timing.w;
		n.length = timing.z;
		n.clipParam = s.clipParam;

		o += noteSound( n, time - timing.x );

	}

	return o;

}
