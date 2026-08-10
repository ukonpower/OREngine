import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { GizmoAxis, GizmoDragResult, GizmoHandle } from '..';
import { composeLocalQuat, getAxisWorldDir, getWorldQuaternion, intersectRayPlane, quaternionFromAxisAngle, rotateVector } from '../../../transform/TransformUtils';
import { AXIS_COLORS, GizmoBase, VIEW_COLOR } from '../GizmoBase';

const AXES: readonly GizmoAxis[] = [ 'x', 'y', 'z' ];

// XY平面上で+X方向を中心に半周だけ開く帯状の円弧。リングの手前半分だけを描く・掴むために使う
function createArcGeometry( innerRadius: number, outerRadius: number, segments: number ): MXP.Geometry {

	const posArray: number[] = [];
	const normalArray: number[] = [];
	const uvArray: number[] = [];
	const indexArray: number[] = [];

	for ( let i = 0; i <= segments; i ++ ) {

		const theta = - Math.PI / 2 + Math.PI * ( i / segments );
		const cos = Math.cos( theta );
		const sin = Math.sin( theta );

		posArray.push( cos * innerRadius, sin * innerRadius, 0 );
		posArray.push( cos * outerRadius, sin * outerRadius, 0 );
		normalArray.push( 0, 0, 1, 0, 0, 1 );
		uvArray.push( i / segments, 0, i / segments, 1 );

		if ( i < segments ) {

			const base = i * 2;

			indexArray.push(
				base, base + 1, base + 2,
				base + 1, base + 3, base + 2,
			);

		}

	}

	const geo = new MXP.Geometry();

	geo.setAttribute( 'position', new Float32Array( posArray ), 3 );
	geo.setAttribute( 'normal', new Float32Array( normalArray ), 3 );
	geo.setAttribute( 'uv', new Float32Array( uvArray ), 2 );
	geo.setAttribute( 'index', new Uint16Array( indexArray ), 1 );

	return geo;

}

type RingRecord = {
	wrapper: MXP.Entity;
	base: MTP.Quaternion;
	baseInv: MTP.Quaternion;
};

export class RotateGizmo extends GizmoBase {

	private _rings: Record<GizmoAxis, RingRecord>;
	private _viewRoot: MXP.Entity;

	private _dragCenter: MTP.Vector;
	private _dragViewNormal: MTP.Vector;
	private _dragU: MTP.Vector;
	private _dragV: MTP.Vector;
	private _dragAxisN: MTP.Vector;
	private _dragSign: number;
	private _dragLastAngle: number;
	private _dragAccumAngle: number;
	private _dragStartWorldQuat: MTP.Quaternion;
	private _parentWorldQuatInv: MTP.Quaternion;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		super( engine, draw, '__gizmo_rotate' );

		this._dragCenter = new MTP.Vector();
		this._dragViewNormal = new MTP.Vector( 0, 0, 1 );
		this._dragU = new MTP.Vector( 1, 0, 0 );
		this._dragV = new MTP.Vector( 0, 1, 0 );
		this._dragAxisN = new MTP.Vector( 0, 0, 1 );
		this._dragSign = 1;
		this._dragLastAngle = 0;
		this._dragAccumAngle = 0;
		this._dragStartWorldQuat = new MTP.Quaternion();
		this._parentWorldQuatInv = new MTP.Quaternion();

		// 円弧はXY平面（法線+Z）に生成されるので、法線を各軸へ向ける回転を基底にする
		const bases: Record<GizmoAxis, MTP.Quaternion> = {
			x: quaternionFromAxisAngle( new MTP.Vector( 0, 1, 0 ), Math.PI / 2 ),
			y: quaternionFromAxisAngle( new MTP.Vector( 1, 0, 0 ), - Math.PI / 2 ),
			z: new MTP.Quaternion(),
		};

		this._rings = {} as Record<GizmoAxis, RingRecord>;

		for ( const axis of AXES ) {

			const wrapper = this._createEntity( '__gizmo_ring_' + axis );
			const color = this._registerHandle( axis, wrapper, AXIS_COLORS[ axis ] );

			this._addVisual( wrapper, createArcGeometry( 0.75, 0.8, 48 ), color );
			this._addHit( wrapper, createArcGeometry( 0.6, 0.95, 24 ) );

			this._rings[ axis ] = {
				wrapper,
				base: bases[ axis ],
				baseInv: bases[ axis ].clone().inverse(),
			};

		}

