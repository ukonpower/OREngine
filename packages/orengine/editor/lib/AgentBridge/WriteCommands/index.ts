import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { ENTITY_PRESETS } from '../../EntityPresets';
import { AgentCommandError, AgentCommandInput, requireArg } from '../Command';
import { componentName, entityPath, resolveEntity, resolveList } from '../EntityQuery';

import type { AgentCommandContext, AgentCommandTable } from '../Command';

// 書き込みはすべて EditorAPI を通す（GUI と同じ経路に乗せて undo を効かせるため）。保存はしない。
// 選択状態・エディタのカメラ・再生時刻には触らない。編集できる範囲も GUI に揃える
// （script 由来のエンティティへの子の追加・削除、user 以外のコンポーネントの削除・編集は GUI でもできない）

/*-------------------------------
	Resolve
-------------------------------*/

// エンティティに付いているコンポーネントを、登録名か uuid で1つ引く
const resolveAttachedComponent = ( entity: MXP.Entity, spec: string ) => {

	const names: string[] = [];

	for ( const [ componentClass, component ] of entity.components ) {

		const name = componentName( component );

		if ( name === spec || component.uuid === spec ) {

			return { componentClass, component };

		}

		names.push( name );

	}

	throw new AgentCommandError( `コンポーネントが付いていません: ${spec}（${entityPath( entity )}）`, names );

};

// script 由来のエンティティはシーン JSON に載らない。GUI と同じく子の追加・削除を受け付けない
const assertEditableEntity = ( entity: MXP.Entity, action: string ) => {

	if ( entity.initiator === 'script' ) {

		throw new AgentCommandError( `${entityPath( entity )} はスクリプト（BLidge / glb 等）が生成したエンティティなので${action}できません` );

	}

};

// user が付けたもの以外（コンポーネントが内部で足したもの等）はシーン JSON に載らない。GUI でも編集不可
const assertEditableComponent = ( component: MXP.Component, action: string ) => {

	if ( component.initiator !== 'user' ) {

		throw new AgentCommandError( `${componentName( component )} は initiator が ${component.initiator} のコンポーネントなので${action}できません（シーン JSON に載るのは user が付けたものだけ）` );

	}

};

/*-------------------------------
	Value
-------------------------------*/

// set で書き換えられるフィールドの path（フォルダの見出し行・読み取り専用・ボタンを除く）
const writablePaths = ( target: MXP.Serializable ) => {

	const paths: string[] = [];
	const serialized = target.serialize( { mode: 'view' } );

	for ( const path of Object.keys( serialized ) ) {

		const opt = target.getFieldOpt( path ) ?? {};

		if ( opt.isFolder || opt.readOnly ) continue;

		if ( typeof serialized[ path ] === 'function' ) continue;

		paths.push( path );

	}

	return paths;

};

const parseNumber = ( raw: string, path: string ) => {

	const value = Number( raw );

	if ( raw.trim() === '' || ! Number.isFinite( value ) ) {

		throw new AgentCommandError( `${path} は数値のフィールドです: ${raw}` );

	}

	return value;

};

// "1,2,3" か JSON の配列 "[1,2,3]" を配列にする。要素の型は現在値の要素に合わせる
const parseArray = ( raw: string, current: MXP.SerializeFieldValue[], path: string, format: string | undefined ) => {

	let items: unknown[];

	if ( raw.trim().startsWith( '[' ) ) {

		try {

			items = JSON.parse( raw );

		} catch {

			throw new AgentCommandError( `${path} の値を JSON の配列として読めません: ${raw}` );

		}

		if ( ! Array.isArray( items ) ) {

			throw new AgentCommandError( `${path} は配列のフィールドです: ${raw}` );

		}

	} else {

		items = [];

		for ( const item of raw.split( ',' ) ) {

			items.push( item.trim() );

		}

	}

	// vector / color は要素数が型の一部（vec3 / RGB 等）なので、現在値と同じ数に限る
	if ( ( format === 'vector' || format === 'color' ) && items.length !== current.length ) {

		throw new AgentCommandError( `${path} は要素数 ${current.length} の ${format} です（例: ${current.join( ',' )}）: ${raw}` );

	}

	const values: MXP.SerializeFieldValue[] = [];

	for ( let i = 0; i < items.length; i ++ ) {

		const item = items[ i ];
		const sample = current[ i ] ?? current[ 0 ];

		if ( typeof sample === 'number' && typeof item === 'string' ) {

			values.push( parseNumber( item, `${path}[${i}]` ) );

		} else {

			values.push( item as MXP.SerializeFieldValue );

		}

	}

	return values;

};

