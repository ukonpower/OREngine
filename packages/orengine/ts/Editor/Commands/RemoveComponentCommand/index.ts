import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

export class RemoveComponentCommand implements Command {

	public name = "RemoveComponent";
	private snapshot: MXP.SerializeField | null = null;

	constructor(
		private entity: MXP.Entity,
		private componentClass: typeof MXP.Component,
		private component: MXP.Component,
	) {}

	public execute() {

		this.snapshot = this.component.serialize();
		this.entity.removeComponent( this.componentClass );

	}

	public undo() {

		const restored = this.entity.addComponent( this.componentClass );
		restored.initiator = "user";

		if ( this.snapshot ) {

			restored.deserialize( this.snapshot );

		}

		this.component = restored;

	}

}
