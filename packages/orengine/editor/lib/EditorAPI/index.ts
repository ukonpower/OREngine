import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { CommandManager, CommandExecuteOptions } from '../CommandManager';
import { AddComponentCommand } from '../Commands/AddComponentCommand';
import { AddTextureCommand } from '../Commands/AddTextureCommand';
import { CreateEntityCommand } from '../Commands/CreateEntityCommand';
import { DeleteEntityCommand } from '../Commands/DeleteEntityCommand';
import { DuplicateEntityCommand } from '../Commands/DuplicateEntityCommand';
import { RemoveComponentCommand } from '../Commands/RemoveComponentCommand';
import { RemoveTextureCommand } from '../Commands/RemoveTextureCommand';
import { SetFieldCommand } from '../Commands/SetFieldCommand';

import type { Editor } from '../Editor';
import type { EntityPreset } from '../EntityPresets';

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

	// フィールドを書き換える。既定では GUI のドラッグ等の連続した変更を直前の変更とまとめる
	public setField( target: MXP.Serializable, path: string, value: MXP.SerializeFieldValue, options?: CommandExecuteOptions ): void {

		const oldValue = target.getField( path );
		this._commandManager.execute(
			new SetFieldCommand( target, path, oldValue as MXP.SerializeFieldValue, value ),
			options
		);

	}

	/*-------------------------------
		Entity
	-------------------------------*/

	public createEntity( parent: MXP.Entity, preset: EntityPreset ): MXP.Entity {

		const cmd = new CreateEntityCommand( this._editor.engine, parent, preset );
		this._commandManager.execute( cmd );

		return cmd.createdEntity!;

	}

	public deleteEntity( entity: MXP.Entity ): void {

		this._commandManager.execute( new DeleteEntityCommand( entity ) );

	}

	// 子ごと複製して同じ親の下に置き、複製したエンティティを返す
	public duplicateEntity( entity: MXP.Entity ): MXP.Entity {

		const parent = entity.parent;

		if ( ! parent ) throw new Error( `Entity has no parent: ${entity.name}` );

		const cmd = new DuplicateEntityCommand( this._editor.engine, parent, entity );
		this._commandManager.execute( cmd );

		return cmd.duplicatedEntity!;

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
		Texture
	-------------------------------*/

	public addTexture( name: string, config: Record<string, unknown> ): void {

		this._commandManager.execute(
			new AddTextureCommand( name, config )
		);

	}

	public removeTexture( name: string ): void {

		this._commandManager.execute(
			new RemoveTextureCommand( name )
		);

	}

	public updateTexture( name: string, config: Record<string, unknown> ): void {

		const resource = Engine.resources.getTextureResource( name );
		if ( ! resource ) throw new Error( `Texture not found: ${name}` );

		const fields = Object.keys( config );

		for ( const field of fields ) {

			const oldValue = resource.getField( field );
			this._commandManager.execute(
				new SetFieldCommand( resource, field, oldValue as MXP.SerializeFieldValue, config[ field ] as MXP.SerializeFieldValue )
			);

		}

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
