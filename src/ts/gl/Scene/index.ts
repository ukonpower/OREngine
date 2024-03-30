import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, globalUniforms, mainCmaera } from '../../Globals';
import { ProjectSerializer, OREngineProjectData } from '../IO/ProjectSerializer';

import { Renderer } from './Renderer';
import { MainCamera } from './Resources/Components/MainCamera';
import { initResouces } from './Resources/init';
import { initTextures } from './Textures';

export class Scene extends MXP.Entity {

	// project

	private project: OREngineProjectData | null;
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

		this.name = "scene";

		// resources

		initResouces();
		initTextures();

		// project

		this.project = null;

		this.projectSerializer = new ProjectSerializer();

		this.on( "update/blidge/scene", ( blidgeRoot: MXP.Entity ) => {

			if ( this.project ) {

				this.projectSerializer.applyOverride( this.root, blidgeRoot, this.project.objectOverride );

			}

		} );

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
		this.add( this.root );
		this.root.name = "root";

	}

	public init( project?: OREngineProjectData ) {

		const currentRoot = this.root;
		currentRoot.remove( this.camera );
		currentRoot.remove( this.renderer );
		currentRoot.dispose( true );

		currentRoot.position.set( 0, 0, 0 );
		currentRoot.euler.set( 0, 0, 0 );
		currentRoot.scale.set( 1, 1, 1 );

		this.project = project || null;

		if ( project ) {

			this.remove( this.root );

			this.root = this.projectSerializer.deserialize( project ).root;

			this.add( this.root );

		}

		this.root.add( this.camera );
		this.root.add( this.renderer );

		this.emit( "update/graph" );

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
