// 光の筋のならし。レイマーチのジッタが残したざらつきを消す。縦横で2回かける（IS_VIRT で縦）。
// 筋そのものは低周波なので、手前の面と奥の空間をまたいで滲まないぶんだけ重みを落とせば足りる。
// webgpu 側の lightShaftBlur.wgsl と同じ処理

// uniforms

uniform sampler2D uLightShaftTexture;
uniform sampler2D uPosTexture;
uniform vec2 uPPPixelSize;
uniform vec3 uCameraPosition;

uniform float uWeights[BLUR_SAMPLES];

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

// カメラ距離がこれだけ離れると重みが半分になる
const float DEPTH_FALLOFF = 1.0;

// gBufferに何も書かれていない画素の扱い。カメラ位置に依らず一定にしたいので、
// 原点までの距離ではなく決め打ちの遠方を返す（lightShaft がレイを伸ばす距離と同じ）
const float BACKGROUND_DEPTH = 100.0;

// gBufferのワールド座標からカメラ距離を求める
float viewDepth( vec2 uv ) {

	vec3 gPos = texture( uPosTexture, uv ).xyz;

	if( dot( gPos, gPos ) == 0.0 ) {

		return BACKGROUND_DEPTH;

	}

	return length( gPos - uCameraPosition );

}

// 基準の画素とカメラ距離が離れているほど小さくなる重み
float depthWeight( vec2 uv, float depthBasis ) {

	return 1.0 / ( 1.0 + abs( viewDepth( uv ) - depthBasis ) / DEPTH_FALLOFF );

}

void main( void ) {

	vec2 direction;

	#ifdef IS_VIRT

		direction = vec2( 0.0, 1.0 );

	#else

		direction = vec2( 1.0, 0.0 );

	#endif

	float depthBasis = viewDepth( vUv );

	vec3 sum = texture( uLightShaftTexture, vUv ).xyz * uWeights[ 0 ];
	float weight = uWeights[ 0 ];

	for( int i = 1; i < BLUR_SAMPLES; i ++ ) {

		vec2 offset = float( i ) * direction * uPPPixelSize;

		vec2 uvP = vUv + offset;
		vec2 uvN = vUv - offset;

		float wP = depthWeight( uvP, depthBasis ) * uWeights[ i ];
		float wN = depthWeight( uvN, depthBasis ) * uWeights[ i ];

		sum += texture( uLightShaftTexture, uvP ).xyz * wP;
		sum += texture( uLightShaftTexture, uvN ).xyz * wN;

		weight += wP + wN;

	}

	outColor = vec4( sum / weight, 1.0 );

}
