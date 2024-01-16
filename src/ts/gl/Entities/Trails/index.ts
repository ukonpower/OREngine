import * as MXP from 'maxpower';
import * as GLP from 'glpower';

import { gl, globalUniforms, midimix, mpkmini } from '~/ts/Globals';

import trailsVert from './shaders/trails.vs';
import trailsFrag from './shaders/trails.fs';
import trailsCompute from './shaders/trailsCompute.glsl';

export class Trails extends MXP.Entity {

	private gpu: MXP.GPUComputePass;
	private commonUniforms: GLP.Uniforms;

	constructor() {

		super();

		const count = new GLP.Vector( 128, 512 );

		this.commonUniforms = GLP.UniformsUtils.merge( {
			uMidi: {
				value: midimix.vectorsLerped[ 2 ],
				type: "4fv"
			},
			uMidi2: {
				value: mpkmini.vectorsLerped[ 1 ],
				type: "4fv"
			},
			uVisibility: {
				value: 0,
				type: "1f"
			}
		} );

		// gpu

		this.gpu = new MXP.GPUComputePass( gl, {
			name: 'gpu/trails',
			size: count,
			layerCnt: 2,
			frag: trailsCompute,
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, this.commonUniforms ),
		} );

		this.gpu.initTexture( ( l, x, y ) => {

			return [ 0, 0, 0, Math.random() ];

		} );

		this.addComponent( "gpuCompute", new MXP.GPUCompute( { passes: [
			this.gpu
		] } ) );

		// geometry

		const range = new GLP.Vector( 10.0, 5.0, 10.0 );

		const idArray = [];

		for ( let i = 0; i < count.y; i ++ ) {

			idArray.push( i / count.y, Math.random(), Math.random() );

		}

		const geo = this.addComponent( "geometry", new MXP.CubeGeometry( 0.05, 0.05, 0.05, 1.0, count.x ) );
		geo.setAttribute( "id", new Float32Array( idArray ), 3, { instanceDivisor: 1 } );

		// material

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "fluid",
			type: [ "deferred", 'shadowMap' ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, this.gpu.uniforms, this.commonUniforms, globalUniforms.audio, {
				uRange: {
					value: range,
					type: "3f"
				},
			} ),
			vert: MXP.hotGet( 'trailsVert', trailsVert ),
			frag: MXP.hotGet( 'trailsFrag', trailsFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( [ "./shaders/trails.vs", "./shaders/trails.fs" ], ( module ) => {

				if ( module[ 0 ] ) {

					mat.vert = MXP.hotUpdate( 'trailsVert', module[ 0 ].default );

				}

				if ( module[ 1 ] ) {

					mat.frag = MXP.hotUpdate( 'trailsFrag', module[ 1 ].default );

				}

				mat.requestUpdate();

			} );

			import.meta.hot.accept( "./shaders/trailsCompute.glsl", ( module ) => {

				if ( module ) {

					this.gpu.frag = MXP.hotUpdate( "trailsCompute", module.default );
					this.gpu.requestUpdate();

				}

			} );

		}

	}

	protected appendBlidgerImpl( blidger: MXP.BLidger ): void {

		this.gpu.uniforms = GLP.UniformsUtils.merge( this.gpu.uniforms, blidger.uniforms );

	}

	public set trailVisibility( value: number ) {

		this.commonUniforms.uVisibility.value = value;

	}

}
