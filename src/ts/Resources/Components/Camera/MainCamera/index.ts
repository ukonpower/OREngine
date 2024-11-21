import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { LookAt } from '../../View/LookAt';
import { ShakeViewer } from '../../View/ShakeViewer';

import { OrbitControls } from './OrbitControls';
import bloomBrightFrag from './shaders/bloomBright.fs';
import compositeFrag from './shaders/composite.fs';
import fxaaFrag from './shaders/fxaa.fs';
import gaussBlur from './shaders/gaussBlur.fs';
import glitchFrag from './shaders/glitch.fs';
import { gl, canvas, globalUniforms } from '~/ts/Globals';

export class MainCamera extends MXP.Component {

	// uniforms

	private commonUniforms: GLP.Uniforms;

	// receiver

	private animateReceiver: MXP.BLidgerAnimationReceiver;

	// camera component

	public renderCamera: MXP.RenderCamera;

	private renderTarget: MXP.RenderCameraTarget;

	// fxaa

	private fxaa: MXP.PostProcessPass;

	// bloom

	private bloomRenderCount: number;
	private bloomBright: MXP.PostProcessPass;
	private bloomBlur: MXP.PostProcessPass[];
	private rtBloomVertical: GLP.GLPowerFrameBuffer[];
	private rtBloomHorizonal: GLP.GLPowerFrameBuffer[];

	// composite

	private composite: MXP.PostProcessPass;

	// bokeh

	private bokehV: MXP.PostProcessPass;
	private bokehH: MXP.PostProcessPass;

	// glitch

	private glitch: MXP.PostProcessPass;

	// resolutions

	private resolution: GLP.Vector;
	private resolutionInv: GLP.Vector;
	private resolutionBloom: GLP.Vector[];

	// components

	private lookAt: LookAt;
	private orbitControls?: OrbitControls;
	private shakeViewer: MXP.Component;
	private postProcess: MXP.PostProcess;

	// dofTarget

	private dofTarget: MXP.Entity | null;

	// tmps

	private tmpVector1: GLP.Vector;
	private tmpVector2: GLP.Vector;

	constructor() {

		super();

		// components

		this.animateReceiver = new MXP.BLidgerAnimationReceiver();
		this.add( this.animateReceiver );

		this.renderCamera = new MXP.RenderCamera( { gl } );
		this.renderTarget = this.renderCamera.renderTarget;
		this.add( this.renderCamera );

		this.lookAt = new LookAt();
		this.add( this.lookAt );

		this.shakeViewer = new ShakeViewer();
		this.add( this.shakeViewer );

		if ( process.env.NODE_ENV === 'development' ) {

			this.orbitControls = new OrbitControls( { elm: canvas } );
			this.orbitControls.enabled = false;
			this.add( this.orbitControls );

		}

		// resolution

		this.resolution = new GLP.Vector();
		this.resolutionInv = new GLP.Vector();
		this.resolutionBloom = [];

		// uniforms

		this.commonUniforms = MXP.UniformsUtils.merge( {
			uResolution: {
				type: "2f",
				value: this.resolution
			},
			uResolutionInv: {
				type: "2f",
				value: this.resolutionInv
			}
		} );

		// fxaa

		this.fxaa = new MXP.PostProcessPass( gl, {
			name: 'fxaa',
			frag: fxaaFrag,
			uniforms: this.commonUniforms,
		} );

		// bloom

		this.bloomRenderCount = 4;

		this.rtBloomVertical = [];
		this.rtBloomHorizonal = [];

		for ( let i = 0; i < this.bloomRenderCount; i ++ ) {

			this.rtBloomVertical.push( new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] ) );

