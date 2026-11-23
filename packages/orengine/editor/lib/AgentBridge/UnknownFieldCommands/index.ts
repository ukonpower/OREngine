import { dropUnknownFields, getUnknownFields } from '../../../../core/ProjectSerializer';
import { componentName, entityPath } from '../EntityQuery';

import type { AgentCommandContext, AgentCommandTable } from '../Command';
import type * as MXP from 'maxpower';

// シーンファイルにあるが、今のコンポーネントの定義に無いフィールドの値（core/ProjectSerializer が読み込み時に覚え、保存で書き戻している）。
// 消したフィールドの値が残っていないかを見て、要らなければ明示的に消す

type UnknownFieldOwner = {
	entity: string;
	component: string;
	fields: Record<string, unknown>;
	target: MXP.Component;
};

export const collectUnknownFields = ( ctx: AgentCommandContext ) => {

	const owners: UnknownFieldOwner[] = [];

	ctx.engine.root.traverseEditable( ( entity ) => {

		entity.components.forEach( ( component ) => {

			const fields = getUnknownFields( component );

			if ( fields ) owners.push( { entity: entityPath( entity ), component: componentName( component ), fields, target: component } );

		} );

	} );

	return owners;

};

const describe = ( owners: UnknownFieldOwner[] ) => {

	const list: unknown[] = [];

	for ( const owner of owners ) {

		list.push( { entity: owner.entity, component: owner.component, fields: owner.fields } );

	}

	return list;

};

// 開いているシーンの、定義に無いフィールドの値の一覧
const unknownFields = ( ctx: AgentCommandContext ) => {

	return { scene: ctx.sceneName, unknownFields: describe( collectUnknownFields( ctx ) ) };

};

// 開いているシーンの、定義に無いフィールドの値をすべて消す（保存で書き戻さなくなる）。undo では戻らない
const dropUnknown = ( ctx: AgentCommandContext ) => {

	const owners = collectUnknownFields( ctx );

	for ( const owner of owners ) {

		dropUnknownFields( owner.target );

	}

	return { scene: ctx.sceneName, dropped: describe( owners ) };

};

export const unknownFieldObserveCommands: AgentCommandTable = {
	'unknown-fields': unknownFields,
};

export const unknownFieldWriteCommands: AgentCommandTable = {
	'drop-unknown-fields': dropUnknown,
};
