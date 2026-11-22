import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// music シーンの曲のリードシンセ。ノートは 1/4 拍ずつ途切れずに並べるので、同時に鳴らすのは1つ
const instrument: Instrument = { shader, maxNotes: 1, params: [ 'gain' ] };

export default instrument;
