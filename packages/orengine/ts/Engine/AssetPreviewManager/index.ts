import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '..';

import textureCopyFrag from './shaders/textureCopy.fs';

const PREVIEW_SIZE = 128;

export class AssetPreviewManager {

	private _gl: WebGL2RenderingContext;
	private _renderer: MXP.Renderer;
	private _cache: Map<string, string>;
	private _readBuffer: Uint8Array;
	private _canvas2d: HTMLCanvasElement;
	private _ctx2d: CanvasRenderingContext2D;

	// texture preview
	private _texCopyPass: MXP.PostProcessPass;
	private _texCopyPostProcess: MXP.PostProcess;
	private _texPreviewFB: GLP.GLPowerFrameBuffer;

	// material preview
	private _matRenderTarget: MXP.RenderCameraTarget;
	private _matScene: MXP.Entity;
	private _matSphere: MXP.Entity;
	private _matMesh: MXP.Mesh;
	private _matCameraEntity: MXP.Entity;
	private _matLightEntity: MXP.Entity;

	constructor( gl: WebGL2RenderingContext, renderer: MXP.Renderer ) {

		this._gl = gl;
		this._renderer = renderer;
		this._cache = new Map();
		this._readBuffer = new Uint8Array( PREVIEW_SIZE * PREVIEW_SIZE * 4 );
		this._canvas2d = document.createElement( 'canvas' );
		this._canvas2d.width = PREVIEW_SIZE;
		this._canvas2d.height = PREVIEW_SIZE;
		this._ctx2d = this._canvas2d.getContext( '2d' )!;

		// texture preview: PostProcess pass
		this._texPreviewFB = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		this._texPreviewFB.setTexture( [ new GLP.GLPowerTexture( gl ) ] );
		this._texPreviewFB.setSize( new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ) );
		this._texCopyPass = new MXP.PostProcessPass( gl, {
			frag: textureCopyFrag,
			renderTarget: this._texPreviewFB,
		} );
		this._texCopyPostProcess = new MXP.PostProcess( { passes: [ this._texCopyPass ] } );

		// material preview: mini scene
		this._matRenderTarget = MXP.Renderer.createRenderTarget( gl );
		MXP.Renderer.resizeRenderTarget( this._matRenderTarget, new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ) );

		this._matScene = new MXP.Entity();
		this._matSphere = new MXP.Entity();
		this._matMesh = this._matSphere.addComponent( MXP.Mesh );
		this._matCameraEntity = new MXP.Entity();
		this._matLightEntity = new MXP.Entity();

		this._setupMaterialPreviewScene();

	}

	private _setupMaterialPreviewScene() {

		this._matScene.name = "previewScene";

		// sphere
		this._matSphere.name = "previewSphere";
		this._matMesh.geometry = new MXP.SphereGeometry( { radius: 0.5, widthSegments: 32, heightSegments: 16 } );
		this._matScene.add( this._matSphere );

		// camera
		this._matCameraEntity.name = "previewCamera";
		const camera = this._matCameraEntity.addComponent( MXP.Camera );
		camera.fov = 40;
		camera.near = 0.1;
		camera.far = 100;
		camera.aspect = 1;
		camera.displayOut = false;
		this._matCameraEntity.position.set( 0, 0, 1.5 );
		this._matCameraEntity.updateMatrix();
		camera.updateViewMatrix();
		camera.updateProjectionMatrix();
		this._matScene.add( this._matCameraEntity );

		// light (directional)
		this._matLightEntity.name = "previewLight";
		const light = this._matLightEntity.addComponent( MXP.Light );
		light.lightType = "directional";
		light.color.set( 1, 1, 1 );
		light.intensity = 2;
		light.castShadow = false;
		this._matLightEntity.position.set( 2, 3, 4 );
		this._matLightEntity.updateMatrix();
		this._matScene.add( this._matLightEntity );

	}

	public getTexturePreview( name: string ): string | null {

		const key = "tex:" + name;
		const cached = this._cache.get( key );
		if ( cached ) return cached;

		const texture = Engine.resources.getTexture( name );
		if ( ! texture ) return null;

		this._texCopyPass.uniforms.uPreviewTex = { value: texture, type: "1i" };
		this._renderer.renderPostProcess(
			this._texCopyPostProcess, undefined,
			new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE )
		);

		const dataUrl = this._readFBToDataURL( this._texPreviewFB );
		this._cache.set( key, dataUrl );
		return dataUrl;

	}

	public getMaterialPreview( name: string ): string | null {

		const key = "mat:" + name;
		const cached = this._cache.get( key );
		if ( cached ) return cached;

		const material = Engine.resources.getMaterialInstance( name );
		if ( ! material ) return null;

		// apply material to sphere
		this._matMesh.material = material;

		// update matrices
		this._matScene.updateMatrix();
		this._matSphere.updateMatrix();
		this._matCameraEntity.updateMatrix();
		this._matLightEntity.updateMatrix();

		const camera = this._matCameraEntity.getComponent( MXP.Camera );
		if ( camera ) {

			camera.updateViewMatrix();
			camera.updateProjectionMatrix();

		}

		// temporarily change renderer resolution
		const prevResolution = this._renderer.resolution.clone();
		this._renderer.resolution.set( PREVIEW_SIZE, PREVIEW_SIZE );

		const event: MXP.EntityUpdateEvent = {
			playing: false,
			timeElapsed: 0,
			timeDelta: 0,
			timeCode: 0,
			timeCodeFrame: 0,
			resolution: new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ),
			renderer: this._renderer,
			forceDraw: true,
		};

		this._renderer.render(
			this._matScene,
			this._matCameraEntity,
			event,
			this._matRenderTarget
		);

		// restore resolution
		this._renderer.resolution.copy( prevResolution );

		const dataUrl = this._readFBToDataURL( this._matRenderTarget.uiBuffer );
		this._cache.set( key, dataUrl );
		return dataUrl;

	}

	public invalidate( key: string ): void {

		this._cache.delete( key );

	}

	public invalidateAll(): void {

		this._cache.clear();

	}

	private _readFBToDataURL( fb: GLP.GLPowerFrameBuffer ): string {

		const gl = this._gl;
		gl.bindFramebuffer( gl.FRAMEBUFFER, fb.getFrameBuffer() );
		gl.readPixels( 0, 0, PREVIEW_SIZE, PREVIEW_SIZE, gl.RGBA, gl.UNSIGNED_BYTE, this._readBuffer );
		gl.bindFramebuffer( gl.FRAMEBUFFER, null );

		// readPixels returns Y-flipped data
		const imageData = this._ctx2d.createImageData( PREVIEW_SIZE, PREVIEW_SIZE );
		for ( let y = 0; y < PREVIEW_SIZE; y ++ ) {

			const srcRow = ( PREVIEW_SIZE - 1 - y ) * PREVIEW_SIZE * 4;
			const dstRow = y * PREVIEW_SIZE * 4;
			for ( let x = 0; x < PREVIEW_SIZE * 4; x ++ ) {

				imageData.data[ dstRow + x ] = this._readBuffer[ srcRow + x ];

			}

		}

		this._ctx2d.putImageData( imageData, 0, 0 );
		return this._canvas2d.toDataURL();

	}

	public dispose(): void {

		this._cache.clear();
		this._texPreviewFB.dispose();
		this._matRenderTarget.gBuffer.dispose();
		this._matRenderTarget.shadingBuffer.dispose();
		this._matRenderTarget.forwardBuffer.dispose();
		this._matRenderTarget.uiBuffer.dispose();
		this._matRenderTarget.normalBuffer.dispose();
		this._matScene.disposeRecursive();

	}

}
