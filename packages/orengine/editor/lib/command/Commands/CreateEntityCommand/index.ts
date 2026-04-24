import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

export class CreateEntityCommand implements Command {

	public name = "CreateEntity";
	private entity: MXP.Entity | null = null;

	constructor(
		private engine: MXP.Engine,
		private parent: MXP.Entity,
		private entityName: string,
	) {}

	public execute() {

		if ( this.entity ) {

			this.parent.add( this.entity );

		} else {

			this.entity = this.engine.createEntity( { name: this.entityName } );
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
