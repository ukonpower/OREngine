import shader from './index.glsl';

import type { Instrument } from 'orengine/builtin';

// ノートで鳴らすキック。絵（NoteFlash）から lastNote で引けるよう、コードでなくノートで置く。
// 頭の重なりで音が濁らないよう同時に鳴らすのは1つにし、ノートを短く置いても余韻を残す
const instrument: Instrument = { shader, maxNotes: 1, release: 0.4 };

export default instrument;
