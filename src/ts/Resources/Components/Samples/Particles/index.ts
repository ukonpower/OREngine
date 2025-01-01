import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import particlesFrag from './shaders/particles.fs';
import particlesCompute from './shaders/particles.glsl';
import particlesVert from './shaders/particles.vs';

import { gl, globalUniforms } from '~/ts/Globals';

export class Particles extends MXP.Component {

	private gpu: MXP.GPUCompute;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const size = new GLP.Vector( 256, 256 );

		// this.gpu = this.entity.addComponent( MXP.GPUCompute, {
		// 	renderer,
		// 	passes: [
		// 		new MXP.GPUComputePass( {
		// 			name: "particles",
		// 			gl,
		// 			size,
		// 			dataLayerCount: 2,
		// 			frag: particlesCompute,
		// 			uniforms: MXP.UniformsUtils.merge( {
		// 			}, globalUniforms.time ),
		// 		} )
		// 	]
		// } );

		// this.gpu.passes[ 0 ].initTexture( ( l, x, y ) => {

		// 	return [ 0, 0, 0, Math.random() ];

		// } );

		let geometry = new MXP.SphereGeometry( {
			widthSegments: 1,
			heightSegments: 1,
		} );

		const computeUVArray = [];
		const idArray = [];

		for ( let i = 0; i < size.x; i ++ ) {

			for ( let j = 0; j < size.y; j ++ ) {

				computeUVArray.push( i / size.x, j / size.y );

				idArray.push( Math.random(), Math.random(), Math.random(), Math.random() );

			}

		}

		geometry = new MXP.SphereGeometry();
		geometry.setAttribute( "id", new Float32Array( idArray ), 4, { instanceDivisor: 1 } );
		geometry.setAttribute( "cuv", new Float32Array( computeUVArray ), 2, { instanceDivisor: 1 } );


		// mesh

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material: new MXP.Material( {
				phase: [ "deferred", "shadowMap" ],
				frag: particlesFrag,
				vert: particlesVert,
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, this.gpu.passes[ 0 ].outputUniforms ),
			} )
		} );

		if ( process.env.NODE_ENV === 'development' ) {

			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/particles.glsl', ( module ) => {

					if ( module ) {

						this.gpu.passes[ 0 ].frag = MXP.hotUpdate( 'particlesCompute', module.default );

						this.gpu.passes[ 0 ].requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/particles.fs', ( module ) => {

					if ( module ) {

						mesh.material.frag = MXP.hotUpdate( 'particlesFrag', module.default );

						mesh.material.requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/particles.vs', ( module ) => {

					if ( module ) {

						mesh.material.vert = MXP.hotUpdate( 'particlesVert', module.default );

						mesh.material.requestUpdate();

					}


				} );

			}

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.gpu.compute();

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );
		this.entity.removeComponent( MXP.GPUCompute );

	}

}
