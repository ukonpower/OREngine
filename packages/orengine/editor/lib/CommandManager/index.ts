import { EventEmitter } from 'basepower';

import { GroupCommand } from '../Commands/GroupCommand';

export interface Command {
	name: string;
	execute(): void;
	undo(): void;
	mergeWith?( other: Command ): Command | null;
}

export interface CommandExecuteOptions {
	// false で直前のコマンドとまとめず、後続のコマンドもこれにはまとめない（1回で完結する操作・確定済みの編集用）
	merge?: boolean;
}

export class CommandManager extends EventEmitter {

	private _undoStack: Command[] = [];
	private _redoStack: Command[] = [];
	private _mergeWindow: number = 500;
	private _lastExecuteTime: number = 0;
	private _lastMergeable: boolean = false;

	// コマンドを実行して undo 履歴に積む。_mergeWindow 以内に続いた変更は、ドラッグ等の1操作とみなして直前のコマンドとまとめる
	public execute( command: Command, options?: CommandExecuteOptions ): void {

		const now = Date.now();
		const merge = options?.merge ?? true;

		if ( merge && this._lastMergeable && this._undoStack.length > 0 && ( now - this._lastExecuteTime ) < this._mergeWindow ) {

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
		this._lastMergeable = merge;
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

	// undo 履歴に積まれているコマンドの数。collapseSince / undo で戻す位置の目印に使う
	public get depth(): number {

		return this._undoStack.length;

	}

	// depth 以降に積まれたコマンドを1つにまとめ、undo 1回で戻るようにする（シーン CLI の batch）
	public collapseSince( depth: number ): void {

		const commands = this._undoStack.splice( depth );

		if ( commands.length === 0 ) return;

		if ( commands.length === 1 ) {

			this._undoStack.push( commands[ 0 ] );

		} else {

			this._undoStack.push( new GroupCommand( commands ) );

		}

		this._lastMergeable = false;

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
