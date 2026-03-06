

import { PostProcess } from '../../PostProcess';
import { GPUComputePass } from '../GPUComputePass';
import { Renderer } from '../Renderer';

export class GPUCompute extends PostProcess {

	protected _passes: GPUComputePass[];

	private date: Date;

	constructor( params: {passes: GPUComputePass[]} ) {

		super( { ...params } );

		this._passes = params.passes;

		this.date = new Date();

	}

	public get passes() {

		return this._passes;

	}

	public compute( renderer: Renderer ) {

		const deltaTime = Math.min( 1.0 / 60, ( new Date().getTime() - this.date.getTime() ) / 1000 );

		this.date = new Date();

		this.passes.forEach( ( pass ) => {

			pass.uniforms.uDeltaTime.value = deltaTime;

		} );

		renderer.renderPostProcess( this );

	}

}
