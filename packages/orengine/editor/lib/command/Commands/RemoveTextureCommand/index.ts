import { Engine } from '../../../../../engine/Engine';
import { Command } from '../../CommandManager';

export class RemoveTextureCommand implements Command {

	public name = "RemoveTexture";
	private _snapshot: Record<string, unknown> | null = null;

	constructor(
		private _textureName: string,
	) {}

	public execute() {

		const resource = Engine.resources.getTextureResource( this._textureName );

		if ( resource ) {

			this._snapshot = resource.serialize( { mode: "export" } ) as Record<string, unknown>;

		}

		Engine.resources.removeTextureResource( this._textureName );

	}

	public undo() {

		if ( this._snapshot ) {

			Engine.resources.addTextureResource( this._textureName, this._snapshot );

		}

	}

}
