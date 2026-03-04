import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

export class CreateEntityCommand implements Command {

	public name = "CreateEntity";
	private entity: MXP.Entity | null = null;

	constructor(
		private parent: MXP.Entity,
		private entityName: string,
	) {}

	public execute() {

		if ( this.entity ) {

			this.parent.add( this.entity );

		} else {

			this.entity = new MXP.Entity();
			this.entity.name = this.entityName;
			this.entity.initiator = "user";
			this.parent.add( this.entity );

		}

	}

	public undo() {

		if ( this.entity && this.entity.parent ) {

			this.entity.parent.remove( this.entity );

		}

	}

	public get createdEntity() {

		return this.entity;

	}

}