			this.rtBloomHorizonal.push( new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] ) );

		}

		let bloomScale = 2.0;

		this.bloomBright = new MXP.PostProcessPass( gl, {
			name: 'bloom/bright/',
			frag: bloomBrightFrag,
			uniforms: {
				uShadingTex: {
					value: this.renderTarget.shadingBuffer.textures[ 0 ],
					type: "1i"
				}
			},
			passThrough: true,
			resolutionRatio: 1.0 / bloomScale,
		} );

		this.bloomBlur = [];

		// bloom blur

		let bloomInput: GLP.GLPowerTexture[] = this.bloomBright.renderTarget!.textures;

		for ( let i = 0; i < this.bloomRenderCount; i ++ ) {

			const rtVertical = this.rtBloomVertical[ i ];
			const rtHorizonal = this.rtBloomHorizonal[ i ];

			const resolution = new GLP.Vector();
			this.resolutionBloom.push( resolution );

			const guassSamples = 8.0;

			const blurParam: MXP.PostProcessPassParam = {
				name: 'bloom/blur/' + i + '/v',
				renderTarget: rtVertical,
				frag: gaussBlur,
				uniforms: {
					uBackBlurTex: {
						value: bloomInput,
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: true
					},
					uWeights: {
						type: '1fv',
						value: GLP.MathUtils.gaussWeights( guassSamples )
					},
					uBlurRange: {
						value: 2.0,
						type: '1f'
					}
				},
				defines: {
					GAUSS_WEIGHTS: guassSamples.toString(),
					USE_BACKBLURTEX: "",
				},
				passThrough: true,
				resolutionRatio: 1.0 / bloomScale
			};

			this.bloomBlur.push( new MXP.PostProcessPass( gl, blurParam ) );

			this.bloomBlur.push( new MXP.PostProcessPass( gl, {
				...blurParam,
				name: 'bloom/blur/' + i + '/h',
				renderTarget: rtHorizonal,
				uniforms: {
					...blurParam.uniforms,
					uBackBlurTex: {
						value: rtVertical.textures[ 0 ],
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: false
					},
				},
			} ) );

			bloomInput = rtHorizonal.textures;

			bloomScale *= 2.0;

		}

		// composite

		this.composite = new MXP.PostProcessPass( gl, {
			name: 'composite',
			frag: MXP.hotUpdate( "composite", compositeFrag ),
			uniforms: this.animateReceiver.registerUniforms( MXP.UniformsUtils.merge( this.commonUniforms, {
				uBloomTexture: {
					value: this.rtBloomHorizonal.map( rt => rt.textures[ 0 ] ),
					type: '1iv'
				},
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
				BLOOM_COUNT: this.bloomRenderCount.toString(),
				USE_BACKBLURTEX: "",
			},
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/composite.fs", ( module ) => {

				if ( module ) {

					this.composite.frag = module.default;

				}

				this.composite.requestUpdate();

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

		this.bokehV = new MXP.PostProcessPass( gl, bokehParam );
		this.bokehH = new MXP.PostProcessPass( gl, {
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

		this.glitch = new MXP.PostProcessPass( gl, {
			name: 'glitch',
			frag: glitchFrag,
			uniforms: this.animateReceiver.registerUniforms( MXP.UniformsUtils.merge( globalUniforms.time, {
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

					this.glitch.frag = module.default;

				}

				this.glitch.requestUpdate();

			} );

		}

		this.postProcess = new MXP.PostProcess( {
			passes: [
				this.bloomBright,
				...this.bloomBlur,
				this.fxaa,
				this.composite,
				// this.bokehV,
				// this.bokehH,
				// this.glitch,
			]
		} );
		this.add( this.postProcess );

		// dof

		this.dofTarget = null;

		// tmps

		this.tmpVector1 = new GLP.Vector();
		this.tmpVector2 = new GLP.Vector();

		// dev

		if ( process.env.NODE_ENV === 'development' ) {

			const activeOrbitControls = ( activeOrbitcontrols: boolean ) => {

				if ( this.orbitControls ) {

					this.orbitControls.enabled = activeOrbitcontrols;

				}

				const blidger = this.entity && this.entity.getComponent( MXP.BLidger );
				const lookat = this.entity && this.entity.getComponent( LookAt );

				if ( blidger ) {

					blidger.transformAutoUpdate = ! activeOrbitcontrols;

				}

				if ( lookat ) {

					lookat.enable = ! activeOrbitcontrols;

				}

			};

			const onMouseDown = ( e: PointerEvent ) => {

				if ( this.orbitControls && this.orbitControls.enabled ) return;

				const elm = e.target as HTMLElement;

				elm.setPointerCapture( e.pointerId );

				activeOrbitControls( true );

			};

			const onWheel = () => {

				if ( this.orbitControls && this.orbitControls.enabled ) return;

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

	}

	public setEntityImpl( entity: MXP.Entity, ): void {

		// events
		entity.on( 'sceneCreated', ( root: MXP.Entity, ) => {

			const camera = root.findEntityByName( "Camera" ) || null;

			const blidger = camera?.getComponent( MXP.BLidger );

			const prevBlidger = entity.getComponent( MXP.BLidger );

			if ( blidger ) {

				if ( prevBlidger ) {

					blidger.transformAutoUpdate = prevBlidger.transformAutoUpdate;

				}

				entity.addComponent( blidger );

			}

			const lookAtTarget = root.findEntityByName( "CamLook" ) || null;
			this.lookAt.setTarget( lookAtTarget );

			this.dofTarget = root.findEntityByName( 'CamDof' ) || null;
			this.updateCameraParams( this.resolution );

		} );

	}

	public unsetEntityImpl( prevEntity: MXP.Entity ): void {

		prevEntity.off( 'sceneCreated' );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.updateCameraParams( this.resolution );

		// state

		const cameraState = this.animateReceiver.animations.get( '_cameraState' );

		if ( cameraState ) {

			// fov

			this.renderCamera.fov = 2 * Math.atan( 12 / ( 2 * cameraState.value.x ) ) / Math.PI * 180;

			// lookat

			this.lookAt.enabled = cameraState.value.y > 0.5;

		}

		// effect

		const cameraEffect = this.animateReceiver.animations.get( '_cameraEffect' );

		if ( cameraEffect ) {

			this.composite.uniforms.uOutPut.value = cameraEffect.value.x;

			this.bokehV.uniforms.uBlurRange.value = cameraEffect.value.y;
			this.bokehH.enabled = this.bokehV.enabled = cameraEffect.value.y > 0.0;

			this.glitch.uniforms.uGlitch.value = cameraEffect.value.z;
			this.glitch.enabled = cameraEffect.value.z > 0.0;

		}

		// dof params

		event.entity.matrixWorld.decompose( this.tmpVector1 );

		if ( this.dofTarget ) {

			this.dofTarget.matrixWorld.decompose( this.tmpVector2 );

		}

		this.renderCamera.dof.focusDistance = this.tmpVector1.sub( this.tmpVector2 ).length();

	}

	public resize( resolution: GLP.Vector ): void {

		this.renderCamera.resize( resolution );

		if ( this.postProcess ) {

			this.postProcess.resize( resolution );

		}

		this.resolution.copy( resolution );
		this.resolutionInv.set( 1.0 / resolution.x, 1.0 / resolution.y, 0.0, 0.0 );

		const resolutionHalf = this.resolution.clone().divide( 2 );
		resolutionHalf.x = Math.max( Math.floor( resolutionHalf.x ), 1.0 );
		resolutionHalf.y = Math.max( Math.floor( resolutionHalf.y ), 1.0 );

		this.updateCameraParams( this.resolution );

	}

	private updateCameraParams( resolution: GLP.Vector ) {

		this.renderCamera.aspect = resolution.x / resolution.y;
		this.renderCamera.needsUpdate = true;

	}

}
