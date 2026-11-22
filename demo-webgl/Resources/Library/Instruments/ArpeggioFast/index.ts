import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// music シーンの曲の16分音符の速いアルペジオ
const instrument: Instrument = { shader, params: [ 'gain' ] };

export default instrument;
