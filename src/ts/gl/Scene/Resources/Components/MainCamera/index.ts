import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { LookAt } from '../LookAt';
import { OrbitControls } from '../OrbitControls';
import { ShakeViewer } from '../ShakeViewer';

import bloomBlurFrag from './shaders/bloomBlur.fs';
import bloomBrightFrag from './shaders/bloomBright.fs';
import colorCollectionFrag from './shaders/colorCollection.fs';
import compositeFrag from './shaders/composite.fs';
import dofBokeh from './shaders/dofBokeh.fs';
import dofCoc from './shaders/dofCoc.fs';
import dofComposite from './shaders/dofComposite.fs';
import fxaaFrag from './shaders/fxaa.fs';
import motionBlurFrag from './shaders/motionBlur.fs';
import motionBlurNeighborFrag from './shaders/motionBlurNeighbor.fs';
import motionBlurTileFrag from './shaders/motionBlurTile.fs';
import ssCompositeFrag from './shaders/ssComposite.fs';
import ssrFrag from './shaders/ssr.fs';

import { gl, canvas, power, globalUniforms } from '~/ts/Globals';

export class MainCamera extends MXP.Component {

	private baseFov: number;

	private commonUniforms: GLP.Uniforms;

	// camera component

	private cameraComponent: MXP.RenderCamera;

	private renderTarget: MXP.RenderCameraTarget;

	// colorCollection

	private colorCollection: MXP.PostProcessPass;

	// fxaa

	private fxaa: MXP.PostProcessPass;

	// bloom

	private bloomRenderCount: number;
	private bloomBright: MXP.PostProcessPass;
	private bloomBlur: MXP.PostProcessPass[];
	private rtBloomVertical: GLP.GLPowerFrameBuffer[];
	private rtBloomHorizonal: GLP.GLPowerFrameBuffer[];

	// ssr

	private ssr: MXP.PostProcessPass;
	public rtSSR1: GLP.GLPowerFrameBuffer;
	public rtSSR2: GLP.GLPowerFrameBuffer;


	// ss composite

	private ssComposite: MXP.PostProcessPass;

	// dof

	private dofParams: GLP.Vector;
	private dofTarget: MXP.Entity | null;

	public dofCoc: MXP.PostProcessPass;
	public dofBokeh: MXP.PostProcessPass;
	public dofComposite: MXP.PostProcessPass;

	// motion blur

	private motionBlurTile: MXP.PostProcessPass;
	private motionBlurNeighbor: MXP.PostProcessPass;
	private motionBlur: MXP.PostProcessPass;

	// composite

	private composite: MXP.PostProcessPass;

	// resolutions

	private resolution: GLP.Vector;
	private resolutionInv: GLP.Vector;
	private resolutionBloom: GLP.Vector[];

	// curves

	private stateCurve?: GLP.FCurveGroup;

	// tmps

	private tmpVector1: GLP.Vector;
	private tmpVector2: GLP.Vector;

	// components

	private lookAt: LookAt;
	private orbitControls: MXP.Component;
	private shakeViewer: MXP.Component;

	private scenePostProcess: MXP.PostProcess;
	private postProcess: MXP.PostProcess;

