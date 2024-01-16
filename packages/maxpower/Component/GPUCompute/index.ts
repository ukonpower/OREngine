import * as GLP from 'glpower';

import { GPUComputePass } from '../GPUComputePass';
import { PostProcess } from '../PostProcess';

export interface GPUComputeParam {
	input?: GLP.GLPowerTexture[];
	passes: GPUComputePass[];
}

export class GPUCompute extends PostProcess {

	constructor( param: GPUComputeParam ) {

		super( param );

	}

}
