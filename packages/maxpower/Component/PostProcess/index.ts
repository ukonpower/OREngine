import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentProps as ComponentProps } from '..';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam extends ComponentParams {
	input?: GLP.GLPowerTexture[];
	passes: PostProcessPass[];
}


export class PostProcess extends Component {

	public passes: PostProcessPass[];
	public input: GLP.GLPowerTexture[];
	public output: GLP.GLPowerFrameBuffer | null;

	public get property(): ComponentProps | null {

		const props: ComponentProps = {};

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			props[ pass.name ] = {
				value: pass.enabled,
				opt: {
					editable: true
				}
			};

		}

		return props;

	}
	public set property( props: ComponentProps | null ) {

		if ( props === null ) return;

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			this.passes[ i ].enabled = props[ pass.name ].value;

		}

	}

	constructor( param: PostProcessParam ) {

		super( param );

		this.passes = param.passes;

		this.input = param.input || [];

		if ( this.passes.length > 0 ) {

			this.output = this.passes[ this.passes.length - 1 ].renderTarget;

		} else {

			this.output = null;

		}

	}

	public resize( resolution: GLP.Vector ): void {

		for ( let i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].resize( resolution );

		}

	}

}
