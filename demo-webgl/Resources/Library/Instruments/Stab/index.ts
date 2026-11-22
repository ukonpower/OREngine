import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// music シーンの曲の16分音符で刻むシンセスタブ（Climax 用）
const instrument: Instrument = { shader };

export default instrument;
