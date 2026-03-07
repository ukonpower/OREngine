import { Engine } from '../../../Engine';

import { Command } from '../../CommandManager';

export class AddMaterialCommand implements Command {

	public name = "AddMaterial";

	constructor(
		private _materialName: string,
		private _config: Record<string, unknown>,
	) {}

	public execute() {

		Engine.resources.addMaterial( this._materialName, this._config );

	}

	public undo() {

		Engine.resources.removeMaterial( this._materialName );

	}

}
