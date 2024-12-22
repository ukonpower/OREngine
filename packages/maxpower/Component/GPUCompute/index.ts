import * as MXP from 'maxpower';

import { GPUComputePass } from '../GPUComputePass';
import { PostProcess } from '../PostProcess';

export class GPUCompute extends PostProcess {

	protected renderer: MXP.Renderer;
	protected _passes: GPUComputePass[];

	constructor( params: MXP.ComponentParams<{renderer: MXP.Renderer, passes: GPUComputePass[]}> ) {

		super( params );

		this.renderer = params.args.renderer;
		this._passes = params.args.passes;

		this.compute();

	}

	public get passes() {

		return this._passes;

	}

	public compute() {

		this.renderer.renderPostProcess( this );

	}

}
