import * as MXP from 'maxpower';

import { router } from './router';
import SceneData from './scene/scene.json';

export class BLidgeClient extends MXP.Component {

	private blidge: MXP.BLidge;

	private root: MXP.Entity;
	private blidgeRoot: MXP.Entity | null;
	private camera: MXP.Entity;
	private entities: Map<string, MXP.Entity>;

	// connection

	private connection: {
		enabled: boolean,
		url: string,
	};

	// gltf path

	private gltfPath: string;

	// frame

	private playing: boolean;
	private playTime: number;

	constructor( gl: WebGL2RenderingContext, root: MXP.Entity, camera: MXP.Entity ) {

		super();

		this.root = root;
		this.camera = camera;
		this.entities = new Map();

		// state

		this.playing = false;
		this.playTime = 0;

		// connection

		this.connection = {
			enabled: true,
			url: "ws://localhost:3100",
		};

		// blidge

		this.blidgeRoot = null;

		this.blidge = new MXP.BLidge( gl );

		this.blidge.on( 'sync/scene', this.onSyncScene.bind( this ) );

		this.blidge.on( 'sync/timeline', ( frame: MXP.BLidgeFrame ) => {
		} );

		// gltf path

		this.gltfPath = BASE_PATH + "/scene.glb";

		// init

		this.property = this.property;

	}

	public get property(): MXP.ComponentProps {

		const connect = this.connection.enabled;

		return {
			connected: {
				value: connect,
			},
			url: {
				value: this.connection.url,
				opt: {
					readOnly: connect
				}
			},
			gltfPath: {
				value: this.gltfPath,
				opt: {
					readOnly: connect
				}
			}
		};

	}

	public set property( props: MXP.ComponentProps ) {

		this.connection.url = props.url.value;

		this.connection.enabled = props.connected.value;

		this.gltfPath = props.gltfPath.value;

		if ( props.connected.value ) {

			// this.blidge.connect( this.connection.url, this.gltfPath );

			this.blidge.loadScene( SceneData as any, this.gltfPath );

		} else {

			this.blidge.disconnect();

		}

	}

	public get export(): MXP.ComponentProps | null {

		return {
			...super.export,
			scene: { value: this.blidge.currentScene }
		};

	}

	private onSyncScene( blidge: MXP.BLidge ) {

		const timeStamp = new Date().getTime();

		const _ = ( node: MXP.BLidgeNode ): MXP.Entity => {

			const entity: MXP.Entity = node.type == 'camera' ? this.camera : ( this.entities.get( node.name ) || router( node ) );

			if ( node.type == 'camera' ) {

				const cameraParam = node.param as MXP.BLidgeCameraParam;
				const renderCamera = this.camera.getComponent<MXP.RenderCamera>( "camera" )!;
				renderCamera.fov = cameraParam.fov;
				renderCamera.needsUpdate = true;

			}

			entity.addComponent( "blidger", new MXP.BLidger( blidge, node ) );

			node.children.forEach( c => {

				const child = _( c );

				entity.add( child );

			} );

			this.entities.set( entity.name, entity );

			entity.userData.updateTime = timeStamp;

			return entity;

		};

		const newBLidgeRoot = blidge.root && _( blidge.root );

		if ( newBLidgeRoot ) {

			if ( this.blidgeRoot ) {

				this.root.remove( this.blidgeRoot );

			}

			this.blidgeRoot = newBLidgeRoot;

			this.root.add( this.blidgeRoot );

		}

		// remove

		this.entities.forEach( item => {

			if ( item.userData.updateTime != timeStamp ) {

				const parent = item.parent;

				if ( parent ) {

					parent.remove( item );

				}

				item.dispose();
				this.entities.delete( item.name );

			}

		} );

		// blidger

		if ( this.blidgeRoot ) {

			this.blidgeRoot.noticeRecursive( "sceneCreated", this.blidgeRoot );

		}

	}

}
