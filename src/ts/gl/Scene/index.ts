import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, globalUniforms, mainCmaera } from '../../Globals';
import { ProjectSerializer, OREngineProjectData } from '../IO/ProjectSerializer';

import { MainCamera } from './Components/MainCamera';
import { Renderer } from './Renderer';
import { createTextures } from './Textures';

export class Scene extends GLP.EventEmitter {

	private projectIO: ProjectSerializer;

	public canvas: HTMLCanvasElement;
	private camera: MXP.Entity;

	public root: MXP.Entity;

	public currentTime: number;
	public elapsedTime: number;
	public deltaTime: number;

	private renderer: Renderer;

	// bufferView

	private cameraComponent: MainCamera;

	constructor() {

		super();

		// project

		this.projectIO = new ProjectSerializer();

		// canvas

		this.canvas = canvas;

		// state

		this.currentTime = new Date().getTime();
		this.elapsedTime = 0;
		this.deltaTime = 0;

		// textures

		createTextures();

		// camera

		this.camera = mainCmaera;
		this.camera.noExport = true;
		this.camera.position.set( 0, 1, 10 );
		this.cameraComponent = this.camera.addComponent( "mainCamera", new MainCamera() );

		// renderer

		this.renderer = new Renderer();
		this.renderer.noExport = true;

		// init

		this.root = new MXP.Entity();

		this.loadProject();

	}

	public loadProject( project?: OREngineProjectData ) {

		const root = this.root;

		root.remove( this.camera );
		root.remove( this.renderer );

		root.dispose();
		root.off( "changed" );

		root.children.forEach( c=>{

			root.remove( c );

		} );

		root.position.set( 0, 0, 0 );
		root.euler.set( 0, 0, 0 );
		root.scale.set( 1, 1, 1 );

		if ( project ) {

			this.root = this.projectIO.deserialize( project ).root;

		}

		root.on( "changed", ( opt: any ) => {

			console.log( opt );


			this.emit( "changed", opt );

		} );

		this.root.add( this.camera );
		this.root.add( this.renderer );

		this.root.name = "scene";

		this.emit( "changed" );

	}

	public exportProject( name: string ) {

		return this.projectIO.serialize( name, this.root );

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

		this.root.update( event );

		const renderStack = this.root.finalize( event );

		this.renderer.render( renderStack );

		return this.deltaTime;

	}

	public resize( resolution: GLP.Vector ) {

		this.renderer.resize( resolution );
		this.cameraComponent.resize( resolution );

	}

	public play( startTime: number ) {

		this.update();

		this.elapsedTime = startTime;

	}

	public dispose() {

		if ( this.root ) {

			this.root.dispose();

		}

		this.emit( 'dispose' );

	}

}
