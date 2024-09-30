import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import matchMoveFrag from './shaders/matchMove.fs';
import matchMoveVert from './shaders/matchMove.vs';
import matchMoveCompute from './shaders/matchMoveCompute.glsl';
import matchMoveLineVert from './shaders/matchMoveLine.vs';

import { gl, globalUniforms, renderer } from '~/ts/gl/GLGlobals';

export class MatchMove extends MXP.Component {

	private gpu: MXP.GPUCompute;
	private markerEntity: MXP.Entity;
	private lineEntity: MXP.Entity;

	private cameraEntity: MXP.Entity | null;

	constructor() {

		super();

		this.cameraEntity = null;

		const size = new GLP.Vector( 100 + 1, 70 );

		/*-------------------------------
			Compute
		-------------------------------*/

		this.gpu = new MXP.GPUCompute( {
			renderer,
			passes: [
				new MXP.GPUComputePass( {
					gl,
					size,
					dataLayerCount: 1,
					frag: matchMoveCompute,
					uniforms: GLP.UniformsUtils.merge( {
						uGBufferPos: {
							type: "1i",
							value: null
						},
						uViewMatrix: {
							type: "Matrix4fv",
							value: null
						},
						uProjectionMatrix: {
							type: "Matrix4fv",
							value: null
						},
					}, globalUniforms.time ),
				} )
			]
		} );

		this.gpu.passes[ 0 ].initTexture( ( layerCnt, x, y ) => {

			return [
				Math.random(), Math.random(), Math.random(), Math.random()
			];

		} );

		/*-------------------------------
			Marker
		-------------------------------*/

		// geometry

		const markerGeometry = new MXP.Geometry();

		markerGeometry.setAttribute( 'position', new Float32Array( [
			- 0.5, 0.5, 0.0,
			0.5, 0.5, 0.0,
			0.5, - 0.5, 0.0,
			- 0.5, - 0.5, 0.0,

			0.0, - 0.05, 0.0,
			0.2, - 0.2, 0.0,
			- 0.2, - 0.2, 0.0,

			0.0, 0.05, 0.0,
			0.2, 0.2, 0.0,
			- 0.2, 0.2, 0.0,
		] ), 3 );

		markerGeometry.setAttribute( 'index', new Uint16Array( [
			0, 1,
			1, 2,
			2, 3,
			3, 0,

			4, 5,
			4, 6,

			7, 8,
			7, 9,
		] ), 1 );

		const makerIdArray = [];

		for ( let i = 0; i < size.y; i ++ ) {

			makerIdArray.push( i / size.y, 0.0, 0.0 );

		}

		markerGeometry.setAttribute( 'id', new Float32Array( makerIdArray ), 3, { instanceDivisor: 1 } );

		// material

		const markerMaterial = new MXP.Material( {
			phase: [ "ui" ],
			frag: MXP.hotGet( "matchMoveFrag", matchMoveFrag ),
			vert: MXP.hotGet( "matchMoveVert", matchMoveVert ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, this.gpu.passes[ 0 ].outputUniforms, {
				uAspectRatio: globalUniforms.resolution.uAspectRatio
			} ),
			drawType: "LINES",
			blending: "ADD",
			depthTest: false,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/matchMove.fs', ( module ) => {

				if ( module ) {

					markerMaterial.frag = MXP.hotUpdate( 'matchMoveFrag', module.default );

					markerMaterial.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/matchMove.vs', ( module ) => {

				if ( module ) {

					markerMaterial.vert = MXP.hotUpdate( 'matchMoveVert', module.default );

					markerMaterial.requestUpdate();

				}


			} );

		}

		// marker entity

		this.markerEntity = new MXP.Entity( { name: "Marker" } );
		this.markerEntity.addComponent( markerGeometry );
		this.markerEntity.addComponent( markerMaterial );

		/*-------------------------------
			Line
		-------------------------------*/

		// geometry

		const lineGeometry = new MXP.Geometry();

		const lineUVArray = [];
		const lineidArray = [];
		const lineIndexArray = [];

		for ( let i = 0; i < ( size.x - 1 ); i ++ ) {

			lineUVArray.push( ( i + 1 ) / ( size.x - 1 ), 0 );

			if ( i < size.x - 2 ) {

				lineIndexArray.push( i, i + 1 );

			}

		}

		for ( let i = 0; i < size.y; i ++ ) {

			lineidArray.push( i / size.y );

		}

		lineGeometry.setAttribute( "uv", new Float32Array( lineUVArray ), 2 );
		lineGeometry.setAttribute( "index", new Uint16Array( lineIndexArray ), 1 );
		lineGeometry.setAttribute( "id", new Float32Array( lineidArray ), 1, { instanceDivisor: 1 } );

		// material

		const lineMaterial = new MXP.Material( {
			phase: [ "ui" ],
			frag: MXP.hotGet( "matchMoveFrag", matchMoveFrag ),
			vert: MXP.hotGet( "matchMoveLineVert", matchMoveLineVert ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, this.gpu.passes[ 0 ].outputUniforms ),
			drawType: "LINES",
			blending: "ADD",
			depthTest: false,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/matchMoveLine.fs', ( module ) => {

				if ( module ) {

					lineMaterial.frag = MXP.hotUpdate( 'matchMoveFrag', module.default );

					lineMaterial.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/matchMoveLine.vs', ( module ) => {

				if ( module ) {

					lineMaterial.vert = MXP.hotUpdate( 'matchMoveLineVert', module.default );

					lineMaterial.requestUpdate();

				}


			} );

		}

		// line entity

		this.lineEntity = new MXP.Entity( { name: "Line" } );
		this.lineEntity.addComponent( lineGeometry );
		this.lineEntity.addComponent( lineMaterial );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.gpu.compute();

	}

	public setEntityImpl( entity: MXP.Entity ): void {

		entity.addComponent( this.gpu );

		entity.add( this.markerEntity );
		entity.add( this.lineEntity );

		this.cameraEntity = entity.getRootEntity().getEntityByName( "camera" ) || null;

		if ( this.cameraEntity ) {

			const renderCamera = this.cameraEntity.getComponent( MXP.RenderCamera );

			if ( renderCamera ) {

				const uniforms = this.gpu.passes[ 0 ].uniforms;
				uniforms.uGBufferPos.value = renderCamera.renderTarget.gBuffer.textures[ 0 ];
				uniforms.uViewMatrix.value = renderCamera.viewMatrix;
				uniforms.uProjectionMatrix.value = renderCamera.projectionMatrix;

			}

		}

	}

	public unsetEntityImpl( entity: MXP.Entity ): void {

		entity.removeComponent( this.gpu );
		entity.remove( this.markerEntity );
		entity.remove( this.lineEntity );

		this.cameraEntity = null;

	}

}
