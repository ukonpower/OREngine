import { Mesh } from '../../../core/Components/Mesh';
import { Entity } from '../../../core/Entity';
import { Geometry } from '../../../core/Geometry';

import type { GLTF, GLTFLoaderContract } from '../../../core/Contracts/GLTFLoaderContract';
import type { GPUEngine } from '../../Renderer';

/*-------------------------------
	glTF(glb)ローダー

	webgl側のGLTFLoaderからジオメトリとノード木の構築だけを持つ薄い実装。
	マテリアルは作らない（mesh.material は null のままにして、
	レンダラーの既定マテリアル or attachments のコンポーネントに委ねる）
-------------------------------*/

const GLB_HEADER_LENGTH = 12;
const GLB_CHUNK_HEADER_LENGTH = 8;

type GLTFBufferView = {
	buffer: number;
	byteOffset: number;
	byteLength: number;
};

type GLTFNode = {
	name: string;
	mesh: number;
	translation?: number[];
	rotation?: number[];
	scale?: number[];
	children?: number[];
};

type GLTFJson = {
	accessors?: { bufferView: number; type: string; componentType: number }[];
	bufferViews?: GLTFBufferView[];
	meshes?: { primitives: { attributes: { [name: string]: number }; indices?: number }[] }[];
	nodes?: GLTFNode[];
	scenes?: { nodes?: number[] }[];
};

const type2Size = ( type: string ) => {

	switch ( type ) {

	case "VEC2":
		return 2;
	case "VEC3":
		return 3;
	case "VEC4":
		return 4;
	default:
		return 1;

	}

};

// 読み込む頂点属性と Geometry 側の名前の対応。ここに無い属性（TANGENT等）は捨てる
const ATTRIBUTE_NAMES: { [gltfName: string]: string } = {
	POSITION: 'position',
	NORMAL: 'normal',
	TEXCOORD_0: 'uv',
};

export class GLTFLoader implements GLTFLoaderContract {

	private _engine: GPUEngine;

	constructor( engine: GPUEngine ) {

		this._engine = engine;

	}

	// glbを読み込みエンティティ木を返す
	public async load( path: string ): Promise<GLTF> {

		const res = await fetch( path );
		const data = await res.arrayBuffer();

		const textDecoder = new TextDecoder();

		if ( textDecoder.decode( new Uint8Array( data, 0, 4 ) ) != "glTF" ) {

			throw new Error( `GLTFLoader: glb形式ではありません: ${path}` );

		}

		const dataView = new DataView( data );

		const jsonHeader = {
			length: dataView.getUint32( GLB_HEADER_LENGTH, true ),
			type: dataView.getUint32( GLB_HEADER_LENGTH + 4, true ),
		};

		if ( jsonHeader.type != 0x4E4F534A ) {

			throw new Error( `GLTFLoader: JSONチャンクがありません: ${path}` );

		}

		const jsonBodyOffset = GLB_HEADER_LENGTH + GLB_CHUNK_HEADER_LENGTH;
		const json = JSON.parse( textDecoder.decode( new Uint8Array( data, jsonBodyOffset, jsonHeader.length ) ) ) as GLTFJson;

		let binBuffer: ArrayBuffer | null = null;

		if ( data.byteLength > jsonBodyOffset + jsonHeader.length + GLB_CHUNK_HEADER_LENGTH ) {

			const bufferOffset = jsonBodyOffset + jsonHeader.length;

			const bufferHeader = {
				length: dataView.getUint32( bufferOffset, true ),
				type: dataView.getUint32( bufferOffset + 4, true ),
			};

			if ( bufferHeader.type == 0x004E4942 ) {

				const bufferBodyOffset = bufferOffset + GLB_CHUNK_HEADER_LENGTH;
				binBuffer = data.slice( bufferBodyOffset, bufferBodyOffset + bufferHeader.length );

			}

		}

		// accessors

		const parsedAccessors = new Map<number, { buffer: ArrayBuffer; type: string }>();

		( json.accessors || [] ).forEach( ( accessor, i ) => {

			if ( ! json.bufferViews || ! binBuffer ) return;

			const bufferView = json.bufferViews[ accessor.bufferView ];

			parsedAccessors.set( i, {
				type: accessor.type,
				buffer: binBuffer.slice( bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength ),
			} );

		} );

		// meshes

		const parsedMeshes = new Map<number, Geometry[]>();

		( json.meshes || [] ).forEach( ( mesh, i ) => {

			parsedMeshes.set( i, mesh.primitives.map( ( primitive ) => {

				const geometry = new Geometry();

				Object.keys( primitive.attributes ).forEach( ( attributeName ) => {

					const geometryAttrName = ATTRIBUTE_NAMES[ attributeName ];

					if ( ! geometryAttrName ) return;

					const accessor = parsedAccessors.get( primitive.attributes[ attributeName ] );

					if ( accessor ) {

						geometry.setAttribute( geometryAttrName, new Float32Array( accessor.buffer ), type2Size( accessor.type ) );

					}

				} );

				if ( primitive.indices !== undefined ) {

					const indexAccessor = parsedAccessors.get( primitive.indices );

					if ( indexAccessor ) {

						geometry.setAttribute( "index", new Uint16Array( indexAccessor.buffer ), 1 );

					}

				}

				return geometry;

			} ) );

		} );

		// nodes

		const parsedNode = new Map<number, Entity>();

		const createEntity = ( nodeNum: number, node: GLTFNode ): Entity => {

			const entity = this._engine.createEntity();

			entity.name = node.name;

			if ( node.translation ) entity.position.set( node.translation[ 0 ], node.translation[ 1 ], node.translation[ 2 ] );
			if ( node.rotation ) entity.quaternion.set( node.rotation[ 0 ], node.rotation[ 1 ], node.rotation[ 2 ], node.rotation[ 3 ] );
			if ( node.scale ) entity.scale.set( node.scale[ 0 ], node.scale[ 1 ], node.scale[ 2 ] );

			const geometries = parsedMeshes.get( node.mesh );

			if ( geometries ) {

				if ( geometries.length == 1 ) {

					entity.addComponent( Mesh ).geometry = geometries[ 0 ];

				} else {

					geometries.forEach( ( geometry, i ) => {

						const partEntity = this._engine.createEntity();
						partEntity.name = node.name + "_" + i;
						partEntity.addComponent( Mesh ).geometry = geometry;

						entity.add( partEntity );

					} );

				}

			}

			( node.children || [] ).forEach( ( childNodeNum ) => {

				const child = parsedNode.get( childNodeNum );

				if ( child ) {

					entity.add( child );

				} else if ( json.nodes ) {

					entity.add( createEntity( childNodeNum, json.nodes[ childNodeNum ] ) );

				}

			} );

			parsedNode.set( nodeNum, entity );

			return entity;

		};

		( json.nodes || [] ).forEach( ( node, i ) => {

			createEntity( i, node );

		} );

		const scene = this._engine.createEntity();

		const sceneNode = json.scenes && json.scenes[ 0 ];

		( ( sceneNode && sceneNode.nodes ) || [] ).forEach( ( nodeNum ) => {

			const entity = parsedNode.get( nodeNum );

			if ( entity ) {

				scene.add( entity );

			}

		} );

		return { scene };

	}

}
