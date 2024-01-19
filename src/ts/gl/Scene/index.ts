import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { blidge, canvas, globalUniforms } from '../../Globals';

import { Carpenter } from './Carpenter';
import { MainCamera } from './Entities/MainCamera';
import { Renderer } from './Renderer';
import { createTextures } from './Textures';
import { FrameDebugger } from './utils/FrameDebugger';

export class Scene extends MXP.Entity {

	public canvas: HTMLCanvasElement;

	public currentTime: number;
	public elapsedTime: number;
	public deltaTime: number;

	private camera: MainCamera;
	private renderer: Renderer;

	// bufferView

	private cameraComponent: MXP.RenderCamera;
	private frameDebugger?: FrameDebugger;

	// carpenter

	private carpenter: Carpenter;

	constructor() {

		super( { name: "scene" } );

		this.canvas = canvas;

		// state

		this.currentTime = new Date().getTime();
		this.elapsedTime = 0;
		this.deltaTime = 0;

		// textures

		createTextures();

		// camera

		this.camera = new MainCamera();
		this.camera.position.set( 0, 1, 10 );
		this.add( this.camera );

		this.cameraComponent = this.camera.getComponent<MXP.RenderCamera>( 'camera' )!;

		// carpenter

		this.carpenter = new Carpenter( this, this.camera );

		blidge.on( "event/export_gltf", () => {

			window.location.reload();

		} );

		// renderer

		this.renderer = new Renderer();
		this.add( this.renderer );

	}

	public update( param?: MXP.EntityUpdateEvent ) {

		const currentTime = new Date().getTime();
		this.deltaTime = ( currentTime - this.currentTime ) / 1000;
		this.elapsedTime += this.deltaTime;
		this.currentTime = currentTime;

		globalUniforms.time.uTime.value = this.elapsedTime;
		globalUniforms.time.uFractTime.value = this.elapsedTime % 1;

		const event: MXP.EntityUpdateEvent = {
			time: this.elapsedTime,
			deltaTime: this.deltaTime,
			forceDraw: param && param.forceDraw
		};

		super.update( event );

		const renderStack = this.finalize( event );

		this.renderer.render( renderStack );


		return this.deltaTime;

	}

	public resize( resolution: GLP.Vector ) {

		this.renderer.resize( resolution );

		this.camera.resize( resolution );

	}

	public play( startTime: number ) {

		this.update();

		this.elapsedTime = startTime;

		this.emit( 'play' );

	}

	public dispose() {

		this.emit( 'dispose' );

	}

}
