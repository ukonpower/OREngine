import * as GLP from 'glpower';
import { Component, ComponentParams, ComponentUpdateEvent, GLBackend, SerializeFieldValue } from 'maxpower';
import { Engine } from 'orengine';

import { decodeClips, MusicClip, MusicSegment, resolveClipSegments } from './clips';
import { BLOCK_SAMPLES, MusicGenerator } from './generator';
import { INSTRUMENT_HOT_EVENT, INSTRUMENT_KIND, Instrument, instrumentSoundKind, MusicClipData, MusicTrackData } from './instrument';
import { MusicMixer, SPECTRUM_FFT_SIZE } from './mixer';
import { isTrackAudible, MusicMonitor } from './monitor';
import { MusicNote, resolveNotes } from './notes';
import { findCurrentClip, findLastNote } from './readout';

// update/music で Engine から出す、生成したトラックの音。エディタの波形表示が音量を掛けて足した1本を作り、
// Music パネルが帯ごとの波形を描く。tracks は Music の tracks と同じ並びで、まだ音の入れ物が無いトラックは buffer が null
export type MusicOutput = {
	sampleRate: number;
	length: number;
	tracks: { buffer: AudioBuffer | null, volume: number }[];
	// 前に出したときから中身が変わったサンプルの範囲 [start, end)。音量だけが変わったときは空（start === end）
	start: number;
	end: number;
};

// 鳴っている音とタイムラインの時刻がこれ以上（秒）ずれたら、今の時刻から張り直す。シーク・ループもこのずれで拾う
const SYNC_TOLERANCE = 0.1;

// 生成の途中で描画を譲る間隔（ミリ秒）。エディタの画面と player の進捗バーが止まらない程度にまとめて作る
const YIELD_INTERVAL = 8;

// 帯を持たないトラックの帯。毎回 [] を作ると、更新のたびに帯が差し替わったように見えるため1つを使い回す
const NO_CLIPS: MusicClipData[] = [];

// 1トラックの生成の状態
type MusicTrack = {
	// 今の音を作った楽器の名前とシェーダー。どちらかが変わったら作り直す
	instrument: string | null;
	shader: string | null;
	// 鳴らせない楽器（無い・noteSound の楽器・コンパイルエラー）なら null で、そのトラックは無音にする
	program: GLP.GLPowerProgram | null;
	buffer: AudioBuffer | null;
	// かたまり（BLOCK_SAMPLES）ごとに、今の設定で作り終えたか
	done: Uint8Array;
	// ノードに入れた音量・パン
	volume: number;
	pan: number;
	// エディタのミュート・ソロで黙らせているか。エディタでだけ入れる（player では undefined のまま）
	silent?: boolean;
	// 今の音を作った帯。clipsData は tracks の中の配列そのもの、clipsKey はその中身の文字列
	clipsData: MusicClipData[] | null;
	clipsKey: string;
	clips: MusicClip[];
	// 帯の重なりを解決した、鳴らす区間
	segments: MusicSegment[];
	// ノートの楽器のときだけ、変換したあとのノート（帯の外・隠れた区間で落とし、帯の終わり・maxNotes で切ったあと。開始の順）と、
	// それを入れた生成用のテクスチャを持つ。コードの楽器は空と null。絵から音を引く読み口（#275）もこのノートを読む
	notes: MusicNote[];
	noteTexture: GLP.GLPowerTexture | null;
};

// かたまりの番号を、start から前後へ交互に（start, start + 1, start - 1, start + 2, …）並べる
const blockOrder = ( start: number, count: number ) => {

	const order: number[] = [];

	if ( count <= 0 ) return order;

	const center = Math.min( Math.max( start, 0 ), count - 1 );

	order.push( center );

	for ( let distance = 1; order.length < count; distance ++ ) {

		if ( center + distance < count ) order.push( center + distance );
		if ( center - distance >= 0 ) order.push( center - distance );

	}

	return order;

};

const nextTask = () => new Promise<void>( ( resolve ) => {

	setTimeout( resolve, 0 );

} );

/*-------------------------------
	AudioContext
-------------------------------*/

let sharedContext: AudioContext | null = null;

