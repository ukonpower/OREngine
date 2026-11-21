#include <module:common>

// uniforms

uniform vec2 uPPPixelSize;
uniform sampler2D uNormalTexture;
uniform sampler2D uPosTexture;
uniform sampler2D uSelectorTexture;

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

// 中心から両隣への位置の差のうち短い方を返す。hasNext / hasPrev はその側の隣が画面の中にあるか。
// 画面の外の隣は clamp-to-edge で中心と同じ画素が返り、差が 0 になって必ず短い方に選ばれる。
// 0 の差からは cross が 0 になり法線が NaN になる（selector が 0 でも mix が NaN を返す）ので、端では内側の差を使う
vec3 nearerDiff( vec3 diffNext, vec3 diffPrev, bool hasNext, bool hasPrev ) {

	if ( ! hasNext ) return diffPrev;
	if ( ! hasPrev ) return diffNext;
	if ( length( diffNext ) < length( diffPrev ) ) return diffNext;

	return diffPrev;

}

void main( void ) {

	vec4 normalTex = texture( uNormalTexture, vUv );
	vec4 positionTex = texture( uPosTexture, vUv );

	vec3 center = texture( uPosTexture, vUv ).xyz;
	vec3 right = texture( uPosTexture, vUv + vec2( uPPPixelSize.x, 0.0 ) ).xyz;
	vec3 top = texture( uPosTexture, vUv + vec2( 0.0, uPPPixelSize.y ) ).xyz;
	vec3 left = texture( uPosTexture, vUv + vec2( -uPPPixelSize.x, 0.0 ) ).xyz;
	vec3 bottom = texture( uPosTexture, vUv + vec2( 0.0, -uPPPixelSize.y ) ).xyz;
	vec3 dx1 = right - center;
    vec3 dy1 = top - center;
	vec3 dx2 = -(left - center);
    vec3 dy2 = -(bottom - center);

	// 画素の中心の uv から1画素進めて 0〜1 を出たら、その側の隣は画面の外
	bool hasRight = vUv.x + uPPPixelSize.x < 1.0;
	bool hasLeft = vUv.x - uPPPixelSize.x > 0.0;
	bool hasTop = vUv.y + uPPPixelSize.y < 1.0;
	bool hasBottom = vUv.y - uPPPixelSize.y > 0.0;

	vec3 calcNormal = normalize(cross(
		nearerDiff( dx1, dx2, hasRight, hasLeft ),
		nearerDiff( dy1, dy2, hasTop, hasBottom )
	));

	vec4 tex3 = texture( uSelectorTexture, vUv );

	vec3 normal = mix( normalTex.xyz, calcNormal, tex3.z);

	outColor = vec4( normal, normalTex.w );

}