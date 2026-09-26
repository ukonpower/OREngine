import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { CommandManager, CommandExecuteOptions } from '../CommandManager';
import { AddComponentCommand } from '../Commands/AddComponentCommand';
import { AddTextureCommand } from '../Commands/AddTextureCommand';
import { CreateEntityCommand, CreateEntityOptions } from '../Commands/CreateEntityCommand';
import { DeleteEntityCommand } from '../Commands/DeleteEntityCommand';
import { DuplicateEntityCommand } from '../Commands/DuplicateEntityCommand';
import { RemoveComponentCommand } from '../Commands/RemoveComponentCommand';
import { RemoveTextureCommand } from '../Commands/RemoveTextureCommand';
import { SetFieldCommand } from '../Commands/SetFieldCommand';
import { buildDeleteKeys, buildInsertKeys, buildSetCurves, KeyFrameFieldRef, keyFrameTime } from '../KeyFrameField';

import type { Editor } from '../Editor';

// beginEdit が返す編集の窓口。set は値を反映するだけで、commit した時点で開始時からの変化を undo 1回ぶんとして積む
export interface FieldEdit {
	set( value: MXP.SerializeFieldValue ): void;
	commit(): void;
	cancel(): void;
}

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

	// ドラッグのような連続した変更を始める。setField の自動まとめは時間基準（500ms）なので、
	// 途中で手を止めると undo が分かれてしまう。開始と確定を明示してそれを避ける
	public beginEdit( target: MXP.Serializable, path: string ): FieldEdit {

		const oldValue = target.getField( path ) as MXP.SerializeFieldValue;
		let changed = false;

		return {
			set: ( value ) => {

				target.setField( path, value );
				changed = true;

			},
			commit: () => {

				if ( ! changed ) return;

				const newValue = target.getField( path ) as MXP.SerializeFieldValue;

				this._commandManager.execute( new SetFieldCommand( target, path, oldValue, newValue ), { merge: false } );

			},
			cancel: () => {

				if ( changed ) target.setField( path, oldValue );

			},
		};

	}

	/*-------------------------------
		Entity
	-------------------------------*/

	public createEntity( parent: MXP.Entity, options: CreateEntityOptions ): MXP.Entity {

		const cmd = new CreateEntityCommand( this._editor.engine, parent, options );
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
		KeyFrame
	-------------------------------*/

	// fields に今の時刻（timeline/fps のコマに揃えた時刻）でキーを打つ。初めて打つフィールドでは、
	// Animation の追加・カーブの追加・リンクの追加までを undo 1回にまとめる。打てないフィールドがあれば何もせず Error を投げる
	public insertKeys( fields: KeyFrameFieldRef[] ): void {

		const engine = this._editor.engine;

		this._commandManager.execute( buildInsertKeys( engine, fields, keyFrameTime( engine ) ), { merge: false } );

	}

	// fields の今の時刻のキーを消す。消すキーが無ければ何もしない
	public deleteKeys( fields: KeyFrameFieldRef[] ): void {

		const engine = this._editor.engine;
		const command = buildDeleteKeys( engine, fields, keyFrameTime( engine ) );

		if ( command ) {

			this._commandManager.execute( command, { merge: false } );

		}

	}

	// カーブの表を差し替える（タイムラインでのキーの削除・補間やハンドルの種類の変更・貼り付け）。
	// キーが無くなったカーブを指すリンクも外し、undo 1回ぶんにまとめる。ドラッグで動かすときは beginEdit( engine, "curves" ) を使う
	public setCurves( curves: MXP.CurveTable ): void {

		this._commandManager.execute( buildSetCurves( this._editor.engine, curves ), { merge: false } );

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