// AudioContext は全 Music で1つを使い回す。シーンを読み直すたびに作ると数が積もり、自動再生の制限の解除もやり直しになるため
export const getAudioContext = () => {

	if ( sharedContext ) return sharedContext;

	const context = new AudioContext();

	// ブラウザの自動再生の制限で、AudioContext は利用者の操作の中でしか始められない。
	// player の Play ボタン・エディタの再生ボタンを押した操作の中で始まるよう、押す操作のたびに始め直しを試みる
	const resume = () => {

		if ( context.state === 'suspended' ) {

			context.resume();

		}

	};

	window.addEventListener( 'pointerdown', resume );
	window.addEventListener( 'keydown', resume );

	sharedContext = context;

	return context;

};

/*-------------------------------
	Hot Reload
-------------------------------*/

// 楽器の .glsl を保存したら、ライブラリの楽器を新しいシェーダーに差し替える（イベントは ShaderBuilder が出す）。
// 使っているトラックは、Music が更新のたびにシェーダーの変化を見つけてそのトラックだけ作り直す
if ( import.meta.hot ) {

	window.addEventListener( INSTRUMENT_HOT_EVENT, ( e ) => {

		const detail = ( e as CustomEvent<{ name: string, shader: string }> ).detail;
		const instrument = Engine.resources.getLibraryItem<Instrument>( INSTRUMENT_KIND, detail.name );

		if ( ! instrument ) return;

		Engine.resources.addLibraryItem( INSTRUMENT_KIND, detail.name, { ...instrument, shader: detail.shader } );

	} );

}

/*-------------------------------
	Music
-------------------------------*/

// 曲を鳴らす。トラックごとに楽器のシェーダーから曲の全サンプルを作り、Web Audio で混ぜてタイムラインに合わせて再生する。
// シーンに1つ置く（2つ目からは鳴らさない）。生成が WebGL2 の transform feedback なので、webgpu のプロジェクトでは鳴らさない
export class Music extends Component {

	// 今の曲。シーンに Music が無ければ null
	public static instance: Music | null;

	// エディタの Music パネルのミュート・ソロ。Editor が editor.json の値を入れる。
	// Music を置き直しても（シーンの読み直し）残るよう、インスタンスでなくクラスに持つ。player では入れず読まない
	public static monitor: MusicMonitor | undefined;

	private bpm_: number;
	private tracksData_: MusicTrackData[];
	private reverbLength_: number;
	private reverbWet_: number;

	// 鳴らす Music で、webgl のときだけある
	private context_: AudioContext | null;
	private generator_: MusicGenerator | null;
	private mixer_: MusicMixer | null;

	private tracks_: MusicTrack[];
	// 今のバッファを作った曲の長さ（サンプル数）と BPM。変わったら全トラックを作り直す
	private length_: number;
	private generatedBpm_: number;
	// 走っている生成の番号。作り直しを始めるたびに増やし、前の生成を途中で止める
	private jobId_: number;
	// 生成を通らない変化（トラックの増減・無音にしたトラック）で、波形表示へ曲全体を送り直す
	private outputDirty_: boolean;
	// 次の更新で source を張り直す。作ったかたまりを鳴らすには source を作り直す必要がある
	// （AudioBufferSourceNode は再生中の buffer の書き換えを拾うとは限らない）
	private restartRequested_: boolean;
	// 鳴っている音のスペクトル。renderer.globalUniforms の uMusicFreqTex に置き、再生中は毎フレーム書き換える
	private spectrum_: Uint8Array<ArrayBuffer>;
	private spectrumTexture_: GLP.GLPowerTexture | null;

	private onSelfUpdate_: ( paths: string[] ) => void;

