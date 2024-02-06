import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { EditorState } from '../EditorState';

const ENGINE_FORMAT_VERSION = "0.0.1";

export class Serializer extends GLP.EventEmitter {

	constructor() {

		super();

	}

	public serialize( state: EditorState ): OREngineEditorData {

		const props: any[] = [];

		let scene: SceneNode | null = null;

		if ( state.root ) {

			const _ = ( entity: MXP.Entity ): SceneNode => {

				const childs: SceneNode[] = [];

				entity.children.forEach( c => {

					const hasBlidger = c.getComponent( "blidger" );

					if ( hasBlidger ) return;

					childs.push( _( c ) );

				} );

				return {
					name: entity.name,
					pos: entity.position.getElm( "vec3" ),
					rot: entity.position.getElm( "vec4" ),
					scale: entity.position.getElm( "vec3" ),
					childs
				};

			};

			scene = _( state.root );

			state.root.traverse( ( e ) => {

				const path_ = e.getPath();

				const nodeData: {path: string, components: any[]} = {
					path: path_,
					components: []
				};

				e.components.forEach( ( c, key ) => {

					const exportProps: any = c.export;

					if ( exportProps ) {

						const formattedProps: any = {};

						const keys = Object.keys( exportProps );

						for ( let i = 0; i < keys.length; i ++ ) {

							const k = keys[ i ];

							formattedProps[ k ] = exportProps[ k ].value;

						}

						nodeData.components.push( {
							key,
							name: c.constructor.name,
							props: formattedProps
						} );

					}

				} );

				if (
					nodeData.components.length > 0
				) {

					props.push( nodeData );

				}

			} );

		}

		const serializedData: OREngineEditorData = {
			engine: {
				version: ENGINE_FORMAT_VERSION
			},
			frame: {
				total: state.frameTotal,
				rate: state.frameRate
			},
			data: props,
			scene,
		};

		// console.log( JSON.stringify( data, null ) );

		return serializedData;

	}

	public deserialize() {

		this.emit( 'load' );

	}

	public export(): OREngineProjectData {

		return {};

	}

}