		// 視線軸まわりの回転リング（Blenderの外周の白リング）
		this._viewRoot = this._createEntity( '__gizmo_ring_view' );

		const viewColor = this._registerHandle( 'view', this._viewRoot, VIEW_COLOR );

		this._addVisual( this._viewRoot, new MXP.RingGeometry( { innerRadius: 1.0, outerRadius: 1.05, thetaSegments: 64 } ), viewColor );
		this._addHit( this._viewRoot, new MXP.RingGeometry( { innerRadius: 0.92, outerRadius: 1.13, thetaSegments: 32 } ) );

	}

	// 各リングの弧の中心（ジオメトリの+X）を、カメラ方向を回転面へ射影した向きへ合わせて手前半分だけ見せる
	protected _onTargetUpdated(): void {

		const camDir = this._camDirLocal();

		for ( const axis of AXES ) {

			const ring = this._rings[ axis ];
			const g = rotateVector( camDir, ring.baseInv );
			const phi = Math.atan2( g.y, g.x );

			ring.wrapper.quaternion.copy(
				ring.base.clone().multiply( quaternionFromAxisAngle( new MTP.Vector( 0, 0, 1 ), phi ) )
			);

		}

		this._viewRoot.quaternion.copy( this._billboardQuat() );

	}

	protected _onStartDrag( handle: GizmoHandle, ray: MXP.Ray, targetEntity: MXP.Entity ): void {

		this._dragCenter.copy( this.entity.position );

		// 角度は常にビュー平面（カメラへ向く面）上で測る。リングを浅い角度で見ても破綻しない
		const n = ray.origin.clone().sub( this._dragCenter ).normalize();
		const ref = Math.abs( n.y ) > 0.99 ? new MTP.Vector( 1, 0, 0 ) : new MTP.Vector( 0, 1, 0 );

		this._dragViewNormal = n;
		this._dragU = ref.cross( n ).normalize();
		this._dragV = n.clone().cross( this._dragU ).normalize();

		if ( handle === 'view' ) {

			this._dragAxisN = n.clone();
			this._dragSign = 1;

		} else {

			// 軸リングでも見た目の回転方向がポインタに追従するよう、軸がカメラと逆を向くときは符号を反転する
			this._dragAxisN = getAxisWorldDir( targetEntity, handle as GizmoAxis, this._orientation );
			this._dragSign = this._dragAxisN.dot( n ) < 0 ? - 1 : 1;

		}

		this._dragLastAngle = this._angleFromRay( ray ) ?? 0;
		this._dragAccumAngle = 0;
		this._dragStartWorldQuat = getWorldQuaternion( targetEntity );
		this._parentWorldQuatInv = targetEntity.parent
			? getWorldQuaternion( targetEntity.parent ).inverse()
			: new MTP.Quaternion();

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this.dragging || ! this.activeHandle ) return null;

		const angle = this._angleFromRay( ray );

		if ( angle === null ) return null;

		// atan2の±πの折り返しをまたいでも連続するよう、前回からの増分を積む
		let inc = angle - this._dragLastAngle;

		if ( inc > Math.PI ) inc -= Math.PI * 2;
		else if ( inc < - Math.PI ) inc += Math.PI * 2;

		this._dragAccumAngle += inc;
		this._dragLastAngle = angle;

		// ワールド空間の回転増分として合成する。euler へのローカル加算だとリングの見た目と実際の回転軸がずれる
		const deltaQ = quaternionFromAxisAngle( this._dragAxisN, this._dragAccumAngle * this._dragSign );
		const localQuat = composeLocalQuat( this._parentWorldQuatInv, deltaQ, this._dragStartWorldQuat );

		return { euler: new MTP.Euler().setFromQuaternion( localQuat ) };

	}

	// ビュー平面上でのポインタの角度（中心まわりの右ねじ角）。視線が面と平行なら null
	private _angleFromRay( ray: MXP.Ray ): number | null {

		const hit = intersectRayPlane( ray, this._dragCenter, this._dragViewNormal );

		if ( ! hit ) return null;

		const p = hit.sub( this._dragCenter );

		return Math.atan2( p.dot( this._dragV ), p.dot( this._dragU ) );

	}

}
