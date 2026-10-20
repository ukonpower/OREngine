import * as GLP from 'glpower';
import { Component, ComponentParams, ComponentUpdateEvent, GLBackend, SerializeFieldValue } from 'maxpower';
import { Engine } from 'orengine';

import { BLOCK_SAMPLES, MusicGenerator } from './generator';
import { INSTRUMENT_HOT_EVENT, INSTRUMENT_KIND, Instrument, MusicTrackData } from './instrument';
import { MusicMixer } from './mixer';

// update/music で Engine から出す、生成したトラックの音。エディタの波形表示が音量を掛けて足した1本を作る
export type MusicOutput = {
	sampleRate: number;
	length: number;
	tracks: { buffer: AudioBuffer, volume: number }[];
	// 前に出したときから中身が変わったサンプルの範囲 [start, end)
	start: number;
	end: number;
};

// 鳴っている音とタイムラインの時刻がこれ以上（秒）ずれたら、今の時刻から張り直す。シーク・ループもこのずれで拾う
const SYNC_TOLERANCE = 0.1;

// 生成の途中で描画を譲る間隔（ミリ秒）。エディタの画面と player の進捗バーが止まらない程度にまとめて作る
const YIELD_INTERVAL = 8;

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
const getAudioContext = () => {

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
	// 生成を通らない変化（音量・トラックの増減・無音にしたトラック）で、波形表示へ曲全体を送り直す
	private outputDirty_: boolean;
	// 次の更新で source を張り直す。作ったかたまりを鳴らすには source を作り直す必要がある
	// （AudioBufferSourceNode は再生中の buffer の書き換えを拾うとは限らない）
	private restartRequested_: boolean;

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

		for ( let i = 0; i < this.tracks_.length; i ++ ) {

			const track = this.tracks_[ i ];
			const data = this.tracksData_[ i ];
			const instrumentName = data[ 1 ];
			const shader = this.findShader_( instrumentName );

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

			if ( data[ 2 ] !== track.volume || data[ 3 ] !== track.pan ) {

				track.volume = data[ 2 ];
				track.pan = data[ 3 ];
				mixer.setChannel( i, track.volume, track.pan );
				this.outputDirty_ = true;

			}

			if ( reset ) {

				this.resetTrack_( track );
				changed = true;

			}

		}

		generator.releaseUnused( usedShaders );

		return changed;

	}

	// トラックの数を tracks に合わせる。増減したら true
	private syncTrackCount_( mixer: MusicMixer ): boolean {

		const count = this.tracksData_.length;

		if ( this.tracks_.length === count ) return false;

		while ( this.tracks_.length > count ) {

			this.tracks_.pop();

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
			} );

		}

		mixer.setChannelCount( count );

		this.outputDirty_ = true;
		this.restartRequested_ = true;

		return true;

	}

	private findShader_( instrumentName: string ): string | null {

		const instrument = Engine.resources.getLibraryItem<Instrument>( INSTRUMENT_KIND, instrumentName );

		if ( ! instrument ) return null;

		return instrument.shader;

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

				generator.render( track.program, track.buffer, block * BLOCK_SAMPLES, this.generatedBpm_ );
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

			if ( track.buffer ) {

				tracks.push( { buffer: track.buffer, volume: track.volume } );

			}

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

		if ( this.mixer_ ) {

			this.mixer_.dispose();
			this.mixer_ = null;

		}

		if ( this.generator_ ) {

			this.generator_.dispose();
			this.generator_ = null;

		}

		this.context_ = null;

		if ( Music.instance === this ) {

			Music.instance = null;

			// エディタの波形表示を消す
			( this.engine as Engine ).emit( "update/music", [ null ] );

		}

	}

}

// 初期化演算子を使うと terser に消されるのでこっちで初期化（Engine.resources と同じ）
Music.instance = null;
