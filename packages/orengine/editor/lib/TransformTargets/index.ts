import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Command } from '../CommandManager';
import { GroupCommand } from '../Commands/GroupCommand';
import { SetFieldCommand } from '../Commands/SetFieldCommand';
import { composeLocalQuat, getWorldQuaternion, rotateVector } from '../TransformUtils';

type TransformFieldName = 'position' | 'euler' | 'scale';

const TRANSFORM_FIELD_NAMES: readonly TransformFieldName[] = [ 'position', 'euler', 'scale' ];

// 変形を始めた時点の1エンティティぶんの状態。変形はいつもここからの絶対量でやり直す
type TargetStart = {
	entity: MXP.Entity;
	values: Record<TransformFieldName, number[]>;
	worldPos: MTP.Vector;
	worldQuat: MTP.Quaternion;
	parentWorldInv: MTP.Matrix;
	parentWorldQuatInv: MTP.Quaternion;
};

// 選んだものの中から、祖先も選ばれているものを外す。親と子を両方動かす・消す・移すと、子が二重に扱われるため
export const topmostEntities = ( entities: MXP.Entity[] ): MXP.Entity[] => {

	const selected = new Set( entities );
	const result: MXP.Entity[] = [];

	for ( const entity of entities ) {

		let ancestorSelected = false;
		let parent = entity.parent;

		while ( parent ) {

			if ( selected.has( parent ) ) {

				ancestorSelected = true;
				break;

			}

			parent = parent.parent;

		}

		if ( ! ancestorSelected ) {

			result.push( entity );

		}

	}

	return result;

};

// 変形の中心。ワールド位置の平均（Blender の Median Point）
export const transformPivot = ( entities: MXP.Entity[] ): MTP.Vector => {

	const pivot = new MTP.Vector();

	for ( const entity of entities ) {

		const elm = entity.matrixWorld.elm;

		pivot.x += elm[ 12 ];
		pivot.y += elm[ 13 ];
		pivot.z += elm[ 14 ];

	}

	if ( entities.length > 0 ) {

		pivot.multiply( 1 / entities.length );

	}

	return pivot;

};

// ローカル軸の向き。Blender と同じくアクティブのワールド回転を使い、アクティブが無ければ先頭のもの
export const transformBasis = ( entities: MXP.Entity[], active: MXP.Entity | null ): MTP.Quaternion => {

	if ( active ) return getWorldQuaternion( active );

	if ( entities.length > 0 ) return getWorldQuaternion( entities[ 0 ] );

	return new MTP.Quaternion();

};

// 複数のエンティティを1つの中心のまわりでまとめて動かす。G / R / S とギズモのドラッグが始めるときに作る。
// 1つだけのときは中心がそのエンティティの位置なので、回転・スケールで位置は動かさない
export class TransformTargets {

	public readonly pivot: MTP.Vector;
	public readonly basis: MTP.Quaternion;
	private _basisInv: MTP.Quaternion;
	private _targets: TargetStart[];

	constructor( entities: MXP.Entity[], active: MXP.Entity | null ) {

		// 作った直後（Shift+D の複製など）でフレームの行列更新をまだ通っていないと matrixWorld が単位行列のままなので、
		// ローカル値から親ごと計算し直してから読む
		for ( const entity of entities ) {

			entity.updateMatrix( true );

		}

		this.pivot = transformPivot( entities );
		this.basis = transformBasis( entities, active );
		this._basisInv = this.basis.clone().inverse();
		this._targets = [];

		for ( const entity of entities ) {

			const elm = entity.matrixWorld.elm;
			let parentWorldInv = new MTP.Matrix();
			let parentWorldQuatInv = new MTP.Quaternion();

			if ( entity.parent ) {

				parentWorldInv = entity.parent.matrixWorld.clone().inverse();
				parentWorldQuatInv = getWorldQuaternion( entity.parent ).inverse();

			}

			this._targets.push( {
				entity,
				values: {
					position: entity.position.getElm( 'vec3' ) as number[],
					euler: entity.euler.getElm( 'vec3' ) as number[],
					scale: entity.scale.getElm( 'vec3' ) as number[],
				},
				worldPos: new MTP.Vector( elm[ 12 ], elm[ 13 ], elm[ 14 ] ),
				worldQuat: getWorldQuaternion( entity ),
				parentWorldInv,
				parentWorldQuatInv,
			} );

		}

	}

