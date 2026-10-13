import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';
import { uniqueEntityName } from '../../EntityName';
import { decomposeMatrix } from '../../TransformUtils';

type EntityState = {
	name: string;
	position: number[];
	euler: number[];
	scale: number[];
};

// エンティティを別の親の下へ移す。見た目の位置が変わらないよう、新しい親から見たローカルの position / euler / scale に置き直す
// （Blender の Keep Transform）。移した先の兄弟と名前がぶつかれば Name.001 のように採番する
export class ReparentEntityCommand implements Command {

	public name = "ReparentEntity";
	private oldParent: MXP.Entity | null = null;
	private oldState: EntityState | null = null;
	private newState: EntityState | null = null;

	constructor(
		private entity: MXP.Entity,
		private parent: MXP.Entity,
	) {}

	public execute() {

		// redo でも同じ値に戻す。undo 以降に積まれた操作があれば redo 履歴ごと消えるので、初回に求めた値のままでよい
		if ( ! this.newState ) {

			this.oldParent = this.entity.parent;
			this.oldState = readState( this.entity );
			this.newState = this.computeNewState();

		}

		this.parent.add( this.entity );

		applyState( this.entity, this.newState );

	}

	public undo() {

		if ( ! this.oldParent || ! this.oldState ) return;

		this.oldParent.add( this.entity );

		applyState( this.entity, this.oldState );

	}

	// 今のワールド行列を、新しい親の逆行列でローカルへ落とす
	private computeNewState(): EntityState {

		this.entity.updateMatrix( true );
		this.parent.updateMatrix( true );

		const local = this.entity.matrixWorld.clone().preMultiply( this.parent.matrixWorld.clone().inverse() );
		const { position, quaternion, scale } = decomposeMatrix( local );
		const euler = new MTP.Euler().setFromQuaternion( quaternion );

		return {
			name: uniqueEntityName( this.parent, this.entity.name ),
			position: [ position.x, position.y, position.z ],
			euler: [ euler.x, euler.y, euler.z ],
			scale: [ scale.x, scale.y, scale.z ],
		};

	}

}

const readState = ( entity: MXP.Entity ): EntityState => {

	return {
		name: entity.name,
		position: entity.position.getElm( 'vec3' ) as number[],
		euler: entity.euler.getElm( 'vec3' ) as number[],
		scale: entity.scale.getElm( 'vec3' ) as number[],
	};

};

// setField を通して、プロパティパネル等の表示にも変更を知らせる
const applyState = ( entity: MXP.Entity, state: EntityState ) => {

	entity.setField( "name", state.name );
	entity.setField( "position", state.position );
	entity.setField( "euler", state.euler );
	entity.setField( "scale", state.scale );

};