	constructor( params: ComponentParams ) {

		super( params );

		this.bpm_ = 120;
		this.tracksData_ = [];
		this.reverbLength_ = 1.5;
		this.reverbWet_ = 1;

		this.context_ = null;
		this.generator_ = null;
		this.mixer_ = null;

		this.tracks_ = [];
		this.length_ = 0;
		this.generatedBpm_ = 0;
		this.jobId_ = 0;
		this.outputDirty_ = false;
		this.restartRequested_ = false;
		this.spectrum_ = new Uint8Array( SPECTRUM_FFT_SIZE / 2 );
		this.spectrumTexture_ = null;

		this.field( "bpm", () => this.bpm_, ( v: number ) => this.bpm_ = v, { min: 1 } );

		this.field( "tracks", () => this.tracksData_, ( v: MusicTrackData[] ) => this.tracksData_ = v, {
			format: { type: "array", labels: ( track ) => String( ( track as SerializeFieldValue[] )[ 0 ] ) }
		} );

		const reverb = this.fieldDir( "reverb" );
		reverb.field( "length", () => this.reverbLength_, ( v: number ) => this.reverbLength_ = v, { min: 0.01, step: 0.1 } );
		reverb.field( "wet", () => this.reverbWet_, ( v: number ) => this.reverbWet_ = v, { min: 0, step: 0.1 } );

		// 無効の間は updateImpl が呼ばれないので、無効にした時点で止める
		this.onSelfUpdate_ = ( paths: string[] ) => {

			if ( paths.indexOf( "enabled" ) === - 1 ) return;

			if ( ! this.enabled && this.mixer_ ) {

				this.mixer_.stop();

			}

		};

		this.on( "fields/update", this.onSelfUpdate_ );

		if ( Music.instance ) {

			if ( import.meta.env.DEV ) {

				console.error( "[Music] シーンに Music が2つ以上あります。最初の1つだけを鳴らします" );

			}

			return;

		}

		Music.instance = this;

		const backend = ( this.engine as Engine ).renderer.backend;

		if ( ! ( backend instanceof GLBackend ) ) return;

		this.context_ = getAudioContext();
		this.generator_ = new MusicGenerator( backend );
		this.mixer_ = new MusicMixer( this.context_ );

		// どのシェーダーからも引けるよう、マテリアルでなく全体の uniform に置く（名前は osc Demo4 と同じ）
		const gl = backend.gl;

		this.spectrumTexture_ = new GLP.GLPowerTexture( gl ).setting( {
			type: gl.UNSIGNED_BYTE,
			internalFormat: gl.R8,
			format: gl.RED,
			magFilter: gl.LINEAR,
			minFilter: gl.LINEAR,
		} ).attach( { width: this.spectrum_.length, height: 1, data: this.spectrum_ } );

		( this.engine as Engine ).renderer.globalUniforms.uMusicFreqTex = { value: this.spectrumTexture_, type: '1i' };

	}

	/*-------------------------------
		Update
	-------------------------------*/

	protected updateImpl( event: ComponentUpdateEvent ) {

		const context = this.context_;
		const mixer = this.mixer_;

		if ( ! context || ! mixer ) return;

		// shot・書き出しはタブの再生と関係ない時刻で更新するので、鳴っている音には触れない
		if ( event.offline ) return;

		if ( this.refresh_() ) {

			this.generate();

		}

		if ( this.outputDirty_ ) {

			this.outputDirty_ = false;
			this.emitOutput_( 0, this.length_ );

		}

		if ( ! event.playing ) {

			mixer.stop();

			return;

		}

		// AnalyserNode は今鳴っている音から取るので、停止中は書き換えず最後の値のまま残す
		if ( this.spectrumTexture_ ) {

			mixer.readSpectrum( this.spectrum_ );
			this.spectrumTexture_.subImage( this.spectrum_, this.spectrum_.length, 1 );

		}

		// 利用者の操作で AudioContext が始まるまでは時計が進まず、ずれを測れないので待つ
		if ( context.state !== 'running' ) return;

		const drift = Math.abs( mixer.position - event.timeCode );

		if ( mixer.playing && drift < SYNC_TOLERANCE && ! this.restartRequested_ ) return;

		this.restartRequested_ = false;

		mixer.play( this.trackBuffers_(), event.timeCode );

	}

	// ミキサーのチャンネルと同じ並びの、鳴らすバッファ。鳴らせないトラックは null
	private trackBuffers_() {

		const buffers: ( AudioBuffer | null )[] = [];

		for ( const track of this.tracks_ ) {

			if ( track.program ) {

				buffers.push( track.buffer );

			} else {

				buffers.push( null );

			}

		}

		return buffers;

	}

	/*-------------------------------
		Readout
	-------------------------------*/

	// トラック name で time（event の timeCode）までに鳴り始めた最後のノート。同じ時刻の和音は一番低い音。
	// 見るのは読み込み時に変換したあとのノートで、コードの楽器のトラック・まだ鳴り始めていなければ null
	public lastNote( name: string, time: number ) {

		const track = this.findTrack_( name );

		if ( ! track ) return null;

		return findLastNote( track.notes, time );

	}

