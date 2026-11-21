import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// 帯ごとに根音を変えて三和音を鳴らすパッド。絵（ClipColor）が currentClip で同じ帯の数値を読む
const instrument: Instrument = { shader, params: [ 'gain', 'root' ] };

export default instrument;
