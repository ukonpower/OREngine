import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// osc Demo4 の曲のスネア
const instrument: Instrument = { shader, params: [ 'snare2', 'snare3' ] };

export default instrument;
