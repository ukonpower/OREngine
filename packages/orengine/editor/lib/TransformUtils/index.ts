import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import type { GizmoAxis } from '../Gizmo';

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

// matrixWorld からワールド回転を取り出す。MTP.Matrix.decompose はスケールを割らずに回転を作るので、
// スケール ≠ 1（祖先のスケールを含む）だと角度を読み違える。列ごとにスケールを割る decomposeMatrix を使う
export function getWorldQuaternion( entity: MXP.Entity ): MTP.Quaternion {

	return decomposeMatrix( entity.matrixWorld ).quaternion;

}

// ベクトルを quaternion で回す（MTP.Vector に applyQuaternion が無いため回転行列を経由する）
export function rotateVector( v: MTP.Vector, q: MTP.Quaternion ): MTP.Vector {

	return v.clone().applyMatrix4AsDirection( new MTP.Matrix().applyQuaternion( q ) );

}

// 軸のワールド方向。global は単位軸、local は basis（対象のワールド回転）で回した軸
export function getAxisWorldDir( basis: MTP.Quaternion, axis: GizmoAxis, orientation: TransformOrientation ): MTP.Vector {

	const unit = new MTP.Vector(
		axis === 'x' ? 1 : 0,
		axis === 'y' ? 1 : 0,
		axis === 'z' ? 1 : 0,
	);

	if ( orientation === 'global' ) return unit;

	return rotateVector( unit, basis ).normalize();

}

// 行列を位置・回転・スケールに分ける。MTP.Matrix.decompose はスケールを求めない（回転もスケール込みの列から作る）ので、
// 列の長さをスケールとし、長さで割った純粋な回転から quaternion を作る。鏡映（行列式が負）は X のスケールの符号に寄せる
export function decomposeMatrix( matrix: MTP.Matrix ): { position: MTP.Vector, quaternion: MTP.Quaternion, scale: MTP.Vector } {

	const e = matrix.elm;

	let sx = Math.hypot( e[ 0 ], e[ 1 ], e[ 2 ] );
	const sy = Math.hypot( e[ 4 ], e[ 5 ], e[ 6 ] );
	const sz = Math.hypot( e[ 8 ], e[ 9 ], e[ 10 ] );

	// 列0 ・（列1 × 列2）
	const det = e[ 0 ] * ( e[ 5 ] * e[ 10 ] - e[ 6 ] * e[ 9 ] )
		+ e[ 1 ] * ( e[ 6 ] * e[ 8 ] - e[ 4 ] * e[ 10 ] )
		+ e[ 2 ] * ( e[ 4 ] * e[ 9 ] - e[ 5 ] * e[ 8 ] );

	if ( det < 0 ) sx = - sx;

	const rotation = new MTP.Matrix();
	const columnScales = [ sx, sy, sz ];

	for ( let column = 0; column < 3; column ++ ) {

		let s = columnScales[ column ];

		// スケール 0 の列は向きが無いので、割らずにそのまま使う（回転はでたらめになるが、潰れていて見えない）
		if ( s === 0 ) s = 1;

		for ( let row = 0; row < 3; row ++ ) {

			rotation.elm[ column * 4 + row ] = e[ column * 4 + row ] / s;

		}

	}

	return {
		position: new MTP.Vector( e[ 12 ], e[ 13 ], e[ 14 ] ),
		quaternion: new MTP.Quaternion().setFromMatrix( rotation ),
		scale: new MTP.Vector( sx, sy, sz ),
	};

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
