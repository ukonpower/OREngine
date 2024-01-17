import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import SceneData from './scene/scene.json';
import { router } from './router';
import { blidge } from '~/ts/Globals';

export class Carpenter extends GLP.EventEmitter {

	private root: MXP.Entity;
	private blidgeRoot: MXP.Entity | null;
	private camera: MXP.Entity;
	private entities: Map<string, MXP.Entity>;

	// frame

	private playing: boolean;
	private playTime: number;

	constructor( root: MXP.Entity, camera: MXP.Entity ) {

		super();

		this.root = root;
		this.camera = camera;
		this.entities = new Map();

		// state

		this.playing = false;
		this.playTime = 0;

		// blidge

		this.blidgeRoot = null;

		blidge.on( 'sync/scene', this.onSyncScene.bind( this ) );

		blidge.on( 'sync/timeline', ( frame: MXP.BLidgeFrame ) => {
		} );

		if ( process.env.NODE_ENV == "development" ) {

			blidge.connect( 'ws://localhost:3100', BASE_PATH + "/scene.glb" );

			blidge.on( 'error', () => {

				blidge.loadScene( SceneData as any, BASE_PATH + "/scene.glb" );

			} );

		} else {

			blidge.loadScene( SceneData as any, BASE_PATH + "/scene.glb" );

		}

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
