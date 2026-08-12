import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from 'orengine';

import dustFrag from './shaders/dust.fs';
import dustVert from './shaders/dust.vs';

export class Dust extends MXP.Component {

	constructor( params: MXP.ComponentParams<{num?: number} | void> ) {

		super( params );

		const engine = this.engine as Engine;

		const geometry = new MXP.Geometry();

		const count = params.args?.num || 2048;

		const range = new MTP.Vector( 20.0, 5.0, 20.0 );

		const positionArray = [];
		const sizeArray = [];

		for ( let i = 0; i < count; i ++ ) {

			positionArray.push( ( Math.random() - 0.5 ) * range.x );
			positionArray.push( ( Math.random() - 0.5 ) * range.y );
			positionArray.push( ( Math.random() - 0.5 ) * range.z );

			sizeArray.push( Math.random( ) );

		}

		geometry.setAttribute( "position", new Float32Array( positionArray ), 3 );

		const material = new MXP.Material( {
			phase: [ 'forward' ],
			drawType: "POINTS",
			frag: dustFrag,
			vert: dustVert,
			uniforms: MXP.UniformsUtils.merge( engine.uniforms ),
		} );

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
		} );

		if ( process.env.NODE_ENV === 'development' ) {

			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/dust.fs', ( module ) => {

					if ( module ) {

						mesh.material.frag = MXP.hotUpdate( 'dustFrag', module.default );

						mesh.material.requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/dust.vs', ( module ) => {

					if ( module ) {

						mesh.material.vert = MXP.hotUpdate( 'dustVert', module.default );

						mesh.material.requestUpdate();

					}


				} );

			}

		}

	}

	public dispose(): void {

		super.dispose();

		this.entity.removeComponent( MXP.Mesh );

	}

}
