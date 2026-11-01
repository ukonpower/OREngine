import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// osc Demo4 の曲のハイハット
const instrument: Instrument = { shader, params: [ 'gain' ] };

export default instrument;
