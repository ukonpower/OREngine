import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// music シーンの曲のキラキラしたアルペジオ
const instrument: Instrument = { shader, params: [ 'main', 'up', 'down' ] };

export default instrument;
