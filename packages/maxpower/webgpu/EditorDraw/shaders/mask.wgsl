// 選択シルエット。白で塗りつぶす

#include "../../render/Material/shaders/standardVertex.wgsl"

@fragment
fn fsForward( _input: VertexOutput ) -> @location(0) vec4f {

	return vec4f( 1.0, 1.0, 1.0, 1.0 );

}
