import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import { ComponentUpdateEvent } from '..';
import { GPUComputePass } from '../GPUComputePass';
import { PostProcess, PostProcessParam } from '../PostProcess';

export interface GPUComputeParam extends PostProcessParam{
	renderer: MXP.Renderer;
	input?: GLP.GLPowerTexture[];
	passes: GPUComputePass[];
}

export class GPUCompute extends PostProcess {

	protected renderer: MXP.Renderer;
	declare public passes: GPUComputePass[];

	constructor( param: GPUComputeParam ) {

		super( param );

		this.renderer = param.renderer;

		this.compute();

	}

	protected updateImpl( event: ComponentUpdateEvent ): void {

	}


	public compute() {

		this.renderer.renderPostProcess( this );

	}

}
