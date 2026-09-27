import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { CommandManager, CommandExecuteOptions } from '../CommandManager';
import { AddComponentCommand } from '../Commands/AddComponentCommand';
import { AddTextureCommand } from '../Commands/AddTextureCommand';
import { CreateEntityCommand, CreateEntityOptions } from '../Commands/CreateEntityCommand';
import { DeleteEntityCommand } from '../Commands/DeleteEntityCommand';
import { DuplicateEntityCommand } from '../Commands/DuplicateEntityCommand';
import { GroupCommand } from '../Commands/GroupCommand';
import { RemoveComponentCommand } from '../Commands/RemoveComponentCommand';
import { RemoveTextureCommand } from '../Commands/RemoveTextureCommand';
import { ReparentEntityCommand } from '../Commands/ReparentEntityCommand';
import { SetFieldCommand } from '../Commands/SetFieldCommand';
import { buildCurveLinkSettings, buildDeleteKeys, buildInsertKeys, buildPasteCurve, buildSetCurves, buildUnlinkCurve, CurveLinkSettings, CurvePasteMode, KeyFrameElementRef, KeyFrameFieldRef, keyFrameTime } from '../KeyFrameField';

import type { Editor } from '../Editor';

// 自分か祖先のどれかが editorHidden か（Cloner の持ち場と複製）
const isInEditorHidden = ( entity: MXP.Entity ) => {

	let current: MXP.Entity | null = entity;

	while ( current ) {

		if ( current.editorHidden ) return true;

		current = current.parent;

	}

	return false;

};

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

	// 子ごと削除する。複数でも undo 1回ぶん
	public deleteEntities( entities: MXP.Entity[] ): void {

		const commands: DeleteEntityCommand[] = [];

		for ( const entity of entities ) {

			commands.push( new DeleteEntityCommand( entity ) );

		}

		this._commandManager.execute( new GroupCommand( commands ) );

	}

	// 子ごと複製してそれぞれ同じ親の下に置き、複製したエンティティを同じ並びで返す。複数でも undo 1回ぶん
	public duplicateEntities( entities: MXP.Entity[] ): MXP.Entity[] {

		const commands: DuplicateEntityCommand[] = [];

		for ( const entity of entities ) {

			const parent = entity.parent;

			if ( ! parent ) throw new Error( `Entity has no parent: ${entity.name}` );

			commands.push( new DuplicateEntityCommand( this._editor.engine, parent, entity ) );

		}

		this._commandManager.execute( new GroupCommand( commands ) );

		const duplicated: MXP.Entity[] = [];

		for ( const command of commands ) {

			duplicated.push( command.duplicatedEntity! );

		}

		return duplicated;

	}

	// entities を parent の子へ移す。見た目の位置は変えない（ワールド座標を保つ）。複数でも undo 1回ぶん。
	// すでに parent の子のものは何もしない。移せないものが1つでもあれば何もせず Error を投げる
	public reparentEntities( entities: MXP.Entity[], parent: MXP.Entity ): void {

		const error = this.getReparentError( entities, parent );

		if ( error ) throw new Error( error );

		const commands: ReparentEntityCommand[] = [];

		for ( const entity of entities ) {

			if ( entity.parent === parent ) continue;

			commands.push( new ReparentEntityCommand( entity, parent ) );

		}

		if ( commands.length === 0 ) return;

		this._commandManager.execute( new GroupCommand( commands ), { merge: false } );

	}

	// entities を parent の子へ移せないときの理由。移せるなら null（Hierarchy のドラッグ中の表示と reparentEntities が同じ判定を使う）
	public getReparentError( entities: MXP.Entity[], parent: MXP.Entity ): string | null {

		const root = this._editor.engine.root;

		if ( entities.length === 0 ) return "移すエンティティがありません";

		if ( parent.getRootEntity() !== root ) return `${parent.name} はシーンの中にありません`;

		// script 由来のエンティティの子はシーン JSON に保存されない（ProjectSerializer）ので、入れると保存で黙って消える
		if ( parent.initiator === "script" ) return `${parent.name} はスクリプト（BLidge / glb 等）が生成したエンティティなので、子を入れられません`;

		if ( isInEditorHidden( parent ) ) return `${parent.name} は Cloner の複製なので、子を入れられません`;

		for ( const entity of entities ) {

			if ( entity === root || ! entity.parent ) return "root は移せません";

			if ( entity.getRootEntity() !== root ) return `${entity.name} はシーンの中にありません`;

			// 生成したコンポーネントが持ち主なので、移しても保存されず、作り直しで元の場所に戻る
			if ( entity.initiator !== "user" ) return `${entity.name} はスクリプト（BLidge / glb 等）が生成したエンティティなので移せません`;

			if ( isInEditorHidden( entity ) ) return `${entity.name} は Cloner の複製なので移せません`;

			let ancestor: MXP.Entity | null = parent;

			while ( ancestor ) {

				if ( ancestor === entity ) return `${entity.name} を自分自身か自分の子孫の下へは移せません`;

				ancestor = ancestor.parent;

			}

		}

		return null;

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

	// コピーしたカーブ（curveId）を要素に貼り付ける。link は同じカーブを共有し、duplicate は複製して独立させる。
	// 初めてリンクを持つフィールドでは Animation の追加までを undo 1回にまとめる。貼り付けられなければ Error を投げる
	public pasteCurve( ref: KeyFrameElementRef, curveId: string, mode: CurvePasteMode ): void {

		const command = buildPasteCurve( this._editor.engine, ref, curveId, mode );

		if ( command ) {

			this._commandManager.execute( command, { merge: false } );

		}

	}

	// 要素が共有しているカーブを複製して指し直し、ほかのリンクから切り離す
	public unlinkCurve( ref: KeyFrameElementRef ): void {

		this._commandManager.execute( buildUnlinkCurve( this._editor.engine, ref ), { merge: false } );

	}

	// 要素のリンクの倍率・足し算と、リンク先のカーブの名前をまとめて書き換える（undo 1回）
	public setCurveLinkSettings( ref: KeyFrameElementRef, settings: CurveLinkSettings ): void {

		const command = buildCurveLinkSettings( this._editor.engine, ref, settings );

		if ( command ) {

			this._commandManager.execute( command, { merge: false } );

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
