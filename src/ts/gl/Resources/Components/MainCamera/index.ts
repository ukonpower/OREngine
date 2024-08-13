import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { LookAt } from '../LookAt';
import { OrbitControls } from '../OrbitControls';
import { ShakeViewer } from '../ShakeViewer';

import bloomBlurFrag from './shaders/bloomBlur.fs';
import bloomBrightFrag from './shaders/bloomBright.fs';
import compositeFrag from './shaders/composite.fs';
import fxaaFrag from './shaders/fxaa.fs';

import { gl, canvas } from '~/ts/gl/GLGlobals';


export class MainCamera extends MXP.Component {

	private baseFov: number;

	private commonUniforms: GLP.Uniforms;

	// camera component

	private cameraComponent: MXP.RenderCamera;

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

	// resolutions

	private resolution: GLP.Vector;
	private resolutionInv: GLP.Vector;
	private resolutionBloom: GLP.Vector[];

	// components

	private lookAt: LookAt;
	private orbitControls: MXP.Component;
	private shakeViewer: MXP.Component;
	private postProcess: MXP.PostProcess;

	// dofTarget

	private dofTarget: MXP.Entity | null;

	// tmps

	private tmpVector1: GLP.Vector;
	private tmpVector2: GLP.Vector;

	constructor() {

		super();

		this.baseFov = 50.0;

		// components

		this.cameraComponent = new MXP.RenderCamera( { gl } );
		this.renderTarget = this.cameraComponent.renderTarget;

		this.lookAt = new LookAt();
		this.orbitControls = new OrbitControls( { elm: canvas } );
		this.shakeViewer = new ShakeViewer();

		// resolution

		this.resolution = new GLP.Vector();
		this.resolutionInv = new GLP.Vector();
		this.resolutionBloom = [];

		// uniforms

		this.commonUniforms = GLP.UniformsUtils.merge( {
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

			this.bloomBlur.push( new MXP.PostProcessPass( gl, {
				name: 'bloom/blur/' + i + '/v',
				renderTarget: rtVertical,
				frag: bloomBlurFrag,
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
						value: this.guassWeight( guassSamples )
					},
				},
				defines: {
					GAUSS_WEIGHTS: guassSamples.toString()
				},
				passThrough: true,
				resolutionRatio: 1.0 / bloomScale
			} ) );

			this.bloomBlur.push( new MXP.PostProcessPass( gl, {
				name: 'bloom/blur/' + i + '/w',
				renderTarget: rtHorizonal,
				frag: bloomBlurFrag,
				uniforms: {
					uBackBlurTex: {
						value: rtVertical.textures[ 0 ],
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: false
					},
					uWeights: {
						type: '1fv',
						value: this.guassWeight( guassSamples )
					},
					uResolution: {
						type: '2fv',
						value: resolution,
					}
				},
				defines: {
					GAUSS_WEIGHTS: guassSamples.toString()
				},
				passThrough: true,
				resolutionRatio: 1.0 / bloomScale
			} ) );

			bloomInput = rtHorizonal.textures;

			bloomScale *= 2.0;

		}

		// composite

		this.composite = new MXP.PostProcessPass( gl, {
			name: 'composite',
			frag: MXP.hotUpdate( "composite", compositeFrag ),
			uniforms: GLP.UniformsUtils.merge( this.commonUniforms, {
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
			} ),
			defines: {
				BLOOM_COUNT: this.bloomRenderCount.toString()
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

		this.postProcess = new MXP.PostProcess( {
			keyOverride: 'postProcess',
			input: this.renderTarget.uiBuffer.textures,
			passes: [
				this.bloomBright,
				...this.bloomBlur,
				this.fxaa,
				this.composite,
			]
		} );

		// dof

		this.dofTarget = null;

		// tmps

		this.tmpVector1 = new GLP.Vector();
		this.tmpVector2 = new GLP.Vector();

	}

	public static get key() {

		return 'mainCamera';

	}

	public setEntityImpl( entity: MXP.Entity, ): void {

		entity.addComponent( this.cameraComponent );
		entity.addComponent( this.postProcess );
		entity.addComponent( this.orbitControls );
		// entity.addComponent( new VJCamera() );

		// events

		entity.on( 'sceneCreated', ( root: MXP.Entity, ) => {

			const camera = root.getEntityByName( "Camera" ) || null;

			const lookAtTarget = root.getEntityByName( "CameraTarget" ) || null;
			this.lookAt.setTarget( lookAtTarget );

			const ortbitControls = entity.getComponent( OrbitControls );

			if ( ortbitControls && camera && lookAtTarget ) {

				ortbitControls.setPosition( camera.position, lookAtTarget.position );
				this.cameraComponent.fov = camera.userData.cameraParam.fov;
				this.cameraComponent.updateProjectionMatrix();

			}

			this.dofTarget = root.getEntityByName( 'CameraTargetDof' ) || null;
			this.baseFov = this.cameraComponent.fov;
			this.updateCameraParams( this.resolution );

		} );

	}

	public unsetEntityImpl( prevEntity: MXP.Entity ): void {

		prevEntity.off( 'sceneCreated' );

	}

	private guassWeight( num: number ) {

		const weight = new Array( num );

		// https://wgld.org/d/webgl/w057.html

		let t = 0.0;
		const d = 100;

		for ( let i = 0; i < weight.length; i ++ ) {

			const r = 1.0 + 2.0 * i;
			let w = Math.exp( - 0.5 * ( r * r ) / d );
			weight[ i ] = w;

			if ( i > 0 ) {

				w *= 2.0;

			}

			t += w;

		}

		for ( let i = 0; i < weight.length; i ++ ) {

			weight[ i ] /= t;

		}

		return weight;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.updateCameraParams( this.resolution );

		// dof params

		event.entity.matrixWorld.decompose( this.tmpVector1 );

		if ( this.dofTarget ) {

			this.dofTarget.matrixWorld.decompose( this.tmpVector2 );

		}

		this.cameraComponent.dof.focusDistance = this.tmpVector1.sub( this.tmpVector2 ).length();

	}

	public resize( resolution: GLP.Vector ): void {

		this.cameraComponent.resize( resolution );

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

		// this.cameraComponent.near = 0.01;
		// this.cameraComponent.far = 1000;
		this.cameraComponent.aspect = resolution.x / resolution.y;
		// this.cameraComponent.fov = this.baseFov - Math.max( this.cameraComponent.aspect - 1.0, 0.0 ) * 0.6;
		this.cameraComponent.needsUpdate = true;

	}

}
