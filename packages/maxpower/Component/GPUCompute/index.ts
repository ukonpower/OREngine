import * as MXP from 'maxpower';

import { GPUComputePass } from '../GPUComputePass';
import { PostProcess } from '../PostProcess';

export class GPUCompute extends PostProcess {

	protected _passes: GPUComputePass[];

	constructor( params: MXP.ComponentParams<{passes: GPUComputePass[]}> ) {

		super( params );

		this._passes = params.args.passes;

	}

	public get passes() {

		return this._passes;

	}

	public compute( renderer: MXP.Renderer ) {

		renderer.renderPostProcess( this );

	}

}
