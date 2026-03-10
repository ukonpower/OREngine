import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import particlesFrag from './shaders/particles.fs';
import particlesCompute from './shaders/particles.glsl';
import particlesVert from './shaders/particles.vs';

import { gl } from '~/ts/Globals';

export class GPUParticles extends MXP.Component {

	private _gpu: MXP.GPUCompute;
	private _timeUniforms: GLP.Uniforms;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const size = new GLP.Vector( 64, 64 );

		this._timeUniforms = {
			uTimeE: { value: 0, type: "1f" },
		};

		const commonUniforms = MXP.UniformsUtils.merge( this._timeUniforms );

		this._gpu = new MXP.GPUCompute( {
			passes: [
				new MXP.GPUComputePass( gl, {
					name: "particles",
					size,
					dataLayerCount: 2,
					frag: particlesCompute,
					uniforms: commonUniforms,
				} )
			]
		} );

		this._gpu.passes[ 0 ].initTexture( ( _l, _x, _y ) => {

			return [ 0, 0, 0, Math.random() ];

		} );

		const geometry = new MXP.SphereGeometry( {
			widthSegments: 32,
			heightSegments: 16,
			radius: 0.2
		} );

		const computeUVArray: number[] = [];
		const idArray: number[] = [];

		for ( let i = 0; i < size.x; i ++ ) {

			for ( let j = 0; j < size.y; j ++ ) {

				computeUVArray.push( i / size.x, j / size.y );

				idArray.push( Math.random(), Math.random(), Math.random(), Math.random() );

			}

		}

		geometry.setAttribute( "id", new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
		geometry.setAttribute( "cuv", new Float32Array( computeUVArray ), 2, { instanceDivisor: 1 } );

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material: new MXP.Material( {
				phase: [ "deferred", "shadowMap" ],
				frag: MXP.hotGet( 'gpuParticlesFrag', particlesFrag ),
				vert: MXP.hotGet( 'gpuParticlesVert', particlesVert ),
				uniforms: MXP.UniformsUtils.merge(
					commonUniforms,
					this._gpu.passes[ 0 ].outputUniforms,
				),
			} )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/particles.glsl', ( module ) => {

				if ( module ) {

					this._gpu.passes[ 0 ].frag = MXP.hotUpdate( 'gpuParticlesCompute', module.default );
					console.log(this._gpu.passes[ 0 ].frag);
					

					this._gpu.passes[ 0 ].requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/particles.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'gpuParticlesFrag', module.default );

					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/particles.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = MXP.hotUpdate( 'gpuParticlesVert', module.default );

					mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.entity.isVisibleTraverse() ) return;

		this._timeUniforms.uTimeE.value = event.timeElapsed;

		this._gpu.compute( event.renderer );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );
		this._gpu.dispose();

	}

}
