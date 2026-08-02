import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

const floorWgsl = MXP.standardVertexWgsl + /* wgsl */`
@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	// 影の落ち方が分かるようにチェッカー柄にする
	let checker = ( floor( input.worldPosition.x ) + floor( input.worldPosition.z ) ) % 2.0;

	surface.albedo = mix( material.uColor, material.uColor * 0.5, abs( checker ) );
	surface.roughness = 0.7;
	surface.metallic = 0.0;

	return packGBuffer( input, surface );

}
`;

// シャドウの受け手になる床
export class Floor extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 16, height: 16, floor: true } ),
			material: new MXP.Material( {
				name: 'Floor',
				wgsl: floorWgsl,
				uniforms: {
					uColor: { value: new GLP.Vector( 0.75, 0.75, 0.78 ), type: '3fv' },
				},
			} ),
		} );

	}

}
