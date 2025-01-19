import * as GLP from 'glpower';

import { PostProcessPass } from './PostProcessPass';

export class PostProcess extends GLP.EventEmitter {

	public order: number;

	protected _passes: PostProcessPass[];

	constructor( params: {passes: PostProcessPass[]} ) {

		super( );

		this._passes = params.passes;
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

}
