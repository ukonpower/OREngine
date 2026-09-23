import { EventEmitter } from 'basepower';

export interface Command {
	name: string;
	execute(): void;
	undo(): void;
	mergeWith?( other: Command ): Command | null;
}

export interface CommandExecuteOptions {
	// false で直前のコマンドとまとめない（ドラッグのような連続操作ではない、1回で完結する操作用）
	merge?: boolean;
}

export class CommandManager extends EventEmitter {

	private _undoStack: Command[] = [];
	private _redoStack: Command[] = [];
	private _mergeWindow: number = 500;
	private _lastExecuteTime: number = 0;

	// コマンドを実行して undo 履歴に積む。_mergeWindow 以内に続いた変更は、ドラッグ等の1操作とみなして直前のコマンドとまとめる
	public execute( command: Command, options?: CommandExecuteOptions ): void {

		const now = Date.now();
		const merge = options?.merge ?? true;

		if ( merge && this._undoStack.length > 0 && ( now - this._lastExecuteTime ) < this._mergeWindow ) {

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
