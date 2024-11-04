import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { resource } from '~/ts/gl/GLGlobals';

export interface OREngineNodeOverrideComponent {
	name: string,
	props?: {[key:string]: any} | undefined
}

export interface OREngineNodeOverride {
	path: string,
	components: OREngineNodeOverrideComponent[]
}

export interface OREngineProjectData extends MXP.SerializedProps {
	name: string
	objectOverride: OREngineNodeOverride[],
	scene: SceneNode | null
}

export interface OREngineProjectFrame {
	duration: number,
	fps: number,
}

interface SceneNode {
	name: string,
	pos?: number[],
	rot?: number[],
	scale?: number[],
	childs?: SceneNode[]
}


export class SceneSerializer extends GLP.EventEmitter {

	super() {
	}

	public applyOverride( projectRoot: MXP.Entity, targetRoot: MXP.Entity, override: OREngineNodeOverride[] ) {

		targetRoot.traverse( e => {

			const path = e.getScenePath( projectRoot );

			const overrideData = override.find( o => o.path == path );

			if ( overrideData ) {

				overrideData.components.forEach( c => {

					const compItem = resource.getComponent( c.name );

					if ( compItem ) {

						const component = e.addComponent( new compItem.component() );
						component.initiator = "user";

						if ( c.props ) {

							component.deserialize( c.props );

						}

					}

				} );

			}

		} );

	}

	public deserialize( project: OREngineProjectData, target: MXP.Entity ) {

		const _ = ( node: SceneNode, target?: MXP.Entity ): MXP.Entity => {

			const entity = target || new MXP.Entity();
			entity.initiator = "user";
			entity.name = node.name;

			const pos = node.pos || [ 0, 0, 0 ];
			entity.position.x = pos[ 0 ];
			entity.position.y = pos[ 1 ];
			entity.position.z = pos[ 2 ];

			const rot = node.rot || [ 0, 0, 0 ];
			entity.euler.x = rot[ 0 ];
			entity.euler.y = rot[ 1 ];
			entity.euler.z = rot[ 2 ];

			const scale = node.scale || [ 1, 1, 1 ];
			entity.scale.x = scale[ 0 ];
			entity.scale.y = scale[ 1 ];
			entity.scale.z = scale[ 2 ];

			if ( node.childs ) {

				node.childs.forEach( c => {

					entity.add( _( c ) );

				} );

			}

			return entity;

		};

		if ( project.scene ) {

			_( project.scene, target );

		}

		target.initiator = "god";

		this.applyOverride( target, target, project.objectOverride );


	}

	public serialize( sceneRoot: MXP.Entity ) {

		const objectOverride: OREngineNodeOverride[] = [];

		let scene: SceneNode | null = null;

		const _ = ( entity: MXP.Entity ): SceneNode => {

			const childs: SceneNode[] = [];

			entity.children.forEach( c => {

				if ( c.initiator == "script" ) return;

				childs.push( _( c ) );

			} );

			return {
				name: entity.name,
				pos: entity.position.x == 0 && entity.position.y == 0 && entity.position.z == 0 ? undefined : entity.position.getElm( "vec3" ),
				rot: entity.euler.x == 0 && entity.euler.y == 0 && entity.euler.z == 0 ? undefined : entity.euler.getElm( "vec3" ),
				scale: entity.scale.x == 1 && entity.scale.y == 1 && entity.scale.z == 1 ? undefined : entity.scale.getElm( "vec3" ),
				childs: childs.length > 0 ? childs : undefined
			};

		};

		scene = _( sceneRoot );

		sceneRoot.traverse( ( e ) => {

			const path_ = e.getScenePath( sceneRoot );

			const nodeOverrideData: OREngineNodeOverride = {
				path: path_,
				components: []
			};

			e.components.forEach( ( c ) => {

				const exportProps: MXP.SerializedProps = c.serialize( true );

				if ( ! c.disableEdit && c.initiator == "user" ) {

					nodeOverrideData.components.push( {
						name: c.constructor.name,
						props: Object.keys( exportProps ).length > 0 ? exportProps : undefined
					} );

				}

			} );

			if ( nodeOverrideData.components.length > 0 ) {

				objectOverride.push( nodeOverrideData );

			}

		} );

		return {
			objectOverride,
			scene,
		};

	}

}
