import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';

// エディタのXZ平面グリッド。板をカメラのXZへ追従させ、視点の高さでセルの階層を切り替える
export class GridRenderer {

	private _draw: MXP.EditorDrawContract;
	private _entity: MXP.Entity;
	private _color: number[];
	// [ セルサイズ, 細かい格子の濃さ, フェード距離 ]。マテリアルと参照を共有し、書き換えが描画に反映される
	private _params: number[];
	private _showGrid: boolean;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		this._draw = draw;
		this._showGrid = true;
		this._color = [ 0.35, 0.35, 0.35 ];
		this._params = [ 1, 1, 100 ];

		this._entity = engine.createEntity( { name: "__grid" } );
		this._entity.initiator = "god";
		this._entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { floor: true } ),
			material: draw.materials.grid( { color: this._color, params: this._params } ),
		} );

	}

	public get showGrid() {

		return this._showGrid;

	}

	public set showGrid( v: boolean ) {

		this._showGrid = v;

	}

	public render( view: MXP.RenderViewContract, cameraEntity: MXP.Entity | null, engine: Engine ) {

		if ( ! this._showGrid ) return;

		if ( ! cameraEntity ) return;

		const camera = cameraEntity.matrixWorld.elm;

		// 視点が高いほど細かい格子は潰れるので、10倍ずつセルを上げる。
		// 下限を置いているのは、地面すれすれの視点で格子が一気に細かくなるのを避けるため
		const height = Math.max( Math.abs( camera[ 13 ] ), 0.5 );
		const decade = Math.max( 0, Math.floor( Math.log10( height ) ) );

		this._params[ 0 ] = Math.pow( 10, decade );
		// 桁が上がりきる手前で細かい格子を消し、10倍の格子へ滑らかに渡す
		this._params[ 1 ] = 1 - Math.max( 0, Math.log10( height ) - decade );
		this._params[ 2 ] = Math.max( 50, height * 30 );

		// 板はフェードで消え切る大きさにしておけば、縁が見えないまま無限に続いて見える
		this._entity.position.set( camera[ 12 ], 0, camera[ 14 ] );
		this._entity.scale.set( this._params[ 2 ] * 2, 1, this._params[ 2 ] * 2 );
		this._entity.update( engine.createEntityUpdateEvent() );

		this._draw.renderEntities( {
			view,
			camera: cameraEntity,
			entities: [ this._entity ],
			target: null,
		} );

	}

}
