import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// osc Demo4 の曲のベース。ノートは4拍ずつ途切れずに並べるので、同時に鳴らすのは1つ
const instrument: Instrument = { shader, maxNotes: 1 };

export default instrument;
