import { Engine } from '../../../Engine';

import { Command } from '../../CommandManager';

export class RemoveMaterialCommand implements Command {

	public name = "RemoveMaterial";
	private _snapshot: Record<string, unknown> | null = null;

	constructor(
		private _materialName: string,
	) {}

	public execute() {

		const resource = Engine.resources.getMaterial( this._materialName );

		if ( resource ) {

			this._snapshot = resource.serialize( { mode: "export" } ) as Record<string, unknown>;

		}

		Engine.resources.removeMaterial( this._materialName );

	}

	public undo() {

		if ( this._snapshot ) {

			Engine.resources.addMaterial( this._materialName, this._snapshot );

		}

	}

}
