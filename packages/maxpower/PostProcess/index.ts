import * as GLP from 'glpower';

import { PostProcessPipeline } from '../Component/PostProcessPipeline';
import { Serializable } from '../Serializable';

import { PostProcessPass } from './PostProcessPass';

export type PostProcessParams = {
	pipeline: PostProcessPipeline,
	passes?: PostProcessPass[]
}

export class PostProcess extends Serializable {

	public order: number;

	protected _pipeline: PostProcessPipeline;
	protected _passes: PostProcessPass[];

	constructor( params: PostProcessParams ) {

		super();

		this._pipeline = params.pipeline;
		this._passes = params && params.passes || [];
		this.order = 0;

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
