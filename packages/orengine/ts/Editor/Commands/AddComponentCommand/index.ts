import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

export class AddComponentCommand implements Command {

	public name = "AddComponent";
	public instance: MXP.Component | null = null;

	constructor(
		private entity: MXP.Entity,
		private componentClass: typeof MXP.Component,
	) {}

	public execute() {

		this.instance = this.entity.addComponent( this.componentClass );
		this.instance.initiator = "user";

	}

	public undo() {

		this.entity.removeComponent( this.componentClass );
		this.instance = null;

	}

}
