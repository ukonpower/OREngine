import * as BSP from 'basepower';
import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';
import { uniqueEntityName } from '../../EntityName';

// Blender の採番サフィックス（".001" 等）。"Cube.001" の複製を "Cube.001.001" ではなく "Cube.002" にするため外してから採番する
const NAME_SUFFIX = /\.\d{3}$/;

// エンティティを子ごと新しい uuid で作り直す。シーン JSON に載るもの（ProjectSerializer が書き出す範囲）だけを写す
const cloneEntity = ( engine: MXP.EngineContract, source: MXP.Entity ): MXP.Entity => {

	const entity = engine.createEntity( { name: source.name } );
	entity.initiator = "user";

	entity.position.setFromArray( source.position.getElm( "vec3" ) as number[] );
	entity.euler.setFromArray( source.euler.getElm( "vec3" ) as number[] );
	entity.scale.setFromArray( source.scale.getElm( "vec3" ) as number[] );
	entity.visible = source.visible;

	// user 以外が付けたコンポーネントは、付けた側（script 等）が複製先でも同じように付け直す
	for ( const component of source.components.values() ) {

		if ( component.initiator !== "user" ) continue;

		const componentClass = component.constructor as typeof MXP.Component;
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

// エンティティを子ごと複製して同じ親の下に置く。undo 1回で複製ごと取り除けるように1コマンドにしている
export class DuplicateEntityCommand implements Command {

	public name = "DuplicateEntity";
	private entity: MXP.Entity | null = null;

	constructor(
		private engine: MXP.EngineContract,
		private parent: MXP.Entity,
		private source: MXP.Entity,
	) {}

	public execute() {

		// redo でも同じインスタンスを戻す。作り直すと uuid が変わり、後続コマンドの参照先が外れるため
		if ( ! this.entity ) {

			this.entity = cloneEntity( this.engine, this.source );

			const baseName = this.source.name.replace( NAME_SUFFIX, "" );
			this.entity.name = uniqueEntityName( this.parent, baseName );

		}

		this.parent.add( this.entity );

	}

	public undo() {

		if ( this.entity && this.entity.parent ) {

			this.entity.parent.remove( this.entity );

		}

	}

	public get duplicatedEntity() {

		return this.entity;

	}

}