	/*-------------------------------
		Transform
	-------------------------------*/

	// ワールド空間で delta だけ動かす
	public translate( delta: MTP.Vector ) {

		for ( const target of this._targets ) {

			this._restoreTarget( target );
			this._setWorldPosition( target, target.worldPos.clone().add( delta ) );
			target.entity.updateMatrix( true );

		}

	}

	// ワールド空間の回転 deltaQ を、中心のまわりに掛ける
	public rotate( deltaQ: MTP.Quaternion ) {

		const movePosition = this._targets.length > 1;

		for ( const target of this._targets ) {

			this._restoreTarget( target );

			target.entity.quaternion.copy( composeLocalQuat( target.parentWorldQuatInv, deltaQ, target.worldQuat ) );

			if ( movePosition ) {

				const offset = rotateVector( target.worldPos.clone().sub( this.pivot ), deltaQ );

				this._setWorldPosition( target, this.pivot.clone().add( offset ) );

			}

			target.entity.updateMatrix( true );

		}

	}

	// factor は basis の X / Y / Z ごとの倍率。各エンティティの scale の成分にもそのまま掛ける
	// （回転済みのものをグローバル軸で伸ばすと TRS で表せないシアーになるため、スケールはいつもローカル成分に掛ける）
	public scale( factor: number[] ) {

		const movePosition = this._targets.length > 1;

		for ( const target of this._targets ) {

			this._restoreTarget( target );

			const start = target.values.scale;

			target.entity.scale.set( start[ 0 ] * factor[ 0 ], start[ 1 ] * factor[ 1 ], start[ 2 ] * factor[ 2 ] );

			if ( movePosition ) {

				// 中心からのずれを basis の軸に分けて伸ばす
				const offset = rotateVector( target.worldPos.clone().sub( this.pivot ), this._basisInv );

				offset.x *= factor[ 0 ];
				offset.y *= factor[ 1 ];
				offset.z *= factor[ 2 ];

				this._setWorldPosition( target, this.pivot.clone().add( rotateVector( offset, this.basis ) ) );

			}

			target.entity.updateMatrix( true );

		}

	}

	// 変形を始める前の値へ戻す。undo 履歴には残さない
	public restore() {

		for ( const target of this._targets ) {

			this._restoreTarget( target );
			target.entity.updateMatrix( true );

		}

	}

	/*-------------------------------
		Command
	-------------------------------*/

	// 開始時から変わったフィールドを SetFieldCommand にして、undo 1回ぶんにまとめる。何も変わっていなければ null
	public buildCommand(): Command | null {

		const commands: Command[] = [];

		for ( const target of this._targets ) {

			for ( const fieldName of TRANSFORM_FIELD_NAMES ) {

				const oldValue = target.values[ fieldName ];
				const newValue = target.entity[ fieldName ].getElm( 'vec3' ) as number[];

				if ( sameValues( oldValue, newValue ) ) continue;

				commands.push( new SetFieldCommand( target.entity, fieldName, oldValue, newValue ) );

			}

		}

		if ( commands.length === 0 ) return null;

		if ( commands.length === 1 ) return commands[ 0 ];

		return new GroupCommand( commands );

	}

	/*-------------------------------
		Utils
	-------------------------------*/

	private _restoreTarget( target: TargetStart ) {

		target.entity.position.setFromArray( target.values.position );
		target.entity.euler.setFromArray( target.values.euler );
		target.entity.scale.setFromArray( target.values.scale );

	}

	// ワールド位置を親ローカルへ落として position に書く
	private _setWorldPosition( target: TargetStart, worldPos: MTP.Vector ) {

		const local = worldPos.applyMatrix4AsPosition( target.parentWorldInv );

		target.entity.position.set( local.x, local.y, local.z );

	}

}

const sameValues = ( a: number[], b: number[] ) => {

	for ( let i = 0; i < a.length; i ++ ) {

		if ( a[ i ] !== b[ i ] ) return false;

	}

	return true;

};
