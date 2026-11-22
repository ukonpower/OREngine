import { shaderErrors } from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { countUserChanges } from '../ChangeTracker';
import { AgentCommandError, AgentCommandInput, errorMessage, requireArg } from '../Command';
import { componentName, describeFields, entityPath, fieldsOutput, fieldValue, resolveEntity, worldInfo } from '../EntityQuery';
import { getCollectedErrors } from '../ErrorCollector';
import { resolveAttachedComponent } from '../WriteCommands';

import type { ComponentGroup, ResouceComponentItem } from '../../../../core/Resources';
import type { AgentCommandContext, AgentCommandTable } from '../Command';

/*-------------------------------
	status
-------------------------------*/

// フレームは timeline/fps によらず「秒 × 60」で数える（Engine の frame.current = time.code * 60）
const FRAMES_PER_SECOND = 60;

const status = async ( ctx: AgentCommandContext ) => {

	const engine = ctx.engine;
	const selected: string[] = [];

	for ( const entity of ctx.editor.selectedEntities ) {

		selected.push( entityPath( entity ) );

	}

	let active: string | null = null;

	if ( ctx.editor.activeEntity ) active = entityPath( ctx.editor.activeEntity );

	return {
		connection: ctx.connection,
		tabId: ctx.tabId,
		url: location.href,
		scene: ctx.sceneName,
		unsaved: ctx.unsaved,
		selection: { active, selected },
		time: {
			frame: engine.frame.current,
			seconds: engine.frame.current / FRAMES_PER_SECOND,
			playing: engine.frame.playing,
			durationFrames: engine.frameSetting.duration,
			durationSeconds: engine.frameSetting.duration / FRAMES_PER_SECOND,
			fps: engine.frameSetting.fps,
			note: 'フレームは timeline/fps によらず 秒 × 60 で数える（fps はキーを揃えるコマと再生の刻みだけに効く）',
		},
		userChanges: await countUserChanges( ctx ),
	};

};

/*-------------------------------
	tree
-------------------------------*/

// エンティティに付いているコンポーネント名（読み込めなかったものも含む）
const listComponentNames = ( entity: MXP.Entity ) => {

	const names: string[] = [];

	entity.components.forEach( ( component ) => {

		names.push( componentName( component ) );

	} );

	for ( const unresolved of entity.unresolvedComponents ) {

		names.push( `${unresolved.name} (unresolved)` );

	}

	return names;

};

// 展開後の全エンティティ（BLidge / glb 由来を含む）。initiator が script のものはシーン JSON に載らない
const tree = ( ctx: AgentCommandContext ) => {

	const entities: unknown[] = [];

	ctx.engine.root.traverseEditable( ( entity ) => {

		entities.push( {
			path: entityPath( entity ),
			uuid: entity.uuid,
			initiator: entity.initiator,
			visible: entity.visible,
			...worldInfo( entity ),
			components: listComponentNames( entity ),
		} );

	} );

	return entities;

};

/*-------------------------------
	get
-------------------------------*/

const GET_USAGE = 'get <entity> [<component>] [--field <path>] [--all]';

// 既定は hidden のフィールドと uuid を外した短い形。--all で書式・選択肢・hidden・uuid も出す。
// --field <path> はその値だけ（<component> を付ければコンポーネントのフィールド）
const get = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const entity = resolveEntity( ctx.engine, requireArg( input, 0, GET_USAGE ) );
	const all = input.options.all === true;
	const field = input.options.field;

	if ( field !== undefined && typeof field !== 'string' ) {

		throw new AgentCommandError( `--field にはフィールドの path を指定してください。使い方: ${GET_USAGE}` );

	}

	if ( input.args[ 1 ] !== undefined ) {

		const { component } = resolveAttachedComponent( entity, input.args[ 1 ] );

		if ( typeof field === 'string' ) return fieldValue( component, field );

		return { entity: entityPath( entity ), component: componentName( component ), fields: fieldsOutput( component, all ) };

	}

	if ( typeof field === 'string' ) return fieldValue( entity, field );

	const components: unknown[] = [];

	entity.components.forEach( ( component ) => {

		const item: { [ key: string ]: unknown } = { name: componentName( component ) };

		if ( all ) item.uuid = component.uuid;

		// user 以外（script）が付けたものは編集できないので、既定の出力でも知らせる
		if ( all || component.initiator !== 'user' ) item.initiator = component.initiator;

		item.fields = fieldsOutput( component, all );

		components.push( item );

	} );

	const children: unknown[] = [];

	for ( const child of entity.children ) {

		if ( child.editorHidden ) continue;

		if ( all ) {

			children.push( { uuid: child.uuid, name: child.name } );

		} else {

			children.push( child.name );

		}

	}

	const output: { [ key: string ]: unknown } = { path: entityPath( entity ) };

	if ( all ) output.uuid = entity.uuid;

	if ( all || entity.initiator !== 'user' ) output.initiator = entity.initiator;

	output.world = worldInfo( entity );
	output.fields = fieldsOutput( entity, all );
	output.components = components;

	if ( all || entity.unresolvedComponents.length > 0 ) output.unresolvedComponents = entity.unresolvedComponents;

	output.children = children;

	return output;

};

