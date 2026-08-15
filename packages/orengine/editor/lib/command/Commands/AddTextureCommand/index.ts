import { Engine } from '../../../../../core/Engine';
import { Command } from '../../CommandManager';

export class AddTextureCommand implements Command {

	public name = "AddTexture";

	constructor(
		private _textureName: string,
		private _config: Record<string, unknown>,
	) {}

	public execute() {

		Engine.resources.addTextureResource( this._textureName, this._config );

	}

	public undo() {

		Engine.resources.removeTextureResource( this._textureName );

	}

}
