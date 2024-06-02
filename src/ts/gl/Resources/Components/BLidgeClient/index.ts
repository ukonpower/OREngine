import * as MXP from 'maxpower';

import { router } from './router';
import SceneData from './scene/scene.json';

import { gl } from '~/ts/gl/GLGlobals';

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

	private gltfPath: string;

	constructor() {

		super();

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

			if ( this.entity ) {

				this.entity.noticeParent( "update/blidge/frame", [ frame ] );

			}

		} );

		// gltf path

		this.gltfPath = BASE_PATH + "/scene.glb";

		this.setProps( this.getPropsSerialized() );

	}

	public getProps(): MXP.ExportableProps {

		const connect = this.connection.enabled;

		return {
			mode: {
				value: this.type,
				opt: {
					selectList: [
						"json",
						"websocket"
					]
				}
			},
			gltfPath: {
				value: this.gltfPath,
			},
			websocket: {
				connected: {
					value: connect,
				},
				url: {
					value: this.connection.url,
					opt: {
						readOnly: connect
					}
				},
			},
		};

	}

	public setProps( props: MXP.ExportablePropsSerialized ) {

		this.connection.url = props[ "websocket/url" ];
		this.connection.enabled = props[ "websocket/connected" ];
		this.type = props[ "mode" ];
		this.gltfPath = props[ "gltfPath" ];

		if ( this.connection.enabled ) {

			this.blidge.disconnect();

			if ( this.type == "json" ) {

				this.blidge.loadScene( SceneData as any, this.gltfPath );

			} else {

				this.blidge.connect( this.connection.url, this.gltfPath );

			}

		}

	}

	public getPropsSerialized(): MXP.ExportableProps {

		return {
			...super.getPropsSerialized(),
			// scene: { value: this.blidge.currentScene }
		};

	}

	protected setEntityImpl( entity: MXP.Entity, prevEntity: MXP.Entity ): void {

		if ( prevEntity && this.blidgeRoot ) {

			prevEntity.remove( this.blidgeRoot );

		}

		if ( entity && this.blidgeRoot ) {

			entity.add( this.blidgeRoot );

		}

	}

	private onSyncScene( blidge: MXP.BLidge ) {

		const timeStamp = new Date().getTime();

		const _ = ( node: MXP.BLidgeNode ): MXP.Entity => {

			const entity: MXP.Entity = ( this.entities.get( node.name ) || router( node ) );

			if ( node.type == 'camera' ) {

				const cameraParam = node.param as MXP.BLidgeCameraParam;
				entity.userData.cameraParam = cameraParam;

			}

			entity.addComponent( new MXP.BLidger( { blidge, node, disableEdit: true } ) );

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
			newBLidgeRoot.noExport = true;

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

			this.entity.notice( "sceneCreated", [ this.blidgeRoot ] );

			this.entity.noticeParent( "update/graph", [ "scenechange" ] );

			this.entity.noticeParent( "update/blidge/scene", [ this.blidgeRoot ] );

		}

	}

}
