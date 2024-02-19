import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, globalUniforms, mainCmaera } from '../../Globals';
import { ProjectSerializer, OREngineProjectData } from '../IO/ProjectSerializer';

import { Renderer } from './Renderer';
import { MainCamera } from './Resources/Components/MainCamera';
import { initResouces } from './Resources/init';
import { createTextures } from './Textures';


// resources

initResouces();

export class Scene extends GLP.EventEmitter {

	private projectSerializer: ProjectSerializer;

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

		this.projectSerializer = new ProjectSerializer();

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

		const currentRoot = this.root;
		currentRoot.remove( this.camera );
		currentRoot.remove( this.renderer );
		currentRoot.dispose( true );

		currentRoot.position.set( 0, 0, 0 );
		currentRoot.euler.set( 0, 0, 0 );
		currentRoot.scale.set( 1, 1, 1 );

		currentRoot.off( "changed" );
		currentRoot.off( "blidgeSceneUpdate" );

		// create

		if ( project ) {

			this.root = this.projectSerializer.deserialize( project ).root;

		}

		this.root.name = "scene";

		this.root.on( "changed", ( ...opt: any ) => {

			this.emit( "changed", opt );

		} );

		this.root.on( "blidgeSceneUpdate", ( root: MXP.Entity ) => {

			if ( project ) {

				this.projectSerializer.applyOverride( root, project.objectOverride );

			}

		} );


		this.root.add( this.camera );
		this.root.add( this.renderer );

		this.emit( "changed" );

	}

	public exportProject( name: string ) {

		return this.projectSerializer.serialize( name, this.root );

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

			this.root.dispose( true );

		}

		this.emit( 'dispose' );

	}

}
