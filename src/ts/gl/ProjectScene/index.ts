import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { canvas, gl, globalUniforms } from '../GLGlobals';
import { MainCamera } from '../Resources/Components/MainCamera';
import { OrbitControls } from '../Resources/Components/OrbitControls';
import { initResouces } from '../Resources/init';
import { initTextures } from '../Resources/Textures';

import { OREngineProjectData, ProjectSerializer, OREngineProjectFrame } from './IO/ProjectSerializer';
import { Renderer } from './Renderer';

export interface SceneTime {
	current: number;
	engine: number;
	delta: number;
	code: number;
}

export interface FramePlay {
	current: number
	playing: boolean,
}

export class ProjectScene extends MXP.Entity {

	// project

	private projectCache: OREngineProjectData | null;
	private projectSerializer: ProjectSerializer;

	// entities

	public root: MXP.Entity;

	// time

	public time: SceneTime;

	// frame

	public frame: FramePlay;
	public frameSetting: OREngineProjectFrame;

	// renderer

	public canvas: HTMLCanvasElement;
	public renderer: Renderer;

	// camera

	private camera: MXP.Entity;
	private cameraComponent: MainCamera;

	constructor() {

		super();

		this.name = "";

		// resources

		initResouces();
		initTextures();

		// project

		this.projectCache = null;

		this.projectSerializer = new ProjectSerializer();

		this.on( "update/blidge/scene", ( blidgeRoot: MXP.Entity ) => {

			if ( this.projectCache ) {

				this.projectSerializer.applyOverride( this.root, blidgeRoot, this.projectCache.objectOverride );

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

		this.frameSetting = {
			duration: 600,
			fps: 60,
		};

		this.frame = {
			current: 0,
			playing: false
		};

		this.seek( 0 );

		// camera

		this.camera = new MXP.Entity( { name: "camera" } );
		this.camera.position.set( 0, 0, 5 );
		this.camera.noExport = true;
		this.cameraComponent = this.camera.addComponent( new MainCamera() );
		const orbitControls = this.camera.getComponent<OrbitControls>( "orbitControls" );

		if ( orbitControls ) {

			orbitControls.setPosition( new GLP.Vector( 0, 0, 0 ), new GLP.Vector( 0, 0, 5 ) );

		}

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

		this.projectCache = project || null;

		if ( project ) {

			this.name = project.setting.name;

			this.remove( this.root );

			this.setProps( project.setting );
			this.root = this.projectSerializer.deserialize( project ).root;

			this.add( this.root );

		} else {

			this.name = "New Project";

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

			this.frame.current = this.frame.current + this.frameSetting.fps * this.time.delta;

			this.emit( "update/frame/play", [ this.frame ] );

		}

		this.time.code = this.frame.current / this.frameSetting.fps;
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

		globalUniforms.resolution.uResolution.value.copy( resolution );
		this.renderer.resize( resolution );
		this.cameraComponent.resize( resolution );

	}

	public getProps(): MXP.ExportableProps {

		return {
			name: { value: this.name },
			timeline: {
				duration: {
					value: this.frameSetting.duration,
				},
				fps: {
					value: this.frameSetting.fps
				},
			}
		};

	}

	public setPropsImpl( props: MXP.ExportablePropsSerialized ) {

		this.name = props[ "name" ];
		this.frameSetting.duration = props[ "timeline/duration" ];
		this.frameSetting.fps = props[ "timeline/fps" ];

	}

	// api

	public play() {

		this.frame.playing = true;

	}

	public stop() {

		this.frame.playing = false;

	}

	public seek( frame: number ) {

		this.frame.current = frame;

		this.emit( "update/frame/play", [ this.frame ] );

	}

	public export() {

		const data = this.projectSerializer.serialize( this, this.root );

		return data;

	}

}
