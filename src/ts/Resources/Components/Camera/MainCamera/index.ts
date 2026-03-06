import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import { ShakeViewer } from '../../ObjectControls/CameraShake';
import { LookAt } from 'orengine';

import { Bloom } from './PostProcess/Bloom';
import { ColorGrading } from './PostProcess/ColorGrading';
import { Finalize } from './PostProcess/Finalize';
import { FXAA } from './PostProcess/FXAA';

import { gl, globalUniforms } from '~/ts/Globals';

export class MainCamera extends MXP.Component {

	public camera: MXP.Camera;

	private _lookAt: LookAt;
	private postProcessPipeline: MXP.PostProcessPipeline;
	private _resolution: GLP.Vector;
	private _resolutionInv: GLP.Vector;
	private _tmpVector1: GLP.Vector;
	private _tmpVector2: GLP.Vector;

	private _dofTarget: MXP.Entity | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		/*-------------------------------
			Init
		-------------------------------*/

		// resolution

		this._resolution = new GLP.Vector();
		this._resolutionInv = new GLP.Vector();

		// uniforms

		MXP.UniformsUtils.merge( {
			uResolution: {
				type: "2f",
				value: this._resolution
			},
			uResolutionInv: {
				type: "2f",
				value: this._resolutionInv
			}
		} );

		/*-------------------------------
			Components
		-------------------------------*/

		this.camera = this.entity.addComponent( MXP.Camera );
		this._lookAt = this.entity.addComponent( LookAt );
		this.entity.addComponent( ShakeViewer );

		/*-------------------------------
			PostProcess
		-------------------------------*/

		const renderer = Engine.getInstance( gl ).renderer;
		const renderTarget = renderer.renderTarget;

		this.postProcessPipeline = this.entity.addComponent( MXP.PostProcessPipeline );

		// fxaa

		this.postProcessPipeline.add( new FXAA() );

		// bloom

		const bloom = this.postProcessPipeline.add( new Bloom( renderTarget.shadingBuffer.textures[ 0 ] ) );
		bloom.threshold = 1.0;
		bloom.brightness = 1;

		// colorGrading

		this.postProcessPipeline.add( new ColorGrading() );

		// finalize

		this.postProcessPipeline.add( new Finalize() );

		// dof

		this._dofTarget = null;

		/*-------------------------------
			Params
		-------------------------------*/


		// tmps

		this._tmpVector1 = new GLP.Vector();
		this._tmpVector2 = new GLP.Vector();

		/*-------------------------------
			BlidgeSceneApply
		-------------------------------*/

		const onSceneCreated = ( root: MXP.Entity, ) => {

			const camera = root.findEntityByName( "Camera" ) || null;

			const blidger = camera?.getComponent( MXP.BLidger );

			const prevBlidger = this.entity.getComponent( MXP.BLidger );

			if ( blidger ) {

				if ( prevBlidger ) {

					blidger.transformAutoUpdate = prevBlidger.transformAutoUpdate;

				}

			}

			const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
			this._lookAt.setTarget( lookAtTarget );
			this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

		};

		this.entity.on( 'sceneCreated', onSceneCreated );

		this.once( "dispose", () => {

			this.entity.off( 'sceneCreated', onSceneCreated );

		} );

		globalUniforms.gBuffer.uGBufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		globalUniforms.gBuffer.uGBufferNormal.value = renderTarget.gBuffer.textures[ 1 ];

		const root = this.entity.getRootEntity();

		// lookat

		const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
		this._lookAt.setTarget( lookAtTarget );

		// dof

		this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.resize( event.resolution );

		this.updateCameraParams();

		// dof params

		this.entity.matrixWorld.decompose( this._tmpVector1 );

		if ( this._dofTarget ) {

			this._dofTarget.matrixWorld.decompose( this._tmpVector2 );

		}

		this.camera.dofParams.focusDistance = this._tmpVector1.sub( this._tmpVector2 ).length();

	}

	public resize( resolution: GLP.Vector ): void {

		if ( resolution.x == this._resolution.x && resolution.y == this._resolution.y ) return;

		this._resolution.copy( resolution );
		this._resolutionInv.set( 1.0 / resolution.x, 1.0 / resolution.y, 0.0, 0.0 );

		this.camera.aspect = this._resolution.x / this._resolution.y;
		this.camera.needsUpdateProjectionMatrix = true;

		this.postProcessPipeline.resize( resolution );

		this.updateCameraParams();

	}

	private updateCameraParams() {

		this.camera.near = 0.5;
		this.camera.far = 3000;
		this.camera.needsUpdateProjectionMatrix = true;

	}

}
