import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import yakiSobaFrag from './shaders/yakiSoba.fs';
import yakiSobaVert from './shaders/yakiSoba.vs';
import yakiSobaCompute from './shaders/yakiSobaCompute.glsl';

export class YakiSoba extends MXP.Component {

	private _gpu: MXP.GPUCompute;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const num = new GLP.Vector( 64, 512 );

		// gpu

		this._gpu = new MXP.GPUCompute( {
			passes: [
				new MXP.GPUComputePass( engine.gl, {
					name: "yakisoba",
					size: num,
					dataLayerCount: 2,
					frag: MXP.hotGet( "yakiSobaCompute", yakiSobaCompute ),
					uniforms: MXP.UniformsUtils.merge( {}, engine.uniforms, engine.renderer.globalUniforms ),
				} )
			]
		} );

		this._gpu.passes[ 0 ].initTexture( ( l, _x, _y ) => {

			if ( l == 0.0 ) {

				return [ 0, 0, 0, 0 ];

			} else {

				return [ 0.0, 0.0, 0.0, 0.0 ];

			}

		} );

		// geometry

		const geometry = new MXP.CubeGeometry( {
			width: 0.05,
			height: 0.05,
			depth: 0.05,
			segmentsHeight: num.x,
		} );

		const trailIdArray = [];
		const idArray = [];

		for ( let i = 0; i < num.y; i ++ ) {

			trailIdArray.push( i / num.y );

			idArray.push( Math.random(), Math.random(), Math.random() );

		}

		geometry.setAttribute( "trailId", new Float32Array( trailIdArray ), 1, { instanceDivisor: 1 } );
		geometry.setAttribute( "id", new Float32Array( idArray ), 3, { instanceDivisor: 1 } );

		// material

		const material = new MXP.Material( {
			frag: MXP.hotGet( 'chainFrag', yakiSobaFrag ),
			vert: MXP.hotGet( 'chainVert', yakiSobaVert ),
			phase: [ 'deferred', 'shadowMap' ],
			uniforms: MXP.UniformsUtils.merge( {}, this._gpu.passes[ 0 ].outputUniforms )
		} );

		// mesh

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material
		} );

		// hot

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/yakiSobaCompute.glsl', ( module ) => {

				if ( module ) {

					this._gpu.passes[ 0 ].frag = MXP.hotUpdate( 'yakiSobaCompute', module.default );

					this._gpu.passes[ 0 ].requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/yakiSoba.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'chainFrag', module.default );

					mesh.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/yakiSoba.vs', ( module ) => {

				if ( module ) {

					mesh.material.vert = MXP.hotUpdate( 'chainVert', module.default );

					mesh.material.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.entity.isVisibleTraverse() ) {

			return;

		}

		this._gpu.compute( event.renderer );

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );
		this._gpu.dispose();

	}

}
