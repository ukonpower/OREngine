import * as MXP from 'maxpower';

import * as GLP from 'glpower';

import { gl, globalUniforms } from '~/ts/Globals';

import fluidParticlesVert from './shaders/fluidParticles.vs';
import fluidParticlesFrag from './shaders/fluidParticles.fs';
import fluidParticlesCompute from './shaders/fluidParticlesCompute.glsl';

export class FluidParticles extends MXP.Entity {

	private gpu: MXP.GPUComputePass;
	private commonUniforms: GLP.Uniforms;

	constructor() {

		super();

		const count = new GLP.Vector( 64, 64 );

		this.commonUniforms = GLP.UniformsUtils.merge( globalUniforms.time );

		/*-------------------------------
			GPU
		-------------------------------*/

		this.gpu = new MXP.GPUComputePass( gl, {
			name: 'gpu/fluidParticle',
			size: count,
			layerCnt: 2,
			frag: MXP.hotGet( 'fluidParticlesCompute', fluidParticlesCompute ),
			uniforms: GLP.UniformsUtils.merge( this.commonUniforms ),
		} );

		this.gpu.initTexture( ( l, x, y ) => {

			return [ 0, 0, 0, Math.random() ];

		} );

		this.addComponent( "gpuCompute", new MXP.GPUCompute( { passes: [
			this.gpu
		] } ) );

		/*-------------------------------
			Geometry
		-------------------------------*/

		const computeUVArray = [];
		const rndArray = [];

		for ( let i = 0; i < count.y; i ++ ) {

			for ( let j = 0; j < count.x; j ++ ) {

				computeUVArray.push( j / count.x, i / count.y );
				rndArray.push( Math.random(), Math.random(), Math.random() );

			}

		}

		const geo = this.addComponent( "geometry", new MXP.CubeGeometry( 0.1, 0.1, 0.1 ) );
		geo.setAttribute( "computeUV", new Float32Array( computeUVArray ), 2, { instanceDivisor: 1 } );
		geo.setAttribute( "rnd", new Float32Array( rndArray ), 3, { instanceDivisor: 1 } );

		/*-------------------------------
			Material
		-------------------------------*/

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "fluid",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( this.commonUniforms, this.gpu.outputUniforms, {
			} ),
			vert: MXP.hotGet( 'fluidParticlesVert', fluidParticlesVert ),
			frag: MXP.hotGet( 'fluidParticlesFrag', fluidParticlesFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( [ "./shaders/fluidParticles.vs", "./shaders/fluidParticles.fs" ], ( module ) => {

				if ( module[ 0 ] ) {

					mat.vert = MXP.hotUpdate( 'fluidParticlesVert', module[ 0 ].default );

				}

				if ( module[ 1 ] ) {

					mat.frag = MXP.hotUpdate( 'fluidParticlesFrag', module[ 1 ].default );

				}

				mat.requestUpdate();

			} );

			import.meta.hot.accept( "./shaders/fluidParticlesCompute.glsl", ( module ) => {

				if ( module ) {

					this.gpu.frag = MXP.hotUpdate( "fluidParticlesCompute", module.default );
					this.gpu.requestUpdate();

				}

			} );

		}

	}

}
