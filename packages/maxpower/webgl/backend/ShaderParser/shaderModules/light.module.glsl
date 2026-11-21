struct DirectionalLight {
	vec3 direction;
	vec3 color;
};

struct SpotLight {
	vec3 position;
	vec3 direction;
	vec3 color;
	float angle;
	float blend;
};

struct LightCamera {
	float near;
	float far;
	mat4 uViewMatrix;
	mat4 uProjectionMatrix;
	vec2 resolution;
};

struct Light {
	vec3 direction;
	vec3 color;
};

#if NUM_LIGHT_DIR > 0 

	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];
	// 影を落とすライトが無いと長さ0の配列になり、コンパイルエラーになる
	#if NUM_SHADOWMAP_DIR > 0
		uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];
	#endif
	
#endif

#if NUM_LIGHT_SPOT > 0 

	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];
	#if NUM_SHADOWMAP_SPOT > 0
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];
	#endif
	
#endif

// shadowmap

// シャドウマップから読んだ奥行きと比べ、光が届くなら 1、影なら 0 を返す
float compareShadowDepth( float lightDepth, float shadowMapDepth, vec2 shadowCoord, float depthOffset ) {

	// シャドウマップは白（約 1.004）でクリアするので、ライトカメラの far より先も影にならないよう奥行きも範囲を見る（webgpu の shadow.wgsl の inside と同じ）
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 && lightDepth >= 0.0 && lightDepth <= 1.0 ) {

		return step( lightDepth, shadowMapDepth + depthOffset );

	}

	return 1.0;

}

// shadow

void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {
	
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;
	
	float lightNear = camera.near;
	float lightFar = camera.far;
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );

}

float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {

	vec2 shadowCoord;
	float lightDepth;

	setShadowCoord( pos, camera, shadowCoord, lightDepth );

	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );

	return compareShadowDepth( lightDepth, shadowMapDepth, shadowCoord, depthOffset );

}

// テクセル1つを読んで比べる。シャドウマップは LINEAR で引く設定なので、texture() だと比べる前の奥行きが補間されてしまう（双線形の比較は、テクセルごとに比べた 0/1 を混ぜる）
float compareShadowTexel( float lightDepth, sampler2D shadowMap, ivec2 texel, vec2 resolution, float depthOffset ) {

	float shadowMapDepth = rgbaToFloat( texelFetch( shadowMap, texel, 0 ) );
	vec2 texelCoord = ( vec2( texel ) + 0.5 ) / resolution;

	return compareShadowDepth( lightDepth, shadowMapDepth, texelCoord, depthOffset );

}

// 近くの4テクセルをそれぞれ比べ、位置に応じて混ぜる（webgpu の比較サンプラーの linear と同じ双線形の比較）
float compareShadowDepthBilinear( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, vec2 resolution, float depthOffset ) {

	// テクセルの中心どうしの間で混ぜるので、中心が整数になるよう 0.5 ずらす
	vec2 texelPos = shadowCoord * resolution - 0.5;
	ivec2 base = ivec2( floor( texelPos ) );
	vec2 blend = fract( texelPos );

	float shadow00 = compareShadowTexel( lightDepth, shadowMap, base, resolution, depthOffset );
	float shadow10 = compareShadowTexel( lightDepth, shadowMap, base + ivec2( 1, 0 ), resolution, depthOffset );
	float shadow01 = compareShadowTexel( lightDepth, shadowMap, base + ivec2( 0, 1 ), resolution, depthOffset );
	float shadow11 = compareShadowTexel( lightDepth, shadowMap, base + ivec2( 1, 1 ), resolution, depthOffset );

	float shadowBottom = mix( shadow00, shadow10, blend.x );
	float shadowTop = mix( shadow01, shadow11, blend.x );

	return mix( shadowBottom, shadowTop, blend.y );

}

// 1テクセル間隔の 3×3 の PCF。タップの置き方は webgpu の shadow.wgsl の sampleShadow と同じ
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {

	vec2 shadowCoord;
	float lightDepth;

	setShadowCoord( pos, camera, shadowCoord, lightDepth );

	vec2 texelSize = 1.0 / camera.resolution;
	float shadowSum = 0.0;

	for( int y = -1; y <= 1; y++ ) {

		for( int x = -1; x <= 1; x++ ) {

			vec2 offset = vec2( float( x ), float( y ) ) * texelSize;

			shadowSum += compareShadowDepthBilinear( lightDepth, shadowMap, shadowCoord + offset, camera.resolution, depthOffset );

		}

	}

	return shadowSum / 9.0;

}

float ggx( float dNH, float roughness ) {
	
	float a2 = roughness * roughness;
	a2 = a2 * a2;
	float dNH2 = dNH * dNH;

	if( dNH2 <= 0.0 ) return 0.0;

	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );

}

vec3 lambert( vec3 diffuseColor ) {

	return diffuseColor / PI;

}

float gSchlick( float d, float k ) {

	if( d == 0.0 ) return 0.0;

	return d / ( d * ( 1.0 - k ) + k );
	
}

float gSmith( float dNV, float dNL, float roughness ) {

	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );

	return gSchlick( dNV, k ) * gSchlick( dNL, k );
	
}

float fresnel( float d ) {
	
	float f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

// 1灯ぶんの反射を diffuse と specular に分けて足す（SSS が diffuse だけをぼかすため）
void RE( Geometry geo, Material mat, Light light, inout vec3 diffuse, inout vec3 specular ) {

	vec3 lightDir = normalize( light.direction );
	vec3 halfVec = normalize( geo.viewDir + lightDir );

	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );

	vec3 irradiance = light.color * dNL;

	float D = ggx( dNH, mat.roughness );
	float G = gSmith( dNV, dNL, mat.roughness );
	float F = fresnel( dLH );

	diffuse += lambert( mat.diffuseColor ) * irradiance * ( 1.0 - F );
	specular += (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance;

}