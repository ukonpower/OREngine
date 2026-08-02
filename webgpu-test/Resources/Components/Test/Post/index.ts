import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

// プロジェクト側から差し込むポストプロセスの見本。走っていれば四隅がわずかに色づく
const tintWgsl = /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;
	let edge = length( input.uv - 0.5 ) * 1.4;

	return vec4f( mix( color, color * pp.uTint, edge * edge ), 1.0 );

}
`;

// PostProcessPipeline コンポーネントの口を webgpu-test で使う例
export class Post extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.addComponent( MXP.PostProcessPipeline ).add( {
			name: 'tint',
			wgsl: tintWgsl,
			uniforms: {
				uTint: { value: new GLP.Vector( 1.05, 0.96, 0.9 ), type: '3fv' },
			},
		} );

	}

}
