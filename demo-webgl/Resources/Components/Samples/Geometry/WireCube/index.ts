import * as MXP from 'maxpower';

import { Engine } from 'orengine';

import cubeWireFrag from './shaders/cubeWire.fs';
import cubeWireVert from './shaders/cubeWire.vs';

export class WireCube extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		const w = 3.3;
		const hw = w / 2.0;

		const geo = new MXP.CubeGeometry( {
			width: 0.01,
			height: w,
			depth: 0.01,
			segmentsHeight: 16
		} );


		const posArray: number[] = [];
		const rotArray: number[] = [];

		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 4; j ++ ) {

				const pos = [
					[ hw, 0.0, hw ],
					[ hw, 0.0, - hw ],
					[ - hw, 0.0, hw ],
					[ - hw, 0.0, - hw ],
				][ j ];

				pos.forEach( i => {

					posArray.push( i );

				} );


				const rot = [
					[ 0, 0, 0 ],
					[ Math.PI / 2, 0.0, 0 ],
					[ 0, 0.0, Math.PI / 2 ],
				][ i ];

				rot.forEach( i => {

					rotArray.push( i );

				} );

			}

		}

		geo.setAttribute( "instancePos", new Float32Array( posArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "instanceRot", new Float32Array( rotArray ), 3, { instanceDivisor: 1 } );

		const mat = new MXP.Material( {
			phase: [ "deferred" ],
			frag: cubeWireFrag,
			vert: cubeWireVert,
			uniforms: MXP.UniformsUtils.merge(
				engine.uniforms
			)
		} );

		this.entity.addComponent( MXP.Mesh, {
			geometry: geo,
			material: mat
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/cubeWire.vs", ( module ) => {

				if ( module ) {

					mat.vert = MXP.hotUpdate( 'cubeWireVert', module.default );

					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/cubeWire.fs", ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'cubeWireFrag', module.default );

					mat.requestUpdate();

				}

			} );

		}

	}

}
