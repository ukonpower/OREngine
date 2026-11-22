import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// music シーンの曲のハイハット
const instrument: Instrument = { shader, params: [ 'gain' ] };

export default instrument;
