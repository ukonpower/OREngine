import { Types } from 'basepower';

import { Matrix } from "../Matrix";
import { Quaternion } from "../Quaternion";
import { IVector4, Vector } from "../Vector";

export type EulerOrder = 'XYZ' | 'XZY' | 'ZYX' | 'YZX'

export class Euler extends Vector {

	public order: EulerOrder;

	constructor( x?: number | undefined, y?: number | undefined, z?: number | undefined, order?: EulerOrder ) {

		super( x, y, z, 0 );

		this.order = order || 'XYZ';

	}

	public copy( a: Vector | Types.Nullable<IVector4> | Euler ): this {

		if ( "order" in a ) {

			this.order = a.order;

		}

		return super.copy( a );

	}

	public setFromQuaternion( q: Quaternion ) {

		const matrix = new Matrix().applyQuaternion( q );

		this.setFromRotationMatrix( matrix );

		return this;

	}

	// 回転行列をオイラー角に分ける。YZX（BLidge のエンティティの順）はその順のまま、それ以外は XYZ にして分ける
	public setFromRotationMatrix( m: Matrix ) {

		const te = m.elm;
		const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		// BLidge のエンティティは Blender の回転を YZX のまま euler に持つ。ギズモ・LookAt 等が quaternion を書いても順を保ち、
		// Animation がその後に入れる Blender の値と食い違わないようにする
		if ( this.order == 'YZX' ) {

			this.z = Math.asin( Math.min( 1.0, Math.max( - 1.0, m21 ) ) );

			if ( Math.abs( m21 ) < 0.9999999 ) {

				this.x = Math.atan2( - m23, m22 );
				this.y = Math.atan2( - m31, m11 );

			} else {

				this.x = 0;
				this.y = Math.atan2( m13, m33 );

			}

			return this;

		}

		this.order = 'XYZ';

		this.y = Math.asin( Math.min( 1.0, Math.max( - 1.0, m13 ) ) );

		if ( Math.abs( m13 ) < 0.9999999 ) {

			this.x = Math.atan2( - m23, m33 );
			this.z = Math.atan2( - m12, m11 );

		} else {

			this.x = Math.atan2( m32, m22 );
			this.z = 0;

		}

		return this;

	}

}
