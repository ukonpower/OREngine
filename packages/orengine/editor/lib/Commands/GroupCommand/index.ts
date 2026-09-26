import { Command } from '../../CommandManager';

// 複数のコマンドを undo 1回ぶんにまとめる。execute は並べた順に、undo は逆順に流す
export class GroupCommand implements Command {

	public name = "Group";

	constructor(
		private commands: Command[],
	) {}

	public execute() {

		for ( const command of this.commands ) {

			command.execute();

		}

	}

	public undo() {

		for ( let i = this.commands.length - 1; i >= 0; i -- ) {

			this.commands[ i ].undo();

		}

	}

}
