import * as MXP from 'maxpower';

import { CommandManager } from '../CommandManager';
import { AddComponentCommand } from '../Commands/AddComponentCommand';
import { CreateEntityCommand } from '../Commands/CreateEntityCommand';
import { DeleteEntityCommand } from '../Commands/DeleteEntityCommand';
import { RemoveComponentCommand } from '../Commands/RemoveComponentCommand';
import { SetFieldCommand } from '../Commands/SetFieldCommand';

import type { Editor } from '..';

export class EditorAPI {

	private _commandManager: CommandManager;
	private _editor: Editor;

	constructor( editor: Editor ) {

		this._editor = editor;
		this._commandManager = new CommandManager();

	}

	/*-------------------------------
		Field
	-------------------------------*/

	public setField( target: MXP.Serializable, path: string, value: MXP.SerializeFieldValue ): void {

		const oldValue = target.getField( path );
		this._commandManager.execute(
			new SetFieldCommand( target, path, oldValue as MXP.SerializeFieldValue, value )
		);

	}

	/*-------------------------------
		Entity
	-------------------------------*/

	public createEntity( parent: MXP.Entity, name: string ): MXP.Entity {

		const cmd = new CreateEntityCommand( parent, name );
		this._commandManager.execute( cmd );

		return cmd.createdEntity!;

	}

	public deleteEntity( entity: MXP.Entity ): void {

		this._commandManager.execute( new DeleteEntityCommand( entity ) );

	}

	public selectEntity( entity: MXP.Entity | null ): void {

		this._editor.selectEntity( entity );

	}

	/*-------------------------------
		Component
	-------------------------------*/

	public addComponent( entity: MXP.Entity, componentClass: typeof MXP.Component ): MXP.Component {

		const cmd = new AddComponentCommand( entity, componentClass );
		this._commandManager.execute( cmd );

		return cmd.instance!;

	}

	public removeComponent( entity: MXP.Entity, componentClass: typeof MXP.Component, component: MXP.Component ): void {

		this._commandManager.execute(
			new RemoveComponentCommand( entity, componentClass, component )
		);

	}

	/*-------------------------------
		Undo / Redo
	-------------------------------*/

	public undo(): void {

		this._commandManager.undo();

	}

	public redo(): void {

		this._commandManager.redo();

	}

	public get canUndo(): boolean {

		return this._commandManager.canUndo;

	}

	public get canRedo(): boolean {

		return this._commandManager.canRedo;

	}

	public get commandManager(): CommandManager {

		return this._commandManager;

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose(): void {

		this._commandManager.clear();

	}

}
