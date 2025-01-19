import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';

import { PostProcessPass } from './PostProcessPass';

export class PostProcess extends Component {

	public order: number;

	protected _passes: PostProcessPass[];

	constructor( params: ComponentParams<{passes: PostProcessPass[]}> ) {

		super( params );

		this._passes = params.args.passes;

		this.order = 0;
		this._tag = 'postprocess';

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

}
