import * as MXP from 'maxpower';

import { Engine } from '../../Engine';

import { CommandManager } from '../CommandManager';
import { AddComponentCommand } from '../Commands/AddComponentCommand';
import { AddMaterialCommand } from '../Commands/AddMaterialCommand';
import { AddTextureCommand } from '../Commands/AddTextureCommand';
import { CreateEntityCommand } from '../Commands/CreateEntityCommand';
import { DeleteEntityCommand } from '../Commands/DeleteEntityCommand';
import { RemoveComponentCommand } from '../Commands/RemoveComponentCommand';
import { RemoveMaterialCommand } from '../Commands/RemoveMaterialCommand';
import { RemoveTextureCommand } from '../Commands/RemoveTextureCommand';
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
		Material
	-------------------------------*/

	public addMaterial( name: string, config: Record<string, unknown> ): void {

		this._commandManager.execute(
			new AddMaterialCommand( name, config )
		);

	}

	public removeMaterial( name: string ): void {

		this._commandManager.execute(
			new RemoveMaterialCommand( name )
		);

	}

	public updateMaterial( name: string, config: Record<string, unknown> ): void {

		const resource = Engine.resources.getMaterial( name );
		if ( ! resource ) throw new Error( `Material not found: ${name}` );

		const fields = Object.keys( config );

		for ( const field of fields ) {

			const oldValue = resource.getField( field );
			this._commandManager.execute(
				new SetFieldCommand( resource, field, oldValue as MXP.SerializeFieldValue, config[ field ] as MXP.SerializeFieldValue )
			);

		}

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
