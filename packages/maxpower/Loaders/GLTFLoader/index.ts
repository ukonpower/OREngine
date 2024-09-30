import * as GLP from 'glpower';

import { Geometry } from '../../Component/Geometry';
import { Material } from '../../Component/Material';
import { Entity } from '../../Entity';

import { GLTFFormat, GLTFBufferView, GLTFNode } from './gltf';
import gltfFrag from './shaders/gltf.fs';
import gltfVert from './shaders/gltf.vs';

const GLB_HEADER_LENGTH = 12;
const GLB_CHUNK_HEADER_LENGTH = 8;

const type2Size = ( type: string ) => {

	switch ( type ) {

	case "VEC2":
		return 2;
	case "VEC3":
		return 3;
	case "VEC4":
		return 4;
	case "SCALAR":
		return 1;
	default:
		return 1;

	}

};

const translateAttributeName = ( name: string )=> {

	switch ( name ) {

	case "TEXCOORD_0":
		return "uv";
	default:
		return name.toLowerCase();

	}

};

export type GLTF = {
	scene: Entity;
}

export class GLTFLoader extends GLP.EventEmitter {

	private gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		super();

		this.gl = gl;

	}

	public async load( path: string ): Promise<GLTF> {

		const res = await fetch( path );

		const data = await res.arrayBuffer();

		const textDecoder = new TextDecoder();

		const glbMagic = textDecoder.decode( new Uint8Array( data, 0, 4 ) );

		const buffers: Map<number, ArrayBuffer> = new Map();

		let json: GLTFFormat | null = null;

		if ( glbMagic == "glTF" ) {

			const dataView = new DataView( data );

			const jsonOffset = GLB_HEADER_LENGTH;

			const jsonHeader = {
				length: dataView.getUint32( jsonOffset, true ),
				type: dataView.getUint32( jsonOffset + 4, true )
			};

			if ( jsonHeader.type == 0x4E4F534A ) {

				const jsonBodyOffset = GLB_HEADER_LENGTH + GLB_CHUNK_HEADER_LENGTH;

				json = JSON.parse( textDecoder.decode( new Uint8Array( data, jsonBodyOffset, jsonHeader.length ) ) );

			}

			if ( data.byteLength > GLB_CHUNK_HEADER_LENGTH + jsonHeader.length + GLB_HEADER_LENGTH ) {

				const bufferOffset = GLB_HEADER_LENGTH + GLB_CHUNK_HEADER_LENGTH + jsonHeader.length;

				const bufferHeader = {
					length: dataView.getUint32( bufferOffset, true ),
					type: dataView.getUint32( bufferOffset + 4, true )
				};

				if ( bufferHeader.type == 0x004E4942 ) {

					const bufferBodyOffset = bufferOffset + GLB_CHUNK_HEADER_LENGTH;

					const buffer = data.slice( bufferBodyOffset, bufferBodyOffset + bufferHeader.length );

					buffers.set( 0, buffer );

				}

			}

		} else {

			json = JSON.parse( textDecoder.decode( new Uint8Array( data ) ) );

		}

		if ( ! json ) {

			throw new Error( "" );

		}

		const gltfJson = json;

		const getBuffer = ( bufferView: GLTFBufferView ) => {

			const buffer = buffers.get( bufferView.buffer );

			if ( buffer ) {

				return buffer.slice( bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength );

			}

			return null;

		};

		// buffers

		const parsedAccessors = new Map<number, {buffer: ArrayBuffer, type: string}>();

		json.accessors && json.accessors.forEach( ( accessor, i ) => {

			const { type } = accessor;

			if ( ! gltfJson.bufferViews ) return;

			const bufferView = gltfJson.bufferViews[ accessor.bufferView ];

			const buffer = getBuffer( bufferView );

			if ( buffer ) {

				parsedAccessors.set( i, {
					type,
					buffer
				} );

			}

		} );

		// images

		const parsedImages = new Map<number, HTMLImageElement>();

		const imgPrmList = ( gltfJson.images || [] ).map( ( img, i ) => {

			return new Promise( ( resolve ) => {

				if ( img.bufferView !== undefined ) {

					if ( ! gltfJson.bufferViews ) return;

					const bufferView = gltfJson.bufferViews[ img.bufferView ];

					const buffer = getBuffer( bufferView );

					if ( buffer ) {

						const blb = new Blob( [ new Uint8Array( buffer ) ], { type: img.mimeType } );

						const imgElm = new Image();

						imgElm.onload = () => {

							resolve( img );

						};

						imgElm.src = URL.createObjectURL( blb );

						parsedImages.set( i, imgElm );

					}

				}

			} );

		} );

		await Promise.all( imgPrmList );

		// materials

		const parsedMaterials = new Map<number, Material>();

		const getTexture = ( index: number ) => {

			if ( ! gltfJson.textures ) return null;

			const gltfTexture = gltfJson.textures[ index ];

			if ( gltfTexture ) {

				const texture = new GLP.GLPowerTexture( this.gl );

				const source = parsedImages.get( gltfTexture.source );

				if ( source ) {

					texture.attach( source );

					return texture;

				}

			}

			return null;

		};

		gltfJson.materials && gltfJson.materials.forEach( ( mat, i ) => {

			const material = new Material( {
				frag: gltfFrag,
				vert: gltfVert,
			} );

			// normal

			if ( mat.normalTexture ) {

				const tex = getTexture( mat.normalTexture.index );

				if ( tex ) {

					material.uniforms.uNormalMap = {
						value: tex,
						type: "1i"
					};

					material.defines[ "USE_NORMAL_MAP" ] = "";

				}

			}

			// pbr

			if ( mat.pbrMetallicRoughness ) {

				const pbr = mat.pbrMetallicRoughness;

				// base color

				if ( pbr.baseColorFactor ) {

					material.uniforms.uBaseColor = {
						value: pbr.baseColorFactor,
						type: "4fv"
					};

					material.defines[ "USE_COLOR" ] = "";

				}

				if ( pbr.baseColorTexture ) {

					const tex = getTexture( pbr.baseColorTexture.index );

					if ( tex ) {

						material.uniforms.uBaseColorMap = {
							value: tex,
							type: "1i"
						};

						material.defines[ "USE_COLOR_MAP" ] = "";

					}

				}

				// metalness roughness

				if ( pbr.roughnessFactor !== undefined ) {

					material.uniforms.uRoughness = {
						value: pbr.roughnessFactor,
						type: "1f"
					};

					material.defines[ "USE_ROUGHNESS" ] = "";

				}

				if ( pbr.metallicFactor !== undefined ) {

					material.uniforms.uMetalness = {
						value: pbr.metallicFactor,
						type: "1f"
					};

					material.defines[ "USE_METALNESS" ] = "";

				}

				if ( pbr.metallicRoughnessTexture ) {

					const tex = getTexture( pbr.metallicRoughnessTexture.index );

					if ( tex ) {

						material.uniforms.uMRMap = {
							value: tex,
							type: "1i"
						};

						material.defines[ "USE_MR_MAP" ] = "";

					}

				}

			}

			// emission

			if ( mat.emissiveFactor ) {

				material.uniforms.uEmission = {
					value: mat.emissiveFactor,
					type: "3fv"
				};

				material.defines[ "USE_EMISSION" ] = "";

			}

			if ( mat.emissiveTexture ) {

				const tex = getTexture( mat.emissiveTexture.index );

				if ( tex ) {

					material.uniforms.uEmissionMap = {
						value: tex,
						type: "1i"
					};

					material.defines[ "USE_EMISSION_MAP" ] = "";

				}

			}

			// extensions

			if ( mat.extensions ) {

				if ( mat.extensions.KHR_materials_emissive_strength ) {

					material.uniforms.uEmissionStrength = {
						value: mat.extensions.KHR_materials_emissive_strength.emissiveStrength,
						type: "1fv"
					};

					material.defines[ "USE_EMISSION_STRENGTH" ] = "";

				}

			}

			parsedMaterials.set( i, material );

		} );

		// meshes

		const parsedMeshes = new Map<number, {geometry: Geometry, material: Material}[]>();

		gltfJson.meshes && gltfJson.meshes.forEach( ( mesh, i ) => {

			const { primitives } = mesh;

			parsedMeshes.set( i, primitives.map( primitive => {

				const geometry = new Geometry();

				Object.keys( primitive.attributes ).forEach( attributeName => {

					const accesorIndex = ( primitive.attributes as any )[ attributeName ];

					const buffer = parsedAccessors.get( accesorIndex );

					if ( buffer ) {

						geometry.setAttribute( translateAttributeName( attributeName ), new Float32Array( buffer.buffer ), type2Size( buffer.type ) );

					}

				} );

				if ( primitive.indices !== undefined ) {

					const indexBuffer = parsedAccessors.get( primitive.indices );

					if ( indexBuffer ) {

						geometry.setAttribute( "index", new Uint16Array( indexBuffer.buffer ), 1 );

					}

				}

				let material : Material | null = null;

				if ( primitive.material !== undefined ) {

					const mat = parsedMaterials.get( primitive.material );

					if ( mat ) {

						material = mat;

					}

				}

				if ( ! material ) {

					material = new Material();

				}

				if ( geometry.attributes.has( "tangent" ) ) {

					material.defines[ "USE_TANGENT" ] = "";

				}

				return {
					geometry,
					material
				};

			} ) );

		} );

		const parsedNode = new Map<number, Entity>();

		const createEntity = ( ( nodeNum: number, node: GLTFNode ) => {

			const entity = new Entity();

			// transform

			node.translation && entity.position.set( node.translation[ 0 ], node.translation[ 1 ], node.translation[ 2 ] );
			node.rotation && entity.quaternion.set( node.rotation[ 0 ], node.rotation[ 1 ], node.rotation[ 2 ], node.rotation[ 3 ] );
			node.scale && entity.scale.set( node.scale[ 0 ], node.scale[ 1 ], node.scale[ 2 ] );

			// mesh

			const meshList = parsedMeshes.get( node.mesh );

			entity.name = node.name;

			if ( meshList ) {

				if ( meshList.length == 1 ) {

					const mesh = meshList[ 0 ];
					entity.addComponent( mesh.geometry );
					entity.addComponent( mesh.material );

				} else {

					meshList.forEach( ( mesh, i ) => {

						const meshPartEntity = new Entity();
						meshPartEntity.name = node.name + "_" + i;
						entity.addComponent( mesh.geometry );
						entity.addComponent( mesh.material );
						entity.add( meshPartEntity );

					} );

				}

			}

			// children

			if ( node.children ) {

				node.children.forEach( childNodeNum => {

					const nodeEntity = parsedNode.get( childNodeNum );

					if ( nodeEntity ) {

						entity.add( nodeEntity );

					} else {

						if ( gltfJson.nodes ) {

							entity.add( createEntity( childNodeNum, gltfJson.nodes[ childNodeNum ] ) );

						}

					}

				} );

			}

			parsedNode.set( nodeNum, entity );

			return entity;

		} );

		gltfJson.nodes && gltfJson.nodes.forEach( ( node, i ) => {

			createEntity( i, node );

		} );

		const scene = new Entity();

		const sceneNode = gltfJson.scenes && gltfJson.scenes[ 0 ];

		if ( sceneNode && sceneNode.nodes ) {

			sceneNode.nodes.forEach( nodeNum => {

				const entity = parsedNode.get( nodeNum );

				if ( entity ) {

					scene.add( entity );

				}

			} );

		}

		return {
			scene
		};

	}

}
