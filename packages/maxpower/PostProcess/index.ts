import * as GLP from 'glpower';

import { PostProcessPipeline } from '../Component/PostProcessPipeline';
import { Serializable } from '../Serializable';

import { PostProcessPass } from './PostProcessPass';

export type PostProcessParams = {
	name?: string,
	pipeline: PostProcessPipeline,
	passes?: PostProcessPass[]
}

export class PostProcess extends Serializable {

	public name: string;
	public order: number;
	public enabled: boolean;

	protected _pipeline: PostProcessPipeline;
	protected _passes: PostProcessPass[];

	constructor( params: PostProcessParams ) {

		super();

		this.name = params.name || "";
		this.enabled = true;
		this.order = 0;
		this._pipeline = params.pipeline;
		this._passes = params && params.passes || [];

	}

	public get passes() {

		return this._passes;

	}

	public get output() {

		if ( ! this._passes ) return null;

		const passes = this._passes.filter( ( pass ) => ! pass.passThrough );

		if ( passes.length > 0 ) {

			return passes[ passes.length - 1 ].renderTarget;

		}

		return null;

	}

	public resize( resolution: GLP.Vector ): void {

		if ( ! this._passes ) return;

		for ( let i = 0; i < this._passes.length; i ++ ) {

			this._passes[ i ].resize( resolution );

		}

	}

	public dispose() {

		this.emit( "dispose" );

	}

}
