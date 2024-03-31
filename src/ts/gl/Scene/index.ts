import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, gl, globalUniforms, mainCmaera } from '../../Globals';
import { ProjectSerializer, OREngineProjectData, OREngineProjectFrame } from '../IO/ProjectSerializer';

import { Renderer } from './Renderer';
import { MainCamera } from './Resources/Components/MainCamera';
import { initResouces } from './Resources/init';
import { initTextures } from './Textures';

export interface SceneTime {
	current: number;
	engine: number;
	delta: number;
	code: number;
}

export interface SceneFrame extends OREngineProjectFrame {
	current: number
	playing: boolean,
}

export class Scene extends MXP.Entity {

	// project

	private project: OREngineProjectData | null;
	private projectSerializer: ProjectSerializer;

	// entities

	public root: MXP.Entity;

	// time

	public time: SceneTime;

	// frame

	public frame: SceneFrame;

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

		// time

		this.time = {
			current: new Date().getTime(),
			engine: 0,
			delta: 0,
			code: 0,
		};

		// frame

		this.frame = {
			current: 0,
			duration: 600,
			fps: 60,
			playing: false
		};

		this.setFrame( 0 );

		// camera

		this.camera = mainCmaera;
		this.camera.noExport = true;
		this.camera.position.set( 0, 1, 10 );
		this.cameraComponent = this.camera.addComponent( "mainCamera", new MainCamera() );

		// renderer

		this.renderer = new Renderer( gl );
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
		currentRoot.disposeRecursive();

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

	public update( param?: Undefineder<MXP.EntityUpdateEvent> ) {

		const newTime = new Date().getTime();
		this.time.delta = ( newTime - this.time.current ) / 1000;
		this.time.current = newTime;

		if ( this.frame.playing ) {

			this.frame.current = this.frame.current + this.frame.fps * this.time.delta;

			this.emit( "update/frame", [ this.frame ] );

		}

		this.time.code = this.frame.current / this.frame.fps;
		this.time.engine += this.time.delta;

		globalUniforms.time.uTime.value = this.time.code;
		globalUniforms.time.uTimeE.value = this.time.engine;
		globalUniforms.time.uTimeEF.value = this.time.engine % 1;

		const event: MXP.EntityUpdateEvent = {
			timElapsed: this.time.engine,
			timeDelta: this.time.delta,
			timeCode: this.time.code,
			forceDraw: param && param.forceDraw,
			playing: this.frame.playing,
		};

		this.root.update( event );

		const renderStack = this.root.finalize( event );

		this.renderer.render( renderStack );

		return this.time.delta;

	}

	public resize( resolution: GLP.Vector ) {

		this.renderer.resize( resolution );
		this.cameraComponent.resize( resolution );

	}

	public play() {

		this.frame.playing = true;

	}

	public stop() {

		this.frame.playing = false;

	}

	public setFrame( frame: number ) {

		this.frame.current = frame;

		this.emit( "update/frame", [ this.frame ] );

	}

	public exportProject( name: string ) {

		return this.projectSerializer.serialize( name, this.root );

	}

}
