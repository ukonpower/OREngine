import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// 拍ごとにクリックを鳴らす。音とタイムラインの拍のずれを確かめるのに使う
const instrument: Instrument = { shader };

export default instrument;
