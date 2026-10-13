import * as BSP from 'basepower';

import type { Component } from '../../Component';
import type { EngineContract } from '../../Contracts/EngineContract';
import type { Entity } from '../../Entity';

// エンティティを子ごと新しい uuid で作り直す。シーン JSON に載るもの（initiator が user のもの）だけを写す。
// エディタの複製と Cloner の実行時の複製が同じ規則で写すよう、ここ1か所に置く
export const cloneEntity = ( engine: EngineContract, source: Entity ): Entity => {

	const entity = engine.createEntity( { name: source.name } );
	entity.initiator = "user";

	entity.position.setFromArray( source.position.getElm( "vec3" ) as number[] );
	entity.euler.setFromArray( source.euler.getElm( "vec3" ) as number[] );
	entity.scale.setFromArray( source.scale.getElm( "vec3" ) as number[] );
	entity.visible = source.visible;

	// user 以外が付けたコンポーネントは、付けた側（script 等）が複製先でも同じように付け直す
	for ( const component of source.components.values() ) {

		if ( component.initiator !== "user" ) continue;

		const componentClass = component.constructor as typeof Component;
		const cloned = entity.addComponent( componentClass );
		cloned.initiator = "user";
		cloned.deserialize( component.serialize( { mode: "export" } ) );

	}

	// 解決できないコンポーネントも元と同じく保存時に書き戻されるので、uuid だけ振り直して引き継ぐ
	for ( const unresolved of source.unresolvedComponents ) {

		entity.unresolvedComponents.push( {
			name: unresolved.name,
			uuid: BSP.ID.genUUID(),
			props: unresolved.props,
		} );

	}

	// script 由来の子はシーン JSON に載らず、付けたコンポーネントが生成し直すので写さない
	for ( const child of source.children ) {

		if ( child.initiator === "script" ) continue;

		entity.add( cloneEntity( engine, child ) );

	}

	return entity;

};
