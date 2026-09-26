#include <module:common>

// 肌の拡散プロファイルでの分離可能ブラー（Jimenez 式）。横 → 縦の2回かける。
// 横は diffuse をぼかすだけ。縦はシェーディング結果の diffuse を、ぼかした diffuse へ置き換える。
// 境界の扱いは ssaoBlur と同じ（法線と深度が離れたサンプルの重みを下げる）

// uniforms

uniform sampler2D uDiffuseTexture;
uniform sampler2D uShadingTexture;
uniform sampler2D uShadingDiffuseTexture;
uniform sampler2D uAlbedoTexture;
uniform sampler2D uNormalTexture;
uniform sampler2D uPosTexture;

uniform vec3 uCameraPosition;
uniform mat4 uProjectionMatrix;

uniform float uSSSRadius;

// [ r, g, b, 中心からの距離（0〜1） ]。中心から片側ぶん（core/utils/SSSKernel）
uniform vec4 uKernel[SSS_SAMPLES];

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

const float alpha = 32.0;
const float beta = 0.25;

// 深度はgBufferのワールド座標からカメラ距離として求める（gBuffer[0].w には emission が入っているので使えない）
float viewDepth( vec2 uv ) {

	return length( texture( uPosTexture, uv ).xyz - uCameraPosition );

}

// 法線・深度の近さと、サンプル先の SSS の強さで決まる重み（SSS の無い面から色を持ち込まない）
float getWeight( vec2 uv, vec3 normalBasis, float depthBasis ) {

	vec3 normalOffset = texture( uNormalTexture, uv ).xyz;
	float depthOffset = viewDepth( uv );
	float bilateralWeight = pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, alpha ) * pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), beta );

	return bilateralWeight * texture( uAlbedoTexture, uv ).w;

}

void main( void ) {

	vec3 diffuse = texture( uDiffuseTexture, vUv ).xyz;
	float sss = texture( uAlbedoTexture, vUv ).w;

	vec2 direction;

	#ifdef IS_VIRT

		direction = vec2( 0.0, 1.0 );

	#else

		direction = vec2( 1.0, 0.0 );

	#endif

	vec3 blurred = diffuse;

	if( sss > 0.0 ) {

		vec3 normalBasis = texture( uNormalTexture, vUv ).xyz;
		float depthBasis = viewDepth( vUv );

		// 散乱半径（ワールド単位）を画面の UV の長さへ直す。遠いほど短くなり、SSS の強さに比例して広がる
		vec2 radiusUV = direction * uSSSRadius * sss * 0.5 * vec2( uProjectionMatrix[ 0 ][ 0 ], uProjectionMatrix[ 1 ][ 1 ] ) / depthBasis;

		vec3 weight = uKernel[ 0 ].xyz * getWeight( vUv, normalBasis, depthBasis );
		vec3 sum = diffuse * weight;

		for( int i = 1; i < SSS_SAMPLES; i++ ) {

			vec2 offset = radiusUV * uKernel[ i ].w;

			vec2 uvOffsetP = vUv + offset;
			vec2 uvOffsetN = vUv - offset;

			vec3 wP = uKernel[ i ].xyz * getWeight( uvOffsetP, normalBasis, depthBasis );
			vec3 wN = uKernel[ i ].xyz * getWeight( uvOffsetN, normalBasis, depthBasis );

			sum += texture( uDiffuseTexture, uvOffsetP ).xyz * wP;
			sum += texture( uDiffuseTexture, uvOffsetN ).xyz * wN;

			weight += wP + wN;

		}

		blurred = sum / weight;

	}

	#ifdef IS_VIRT

		outColor = vec4( texture( uShadingTexture, vUv ).xyz - texture( uShadingDiffuseTexture, vUv ).xyz + blurred, 1.0 );

	#else

		outColor = vec4( blurred, 1.0 );

	#endif

}