	constructor() {

		super();

		this.baseFov = 50.0;

		// components

		this.cameraComponent = new MXP.RenderCamera( gl );
		this.renderTarget = this.cameraComponent.renderTarget;

		this.lookAt = new LookAt();
		this.orbitControls = new OrbitControls( canvas );
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

		// color collection

		this.colorCollection = new MXP.PostProcessPass( {
			name: 'collection',
			frag: colorCollectionFrag,
		} );

		// ssr

		this.rtSSR1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		this.rtSSR2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		this.ssr = new MXP.PostProcessPass( {
			name: 'ssr',
			frag: MXP.hotGet( "ssr", ssrFrag ),
			renderTarget: this.rtSSR1,
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uResolution: {
					value: this.resolution,
					type: '2fv',
				},
				uResolutionInv: {
					value: this.resolutionInv,
					type: '2fv',
				},
				uGbufferPos: {
					value: this.renderTarget.gBuffer.textures[ 0 ],
					type: '1i'
				},
				uGbufferNormal: {
					value: this.renderTarget.gBuffer.textures[ 1 ],
					type: '1i'
				},
				uSceneTex: {
					value: this.renderTarget.forwardBuffer.textures[ 0 ],
					type: '1i'
				},
				uSSRBackBuffer: {
					value: this.rtSSR2.textures[ 0 ],
					type: '1i'
				},
			} ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssr.fs", ( module ) => {

				if ( module ) {

					this.ssr.frag = MXP.hotUpdate( 'ssr', module.default );

				}

				this.ssr.requestUpdate();

			} );

		}

		// ss-composite

		this.ssComposite = new MXP.PostProcessPass( {
			name: 'ssComposite',
			frag: MXP.hotGet( "ssComposite", ssCompositeFrag ),
			uniforms: GLP.UniformsUtils.merge( this.commonUniforms, {
				uGbufferPos: {
					value: this.renderTarget.gBuffer.textures[ 0 ],
					type: '1i'
				},
				uGbufferNormal: {
					value: this.renderTarget.gBuffer.textures[ 1 ],
					type: '1i'
				},
				uSSRTexture: {
					value: this.rtSSR2.textures[ 0 ],
					type: '1i'
				},
			} ),
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssComposite.fs", ( module ) => {

				if ( module ) {

					this.ssComposite.frag = MXP.hotUpdate( 'ssComposite', module.default );

				}

				this.ssComposite.requestUpdate();

			} );

		}

		// dof

		this.dofTarget = null;
		this.dofParams = new GLP.Vector( 10, 0.05, 20, 0.05 );

		this.dofCoc = new MXP.PostProcessPass( {
			name: 'dof/coc',
			frag: dofCoc,
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uGbufferPos: {
					value: this.renderTarget.gBuffer.textures[ 0 ],
					type: "1i"
				},
				uParams: {
					value: this.dofParams,
					type: '4f'
				},
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR, internalFormat: gl.RGBA16F, type: gl.HALF_FLOAT, format: gl.RGBA } ),
			] ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		this.dofBokeh = new MXP.PostProcessPass( {
			name: 'dof/bokeh',
			frag: dofBokeh,
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uCocTex: {
					value: this.dofCoc.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uParams: {
					value: this.dofParams,
					type: '4f'
				}
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		this.dofComposite = new MXP.PostProcessPass( {
			name: 'dof/composite',
			frag: dofComposite,
			uniforms: GLP.UniformsUtils.merge( {
				uBokeTex: {
					value: this.dofBokeh.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR, internalFormat: gl.RGBA16F, type: gl.HALF_FLOAT, format: gl.RGBA } ),
			] )
		} );

		// motion blur

		const motionBlurTile = 16;

		this.motionBlurTile = new MXP.PostProcessPass( {
			name: 'motionBlurTile',
			frag: motionBlurTileFrag,
			uniforms: GLP.UniformsUtils.merge( {
				uVelTex: {
					value: this.renderTarget.gBuffer.textures[ 4 ],
					type: '1i'
				},
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			] ),
			defines: {
				"TILE": motionBlurTile,
			},
			resolutionRatio: 1 / motionBlurTile,
			passThrough: true,
		} );

		this.motionBlurNeighbor = new MXP.PostProcessPass( {
			name: 'motionBlurNeighbor',
			frag: motionBlurNeighborFrag,
			uniforms: GLP.UniformsUtils.merge( {
				uVelTex: {
					value: this.motionBlurTile.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			defines: {
				"TILE": motionBlurTile,
			},
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			] ),
			resolutionRatio: 1 / motionBlurTile,
			passThrough: true,
		} );

		this.motionBlur = new MXP.PostProcessPass( {
			name: 'motionBlur',
			frag: motionBlurFrag,
			uniforms: GLP.UniformsUtils.merge( this.commonUniforms, {
				uVelNeighborTex: {
					value: this.motionBlurNeighbor.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uVelTex: {
					value: this.renderTarget.gBuffer.textures[ 4 ],
					type: '1i'
				},
				uDepthTexture: {
					value: this.renderTarget.gBuffer.depthTexture,
					type: '1i'
				},
			} ),
			defines: {
				"TILE": motionBlurTile,
			},
		} );

		// fxaa

		this.fxaa = new MXP.PostProcessPass( {
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

		this.bloomBright = new MXP.PostProcessPass( {
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

			this.bloomBlur.push( new MXP.PostProcessPass( {
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

			this.bloomBlur.push( new MXP.PostProcessPass( {
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

		this.composite = new MXP.PostProcessPass( {
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

		// tmps

		this.tmpVector1 = new GLP.Vector();
		this.tmpVector2 = new GLP.Vector();

		// postprocess

		this.scenePostProcess = new MXP.PostProcess( {
			input: this.renderTarget.shadingBuffer.textures,
			passes: [
				this.colorCollection,
				this.ssr,
				this.ssComposite,
				this.dofCoc,
				this.dofBokeh,
				this.dofComposite,
				this.motionBlurTile,
				this.motionBlurNeighbor,
				this.motionBlur,
			]
		} );

		this.postProcess = new MXP.PostProcess( {
			input: this.renderTarget.uiBuffer.textures,
			passes: [
				this.bloomBright,
				...this.bloomBlur,
				this.fxaa,
				this.composite,
			]
		} );

	}

	public setEntityImpl( entity: MXP.Entity | null, prevEntity: MXP.Entity | null ): void {

		if ( entity ) {

			entity.addComponent( "camera", this.cameraComponent );
			entity.addComponent( "scenePostProcess", this.scenePostProcess );
			entity.addComponent( "postProcess", this.postProcess );
			entity.addComponent( "orbitControls", this.orbitControls );
			// entity.addComponent( 'lookAt', this.lookAt );
			// entity.addComponent( 'shakeViewer', this.shakeViewer );

			// events

			entity.on( 'sceneCreated', ( root: MXP.Entity, ) => {

				const camera = root.getEntityByName( "Camera" ) || null;

				const lookAtTarget = root.getEntityByName( "CameraTarget" ) || null;
				this.lookAt.setTarget( lookAtTarget );

				const ortbitControls = entity.getComponent<OrbitControls>( "orbitControls" );

				if ( ortbitControls && camera && lookAtTarget ) {

					ortbitControls.setPosition( camera.position, lookAtTarget.position );

				}


				this.dofTarget = root.getEntityByName( 'CameraTargetDof' ) || null;
				this.baseFov = this.cameraComponent.fov;
				this.updateCameraParams( this.resolution );

			} );

		}

		if ( prevEntity ) {

			prevEntity.off( 'sceneCreated' );

		}

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

		const fov = this.cameraComponent.fov;
		const focusDistance = this.tmpVector1.sub( this.tmpVector2 ).length();
		const kFilmHeight = 0.002;
		const flocalLength = kFilmHeight / Math.tan( 0.5 * ( fov / 180 * Math.PI ) );

		const maxCoc = ( 1 / this.dofBokeh.renderTarget!.size.y ) * ( 5 );
		const rcpMaxCoC = 1.0 / maxCoc;
		const coeff = flocalLength * flocalLength / ( 0.3 * ( focusDistance - flocalLength ) * kFilmHeight * 2.0 );

		this.dofParams.set( focusDistance, maxCoc, rcpMaxCoC, coeff );

		// ssr swap

		const tmp = this.rtSSR1;
		this.rtSSR1 = this.rtSSR2;
		this.rtSSR2 = tmp;

		this.ssr.setRendertarget( this.rtSSR1 );
		this.ssComposite.uniforms.uSSRTexture.value = this.rtSSR1.textures[ 0 ];
		this.ssr.uniforms.uSSRBackBuffer.value = this.rtSSR2.textures[ 0 ];

	}

	public resize( resolution: GLP.Vector ): void {

		this.cameraComponent.resize( resolution );

		if ( this.scenePostProcess ) {

			this.scenePostProcess.resize( resolution );

		}

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
