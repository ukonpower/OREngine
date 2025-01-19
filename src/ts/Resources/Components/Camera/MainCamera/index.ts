import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { ShakeViewer } from '../../CameraControls/CameraShake';
import { OrbitControls } from '../../CameraControls/OrbitControls';
import { LookAt } from '../../ObjectControls/LookAt';

import { Bloom } from './PostProcess/Bloom';
import { FXAA } from './PostProcess/FXAA';
import { PixelSort } from './PostProcess/PixelSort';
import compositeFrag from './shaders/composite.fs';
import gaussBlur from './shaders/gaussBlur.fs';
import glitchFrag from './shaders/glitch.fs';

import { gl, canvas, globalUniforms } from '~/ts/Globals';

export class MainCamera extends MXP.Component {

	public renderCamera: MXP.RenderCamera;

	private _commonUniforms: GLP.Uniforms;
	private _animateReceiver: MXP.BLidgerAnimationReceiver;
	private _renderTarget: MXP.RenderCameraTarget;
	private _lookAt: LookAt;
	private _orbitControls?: OrbitControls;
	private _shakeViewer: MXP.Component;
	private postProcessPipeline: MXP.PostProcessPipeline;
	private _composite: MXP.PostProcessPass;
	private _bokehV: MXP.PostProcessPass;
	private _bokehH: MXP.PostProcessPass;
	private _glitch: MXP.PostProcessPass;
	private _resolution: GLP.Vector;
	private _resolutionInv: GLP.Vector;
	private _dofTarget: MXP.Entity | null;
	private _tmpVector1: GLP.Vector;
	private _tmpVector2: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		/*-------------------------------
			Init
		-------------------------------*/

		// resolution

		this._resolution = new GLP.Vector();
		this._resolutionInv = new GLP.Vector();

		// uniforms

		this._commonUniforms = MXP.UniformsUtils.merge( {
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

		this.renderCamera = this._entity.addComponent( MXP.RenderCamera, { gl: gl } );
		this._renderTarget = this.renderCamera.renderTarget;
		this._animateReceiver = this._entity.addComponent( MXP.BLidgerAnimationReceiver );
		this._lookAt = this._entity.addComponent( LookAt );
		this._shakeViewer = this._entity.addComponent( ShakeViewer );

		/*-------------------------------
			PostProcess
		-------------------------------*/

		// composite

		this._composite = new MXP.PostProcessPass( gl, {
			name: 'composite',
			frag: MXP.hotUpdate( "composite", compositeFrag ),
			uniforms: this._animateReceiver.registerUniforms( MXP.UniformsUtils.merge( this._commonUniforms, {
				uVisible: {
					value: 0,
					type: "1f"
				},
				uVignette: {
					value: 0,
					type: "1f"
				},
				uOutPut: {
					value: 0,
					type: "1f"
				},

			} ) ),
			defines: {
				USE_BACKBLURTEX: "",
			},
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/composite.fs", ( module ) => {

				if ( module ) {

					this._composite.frag = module.default;

				}

				this._composite.requestUpdate();

			} );

		}

		// bokeh

		const bSample = 8;

		const bokehParam: MXP.PostProcessPassParam = {
			name: 'bokeh/h',
			frag: gaussBlur,
			uniforms: {
				uIsVertical: {
					type: '1i',
					value: true
				},
				uWeights: {
					type: '1fv',
					value: GLP.MathUtils.gaussWeights( bSample )
				},
				uBlurRange: {
					value: 6.0,
					type: '1f'
				}
			},
			defines: {
				GAUSS_WEIGHTS: bSample.toString(),
				IS_BOKEH: "",
			},
			resolutionRatio: 1.0,
		};

		this._bokehV = new MXP.PostProcessPass( gl, bokehParam );
		this._bokehH = new MXP.PostProcessPass( gl, {
			...bokehParam,
			uniforms: {
				...bokehParam.uniforms,
				uIsVertical: {
					type: '1i',
					value: false
				},
			},
		} );

		// glitch

		this._glitch = new MXP.PostProcessPass( gl, {
			name: 'glitch',
			frag: glitchFrag,
			uniforms: this._animateReceiver.registerUniforms( MXP.UniformsUtils.merge( globalUniforms.time, {
				uGlitch: {
					value: 0,
					type: '1f'
				}
			} ) ),
			resolutionRatio: 1.0,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/glitch.fs", ( module ) => {

				if ( module ) {

					this._glitch.frag = module.default;

				}

				this._glitch.requestUpdate();

			} );

		}


		/*-------------------------------
			PostProcess
		-------------------------------*/


		// this._postProcess = this._entity.addComponent( , { passes: [
		// 	this._fxaa,
		// 	// this._composite,
		// 	pixelSortMask,
		// 	pixelSortRange,
		// 	...pixelSortPasses,
		// ] } );

