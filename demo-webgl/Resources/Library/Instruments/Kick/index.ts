import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// music シーンの曲のキック。セクションごとに3種類を使い分ける
const instrument: Instrument = { shader, params: [ 'kick1', 'kick2', 'kick3' ] };

export default instrument;
