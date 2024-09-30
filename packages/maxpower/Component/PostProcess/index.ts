import * as GLP from 'glpower';

import { Component, ComponentParams } from '..';
import { SerializableProps, TypedSerializableProps } from '../../Serializable';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam extends ComponentParams {
	input?: GLP.GLPowerTexture[];
	passes: PostProcessPass[];
}


export class PostProcess extends Component {

	public passes: PostProcessPass[];
	public input: GLP.GLPowerTexture[];
	public output: GLP.GLPowerFrameBuffer | null;

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

	public get props() {

		const props: SerializableProps = {};

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			props[ pass.name.replaceAll( "/", ":" ) ] = {
				value: pass.enabled,
			};

		}

		const res = { ...super.props, ...props };

		return res;

	}

	protected deserializer( props: TypedSerializableProps<this> ) {

		super.deserializer( props );

		if ( props === null ) return;

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			const enableProps = ( props as SerializableProps )[ pass.name.replaceAll( "/", ":" ) ];

			if ( enableProps !== undefined ) {

				this.passes[ i ].enabled = enableProps.value;

			}

		}

	}

	public resize( resolution: GLP.Vector ): void {

		for ( let i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].resize( resolution );

		}

	}

}
