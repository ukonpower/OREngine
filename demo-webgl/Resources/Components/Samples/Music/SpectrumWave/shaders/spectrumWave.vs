#include <module:common>
#include <part:vert_h>

// Music が置くスペクトル（256×1。左が低い周波数で、値は 0〜1）
uniform sampler2D uMusicFreqTex;
uniform float uHeight;

out float vLevel;

void main( void ) {

	#include <part:vert_in>

	// 高い方の半分はほとんど鳴っていないので、低い方の半分を板の幅に広げる
	float level = texture( uMusicFreqTex, vec2( outUv.x * 0.5, 0.5 ) ).x;

	// 板の下の辺は床に置いたまま、上の辺だけを強さに合わせて持ち上げる
	outPos.y = ( outPos.y + 0.5 ) * ( 0.02 + level * uHeight );

	vLevel = level;

	#include <part:vert_out>

}
