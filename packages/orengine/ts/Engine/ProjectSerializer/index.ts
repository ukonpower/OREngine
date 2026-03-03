import * as MXP from 'maxpower';

/*-------------------------------
	ComponentResolver
-------------------------------*/

export type ComponentResolver = {
	resolve: ( name: string ) => { component: typeof MXP.Component } | undefined;
	getName: ( component: MXP.Component ) => string;
};

/*-------------------------------
	SceneData
-------------------------------*/

export interface OREngineDataEntityOverrideComponent {
	name: string,
	uuid: string,
	props?: {[key:string]: any} | undefined
}

export interface OREngineDataEntityOverride {
	path: string,
	components?: OREngineDataEntityOverrideComponent[]
}

export interface OREngineDataEntity {
	name: string,
	uuid: string,
	pos?: number[],
	rot?: number[],
	scale?: number[],
	childs?: OREngineDataEntity[]
}

export interface OREngineProjectData {
	name: string;
	scene: OREngineDataEntity | null;
	overrides: OREngineDataEntityOverride[];
	"timeline/duration"?: number;
	"timeline/fps"?: number;
	[key: string]: unknown;
}

/*-------------------------------
	FrameData
-------------------------------*/

export interface OREngineProjectFrame {
	duration: number,
	fps: number,
}


export class ProjectSerializer {

	/*-------------------------------
		Serialize
	-------------------------------*/

	public static serializeEntity( sceneRoot: MXP.Entity ): OREngineDataEntity {

		const _ = ( entity: MXP.Entity ): OREngineDataEntity => {

			const childs: OREngineDataEntity[] = [];

			entity.children.forEach( c => {

				if ( c.initiator == "script" ) return;

				childs.push( _( c ) );

			} );

			return {
				name: entity.name,
				uuid: entity.uuid,
				pos: entity.position.x == 0 && entity.position.y == 0 && entity.position.z == 0 ? undefined : entity.position.getElm( "vec3" ),
				rot: entity.euler.x == 0 && entity.euler.y == 0 && entity.euler.z == 0 ? undefined : entity.euler.getElm( "vec3" ),
				scale: entity.scale.x == 1 && entity.scale.y == 1 && entity.scale.z == 1 ? undefined : entity.scale.getElm( "vec3" ),
				childs: childs.length > 0 ? childs : undefined
			};

		};

		return _( sceneRoot );

	}

	public static serializeEntityOverride( sceneRoot: MXP.Entity, resolver: ComponentResolver ): OREngineDataEntityOverride[] {

		const objectOverride: OREngineDataEntityOverride[] = [];

		sceneRoot.traverse( ( e ) => {

			const path_ = e.getScenePath( sceneRoot );

			const entityOverrideData: OREngineDataEntityOverride = {
				path: path_,
			};

			const components: OREngineDataEntityOverrideComponent[] = [];

			e.components.forEach( ( c ) => {

				const exportFields: MXP.SerializeField = c.serialize( { mode: "export" } );
				const hasFields = Object.keys( exportFields ).length > 0;

				const value: OREngineDataEntityOverrideComponent = {
					name: resolver.getName( c ),
					uuid: c.uuid,
				};

				if ( ! hasFields && c.initiator !== "user" ) {

					return;

				}

				if ( hasFields ) {

					value.props = exportFields;

				}

				components.push( value );

			} );

			if ( components.length > 0 ) {

				entityOverrideData.components = components;

			}

			if ( e.initiator !== 'user' && ! entityOverrideData.components ) {

				return;

			}

			objectOverride.push( entityOverrideData );

		} );

		return objectOverride;

	}

	/*-------------------------------
		Deserialize
	-------------------------------*/

	public static deserializeOverride( overrideData: OREngineDataEntityOverride[], projectRoot: MXP.Entity, targetRoot: MXP.Entity, resolver: ComponentResolver ) {

		targetRoot.traverse( entity => {

			const path = entity.getScenePath( projectRoot );

			const overrideDataItem = overrideData.find( o => o.path == path );

			if ( overrideDataItem ) {

				( overrideDataItem.components || [] ).forEach( c => {

					const compItem = resolver.resolve( c.name );

					if ( compItem ) {

						let component = entity.getComponent( compItem.component );

						if ( ! component ) {

							component = entity.addComponent( compItem.component );
							component.initiator = "user";

						}

						component.restoreUUID( c.uuid );

						if ( c.props ) {

							component.deserialize( c.props );

						}

					}

				} );

			}

		} );

	}

	public static deserializeEntity( rootEnttyData: OREngineDataEntity, target: MXP.Entity ) {

		const _ = ( node: OREngineDataEntity, target?: MXP.Entity ): MXP.Entity => {

			const entity = target || new MXP.Entity();
			entity.initiator = "user";
			entity.name = node.name;
			entity.restoreUUID( node.uuid );

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

		if ( rootEnttyData ) {

			_( rootEnttyData, target );

		}

		target.initiator = "god";

	}

}
