import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';

import type { GizmoAxis } from '../../gizmo/Gizmo';
import type { ConstraintDisplay } from '../../input/ModalTransformHandler';

// 軸線の色（ギズモの軸色と同じ）
const AXIS_COLORS: Record<GizmoAxis, number[]> = {
	x: [ 1.0, 0.2, 0.2 ],
	y: [ 0.2, 1.0, 0.2 ],
	z: [ 0.4, 0.4, 1.0 ],
};

// カメラ距離に掛ける線の半長。画面外まで十分伸ばして無限線に見せる
const LENGTH_FACTOR = 1000;

// モーダル変形の軸拘束中に、拘束軸を通る直線をオーバーレイ描画する（Blender の拘束軸表示相当）
export class ConstraintAxisRenderer {

	private _draw: MXP.EditorDrawContract;
	private _root: MXP.Entity;
	private _axisEntities: Record<GizmoAxis, MXP.Entity>;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		this._draw = draw;

		this._root = engine.createEntity( { name: "__constraint_axis" } );
		this._root.initiator = "god";

		this._axisEntities = {
			x: this._createAxisLine( engine, 'x' ),
			y: this._createAxisLine( engine, 'y' ),
			z: this._createAxisLine( engine, 'z' ),
		};

		this._root.add( this._axisEntities.x );
		this._root.add( this._axisEntities.y );
		this._root.add( this._axisEntities.z );

	}

	// 原点を通る単位長の線分エンティティを作る（長さは root のスケールで伸ばす）
	private _createAxisLine( engine: MXP.EngineContract, axis: GizmoAxis ): MXP.Entity {

		const entity = engine.createEntity( { name: "__constraint_axis_line" } );
		entity.initiator = "god";

		const positions = axis === 'x' ? [ - 1, 0, 0, 1, 0, 0 ]
			: axis === 'y' ? [ 0, - 1, 0, 0, 1, 0 ]
				: [ 0, 0, - 1, 0, 0, 1 ];

		const geometry = new MXP.Geometry();
		geometry.setAttribute( 'position', new Float32Array( positions ), 3 );
		geometry.setAttribute( 'normal', new Float32Array( positions.length ).fill( 0 ), 3 );

		entity.addComponent( MXP.Mesh, {
			geometry,
			material: this._draw.materials.flat( {
				color: AXIS_COLORS[ axis ],
				lines: true,
				depthTest: false,
				depthWrite: false,
			} ),
		} );

		return entity;

	}

	public render( view: MXP.RenderViewContract, display: ConstraintDisplay | null, cameraEntity: MXP.Entity | null, engine: Engine ) {

		if ( ! display || ! cameraEntity ) return;

		const camElm = cameraEntity.matrixWorld.elm;
		const dx = display.origin.x - camElm[ 12 ];
		const dy = display.origin.y - camElm[ 13 ];
		const dz = display.origin.z - camElm[ 14 ];
		const length = Math.max( 1, Math.sqrt( dx * dx + dy * dy + dz * dz ) ) * LENGTH_FACTOR;

		this._root.position.copy( display.origin );
		this._root.quaternion.copy( display.quat );
		this._root.scale.set( length, length, length );

		this._root.updateMatrix( true );
		this._root.update( engine.createEntityUpdateEvent() );

		this._draw.renderEntities( {
			view,
			camera: cameraEntity,
			entities: display.axes.map( ( axis ) => this._axisEntities[ axis ] ),
			target: null,
		} );

	}

}
