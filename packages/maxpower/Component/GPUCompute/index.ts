import * as GLP from 'glpower';

import { GPUComputePass } from '../GPUComputePass';
import { PostProcess, PostProcessParam } from '../PostProcess';

export interface GPUComputeParam extends PostProcessParam{
	input?: GLP.GLPowerTexture[];
	passes: GPUComputePass[];
}

export class GPUCompute extends PostProcess {

	declare public passes: GPUComputePass[];

	constructor( param: GPUComputeParam ) {

		super( param );

	}

	public static get key(): string {

		return 'gpuCompute';

	}

}
