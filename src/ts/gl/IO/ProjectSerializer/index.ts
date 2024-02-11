import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { resource } from '~/ts/Globals';

export interface OREngineNodeOverrideComponent {
	key: string,
	name: string,
	props: {[key:string]: any}
}

export interface OREngineNodeOverride {
	path: string,
	components: OREngineNodeOverrideComponent[]
}

export interface OREngineProjectData {
	setting: {
		name: string,
	},
	engine: {
		version: string
	},
	frame: {
		total: number,
		rate: number,
	},
	objectOverride: OREngineNodeOverride[],
	scene: SceneNode | null
}

interface SceneNode {
	name: string,
	pos: number[] | null,
	rot: number[] | null,
	scale: number[] | null,
	childs: SceneNode[]
}


export class ProjectSerializer extends GLP.EventEmitter {

	super() {
	}

	public applyOverride( root: MXP.Entity, override: OREngineNodeOverride[] ) {

		root.traverse( e => {

			const path = e.getPath();

			const overrideData = override.find( o => o.path == path );

			if ( overrideData ) {

				overrideData.components.forEach( c => {

					const compItem = resource.getComponent( c.name );

					if ( compItem ) {

						const component = e.addComponent( c.key, new compItem.component( ) );

						component.setPropertyValues( c.props );

					}

				} );

			}

		} );

	}

	public deserialize( project: OREngineProjectData ) {

		const _ = ( node: SceneNode ): MXP.Entity => {

			const entity = new MXP.Entity();
			entity.name = node.name;

			const pos = node.pos || [ 0, 0, 0 ];
			entity.position.x = pos[ 0 ];
			entity.position.x = pos[ 1 ];
			entity.position.x = pos[ 2 ];

			const rot = node.rot || [ 0, 0, 0 ];
			entity.euler.x = rot[ 0 ];
			entity.euler.y = rot[ 1 ];
			entity.euler.z = rot[ 2 ];

			const scale = node.scale || [ 1, 1, 1 ];
			entity.scale.x = scale[ 0 ];
			entity.scale.y = scale[ 1 ];
			entity.scale.z = scale[ 2 ];

			node.childs.forEach( c => {

				entity.add( _( c ) );

			} );

			return entity;

		};

		const root = project.scene ? _( project.scene ) : new MXP.Entity();

		this.applyOverride( root, project.objectOverride );

		return {
			root
		};

	}

	public serialize( name: string, root: MXP.Entity ) {

		const override: OREngineNodeOverride[] = [];

		let scene: SceneNode | null = null;

		const _ = ( entity: MXP.Entity ): SceneNode => {

			const childs: SceneNode[] = [];

			entity.children.forEach( c => {

				const hasBlidger = c.getComponent( "blidger" );

				if ( hasBlidger || c.noExport ) return;

				childs.push( _( c ) );

			} );

			return {
				name: entity.name,
				pos: entity.position.getElm( "vec3" ),
				rot: entity.euler.getElm( "vec4" ),
				scale: entity.scale.getElm( "vec3" ),
				childs
			};

		};

		scene = _( root );

		root.traverse( ( e ) => {

			if ( e.noExport ) return;

			const path_ = e.getPath();

			const nodeOverrideData: OREngineNodeOverride = {
				path: path_,
				components: []
			};

			e.components.forEach( ( c, key ) => {

				const exportProps: any = c.export();
				const formattedProps: any = {};

				if ( exportProps ) {

					const keys = Object.keys( exportProps );

					for ( let i = 0; i < keys.length; i ++ ) {

						const k = keys[ i ];

						formattedProps[ k ] = exportProps[ k ].value;

					}

					nodeOverrideData.components.push( {
						key,
						name: c.constructor.name,
						props: formattedProps
					} );

				}


			} );

			if (
				nodeOverrideData.components.length > 0
			) {

				override.push( nodeOverrideData );

			}

		} );

		const serializedData: OREngineProjectData = {
			setting: {
				name
			},
			engine: {
				version: "0.0.1"
			},
			frame: {
				total: 0,
				rate: 60
			},
			objectOverride: override,
			scene,
		};

		return serializedData;

	}

}