		this.postProcessPipeline = this._entity.addComponent( MXP.PostProcessPipeline );
		this.postProcessPipeline.add( FXAA );
		this.postProcessPipeline.add( Bloom );
		this.postProcessPipeline.add( PixelSort );

		// dof

		this._dofTarget = null;

		// tmps

		this._tmpVector1 = new GLP.Vector();
		this._tmpVector2 = new GLP.Vector();

		/*-------------------------------
			BlidgeSceneApply
		-------------------------------*/

		const onSceneCreated = ( root: MXP.Entity, ) => {

			const camera = root.findEntityByName( "Camera" ) || null;

			const blidger = camera?.getComponent( MXP.BLidger );

			const prevBlidger = this._entity.getComponent( MXP.BLidger );

			if ( blidger ) {

				if ( prevBlidger ) {

					blidger.transformAutoUpdate = prevBlidger.transformAutoUpdate;

				}

			}

			const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
			this._lookAt.setTarget( lookAtTarget );

			this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

		};

		this._entity.on( 'sceneCreated', onSceneCreated );

		this.once( "dispose", () => {

			this._entity.off( 'sceneCreated', onSceneCreated );

		} );

		/*-------------------------------
			DEV: OrbitControls
		-------------------------------*/

		if ( process.env.NODE_ENV === 'development' ) {

			this._orbitControls = this._entity.addComponent( OrbitControls );
			this._orbitControls.setElm( canvas );
			this._orbitControls.enabled = false;

			const activeOrbitControls = ( activeOrbitcontrols: boolean ) => {

				if ( this._orbitControls ) {

					this._orbitControls.enabled = activeOrbitcontrols;

				}

				const blidger = this._entity.getComponent( MXP.BLidger );
				const lookat = this._entity.getComponent( LookAt );

				if ( blidger ) {

					blidger.transformAutoUpdate = ! activeOrbitcontrols;

				}

				if ( lookat ) {

					lookat.enable = ! activeOrbitcontrols;

				}

			};

			const onMouseDown = ( e: PointerEvent ) => {

				if ( this._orbitControls && this._orbitControls.enabled ) return;

				const elm = e.target as HTMLElement;

				elm.setPointerCapture( e.pointerId );

				activeOrbitControls( true );

			};

			const onWheel = () => {

				if ( this._orbitControls && this._orbitControls.enabled ) return;

				activeOrbitControls( true );

			};

			const onKeyDown = ( e: KeyboardEvent ) => {

				if ( e.key === 'Escape' ) {

					activeOrbitControls( false );

				}

			};

			canvas.addEventListener( "pointerdown", onMouseDown );
			canvas.addEventListener( "wheel", onWheel );
			window.addEventListener( "keydown", onKeyDown );

			const onDispose = () => {

				canvas.removeEventListener( "pointerdown", onMouseDown );
				canvas.removeEventListener( "wheel", onWheel );
				window.removeEventListener( "keydown", onKeyDown );

			};

			this.once( "dispose", onDispose );

		}

		globalUniforms.gBuffer.uGBufferPos.value = this.renderCamera.gBuffer.textures[ 0 ];
		globalUniforms.gBuffer.uGBufferNormal.value = this.renderCamera.gBuffer.textures[ 1 ];

		const root = this._entity.getRootEntity();

		const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
		this._lookAt.setTarget( lookAtTarget );
		this._dofTarget = root.findEntityByName( 'CamDof' ) || null;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.resize( event.resolution );

		this.updateCameraParams();

		// state

		const cameraState = this._animateReceiver.animations.get( '_cameraState' );

		if ( cameraState ) {

			// fov

			this.renderCamera.fov = 2 * Math.atan( 12 / ( 2 * cameraState.value.x ) ) / Math.PI * 180;

			// lookat

			this._lookAt.enabled = cameraState.value.y > 0.5;

		}

		// dof params

		event.entity.matrixWorld.decompose( this._tmpVector1 );

		if ( this._dofTarget ) {

			this._dofTarget.matrixWorld.decompose( this._tmpVector2 );

		}

		this.renderCamera.dofParams.focusDistance = this._tmpVector1.sub( this._tmpVector2 ).length();

	}

	public resize( resolution: GLP.Vector ): void {

		if ( resolution.x == this._resolution.x && resolution.y == this._resolution.y ) return;

		this._resolution.copy( resolution );
		this._resolutionInv.set( 1.0 / resolution.x, 1.0 / resolution.y, 0.0, 0.0 );

		this.renderCamera.resize( this._resolution );

		this.postProcessPipeline.resize( resolution );

		this.updateCameraParams();

	}

	private updateCameraParams() {

		this.renderCamera.aspect = this._resolution.x / this._resolution.y;
		this.renderCamera.needsUpdateProjectionMatrix = true;

	}

}
