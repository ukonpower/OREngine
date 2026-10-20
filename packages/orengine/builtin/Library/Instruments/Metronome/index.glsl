// 拍の頭ごとに短いクリックを鳴らす。小節（4拍）の頭だけ1オクターブ高くする
vec2 trackSound( Song s ) {

	// 拍の頭からの秒
	float t = fract( s.clipBeat ) * s.beatSec;

	float freq = 880.0;

	if ( mod( floor( s.clipBeat ), 4.0 ) < 0.5 ) {

		freq = 1760.0;

	}

	float o = sin( t * freq * 6.28318530718 ) * exp( - t * 60.0 );

	return vec2( o * 0.3 );

}
