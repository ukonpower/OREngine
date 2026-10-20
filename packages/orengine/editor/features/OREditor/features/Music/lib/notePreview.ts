// ピアノロールの試聴。鍵盤のクリック・ノートを選んだときに、その1音（長さ1拍＋release）を楽器で作って鳴らす。
// 生成は曲と同じ transform feedback で、曲のバッファには混ぜない。エディタだけの機能なので player に入る Music には持たせない
import * as GLP from 'glpower';
import { GLBackend } from 'maxpower';
import { Engine } from 'orengine';

import { getAudioContext } from '../../../../../../builtin/Components/Utility/Music';
import { BLOCK_SAMPLES, MusicGenerator } from '../../../../../../builtin/Components/Utility/Music/generator';
import { INSTRUMENT_KIND, Instrument, instrumentSoundKind } from '../../../../../../builtin/Components/Utility/Music/instrument';

import type { MusicClip, MusicSegment } from '../../../../../../builtin/Components/Utility/Music/clips';
import type { MusicNote } from '../../../../../../builtin/Components/Utility/Music/notes';

// 試聴する1音
export type NotePreviewRequest = {
	instrument: string;
	pitch: number;
	velocity: number;
	bpm: number;
	// 帯の数値（Song.clipParam / Note.clipParam）
	params: number[];
	// 鳴らし始めの帯の中の拍。帯の中の時刻で鳴り方が変わる楽器（Demo4 の Lead など）でも、置いた所と同じに聞こえるように
	clipBeat: number;
	// トラックの音量・パン（リバーブは掛けない）
	volume: number;
	pan: number;
};

export class MusicNotePreview {

	private generator_: MusicGenerator | null;
	private texture_: GLP.GLPowerTexture | null;
	private source_: AudioBufferSourceNode | null;
	// 試聴の音を流しているノード（source・音量・パン）。次の試聴のときに外す
	private nodes_: AudioNode[];

	constructor( engine: Engine ) {

		this.generator_ = null;
		this.texture_ = null;
		this.source_ = null;
		this.nodes_ = [];

		const backend = engine.renderer.backend;

		// Music と同じく webgl だけで鳴らす
		if ( ! ( backend instanceof GLBackend ) ) return;

		this.generator_ = new MusicGenerator( backend );
		this.texture_ = this.generator_.createNoteTexture();

	}

	// 1音を作って鳴らす。前の試聴が鳴っていれば止める。ノートの楽器でなければ何もしない
	public play( request: NotePreviewRequest ) {

		const generator = this.generator_;
		const texture = this.texture_;

		if ( ! generator || ! texture ) return;

		const instrument = Engine.resources.getLibraryItem<Instrument>( INSTRUMENT_KIND, request.instrument );

		if ( ! instrument || instrumentSoundKind( instrument.shader ) !== 'note' ) return;

		// 楽器の .glsl を保存するたびに古いシェーダーが溜まらないよう、今鳴らす楽器のもの以外は捨てる（別の楽器を鳴らすときはコンパイルし直す）
		generator.releaseUnused( new Set( [ instrument.shader ] ) );

		const program = generator.getProgram( request.instrument, instrument.shader );

		if ( ! program ) return;

		const context = getAudioContext();
		const beatSec = 60 / request.bpm;

		let release = 0;

		if ( instrument.release ) release = instrument.release;

		const seconds = beatSec + release;
		const buffer = context.createBuffer( 2, Math.max( 1, Math.ceil( seconds * context.sampleRate ) ), context.sampleRate );

		const note: MusicNote = { start: 0, length: beatSec, stop: seconds, pitch: request.pitch, velocity: request.velocity, slot: 0, clip: 0 };

		generator.updateNotes( texture, [ note ], 1 );

		const clip: MusicClip = { start: 0, end: seconds / beatSec, offset: request.clipBeat, params: request.params, notes: null };
		const segment: MusicSegment = { start: 0, end: clip.end, clip: 0, clipBeat: request.clipBeat };

		for ( let start = 0; start < buffer.length; start += BLOCK_SAMPLES ) {

			generator.render( program, buffer, start, request.bpm, [ segment ], [ clip ], texture );

		}

		this.stop();

		const gain = context.createGain();
		gain.gain.value = request.volume;

		const panner = context.createStereoPanner();
		panner.pan.value = request.pan;

		const source = context.createBufferSource();
		source.buffer = buffer;
		source.connect( gain );
		gain.connect( panner );
		panner.connect( context.destination );
		source.start();

		this.source_ = source;
		this.nodes_ = [ source, gain, panner ];

	}

	public stop() {

		if ( this.source_ ) {

			this.source_.stop();
			this.source_ = null;

		}

		for ( const node of this.nodes_ ) {

			node.disconnect();

		}

		this.nodes_ = [];

	}

	public dispose() {

		this.stop();

		if ( this.texture_ ) {

			this.texture_.dispose();
			this.texture_ = null;

		}

		if ( this.generator_ ) {

			this.generator_.dispose();
			this.generator_ = null;

		}

	}

}
