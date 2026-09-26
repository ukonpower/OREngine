import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';
import { uniqueEntityName } from '../../EntityName';

// 生成するエンティティの既定名と、最初から付けておくコンポーネント
export type CreateEntityOptions = {
	name: string;
	components: ( typeof MXP.Component )[];
};

// コンポーネント付きのエンティティを1つ生成する。コンポーネントの追加までを1コマンドに含めて、
// undo 1回でエンティティごと丸ごと戻るようにしている
export class CreateEntityCommand implements Command {

	public name = "CreateEntity";
	private entity: MXP.Entity | null = null;

	constructor(
		private engine: MXP.EngineContract,
		private parent: MXP.Entity,
		private options: CreateEntityOptions,
	) {}

	public execute() {

		if ( ! this.entity ) {

			this.entity = this.engine.createEntity( { name: uniqueEntityName( this.parent, this.options.name ) } );
			this.entity.initiator = "user";

			for ( const componentClass of this.options.components ) {

				const component = this.entity.addComponent( componentClass );
				component.initiator = "user";

			}

		}

		this.parent.add( this.entity );

	}

	public undo() {

		if ( this.entity && this.entity.parent ) {

			this.entity.parent.remove( this.entity );

		}

	}

	public get createdEntity() {

		return this.entity;

	}

}
