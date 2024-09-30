import * as MXP from 'maxpower';

import { router } from './router';

import { gl } from '~/ts/gl/GLGlobals';
import SceneData from '~/ts/gl/Resources/scene.json';


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

		this.useGLTF = false;
		this.gltfPath = BASE_PATH + "/scene.glb";

		this.deserialize( this.serialize() );

	}

	public get props() {

		const connect = this.connection.enabled;

		return {
			...super.props,
			mode: {
				value: this.type,
				selectList: [
					"json",
					"websocket"
				]
			},
			gltf: {
				value: this.useGLTF,
			},
			gltfPath: this.useGLTF && {
				value: this.gltfPath,
			} || undefined,
			websocket: this.type == "websocket" && {
				reconnect: {
					value: () => {

						this.blidge.connect( this.connection.url, this.useGLTF ? this.gltfPath : undefined );

					},
				},
				url: {
					value: this.connection.url,
					opt: {
						readOnly: connect
					}
				},
			} || undefined,
		};

	}

	protected deserializer( props: MXP.TypedSerializableProps<this> ) {

		super.deserializer( props );

		this.connection.url = ( props.websocket && props.websocket.url.value ) || this.connection.url;
		this.type = props.mode.value;
		this.useGLTF = props.gltf.value || false;
		this.gltfPath = ( props.gltfPath && props.gltfPath.value ) || this.gltfPath;

		this.blidge.disconnect();

		if ( this.type == "json" ) {

			this.blidge.loadScene( SceneData as any, this.useGLTF ? this.gltfPath : undefined );

		} else {

			if ( this.connection.enabled ) {

				this.blidge.connect( this.connection.url, this.useGLTF ? this.gltfPath : undefined );

			}

		}

	}

	public serialize(): MXP.SerializableProps {

		return {
			...super.serialize()
		};

	}

	protected setEntityImpl( entity: MXP.Entity ): void {

		if ( this.blidgeRoot ) {

			entity.add( this.blidgeRoot );

		}

	}

	protected unsetEntityImpl( prevEntity: MXP.Entity ): void {

		if ( this.blidgeRoot ) {

			prevEntity.remove( this.blidgeRoot );

		}

	}

	private onSyncScene( blidge: MXP.BLidge ) {

		const timeStamp = new Date().getTime();

		const _ = ( node: MXP.BLidgeEntity ): MXP.Entity => {

			const entity: MXP.Entity = ( this.entities.get( node.name ) || router( node ) );

			if ( node.type == 'camera' ) {

				const cameraParam = node.param as MXP.BLidgeCameraParam;
				entity.userData.cameraParam = cameraParam;

			}

			entity.addComponent( new MXP.BLidger( { blidge, node } ) );

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

			this.entity.notice( "sceneCreated", [ this.blidgeRoot ] );

			this.entity.noticeParent( "update/graph", [ "scenechange" ] );

			this.entity.noticeParent( "update/blidge/scene", [ this.blidgeRoot ] );

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
