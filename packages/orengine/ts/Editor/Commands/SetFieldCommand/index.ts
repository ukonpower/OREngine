import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';

export class SetFieldCommand implements Command {

	public name = "SetField";

	constructor(
		private target: MXP.Serializable,
		private path: string,
		private oldValue: MXP.SerializeFieldValue,
		private newValue: MXP.SerializeFieldValue,
	) {}

	public execute() {

		this.target.setField( this.path, this.newValue );

	}

	public undo() {

		this.target.setField( this.path, this.oldValue );

	}

	public mergeWith( other: Command ): Command | null {

		if ( other instanceof SetFieldCommand &&
			other.target === this.target &&
			other.path === this.path ) {

			return new SetFieldCommand( this.target, this.path, this.oldValue, other.newValue );

		}

		return null;

	}

}
