import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Gizmo, GizmoAxis, GizmoDragResult, GizmoHandle, GizmoPlane } from '..';
import { getWorldQuaternion, quaternionFromTo, rotateVector, TransformOrientation } from '../../../transform/TransformUtils';

export const AXIS_COLORS: Record<GizmoAxis, number[]> = {
	x: [ 1.0, 0.2, 0.2 ],
	y: [ 0.2, 1.0, 0.2 ],
	z: [ 0.4, 0.4, 1.0 ],
};

// 平面ハンドルは法線軸の色で塗る（Blender準拠: XY平面=Zの色）
export const PLANE_NORMAL_AXIS: Record<GizmoPlane, GizmoAxis> = { xy: 'z', yz: 'x', xz: 'y' };

// 平面に含まれる2軸（スケールの平面拘束で掛ける成分）
export const PLANE_AXES: Record<GizmoPlane, [ GizmoAxis, GizmoAxis ]> = { xy: [ 'x', 'y' ], yz: [ 'y', 'z' ], xz: [ 'x', 'z' ] };

export const VIEW_COLOR = [ 0.75, 0.75, 0.75 ];

const HIGHLIGHT_COLOR = [ 1.0, 0.95, 0.4 ];

// 平面ハンドルの置き場所と大きさ（軸シャフトと重ならない中間位置）
const PLANE_HANDLE_OFFSET = 0.45;
const PLANE_HANDLE_SIZE = 0.18;

type HandleRecord = {
	handle: GizmoHandle;
	root: MXP.Entity;
	color: number[];
	baseColor: number[];
};

// 3種のギズモに共通する土台。ハンドルの登録・ホバー/ドラッグ中の色強調・ターゲット追従（位置/向き/画面上サイズ）を持つ
export abstract class GizmoBase implements Gizmo {

	// ターゲットとの距離に掛けて画面上の見かけサイズを一定に保つ係数
	private static readonly VIEW_SCALE_FACTOR = 0.15;