// CLI から来た文字列を、フィールドの書式と現在値の型に合わせた値にする
const parseFieldValue = ( engine: Engine, target: MXP.Serializable, path: string, raw: string ): MXP.SerializeFieldValue => {

	const opt = target.getFieldOpt( path ) ?? {};
	const current = target.getField( path );

	// entity 参照は uuid だけを受け付ける。名前パスは同名で曖昧になり得るうえ、get が返す値も uuid なので読み書きの形を揃える
	if ( opt.format && opt.format.type === 'entity' ) {

		if ( raw === 'null' ) return null;

		if ( ! engine.root.findEntityByUUID( raw ) ) {

			throw new AgentCommandError( `${path} はエンティティの uuid で指定します（外すときは null）。uuid は tree で確認できます: ${raw}` );

		}

		return raw;

	}

	// select / resource は選択肢のどれかに限る。選択肢の値が数値でも文字列で突き合わせる
	if ( opt.format && ( opt.format.type === 'select' || opt.format.type === 'resource' ) ) {

		const options = resolveList( opt.format.list );

		for ( const option of options ) {

			if ( String( option ) === raw ) return option as MXP.SerializeFieldValue;

		}

		throw new AgentCommandError( `${path} は選択肢から選ぶフィールドです: ${raw}`, options );

	}

	if ( Array.isArray( current ) ) {

		return parseArray( raw, current, path, opt.format?.type );

	}

	if ( typeof current === 'number' ) {

		return parseNumber( raw, path );

	}

	if ( typeof current === 'boolean' ) {

		if ( raw === 'true' ) return true;

		if ( raw === 'false' ) return false;

		throw new AgentCommandError( `${path} は真偽値のフィールドです（true か false）: ${raw}` );

	}

	if ( typeof current === 'string' ) {

		return raw;

	}

	// 未設定だと null になるフィールド。null で外し、それ以外は JSON として読めれば JSON、読めなければ文字列
	if ( current === null || current === undefined ) {

		if ( raw === 'null' ) return null;

		try {

			return JSON.parse( raw );

		} catch {

			return raw;

		}

	}

	try {

		return JSON.parse( raw );

	} catch {

		throw new AgentCommandError( `${path} はオブジェクトのフィールドなので JSON で指定してください: ${raw}` );

	}

};

/*-------------------------------
	Entity
-------------------------------*/

const ADD_ENTITY_USAGE = 'add-entity <parent> [--preset Empty|Light|Camera] [--name <name>]';

const addEntity = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const parent = resolveEntity( ctx.engine, requireArg( input, 0, ADD_ENTITY_USAGE ) );

	assertEditableEntity( parent, '子を追加' );

	let presetName = 'Empty';

	if ( input.options.preset !== undefined ) {

		if ( typeof input.options.preset !== 'string' ) {

			throw new AgentCommandError( `--preset に名前がありません。使い方: ${ADD_ENTITY_USAGE}` );

		}

		presetName = input.options.preset;

	}

	const preset = ENTITY_PRESETS.find( ( item ) => item.name === presetName );

	if ( ! preset ) {

		const names: string[] = [];

		for ( const item of ENTITY_PRESETS ) {

			names.push( item.name );

		}

		throw new AgentCommandError( `プリセットがありません: ${presetName}`, names );

	}

	let name = preset.name;

	if ( input.options.name !== undefined ) {

		if ( typeof input.options.name !== 'string' ) {

			throw new AgentCommandError( `--name に名前がありません。使い方: ${ADD_ENTITY_USAGE}` );

		}

		// 名前パス（root/Camera）の区切りと衝突するので使わせない
		if ( input.options.name.includes( '/' ) ) {

			throw new AgentCommandError( `名前に / は使えません: ${input.options.name}` );

		}

		name = input.options.name;

	}

	// 名前もプリセットに含めて渡し、生成と命名を undo 1回ぶんにする。兄弟と衝突すれば Name.001 のように採番される
	const entity = ctx.editor.api.createEntity( parent, { name, components: preset.components } );

	const components: string[] = [];

	entity.components.forEach( ( component ) => {

		components.push( componentName( component ) );

	} );

	return { uuid: entity.uuid, name: entity.name, path: entityPath( entity ), components };

};

