import { EventEmitter } from 'basepower';

export interface Command {
	name: string;
	execute(): void;
	undo(): void;
	mergeWith?( other: Command ): Command | null;
}

export class CommandManager extends EventEmitter {

	private _undoStack: Command[] = [];
	private _redoStack: Command[] = [];
	private _mergeWindow: number = 500;
	private _lastExecuteTime: number = 0;

	public execute( command: Command ): void {

		const now = Date.now();

		if ( this._undoStack.length > 0 && ( now - this._lastExecuteTime ) < this._mergeWindow ) {

			const last = this._undoStack[ this._undoStack.length - 1 ];

			if ( last.mergeWith ) {

				const merged = last.mergeWith( command );

				if ( merged ) {

					this._undoStack[ this._undoStack.length - 1 ] = merged;
					command.execute();
					this._lastExecuteTime = now;
					this.emit( "change" );

					return;

				}

			}

		}

		command.execute();
		this._undoStack.push( command );
		this._redoStack = [];
		this._lastExecuteTime = now;
		this.emit( "change" );

	}

	public undo(): void {

		const command = this._undoStack.pop();

		if ( ! command ) return;

		command.undo();
		this._redoStack.push( command );
		this.emit( "change" );

	}

	public redo(): void {

		const command = this._redoStack.pop();

		if ( ! command ) return;

		command.execute();
		this._undoStack.push( command );
		this.emit( "change" );

	}

	public get canUndo(): boolean {

		return this._undoStack.length > 0;

	}

	public get canRedo(): boolean {

		return this._redoStack.length > 0;

	}

	public clear(): void {

		this._undoStack = [];
		this._redoStack = [];
		this.emit( "change" );

	}

}
