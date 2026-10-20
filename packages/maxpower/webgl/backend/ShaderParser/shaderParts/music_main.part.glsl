// Music の生成シェーダーの main。ShaderBuilder が楽器の index.glsl の後ろに足す（宣言は music.module.glsl）
void main( void ) {

	Song s;
	s.time = uBlockTime + aIndex / uSampleRate;
	s.beatSec = 60.0 / uBPM;
	s.beat = s.time / s.beatSec;
	s.clipBeat = uClipBeat + aIndex / uSampleRate / s.beatSec;
	s.clipParam = uClipParam;

	vec2 o = trackSound( s );

	o_left = o.x;
	o_right = o.y;

}
