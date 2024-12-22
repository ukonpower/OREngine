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

		// connection

		this.type = "websocket";

		this.connection = {
			enabled: true,
			url: "ws://localhost:3100",
		};

		// blidge

		this.blidgeRoot = null;

		this.blidge = new MXP.BLidge( gl );

		this.blidge.on( 'sync/scene', this.onSyncScene.bind( this ) );

		this.blidge.on( 'sync/timeline', ( frame: MXP.BLidgeFrame ) => {

			if ( this._entity ) {

				this._entity.noticeEventParent( "update/blidge/frame", [ frame ] );

			}

		} );

		// gltf path

		this.useGLTF = false;
		this.gltfPath = BASE_PATH + "/scene.glb";

		// fields

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
		ws.field( "reconnect", () => () => reload() );
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

			if ( this.blidgeRoot && this._entity ) {

				this._entity.remove( this.blidgeRoot );

			}

			this.blidgeRoot = newBLidgeRoot;

			if ( this._entity ) {

				this._entity.add( this.blidgeRoot );

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

		if ( this._entity ) {

			this._entity.noticeEventChilds( "sceneCreated", [ this.blidgeRoot ] );
			this._entity.noticeEventParent( "update/blidge/scene", [ this.blidgeRoot ] );

		}

	}

	public dispose(): void {

		super.dispose();

		if ( this.blidgeRoot ) {

			this.blidgeRoot.disposeRecursive();
			this.blidgeRoot = null;

		}

	}

}
