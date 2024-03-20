import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, globalUniforms, mainCmaera } from '../../Globals';
import { ProjectSerializer, OREngineProjectData } from '../IO/ProjectSerializer';

import { Renderer } from './Renderer';
import { MainCamera } from './Resources/Components/MainCamera';
import { initResouces } from './Resources/init';
import { initTextures } from './Textures';

export class Scene extends GLP.EventEmitter {

	// project

	private projectSerializer: ProjectSerializer;

	// entities

	public root: MXP.Entity;

	// time

	public timeCurrent: number;
	public timeEngine: number;
	public timeDelta: number;
	public timeCode: number;

	// renderer

	public canvas: HTMLCanvasElement;
	public renderer: Renderer;

	// camera

	private camera: MXP.Entity;
	private cameraComponent: MainCamera;

	constructor() {

		super();

		// resources

		initResouces();
		initTextures();

		// project

		this.projectSerializer = new ProjectSerializer();

		// canvas

		this.canvas = canvas;

		// state

		this.timeCurrent = new Date().getTime();
		this.timeEngine = 0;
		this.timeDelta = 0;
		this.timeCode = 0;

		// camera

		this.camera = mainCmaera;
		this.camera.noExport = true;
		this.camera.position.set( 0, 1, 10 );
		this.cameraComponent = this.camera.addComponent( "mainCamera", new MainCamera() );

		// renderer

		this.renderer = new Renderer();
		this.renderer.noExport = true;

		// root

		this.root = new MXP.Entity();

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

		this.root.on( "blidgeFrameUpdate", ( ...opt: any ) => {

			this.emit( "blidgeFrameUpdate", opt );

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

	public update( param?: Undefineder<MXP.EntityUpdateEvent> ) {

		const currentTime = new Date().getTime();
		this.timeDelta = ( currentTime - this.timeCurrent ) / 1000;
		this.timeEngine += this.timeDelta;
		this.timeCurrent = currentTime;
		this.timeCode = param && param.timeCode || 0;

		globalUniforms.time.uTime.value = this.timeCode;
		globalUniforms.time.uTimeE.value = this.timeEngine;
		globalUniforms.time.uTimeEF.value = this.timeEngine % 1;

		const event: MXP.EntityUpdateEvent = {
			timElapsed: this.timeEngine,
			timeDelta: this.timeDelta,
			timeCode: this.timeCode,
			forceDraw: param && param.forceDraw,
			playing: param && param.playing || false,
		};

		this.root.update( event );

		const renderStack = this.root.finalize( event );

		this.renderer.render( renderStack );

		return this.timeDelta;

	}

	public resize( resolution: GLP.Vector ) {

		this.renderer.resize( resolution );
		this.cameraComponent.resize( resolution );

	}

	public play( startTime: number ) {

		this.update();

		this.timeEngine = startTime;

	}

	public dispose() {

		if ( this.root ) {

			this.root.dispose( true );

		}

		this.emit( 'dispose' );

	}

}