const removeEntity = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const entity = resolveEntity( ctx.engine, requireArg( input, 0, 'remove-entity <entity>' ) );

	if ( entity === ctx.engine.root ) {

		throw new AgentCommandError( 'root は削除できません' );

	}

	assertEditableEntity( entity, '削除' );

	const path = entityPath( entity );

	ctx.editor.api.deleteEntity( entity );

	return { uuid: entity.uuid, path };

};

/*-------------------------------
	Component
-------------------------------*/

const addComponent = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const usage = 'add-component <entity> <Name>';
	const entity = resolveEntity( ctx.engine, requireArg( input, 0, usage ) );
	const name = requireArg( input, 1, usage );

	const item = Engine.resources.getComponent( name );

	if ( ! item ) {

		const names: string[] = [];

		for ( const registered of Engine.resources.componentList ) {

			names.push( registered.name );

		}

		throw new AgentCommandError( `登録されていないコンポーネントです: ${name}（一覧は components で確認できます）`, names );

	}

	// Entity.addComponent は同じクラスを付け直すと既存を黙って捨てるので、先に止める
	if ( entity.getComponent( item.component ) ) {

		throw new AgentCommandError( `${entityPath( entity )} には ${name} がすでに付いています` );

	}

	const component = ctx.editor.api.addComponent( entity, item.component );

	return { entity: entityPath( entity ), name, uuid: component.uuid };

};

const removeComponent = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const usage = 'remove-component <entity> <Name>';
	const entity = resolveEntity( ctx.engine, requireArg( input, 0, usage ) );
	const { componentClass, component } = resolveAttachedComponent( entity, requireArg( input, 1, usage ) );

	assertEditableComponent( component, '削除' );

	const name = componentName( component );

	ctx.editor.api.removeComponent( entity, componentClass, component );

	return { entity: entityPath( entity ), name, uuid: component.uuid };

};

/*-------------------------------
	Field
-------------------------------*/

const SET_USAGE = 'set <entity> [<component>] <path> <value>';

// 引数が3つならエンティティのフィールド、4つならコンポーネントのフィールド
const set = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const entity = resolveEntity( ctx.engine, requireArg( input, 0, SET_USAGE ) );

	let target: MXP.Serializable = entity;
	let targetLabel = entityPath( entity );
	let pathIndex = 1;

	if ( input.args.length >= 4 ) {

		const { component } = resolveAttachedComponent( entity, input.args[ 1 ] );

		assertEditableComponent( component, '編集' );

		target = component;
		targetLabel = `${targetLabel} ${componentName( component )}`;
		pathIndex = 2;

	}

	const path = requireArg( input, pathIndex, SET_USAGE );
	const raw = requireArg( input, pathIndex + 1, SET_USAGE );

	const paths = writablePaths( target );

	if ( ! paths.includes( path ) ) {

		let hint = '';

		if ( target === entity ) {

			hint = '（コンポーネントのフィールドは set <entity> <component> <path> <value>）';

		}

		throw new AgentCommandError( `書き換えられるフィールドではありません: ${path}（${targetLabel}）${hint}`, paths );

	}

	// CLI の1コマンドは1操作なので、直前の変更とまとめず undo 1回ぶんにする
	ctx.editor.api.setField( target, path, parseFieldValue( ctx.engine, target, path, raw ), { merge: false } );

	return { target: targetLabel, path, value: target.getField( path ) };

};

/*-------------------------------
	Undo / Redo
-------------------------------*/

// undo 履歴は GUI と共有している。直前の操作が GUI のものならそれが戻る
const undo = ( ctx: AgentCommandContext ) => {

	if ( ! ctx.editor.api.canUndo ) {

		throw new AgentCommandError( '取り消せる操作がありません' );

	}

	ctx.editor.api.undo();

	return { canUndo: ctx.editor.api.canUndo, canRedo: ctx.editor.api.canRedo };

};

const redo = ( ctx: AgentCommandContext ) => {

	if ( ! ctx.editor.api.canRedo ) {

		throw new AgentCommandError( 'やり直せる操作がありません' );

	}

	ctx.editor.api.redo();

	return { canUndo: ctx.editor.api.canUndo, canRedo: ctx.editor.api.canRedo };

};

export const writeCommands: AgentCommandTable = {
	'add-entity': addEntity,
	'remove-entity': removeEntity,
	'add-component': addComponent,
	'remove-component': removeComponent,
	set,
	undo,
	redo,
};