	public entity: MXP.Entity;
	protected _engine: MXP.EngineContract;
	protected _draw: MXP.EditorDrawContract;
	protected _orientation: TransformOrientation;
	protected _camWorldPos: MTP.Vector;
	private _records: HandleRecord[];
	private _hoverHandle: GizmoHandle | null;
	private _activeHandle: GizmoHandle | null;
	private _dragging: boolean;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract, name: string ) {

		this._engine = engine;
		this._draw = draw;
		this.entity = engine.createEntity( { name } );
		this.entity.initiator = 'god';
		this.entity.visible = false;

		this._orientation = 'global';
		this._camWorldPos = new MTP.Vector();
		this._records = [];
		this._hoverHandle = null;
		this._activeHandle = null;
		this._dragging = false;

	}

	/*-------------------------------
		Build
	-------------------------------*/

	protected _createEntity( name: string ): MXP.Entity {

		const entity = this._engine.createEntity( { name } );
		entity.initiator = 'god';

		return entity;

	}

	// ハンドルのルートを登録し、表示メッシュに渡す生きた色配列を返す（flatマテリアルは配列を参照で保持するため、書き換えが即描画に反映される）
	protected _registerHandle( handle: GizmoHandle, root: MXP.Entity, baseColor: number[] ): number[] {

		const color = [ ...baseColor ];

		this._records.push( { handle, root, color, baseColor: [ ...baseColor ] } );
		this.entity.add( root );

		return color;

	}

	protected _addVisual( parent: MXP.Entity, geometry: MXP.Geometry, color: number[] ): MXP.Entity {

		const entity = this._createEntity( '__gizmo_visual' );

		entity.addComponent( MXP.Mesh, {
			geometry,
			material: this._draw.materials.flat( { color, depthTest: false, depthWrite: false } ),
		} );

		parent.add( entity );

		return entity;

	}

	// ヒット判定専用メッシュ（マテリアル無し=描画されない）
	protected _addHit( parent: MXP.Entity, geometry: MXP.Geometry ): MXP.Entity {

		const entity = this._createEntity( '__gizmo_hit' );

		entity.addComponent( MXP.Mesh, { geometry } );

		parent.add( entity );

		return entity;

	}

	// 2軸平面のハンドル（小さな正方形）。面内の2軸方向へオフセットした位置に置く
	protected _addPlaneHandle( plane: GizmoPlane ): MXP.Entity {

		const root = this._createEntity( '__gizmo_plane_' + plane );
		const color = this._registerHandle( plane, root, AXIS_COLORS[ PLANE_NORMAL_AXIS[ plane ] ] );

		this._addVisual( root, new MXP.PlaneGeometry( { width: PLANE_HANDLE_SIZE, height: PLANE_HANDLE_SIZE } ), color );
		this._addHit( root, new MXP.PlaneGeometry( { width: PLANE_HANDLE_SIZE * 1.6, height: PLANE_HANDLE_SIZE * 1.6 } ) );

		// クアッドはXY平面に生成されるので、対象平面へ向けてから面内へオフセットする
		if ( plane === 'yz' ) {

			root.euler.set( 0, Math.PI / 2, 0 );
			root.position.set( 0, PLANE_HANDLE_OFFSET, PLANE_HANDLE_OFFSET );

		} else if ( plane === 'xz' ) {

			root.euler.set( Math.PI / 2, 0, 0 );
			root.position.set( PLANE_HANDLE_OFFSET, 0, PLANE_HANDLE_OFFSET );

		} else {

			root.position.set( PLANE_HANDLE_OFFSET, PLANE_HANDLE_OFFSET, 0 );

		}

		return root;

	}

	// 中心ハンドル（カメラへ向ける円環）。ビルボード化は _onTargetUpdated で行う
	protected _addCenterHandle(): MXP.Entity {

		const root = this._createEntity( '__gizmo_center' );
		const color = this._registerHandle( 'center', root, VIEW_COLOR );

		this._addVisual( root, new MXP.RingGeometry( { innerRadius: 0.1, outerRadius: 0.14, thetaSegments: 24 } ), color );
		this._addHit( root, new MXP.SphereGeometry( { radius: 0.16, widthSegments: 8, heightSegments: 6 } ) );

		return root;

	}

	/*-------------------------------
		Hover
	-------------------------------*/

	public setHover( handle: GizmoHandle | null ): void {

		if ( this._hoverHandle === handle ) return;

		this._hoverHandle = handle;

		this._updateColors();

	}

	// ドラッグ中はアクティブハンドルを、それ以外はホバー中のハンドルを強調する
	private _updateColors() {

		const active = this._dragging ? this._activeHandle : this._hoverHandle;

		for ( const record of this._records ) {

			const src = record.handle === active ? HIGHLIGHT_COLOR : record.baseColor;

			record.color[ 0 ] = src[ 0 ];
			record.color[ 1 ] = src[ 1 ];
			record.color[ 2 ] = src[ 2 ];

		}

	}

	public getHandleEntities(): { handle: GizmoHandle, entity: MXP.Entity }[] {

		const result: { handle: GizmoHandle, entity: MXP.Entity }[] = [];

		for ( const record of this._records ) {

			record.root.traverse( ( child ) => {

				const mesh = child.getComponent( MXP.Mesh );

				if ( mesh && ! mesh.material ) {

					result.push( { handle: record.handle, entity: child } );

				}

			} );

		}

		return result;

	}

	/*-------------------------------
		Target
	-------------------------------*/

	public setTarget( entity: MXP.Entity | null, cameraEntity: MXP.Entity | null, orientation: TransformOrientation ): void {

		this._orientation = orientation;

		if ( ! entity ) {

			this.entity.visible = false;

			return;

		}

		this.entity.visible = true;
		this.entity.quaternion.copy( this._rootQuaternion( entity, orientation ) );
		this.entity.position.set(
			entity.matrixWorld.elm[ 12 ],
			entity.matrixWorld.elm[ 13 ],
			entity.matrixWorld.elm[ 14 ]
		);

		if ( cameraEntity ) {

			const camElm = cameraEntity.matrixWorld.elm;

			this._camWorldPos.set( camElm[ 12 ], camElm[ 13 ], camElm[ 14 ] );

			const dist = this._camWorldPos.distanceTo( this.entity.position );
			const s = Math.max( 0.01, dist * GizmoBase.VIEW_SCALE_FACTOR );

			this.entity.scale.set( s, s, s );

		}

		this._onTargetUpdated();

	}

	// ルートの向き。global=無回転 / local=ターゲットのワールド回転（子のハンドルがまとめて向く）
	protected _rootQuaternion( entity: MXP.Entity, orientation: TransformOrientation ): MTP.Quaternion {

		if ( orientation === 'local' ) return getWorldQuaternion( entity );

		return new MTP.Quaternion();

	}

	// ターゲット追従後の追加更新（ビルボード等）。必要なサブクラスだけ実装する
	protected _onTargetUpdated(): void {}

	// ギズモ中心からカメラへ向かうルートローカルの方向（ビルボードや手前半分の向き決めに使う）
	protected _camDirLocal(): MTP.Vector {

		const dir = this._camWorldPos.clone().sub( this.entity.position ).normalize();

		return rotateVector( dir, this.entity.quaternion.clone().inverse() ).normalize();

	}

	// 子ハンドルをカメラへ正対させる quaternion（ルートの回転を打ち消した上で+Zをカメラへ向ける）
	protected _billboardQuat(): MTP.Quaternion {

		return quaternionFromTo( new MTP.Vector( 0, 0, 1 ), this._camDirLocal() );

	}

	/*-------------------------------
		Drag
	-------------------------------*/

	public get activeHandle(): GizmoHandle | null {

		return this._activeHandle;

	}

	public get dragging(): boolean {

		return this._dragging;

	}

	public startDrag( handle: GizmoHandle, ray: MXP.Ray, targetEntity: MXP.Entity ): void {

		this._activeHandle = handle;
		this._dragging = true;

		this._updateColors();

		this._onStartDrag( handle, ray, targetEntity );

	}

	public endDrag(): void {

		this._activeHandle = null;
		this._dragging = false;

		this._updateColors();

	}

	protected abstract _onStartDrag( handle: GizmoHandle, ray: MXP.Ray, targetEntity: MXP.Entity ): void;

	public abstract updateDrag( ray: MXP.Ray, targetEntity: MXP.Entity ): GizmoDragResult | null;

}
