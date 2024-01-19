import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { blidge, canvas, gl, globalUniforms } from '../../Globals';

import { Carpenter } from './Carpenter';
import { MainCamera } from './Entities/MainCamera';
import { Renderer } from './Renderer';
import { createTextures } from './Textures';
import { FrameDebugger } from './utils/FrameDebugger';

type SceneUpdateParam = {
	forceDraw: boolean
}

export class Scene extends GLP.EventEmitter {

	public canvas: HTMLCanvasElement;

	public currentTime: number;
	public elapsedTime: number;
	public deltaTime: number;

	public root: MXP.Entity;
	private camera: MainCamera;
	private renderer: Renderer;

	// bufferView

	private cameraComponent: MXP.RenderCamera;
	private frameDebugger?: FrameDebugger;

	// carpenter

	private carpenter: Carpenter;

	constructor() {

		super();

		this.canvas = canvas;

		// state

		this.currentTime = new Date().getTime();
		this.elapsedTime = 0;
		this.deltaTime = 0;

		// textures

		createTextures();

		// root

		this.root = new MXP.Entity();

		// camera

		this.camera = new MainCamera();
		this.camera.position.set( 0, 1, 10 );
		this.root.add( this.camera );

		this.cameraComponent = this.camera.getComponent<MXP.RenderCamera>( 'camera' )!;

		// carpenter

		this.carpenter = new Carpenter( this.root, this.camera );

		blidge.on( "event/export_gltf", () => {

			window.location.reload();

		} );

		// renderer

		this.renderer = new Renderer();
		this.root.add( this.renderer );

		// buffers

		// if ( process.env.NODE_ENV == "development" ) {

		// 	const frameDebugger = new FrameDebugger( gl );

		// 	window.addEventListener( "keydown", ( e ) => {

		// 		if ( e.key == "d" ) {

		// 			frameDebugger.enable = ! frameDebugger.enable;
		// 			this.cameraComponent.displayOut = ! frameDebugger.enable;

		// 			queueMicrotask( () => {

		// 				frameDebugger.reflesh();

		// 			} );

		// 		}

		// 	} );

		// 	this.renderer.on( 'drawPass', ( rt?: GLP.GLPowerFrameBuffer, label?: string ) => {

		// 		if ( this.frameDebugger && this.frameDebugger.enable && rt ) {

		// 			this.frameDebugger.push( rt, label );

		// 		}

		// 	} );

		// 	this.frameDebugger = frameDebugger;

		// }

	}

	public update( param?: SceneUpdateParam ) {

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

		this.root.update( event );

		const renderStack = this.root.finalize( event );

		this.renderer.render( renderStack );

		// if ( process.env.NODE_ENV == "development" ) {

		// 	if ( this.frameDebugger && this.frameDebugger.enable ) {

		// 		this.frameDebugger.draw();

		// 	}

		// }

		return this.deltaTime;

	}

	public resize( resolution: GLP.Vector ) {

		this.renderer.resize( resolution );

		this.camera.resize( resolution );

		// if ( process.env.NODE_ENV == "development" ) {

		// 	if ( this.frameDebugger ) {

		// 		this.frameDebugger.resize( resolution );

		// 	}

		// }

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
