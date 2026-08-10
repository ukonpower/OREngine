import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import type { GizmoAxis } from '../../gizmo/Gizmo';

export type TransformOrientation = 'global' | 'local';

// 軸+角度から quaternion を作る（glpower に setFromAxisAngle が無いため）
export function quaternionFromAxisAngle( axis: MTP.Vector, angle: number ): MTP.Quaternion {

	const n = axis.clone().normalize();
	const s = Math.sin( angle / 2 );

	const q = new MTP.Quaternion();

	// コンストラクタは w が falsy だと 1 に丸めるので set() で入れる（角度πで w=0 になるため）
	q.set( n.x * s, n.y * s, n.z * s, Math.cos( angle / 2 ) );

	return q;

}

// 方向 from を to へ向ける最小回転の quaternion（ビルボードの向き決めに使う）
export function quaternionFromTo( from: MTP.Vector, to: MTP.Vector ): MTP.Quaternion {

	const f = from.clone().normalize();
	const t = to.clone().normalize();
	const d = f.dot( t );

	if ( d > 0.99999 ) return new MTP.Quaternion();

	// 正反対は回転軸が定まらないので、from に直交する適当な軸で半回転する
	if ( d < - 0.99999 ) {

		const ref = Math.abs( f.x ) > 0.9 ? new MTP.Vector( 0, 1, 0 ) : new MTP.Vector( 1, 0, 0 );

		return quaternionFromAxisAngle( f.clone().cross( ref ), Math.PI );

	}

	return quaternionFromAxisAngle( f.clone().cross( t ), Math.acos( Math.min( 1, Math.max( - 1, d ) ) ) );

}

// matrixWorld からワールド回転を取り出す
export function getWorldQuaternion( entity: MXP.Entity ): MTP.Quaternion {

	const q = new MTP.Quaternion();

	entity.matrixWorld.decompose( undefined, q );

	return q;

}

// ベクトルを quaternion で回す（MTP.Vector に applyQuaternion が無いため回転行列を経由する）
export function rotateVector( v: MTP.Vector, q: MTP.Quaternion ): MTP.Vector {

	return v.clone().applyMatrix4AsDirection( new MTP.Matrix().applyQuaternion( q ) );

}

// orientation に応じた軸のワールド方向ベクトル（global=単位軸 / local=ターゲットのワールド回転を適用した軸）
export function getAxisWorldDir( entity: MXP.Entity, axis: GizmoAxis, orientation: TransformOrientation ): MTP.Vector {

	const unit = new MTP.Vector(
		axis === 'x' ? 1 : 0,
		axis === 'y' ? 1 : 0,
		axis === 'z' ? 1 : 0,
	);

	if ( orientation === 'global' ) return unit;

	return rotateVector( unit, getWorldQuaternion( entity ) ).normalize();

}

// ワールド空間の回転増分 deltaQ を開始時ワールド回転に適用し、親ローカルの回転へ変換する
// glpower の multiply は Hamilton 積（this ⊗ q）で、行列と同じく左から掛けたものが後段の回転になる
export function composeLocalQuat( parentWorldQuatInv: MTP.Quaternion, deltaQ: MTP.Quaternion, startWorldQuat: MTP.Quaternion ): MTP.Quaternion {

	return parentWorldQuatInv.clone().multiply( deltaQ.clone().multiply( startWorldQuat ) );

}

// レイと「点+方向」の直線の最近接点を、direction 方向の係数として返す
export function projectRayOnLine( ray: MXP.Ray, origin: MTP.Vector, dir: MTP.Vector ): number {

	const diff = ray.origin.clone().sub( origin );

	const dotDirLine = ray.direction.dot( dir );
	const dotDiffLine = diff.dot( dir );
	const dotDiffDir = diff.dot( ray.direction );

	// レイと直線が平行だと分母が0になるので微小量を足して発散を防ぐ
	const denom = 1.0 - dotDirLine * dotDirLine + 0.0001;
	const t = ( dotDiffLine * dotDirLine - dotDiffDir ) / denom;

	return dotDiffLine + t * dotDirLine;

}

// レイと平面（点+法線）の交点。平行なら null
export function intersectRayPlane( ray: MXP.Ray, planePoint: MTP.Vector, normal: MTP.Vector ): MTP.Vector | null {

	const denom = ray.direction.dot( normal );

	if ( Math.abs( denom ) < 0.0001 ) return null;

	const t = planePoint.clone().sub( ray.origin ).dot( normal ) / denom;

	return ray.origin.clone().add( ray.direction.clone().multiply( t ) );

}