	// トラック name で time（event の timeCode）に鳴っている帯。重なった所は実際に鳴っている帯で、帯の外なら null
	public currentClip( name: string, time: number ) {

		const track = this.findTrack_( name );

		if ( ! track ) return null;

		return findCurrentClip( track.clips, track.segments, 60 / this.generatedBpm_, time );

	}

	// 名前のトラックの生成の状態。トラック名は曲の中で重ならない（Music パネルが番号を振る）
	private findTrack_( name: string ) {

		for ( let i = 0; i < this.tracksData_.length; i ++ ) {

			// tracks を差し替えた直後は、次の更新で refresh_ が数を合わせるまで tracks_ が短いことがある
			if ( this.tracksData_[ i ][ 0 ] === name && i < this.tracks_.length ) {

				return this.tracks_[ i ];

			}

		}

		return null;

	}

	/*-------------------------------
		Refresh
	-------------------------------*/

	// 今の設定（曲の長さ・BPM・トラック・楽器のシェーダー）と作った音を突き合わせ、変わったトラックを作り直す対象にする。
	// 作り直すトラックがあれば true。音量・パンはノードの値を書き換えるだけで、作り直さない
	private refresh_(): boolean {

		const context = this.context_;
		const generator = this.generator_;
		const mixer = this.mixer_;

		if ( ! context || ! generator || ! mixer ) return false;

		// timeline/duration の単位は秒×60
		const engine = this.engine as Engine;
		const length = Math.max( 1, Math.ceil( engine.frameSetting.duration / 60 * context.sampleRate ) );

		let resetAll = false;

		if ( length !== this.length_ || this.bpm_ !== this.generatedBpm_ ) {

			this.length_ = length;
			this.generatedBpm_ = this.bpm_;
			resetAll = true;

		}

		let changed = this.syncTrackCount_( mixer );

		mixer.setReverb( this.reverbLength_, this.reverbWet_ );

		const usedShaders = new Set<string>();

		let volumeChanged = false;

		for ( let i = 0; i < this.tracks_.length; i ++ ) {

			const track = this.tracks_[ i ];
			const data = this.tracksData_[ i ];
			const instrumentName = data[ 1 ];
			const instrument = Engine.resources.getLibraryItem<Instrument>( INSTRUMENT_KIND, instrumentName ) || null;

			let shader: string | null = null;

			if ( instrument ) {

				shader = instrument.shader;

			}

			if ( shader !== null ) {

				usedShaders.add( shader );

			}

			let reset = resetAll;

			if ( ! track.buffer || track.buffer.length !== length ) {

				track.buffer = context.createBuffer( 2, length, context.sampleRate );
				track.done = new Uint8Array( Math.ceil( length / BLOCK_SAMPLES ) );
				reset = true;

			}

			if ( instrumentName !== track.instrument || shader !== track.shader ) {

				track.instrument = instrumentName;
				track.shader = shader;
				track.program = null;

				if ( shader === null ) {

					if ( import.meta.env.DEV ) {

						console.error( `[Music] トラック "${data[ 0 ]}" の楽器 "${instrumentName}" がありません` );

					}

				} else {

					track.program = generator.getProgram( instrumentName, shader );

				}

				reset = true;

			}

			if ( this.refreshClips_( track, data ) ) {

				reset = true;

			}

			if ( data[ 2 ] !== track.volume || data[ 3 ] !== track.pan ) {

				// パンは波形表示に反映しないので、送り直すのは音量が変わったときだけ。
				// 波形表示はエディタにしか無く、player では tracks が書き換わらないので入れない
				if ( import.meta.env.DEV && data[ 2 ] !== track.volume ) volumeChanged = true;

				track.volume = data[ 2 ];
				track.pan = data[ 3 ];
				mixer.setChannel( i, track.volume, track.pan );

				// 黙らせているトラックは、下で入れ直した音量を 0 に戻す
				if ( import.meta.env.DEV ) track.silent = undefined;

			}

			// ミュート・ソロは音量のノードに 0 を入れるだけで、生成も波形表示（track.volume）も変えない
			if ( import.meta.env.DEV && Music.monitor ) {

				const silent = ! isTrackAudible( Music.monitor, this.tracksData_, data[ 0 ] );

				if ( silent !== track.silent ) {

					track.silent = silent;

					if ( silent ) {

						mixer.setChannel( i, 0, track.pan );

					} else {

						mixer.setChannel( i, track.volume, track.pan );

					}

				}

			}

			if ( reset ) {

				this.refreshNotes_( track, instrument );
				this.resetTrack_( track );
				changed = true;

			}

		}

		generator.releaseUnused( usedShaders );

		// サンプルは変わっていないので範囲を空にして送る（Music パネルに帯ごとの波形の素を読み直させない）
		if ( volumeChanged ) this.emitOutput_( 0, 0 );

		return changed;

	}

