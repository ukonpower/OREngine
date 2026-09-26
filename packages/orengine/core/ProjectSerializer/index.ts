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

export interface OREngineDataEntityComponent {
	name: string,
	uuid: string,
	props?: {[key:string]: any} | undefined
}

export interface OREngineDataEntity {
	name: string,
	uuid: string,
	pos?: number[],
	rot?: number[],
	scale?: number[],
	components?: OREngineDataEntityComponent[],
	childs?: OREngineDataEntity[]
}

export interface OREngineProjectData {
	name: string;
	scene: OREngineDataEntity | null;
	"timeline/duration"?: number;
	"timeline/fps"?: number;
	curves?: MXP.CurveTable;
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

	public static serializeEntity( sceneRoot: MXP.Entity, resolver: ComponentResolver ): OREngineDataEntity {

		const _ = ( entity: MXP.Entity ): OREngineDataEntity => {

			const childs: OREngineDataEntity[] = [];

			entity.children.forEach( c => {

				if ( c.initiator == "script" ) return;

				childs.push( _( c ) );

			} );

			const components: OREngineDataEntityComponent[] = [];

			entity.components.forEach( c => {

				const exportFields: MXP.SerializeField = c.serialize( { mode: "export" } );
				const hasFields = Object.keys( exportFields ).length > 0;

				if ( c.initiator !== "user" ) return;

				const comp: OREngineDataEntityComponent = {
					name: resolver.getName( c ),
					uuid: c.uuid,
				};

				if ( hasFields ) comp.props = exportFields;

				components.push( comp );

			} );

			for ( const uc of entity.unresolvedComponents ) {

				components.push( {
					name: uc.name,
					uuid: uc.uuid,
					props: uc.props,
				} );

			}

			return {
				name: entity.name,
				uuid: entity.uuid,
				pos: entity.position.x == 0 && entity.position.y == 0 && entity.position.z == 0 ? undefined : entity.position.getElm( "vec3" ),
				rot: entity.euler.x == 0 && entity.euler.y == 0 && entity.euler.z == 0 ? undefined : entity.euler.getElm( "vec3" ),
				scale: entity.scale.x == 1 && entity.scale.y == 1 && entity.scale.z == 1 ? undefined : entity.scale.getElm( "vec3" ),
				components: components.length > 0 ? components : undefined,
				childs: childs.length > 0 ? childs : undefined
			};

		};

		return _( sceneRoot );

	}

	/*-------------------------------
		Deserialize
	-------------------------------*/

	public static deserializeEntity( rootEnttyData: OREngineDataEntity, target: MXP.Entity, resolver: ComponentResolver, engine: MXP.EngineContract ) {

		const _ = ( node: OREngineDataEntity, target?: MXP.Entity ): MXP.Entity => {

			const entity = target || engine.createEntity();
			entity.initiator = "user";
			// ルートは読み込み前から表示されている既存インスタンスなので、直接代入では Hierarchy 等の購読側へ変更が届かない
			entity.setField( "name", node.name );
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

			entity.unresolvedComponents = [];

			if ( node.components ) {

				node.components.forEach( c => {

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

					} else {

						console.warn( `[ProjectSerializer] Component "${c.name}" not found in resolver. Preserving data for round-trip.` );

						entity.unresolvedComponents.push( {
							name: c.name,
							uuid: c.uuid,
							props: c.props as Record<string, unknown> | undefined,
						} );

					}

				} );

			}

			if ( node.childs ) {

				// 既存の子エンティティを削除（initiator="script" のものは残す）
				const existingChildren = [ ...entity.children ];
				existingChildren.forEach( c => {

					if ( c.initiator !== "script" ) {

						entity.remove( c );

					}

				} );

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

/*-------------------------------
	Curves
-------------------------------*/

// JSON のどこかにある links（Animation コンポーネントのリンク）から、指しているカーブ ID を集める。
// BLidgeClient の attachments の中（適用前の生データを含む）にも載るので、構造を決め打ちせず全体を辿る
const collectLinkedCurveIds = ( node: unknown, ids: Set<string> ) => {

	if ( Array.isArray( node ) ) {

		for ( const child of node ) {

			collectLinkedCurveIds( child, ids );

		}

		return;

	}

	if ( node === null || typeof node !== "object" ) return;

	const obj = node as Record<string, unknown>;

	for ( const key of Object.keys( obj ) ) {

		const value = obj[ key ];

		if ( key === "links" && value !== null && typeof value === "object" ) {

			for ( const link of Object.values( value ) ) {

				collectLinkIds( link, ids );

			}

		}

		collectLinkedCurveIds( value, ids );

	}

};

// リンク1本 [ カーブ ID, 倍率, 足し算 ] か、数値配列の要素ごとのリンクの並び（null を含む）から ID を拾う
const collectLinkIds = ( link: unknown, ids: Set<string> ) => {

	if ( ! Array.isArray( link ) ) return;

	if ( typeof link[ 0 ] === "string" ) {

		ids.add( link[ 0 ] );
		return;

	}

	for ( const item of link ) {

		if ( Array.isArray( item ) && typeof item[ 0 ] === "string" ) {

			ids.add( item[ 0 ] );

		}

	}

};

// 書き出したシーン JSON から、どこからも参照されないカーブを外す（エディタの保存で使う）。
// メモリ上の表は触らない（保存した後に削除を undo してもカーブが戻るようにするため）ので、curves は作り直して差し替える。
// カーブが1本も残らなければ curves ごと外し、キーの無いシーンの保存内容を変えないようにする
export const pruneUnusedCurves = ( project: OREngineProjectData ) => {

	const curves = project.curves;

	if ( ! curves ) return project;

	const ids = new Set<string>();

	collectLinkedCurveIds( project, ids );

	const used: MXP.CurveTable = {};
	let count = 0;

	for ( const id of Object.keys( curves ) ) {

		if ( ! ids.has( id ) ) continue;

		used[ id ] = curves[ id ];
		count ++;

	}

	const result: OREngineProjectData = { ...project };

	if ( count > 0 ) {

		result.curves = used;

	} else {

		delete result.curves;

	}

	return result;

};
