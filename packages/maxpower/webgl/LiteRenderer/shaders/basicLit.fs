// Material の既定のシェーダー（Material/shaders/basic.fs）に、軽量レンダラーのライティングを足したもの。
// basic.fs 自体に足すと、軽量レンダラーを使わない player のシェーダーにもライティングのコードが入るので、こちらに分けている
// frag_h（uniform の宣言）を module より前に置くのは、minify で関数の引数が uniform の直接参照に置き換わっても、宣言が先に来るようにするため
#include <part:frag_h>
#include <module:common>
#include <part:lite_h>

void main( void ) {

	#include <part:frag_in>
	#include <part:lite_out>
	#include <part:frag_out>

}
