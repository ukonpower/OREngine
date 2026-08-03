// demo-webgl の OREngineLogo/shaders/main.fs のWGSL移植。
// webgl側はオブジェクト空間座標(vPosBase)で "OR" 部分を判定するが、
// このエンティティは平行移動のみ（回転・スケール無し）かつx=0のため、
// worldPosition.x で同じ判定になる

#include <module:noise>

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	let vNoise = noiseValue( vec3f( frame.uTimeE * 8.0 ) );

	let orPart = step( input.worldPosition.x, - 0.2 );
	let flash = ( 1.0 - smoothstep( 0.0, 0.3, vNoise ) ) * orPart;

	surface.albedo = vec3f( 1.0 );
	surface.emission = vec3f( ( 1.0 - flash * 0.7 ) * 3.0 );
	surface.roughness = 0.3;

	return packGBuffer( input, surface );

}
