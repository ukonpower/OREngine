import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';

import { PostProcessPass } from './PostProcessPass';

export interface PostProcessParam {
	input?: GLP.GLPowerTexture[];
	passes: PostProcessPass[];
}

export class PostProcess extends Component {

	public input?: GLP.GLPowerTexture[];
	public passes?: PostProcessPass[];

	constructor( params: ComponentParams ) {

		super( params );

	}

	public get output() {

		if ( ! this.passes ) return null;

		const passes = this.passes.filter( ( pass ) => ! pass.passThrough );

		if ( passes.length > 0 ) {

			return passes[ passes.length - 1 ].renderTarget;

		}

		return null;

	}

	public resize( resolution: GLP.Vector ): void {

		if ( ! this.passes ) return;

		for ( let i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].resize( resolution );

		}

	}

}