	// トラックの帯が変わったら区間を切り直す。作り直すなら true（コンパイルはし直さない）
	private refreshClips_( track: MusicTrack, data: MusicTrackData ): boolean {

		let clipsData = data[ 4 ];

		if ( ! clipsData ) {

			clipsData = NO_CLIPS;

		}

		// 編集は tracks を差し替えるので、ふだんは配列が同じかどうかだけを見る
		if ( clipsData === track.clipsData ) return false;

		track.clipsData = clipsData;

		// エディタでは、中身が同じ配列への差し替え（undo・シーン CLI の set・ほかのトラックの編集）で作り直さない。
		// player では tracks が書き換わらない（差し替わるのは読み込みの1回だけ）ので、比べる処理ごと入れない
		if ( import.meta.env.DEV ) {

			const clipsKey = JSON.stringify( clipsData );

			if ( clipsKey === track.clipsKey ) return false;

			track.clipsKey = clipsKey;

		}

		track.clips = decodeClips( clipsData );
		track.segments = resolveClipSegments( track.clips );

		return true;

	}

	// ノートの楽器なら、帯のノートを変換して生成用のテクスチャに入れ直す（コンパイルはし直さない）。
	// 帯・楽器・BPM・曲の長さのどれかが変わって作り直すときに呼ぶ
	private refreshNotes_( track: MusicTrack, instrument: Instrument | null ) {

		const generator = this.generator_;

		track.notes = [];

		if ( ! generator || ! track.program || ! instrument || instrumentSoundKind( instrument.shader ) !== 'note' ) {

			this.disposeNoteTexture_( track );

			return;

		}

		let maxNotes = 1;

		if ( instrument.maxNotes ) maxNotes = instrument.maxNotes;

		let release = 0;

		if ( instrument.release ) release = instrument.release;

		track.notes = resolveNotes( track.clips, track.segments, 60 / this.generatedBpm_, release, maxNotes );

		if ( ! track.noteTexture ) {

			track.noteTexture = generator.createNoteTexture();

		}

		generator.updateNotes( track.noteTexture, track.notes, maxNotes );

	}

	private disposeNoteTexture_( track: MusicTrack ) {

		if ( track.noteTexture ) {

			track.noteTexture.dispose();
			track.noteTexture = null;

		}

	}

	// トラックの数を tracks に合わせる。増減したら true
	private syncTrackCount_( mixer: MusicMixer ): boolean {

		const count = this.tracksData_.length;

		if ( this.tracks_.length === count ) return false;

		while ( this.tracks_.length > count ) {

			this.disposeNoteTexture_( this.tracks_.pop()! );

		}

		while ( this.tracks_.length < count ) {

			this.tracks_.push( {
				instrument: null,
				shader: null,
				program: null,
				buffer: null,
				done: new Uint8Array( 0 ),
				volume: NaN,
				pan: NaN,
				clipsData: null,
				clipsKey: '',
				clips: [],
				segments: [],
				notes: [],
				noteTexture: null,
			} );

		}

		mixer.setChannelCount( count );

		this.outputDirty_ = true;
		this.restartRequested_ = true;

		return true;

	}

	// トラックを作り直す対象にする。鳴らせないトラックは無音にして作り終えた扱いにする
	private resetTrack_( track: MusicTrack ) {

		if ( track.program ) {

			track.done.fill( 0 );

			return;

		}

		if ( track.buffer ) {

			track.buffer.getChannelData( 0 ).fill( 0 );
			track.buffer.getChannelData( 1 ).fill( 0 );

		}

		track.done.fill( 1 );

		this.outputDirty_ = true;
		this.restartRequested_ = true;

	}

