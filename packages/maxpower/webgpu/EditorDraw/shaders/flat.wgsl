// gizmo / helper / wireframe。単色で塗るだけ

#include "../../render/Material/shaders/standardVertex.wgsl"

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	return vec4f( material.uColor, 1.0 );

}
