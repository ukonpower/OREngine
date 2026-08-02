import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

const cubeWgsl = MXP.standardVertexWgsl + /* wgsl */`
@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = material.uColor;
	surface.roughness = 0.35;
	surface.metallic = 0.0;

	return packGBuffer( input, surface );

}
`;

// deferredパスへ入る回転キューブ
export class Cube extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 回転しても角が床を突き抜けない高さ
		this.entity.position.set( 0, 2, 0 );

		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.CubeGeometry( { width: 2, height: 2, depth: 2 } ),
			material: new MXP.Material( {
				name: 'Cube',
				wgsl: cubeWgsl,
				uniforms: {
					uColor: { value: new GLP.Vector( 0.9, 0.5, 0.2 ), type: '3fv' },
				},
			} ),
		} );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.entity.euler.y = event.timeElapsed * 0.6;
		this.entity.euler.x = event.timeElapsed * 0.25;

	}

}