	/*-------------------------------
		Generate
	-------------------------------*/

	// 作り終えていないかたまりを作る。再生位置のかたまりから前後へ交互に作るので、エディタでは聞いている所から鳴り直す。
	// player の読み込みでは再生位置が 0 なので頭から順に作る。次の作り直しが始まると、前の生成は途中で止まる
	public async generate( onProgress?: ( done: number, total: number ) => void ) {

		const context = this.context_;
		const generator = this.generator_;
		const mixer = this.mixer_;

		if ( ! context || ! generator || ! mixer ) return;

		this.refresh_();

		this.jobId_ ++;
		const jobId = this.jobId_;

		const blockCount = Math.ceil( this.length_ / BLOCK_SAMPLES );
		const startBlock = Math.floor( ( this.engine as Engine ).time.code * context.sampleRate / BLOCK_SAMPLES );

		let total = 0;

		for ( const track of this.tracks_ ) {

			for ( let block = 0; block < blockCount; block ++ ) {

				if ( track.program && ! track.done[ block ] ) total ++;

			}

		}

		let done = 0;

		if ( onProgress ) onProgress( done, total );

		let lastYield = performance.now();

		for ( const block of blockOrder( startBlock, blockCount ) ) {

			let rendered = false;

			for ( const track of this.tracks_ ) {

				if ( ! track.program || ! track.buffer || track.done[ block ] ) continue;

				generator.render( track.program, track.buffer, block * BLOCK_SAMPLES, this.generatedBpm_, track.segments, track.clips, track.noteTexture );
				track.done[ block ] = 1;
				rendered = true;

				done ++;

				if ( onProgress ) onProgress( done, total );

				if ( performance.now() - lastYield > YIELD_INTERVAL ) {

					await nextTask();

					// 待っている間に作り直しが始まったか、Music が消えた
					if ( jobId !== this.jobId_ ) return;

					lastYield = performance.now();

				}

			}

			if ( ! rendered ) continue;

			this.emitOutput_( block * BLOCK_SAMPLES, Math.min( this.length_, ( block + 1 ) * BLOCK_SAMPLES ) );

			// 今鳴っているかたまりと次のかたまりは、できたらすぐ聞こえるように張り直す
			const playingBlock = Math.floor( mixer.position * context.sampleRate / BLOCK_SAMPLES );

			if ( mixer.playing && ( block === playingBlock || block === playingBlock + 1 ) ) {

				this.restartRequested_ = true;

			}

		}

		// 先のかたまりは鳴らし始めた後にできていることがあるので、作り終えたら張り直す
		if ( mixer.playing && done > 0 ) {

			this.restartRequested_ = true;

		}

	}

	/*-------------------------------
		Output
	-------------------------------*/

	private emitOutput_( start: number, end: number ) {

		const context = this.context_;

		if ( ! context ) return;

		const tracks: MusicOutput[ 'tracks' ] = [];

		for ( const track of this.tracks_ ) {

			tracks.push( { buffer: track.buffer, volume: track.volume } );

		}

		const output: MusicOutput = { sampleRate: context.sampleRate, length: this.length_, tracks, start, end };

		( this.engine as Engine ).emit( "update/music", [ output ] );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		super.dispose();

		this.off( "fields/update", this.onSelfUpdate_ );

		// 走っている生成を止める
		this.jobId_ ++;

		for ( const track of this.tracks_ ) {

			this.disposeNoteTexture_( track );

		}

		if ( this.mixer_ ) {

			this.mixer_.dispose();
			this.mixer_ = null;

		}

		if ( this.generator_ ) {

			this.generator_.dispose();
			this.generator_ = null;

		}

		this.context_ = null;

		if ( this.spectrumTexture_ ) {

			delete ( this.engine as Engine ).renderer.globalUniforms.uMusicFreqTex;

			this.spectrumTexture_.dispose();
			this.spectrumTexture_ = null;

		}

		if ( Music.instance === this ) {

			Music.instance = null;

			// エディタの波形表示を消す
			( this.engine as Engine ).emit( "update/music", [ null ] );

		}

	}

}

// 初期化演算子を使うと terser に消されるのでこっちで初期化（Engine.resources と同じ）
Music.instance = null;
