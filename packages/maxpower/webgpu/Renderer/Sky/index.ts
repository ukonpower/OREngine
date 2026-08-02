import * as GLP from 'glpower';

import { Mesh } from '../../../core/Component/Mesh';
import { SphereGeometry } from '../../../core/Geometry/SphereGeometry';
import { Material } from '../../Material';
import { standardVertexWgsl } from '../../Material/shaders/basic';

import type { Engine } from '../../../core/Engine';
import type { Entity } from '../../../core/Entity';

/*-------------------------------
	空

	webgl側の RendererSky と同じく、レンダラーが所有する半径500の球。
	deferred（背景として見える）と envMap（環境光の元になる）の両方に参加する。
	マテリアルは差し替え可能で、プロジェクト側のコンポーネントが
	`renderer.sky.mesh.material` を置き換えれば独自の空になる。
-------------------------------*/

const skyWgsl = standardVertexWgsl + /* wgsl */`
// 上向きほど空色、下向きほど地面色
fn skyColor( normal: vec3f ) -> vec3f {

	let t = clamp( dot( normalize( normal ), vec3f( 0.0, 1.0, 0.0 ) ) * 0.5 + 0.5, 0.0, 1.0 );

	return mix( material.uGroundColor, material.uSkyColor * 2.0, t ) * material.uSkyIntensity;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	// ライティングを受けず、放射だけで色を出す
	surface.albedo = vec3f( 0.0 );
	surface.emission = skyColor( input.normal );
	surface.roughness = 1.0;
	surface.envIntensity = 0.0;

	return packGBuffer( input, surface );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	return vec4f( skyColor( input.normal ), 1.0 );

}
`;

export class Sky {

	public readonly entity: Entity;
	public readonly mesh: Mesh;
	public readonly material: Material;
	public readonly color: GLP.Vector;
	public readonly groundColor: GLP.Vector;

	private _intensity: number;

	constructor( engine: Engine ) {

		this.color = new GLP.Vector( 1.0, 1.0, 1.0 );
		this.groundColor = new GLP.Vector( 0.3, 0.3, 0.3 );
		this._intensity = 1.0;

		this.material = new Material( {
			name: 'sky',
			phase: [ 'deferred', 'envMap' ],
			wgsl: skyWgsl,
			uniforms: {
				uSkyColor: { value: this.color, type: '3fv' },
				uGroundColor: { value: this.groundColor, type: '3fv' },
				uSkyIntensity: { value: this._intensity, type: '1f' },
			},
		} );

		this.entity = engine.createEntity( { name: 'sky' } );
		this.mesh = this.entity.addComponent( Mesh );
		this.mesh.geometry = new SphereGeometry( { radius: 500, widthSegments: 32, heightSegments: 32 } );
		this.mesh.material = this.material;

	}

	public get intensity(): number {

		return this._intensity;

	}

	public set intensity( value: number ) {

		this._intensity = value;
		this.material.uniforms.uSkyIntensity.value = value;

	}

}
