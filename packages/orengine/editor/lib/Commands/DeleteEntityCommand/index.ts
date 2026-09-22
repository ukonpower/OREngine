import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

export class DeleteEntityCommand implements Command {

	public name = "DeleteEntity";
	private parent: MXP.Entity | null = null;

	constructor(
		private entity: MXP.Entity,
	) {}

	public execute() {

		this.parent = this.entity.parent;

		if ( this.parent ) {

			this.parent.remove( this.entity );

		}

	}

	public undo() {

		if ( this.parent ) {

			this.parent.add( this.entity );

		}

	}

}
