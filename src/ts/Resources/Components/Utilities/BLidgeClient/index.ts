import * as MXP from 'maxpower';

import { gl } from '~/ts/Globals';
import SceneData from '~/ts/Resources/scene.json';

export class BLidgeClient extends MXP.Component {

	private blidge: MXP.BLidge;
	private type: "websocket" | "json" | null;

	private blidgeRoot: MXP.Entity | null;
	private entities: Map<string, MXP.Entity>;

	// connection

	private connection: {
		enabled: boolean,
		url: string,
	};

	// gltf path

	private useGLTF: boolean;
	private gltfPath: string;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entities = new Map();
		this.type = "websocket";
		this.connection = {
			enabled: true,
			url: "ws://localhost:3100",
		};
		this.useGLTF = false;
		this.gltfPath = BASE_PATH + "/scene.glb";

		/*-------------------------------
			BLidge
		-------------------------------*/

		this.blidgeRoot = null;

		this.blidge = new MXP.BLidge( gl );

		const onSyncScene = this.onSyncScene.bind( this );

		const onSyncTimeline = ( frame: MXP.BLidgeFrame ) => {

			if ( this.entity ) {

				this.entity.noticeEventParent( "update/blidge/frame", [ frame ] );

			}

		};

		this.blidge.on( 'sync/scene', onSyncScene );
		this.blidge.on( 'sync/timeline', onSyncTimeline );

		this.once( "dispose", () => {

			this.blidge.off( 'sync/scene', onSyncScene );
			this.blidge.off( 'sync/timeline', onSyncTimeline );

		} );

		/*-------------------------------
			Fields
		-------------------------------*/

		const reload = () => {

			if ( this.type == "json" ) {

				this.blidge.loadScene( SceneData as unknown as MXP.BLidgeScene, this.useGLTF ? this.gltfPath : undefined );

			} else {

				this.blidge.connect( this.connection.url, this.useGLTF ? this.gltfPath : undefined );

			}

		};

		this.field( "mode", () => this.type, v => {

			this.type = v;

			reload();

		}, {
			format: {
				type: "select",
				list: [ "websocket", "json" ],
			}
		} );

		this.field( "gltf", () => this.useGLTF, v => {

			this.useGLTF = v;

			reload();

		} );

		this.field( "gltfPath", () => this.gltfPath, ( v ) => {

			this.gltfPath = v;

			reload();

		}, );

		const ws = this.fieldDir( "websocket", { hidden: () => this.type != "websocket" } );
		ws.field( "reconnect", () => () => reload(), undefined, {
			label: "Reconnect",
		} );
		ws.field( "url", () => this.connection.url, v => this.connection.url = v );

	}

	private onSyncScene( blidge: MXP.BLidge ) {

		const timeStamp = new Date().getTime();

		const _ = ( node: MXP.BLidgeNode ): MXP.Entity => {

			const entity: MXP.Entity = ( this.entities.get( node.name ) || new MXP.Entity() );

			if ( node.type == 'camera' ) {

				const cameraParam = node.param as MXP.BLidgeCameraParam;
				entity.userData.cameraParam = cameraParam;

			}

			entity.removeComponent( MXP.BLidger );

			entity.addComponent( MXP.BLidger, { blidge, node } );

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

			newBLidgeRoot.name = "blidgeRoot";

			if ( this.blidgeRoot && this.entity ) {

				this.entity.remove( this.blidgeRoot );

			}

			this.blidgeRoot = newBLidgeRoot;

			if ( this.entity ) {

				this.entity.add( this.blidgeRoot );

			}

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

		// notice

		if ( this.entity ) {

			this.entity.noticeEventChilds( "sceneCreated", [ this.blidgeRoot ] );
			this.entity.noticeEventParent( "update/blidge/scene", [ this.blidgeRoot ] );

		}

	}

	public dispose(): void {

		super.dispose();

		if ( this.blidgeRoot ) {

			this.blidgeRoot.disposeRecursive();
			this.entity.remove( this.blidgeRoot );
			this.blidgeRoot = null;

		}

	}

}
