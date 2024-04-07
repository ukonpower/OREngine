import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { ExportableProps, ExportablePropsSerialized } from '../../Exportable';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam extends ComponentParams {
	input?: GLP.GLPowerTexture[];
	passes: PostProcessPass[];
}


export class PostProcess extends Component {

	public passes: PostProcessPass[];
	public input: GLP.GLPowerTexture[];
	public output: GLP.GLPowerFrameBuffer | null;

	public getProps(): ExportableProps | null {

		const props: ExportableProps = {};

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			props[ pass.name ] = {
				value: pass.enabled,
			};

		}

		return props;

	}
	public setProps( props: ExportablePropsSerialized ) {

		if ( props === null ) return;

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			this.passes[ i ].enabled = props[ pass.name ];

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
