// エディタの Music パネルのメトロノーム。Music が import.meta.env.DEV の中でだけ呼ぶので player には入らない。
// 鳴らす Music はシーンに1つで AudioContext も1つなので、状態はモジュールに持つ
// （Music のメソッドにすると、呼ばない player にも残るため）

// 1小節の拍の数（Music パネルの MusicRuler の BEATS_PER_BAR と同じ）
const BEATS_PER_BAR = 4;

// クリック1つを書く長さ（秒）。exp( -60t ) は 0.1 秒で 0.25% まで減るので、その先は書かない
const CLICK_LENGTH = 0.1;

let source: AudioBufferSourceNode | null = null;
let bar: AudioBuffer | null = null;
let barBpm = 0;

// 1小節ぶんのクリック。音は builtin の楽器 Metronome（index.glsl）と同じで、拍の頭ごとに 880Hz、小節の頭だけ 1760Hz
const createBar = ( context: AudioContext, bpm: number ) => {

	const sampleRate = context.sampleRate;
	const beatSec = 60 / bpm;
	const buffer = context.createBuffer( 1, Math.ceil( beatSec * BEATS_PER_BAR * sampleRate ), sampleRate );
	const data = buffer.getChannelData( 0 );
	const clickSamples = Math.floor( Math.min( CLICK_LENGTH, beatSec ) * sampleRate );

	for ( let beat = 0; beat < BEATS_PER_BAR; beat ++ ) {

		const start = Math.round( beat * beatSec * sampleRate );

		let freq = 880;

		if ( beat === 0 ) freq = 1760;

		for ( let i = 0; i < clickSamples && start + i < data.length; i ++ ) {

			const t = i / sampleRate;

			data[ start + i ] = Math.sin( t * freq * Math.PI * 2 ) * Math.exp( - t * 60 ) * 0.3;

		}

	}

	return buffer;

};

export const isMetronomePlaying = () => source !== null;

// 曲の頭が songStart（context.currentTime の秒）に鳴るよう、1小節をループして鳴らす。
// 曲の頭からの位置は songStart から測るので、トラックの source と別に start しても拍がそろう
export const playMetronome = ( context: AudioContext, songStart: number, bpm: number ) => {

	stopMetronome();

	if ( ! bar || barBpm !== bpm ) {

		bar = createBar( context, bpm );
		barBpm = bpm;

	}

	const barSec = 60 / bpm * BEATS_PER_BAR;
	const now = context.currentTime;

	source = context.createBufferSource();
	source.buffer = bar;
	source.loop = true;

	// バッファの長さはサンプル数に切り上げているので、ループの終わりは秒で正確に指す（ずれが小節ごとに積もらないように）
	source.loopEnd = barSec;

	// 全体の GainNode（リバーブ・スペクトル）を通さず、直接出す
	source.connect( context.destination );

	if ( now < songStart ) {

		source.start( songStart, 0 );

	} else {

		source.start( now, ( now - songStart ) % barSec );

	}

};

export const stopMetronome = () => {

	if ( ! source ) return;

	source.stop();
	source.disconnect();
	source = null;

};
