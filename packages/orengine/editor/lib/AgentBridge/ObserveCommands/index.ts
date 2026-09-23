import { shaderErrors } from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { AgentCommandInput, errorMessage, requireArg } from '../Command';
import { componentName, describeFields, entityPath, resolveEntity, worldInfo } from '../EntityQuery';
import { getCollectedErrors } from '../ErrorCollector';

import type { ComponentGroup, ResouceComponentItem } from '../../../../core/Resources';
import type { AgentCommandContext, AgentCommandTable } from '../Command';

/*-------------------------------
	status
-------------------------------*/

const status = ( ctx: AgentCommandContext ) => {

	return {
		connection: 'tab',
		tabId: ctx.tabId,
		url: location.href,
		scene: ctx.sceneName,
		unsaved: ctx.unsaved,
		frame: {
			current: ctx.engine.frame.current,
			playing: ctx.engine.frame.playing,
			duration: ctx.engine.frameSetting.duration,
			fps: ctx.engine.frameSetting.fps,
		},
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

	ctx.engine.root.traverse( ( entity ) => {

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

const get = ( ctx: AgentCommandContext, input: AgentCommandInput ) => {

	const entity = resolveEntity( ctx.engine, requireArg( input, 0, 'get <entity>' ) );

	const components: unknown[] = [];

	entity.components.forEach( ( component ) => {

		components.push( {
			name: componentName( component ),
			uuid: component.uuid,
			initiator: component.initiator,
			fields: describeFields( component ),
		} );

	} );

	const children: unknown[] = [];

	for ( const child of entity.children ) {

		children.push( { uuid: child.uuid, name: child.name } );

	}

	return {
		path: entityPath( entity ),
		uuid: entity.uuid,
		initiator: entity.initiator,
		world: worldInfo( entity ),
		fields: describeFields( entity ),
		components,
		unresolvedComponents: entity.unresolvedComponents,
		children,
	};

};

/*-------------------------------
	components
-------------------------------*/

// フィールド定義はコンストラクタで登録されるので、シーンに繋がない仮のエンティティで一度作って読み取る
const probeFields = ( engine: Engine, item: ResouceComponentItem ) => {

	const probe = engine.createEntity( { name: '__agent_probe__' } );

	try {

		const component = probe.addComponent( item.component );

		return { fields: describeFields( component ) };

	} catch ( e ) {

		return { error: `フィールド定義を読めませんでした: ${errorMessage( e )}` };

	} finally {

		probe.disposeRecursive();

	}

};

const components = ( ctx: AgentCommandContext ) => {

	const list: unknown[] = [];

	const walk = ( group: ComponentGroup, groupPath: string ) => {

		for ( const child of group.child ) {

			if ( 'component' in child ) {

				list.push( { name: child.name, group: groupPath, ...probeFields( ctx.engine, child ) } );

			} else {

				walk( child, `${groupPath}/${child.name}` );

			}

		}

	};

	for ( const group of Engine.resources.componentGroups ) {

		walk( group, group.name );

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

	ctx.engine.root.traverse( ( entity ) => {

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
