

import { ComponentParams } from '..';
import { PostProcess } from '../../PostProcess';
import { GPUComputePass } from '../GPUComputePass';
import { Renderer } from '../Renderer';

export class GPUCompute extends PostProcess {

	protected _passes: GPUComputePass[];

	constructor( params: {passes: GPUComputePass[]} ) {

		super( params );

		this._passes = params.passes;

	}

	public get passes() {

		return this._passes;

	}

	public compute( renderer: Renderer ) {

		renderer.renderPostProcess( this );

	}

}
