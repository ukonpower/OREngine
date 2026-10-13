import * as MXP from 'maxpower';

import { Command } from '../../CommandManager';
import { uniqueEntityName } from '../../EntityName';

// Blender の採番サフィックス（".001" 等）。"Cube.001" の複製を "Cube.001.001" ではなく "Cube.002" にするため外してから採番する
const NAME_SUFFIX = /\.\d{3}$/;

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

			this.entity = MXP.cloneEntity( this.engine, this.source );

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
