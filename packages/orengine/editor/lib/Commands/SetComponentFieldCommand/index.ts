import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

// エンティティがいま持っている componentClass のコンポーネントのフィールドを書き換える。
// AddComponentCommand は redo のたびにインスタンスを作り直すので、同じ GroupCommand で足したコンポーネントへの編集は
// インスタンスではなくエンティティとクラスで指し、redo の後でも新しいインスタンスに届くようにする
export class SetComponentFieldCommand implements Command {

	public name = "SetComponentField";

	constructor(
		private entity: MXP.Entity,
		private componentClass: typeof MXP.Component,
		private path: string,
		private oldValue: MXP.SerializeFieldValue,
		private newValue: MXP.SerializeFieldValue,
	) {}

	public execute() {

		this.getComponent().setField( this.path, this.newValue );

	}

	public undo() {

		this.getComponent().setField( this.path, this.oldValue );

	}

	private getComponent() {

		const component = this.entity.getComponent( this.componentClass );

		if ( ! component ) throw new Error( `Component not found on entity: ${this.entity.name}` );

		return component;

	}

}