/*-------------------------------
	components
-------------------------------*/

// コンポーネントのフィールド定義。value は作ったばかりの値（既定値）。hidden のフィールドは all のときだけ
const definitionFields = ( component: MXP.Component, all: boolean ) => {

	const fields: { [ path: string ]: unknown } = {};

	for ( const field of describeFields( component ) ) {

		if ( field.hidden && ! all ) continue;

		const { path, value, ...rest } = field;

		fields[ path ] = { default: value, ...rest };

	}

	return fields;

};

// フィールド定義はコンストラクタで登録されるので、シーンに繋がない仮のエンティティで一度作って読み取る
const probeFields = ( engine: Engine, item: ResouceComponentItem, all: boolean ) => {

	const probe = engine.createEntity( { name: '__agent_probe__' } );

	try {

		const component = probe.addComponent( item.component );

		return { fields: definitionFields( component, all ) };

	} catch ( e ) {

		return { error: `フィールド定義を読めませんでした: ${errorMessage( e )}` };

	} finally {

		probe.disposeRecursive();

	}

};

// components [<Name>] [--all]。名前を渡すとそのコンポーネントだけ
const components = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const all = input.options.all === true;
	const only = input.args[ 0 ];
	const list: unknown[] = [];
	const names: string[] = [];

	const walk = ( group: ComponentGroup, groupPath: string ) => {

		for ( const child of group.child ) {

			if ( 'component' in child ) {

				names.push( child.name );

				if ( only !== undefined && child.name !== only ) continue;

				list.push( { name: child.name, group: groupPath, ...probeFields( ctx.engine, child, all ) } );

			} else {

				walk( child, `${groupPath}/${child.name}` );

			}

		}

	};

	for ( const group of Engine.resources.componentGroups ) {

		walk( group, group.name );

	}

	if ( only !== undefined && list.length === 0 ) {

		throw new AgentCommandError( `コンポーネントがありません: ${only}`, names );

	}

	return list;

};

/*-------------------------------
	errors
-------------------------------*/

const errors = ( ctx: AgentCommandContext ) => {

	const shader: unknown[] = [];

	shaderErrors.forEach( ( message, name ) => {

		shader.push( { name, message } );

	} );

	// WebGPU の uncapturederror はレンダラーが '[webgpu]' 付きで console.error に流している
	const gpu: unknown[] = [];
	const consoleErrors: unknown[] = [];

	for ( const entry of getCollectedErrors() ) {

		if ( entry.message.startsWith( '[webgpu]' ) ) {

			gpu.push( entry );

		} else {

			consoleErrors.push( entry );

		}

	}

	const unresolvedComponents: unknown[] = [];

	ctx.engine.root.traverseEditable( ( entity ) => {

		for ( const unresolved of entity.unresolvedComponents ) {

			unresolvedComponents.push( { entity: entityPath( entity ), entityUuid: entity.uuid, name: unresolved.name, uuid: unresolved.uuid } );

		}

	} );

	return { shader, gpu, console: consoleErrors, unresolvedComponents };

};

export const observeCommands: AgentCommandTable = {
	status,
	tree,
	get,
	components,
	errors,
};
