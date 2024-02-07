import * as GLP from 'glpower';
import * as MXP from 'maxpower';


export interface OREngineProjectData {
	engine: {
		version: string
	},
	frame: {
		total: number,
		rate: number,
	},
	objectOverride: any,
	scene: SceneNode | null
}

interface SceneNode {
	name: string,
	pos: number[] | null,
	rot: number[] | null,
	scale: number[] | null,
	childs: SceneNode[]
}


export class ProjectIO extends GLP.EventEmitter {

	super() {
	}

	public load() {
	}

	public export( root: MXP.Entity ) {

		const override: any[] = [];

		let scene: SceneNode | null = null;

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

		scene = _( root );

		root.traverse( ( e ) => {

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

				override.push( nodeData );

			}

		} );

		const serializedData: OREngineProjectData = {
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
