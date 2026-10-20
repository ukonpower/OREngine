import * as GLP from 'glpower';
import { GLBackend, shaderParse } from 'maxpower';

// 1回の描画で作るサンプルの数（48kHz で約 2.7 秒）。エディタでは1かたまりごとに描画を譲り、再生位置の近くから作る。
// 1回の描画を大きくしすぎると、重い楽器で GPU の処理が長引いて画面が止まる
export const BLOCK_SAMPLES = 512 * 256;

// transform feedback で書き出す varying の名前。music.module.glsl の out と一致させる
const VARYINGS = [ 'o_left', 'o_right' ];

// 生成ではラスタライズしない（RASTERIZER_DISCARD）ので、フラグメントシェーダーは中身を持たない
const FRAGMENT_SHADER = 'void main(){}';

// 楽器の完成形のシェーダーが、trackSound / noteSound のどちらを定義しているか。
// 呼び出し（main の `trackSound( s )`）は返り値の型が前に付かないので、`vec2 trackSound(` で定義だけを拾える
const definesFunction = ( shader: string, name: string ) => {

	return new RegExp( `vec2\\s+${name}\\s*\\(` ).test( shader );

};

// 楽器のシェーダーから曲のサンプルを transform feedback で作る。シェーダーは中身ごとに1つコンパイルして使い回す
export class MusicGenerator {

	private backend_: GLBackend;
	private gl_: WebGL2RenderingContext;
	// 全楽器で共有する、かたまりの中のサンプルの番号（aIndex）
	private indexBuffer_: GLP.GLPowerBuffer;
	private leftBuffer_: GLP.GLPowerBuffer;
	private rightBuffer_: GLP.GLPowerBuffer;
	private transformFeedback_: GLP.GLPowerTransformFeedback;
	private left_: Float32Array<ArrayBuffer>;
	private right_: Float32Array<ArrayBuffer>;
	// シェーダー → コンパイルしたもの。作れなかったシェーダーは null を持ち、同じものを作り直さない
	private programs_: Map<string, GLP.GLPowerProgram | null>;

	constructor( backend: GLBackend ) {

		this.backend_ = backend;
		this.gl_ = backend.gl;

		const indices = new Float32Array( BLOCK_SAMPLES );

		for ( let i = 0; i < BLOCK_SAMPLES; i ++ ) {

			indices[ i ] = i;

		}

		this.indexBuffer_ = new GLP.GLPowerBuffer( this.gl_ ).setData( indices );
		this.leftBuffer_ = new GLP.GLPowerBuffer( this.gl_ ).setData( new Float32Array( BLOCK_SAMPLES ), 'vbo', this.gl_.DYNAMIC_COPY );
		this.rightBuffer_ = new GLP.GLPowerBuffer( this.gl_ ).setData( new Float32Array( BLOCK_SAMPLES ), 'vbo', this.gl_.DYNAMIC_COPY );

		this.transformFeedback_ = new GLP.GLPowerTransformFeedback( this.gl_ );
		this.transformFeedback_.setBuffer( 'left', this.leftBuffer_, 0 );
		this.transformFeedback_.setBuffer( 'right', this.rightBuffer_, 1 );

		this.left_ = new Float32Array( BLOCK_SAMPLES );
		this.right_ = new Float32Array( BLOCK_SAMPLES );

		this.programs_ = new Map();

	}

	// 楽器のシェーダーをコンパイルしたものを返す。鳴らせない楽器は console.error を出して null を返す（そのトラックは無音にする）。
	// エラーは楽器の作者向けなのでエディタ（dev）でだけ出し、player に文言を入れない（Cloner の警告と同じ）
	public getProgram( instrumentName: string, shader: string ): GLP.GLPowerProgram | null {

		const cached = this.programs_.get( shader );

		if ( cached !== undefined ) return cached;

		const program = this.compile_( instrumentName, shader );

		this.programs_.set( shader, program );

		return program;

	}

	private compile_( instrumentName: string, shader: string ): GLP.GLPowerProgram | null {

		const hasNoteSound = definesFunction( shader, 'noteSound' );
		const hasTrackSound = definesFunction( shader, 'trackSound' );

		if ( hasNoteSound && hasTrackSound ) {

			if ( import.meta.env.DEV ) {

				console.error( `[Music] 楽器 "${instrumentName}" の .glsl に noteSound と trackSound の両方があります。どちらか一方だけを書きます` );

			}

			return null;

		}

		if ( ! hasNoteSound && ! hasTrackSound ) {

			if ( import.meta.env.DEV ) {

				console.error( `[Music] 楽器 "${instrumentName}" の .glsl に noteSound も trackSound もありません` );

			}

			return null;

		}

		if ( hasNoteSound ) {

			if ( import.meta.env.DEV ) {

				console.error( `[Music] 楽器 "${instrumentName}" は noteSound の楽器です。ノートのトラックはまだ鳴らせないので無音にします` );

			}

			return null;

		}

		const program = this.backend_.createProgram();

		// エディタの errors（シーン CLI）・scene-shots にコンパイルエラーが楽器の名前で出るように
		program.name = `Music/${instrumentName}`;

		// setShader はコンパイルに失敗すると undefined を返し、リンクの失敗は返り値に出ない
		const compiled = program.setShader( shaderParse( shader ), shaderParse( FRAGMENT_SHADER ), { transformFeedbackVaryings: VARYINGS } );
		const glProgram = program.getProgram();

		let linked = false;

		if ( compiled && glProgram ) {

			linked = this.gl_.getProgramParameter( glProgram, this.gl_.LINK_STATUS );

		}

		if ( ! linked ) {

			if ( import.meta.env.DEV ) {

				console.error( `[Music] 楽器 "${instrumentName}" のシェーダーをコンパイルできませんでした` );

			}

			program.dispose();

			return null;

		}

		const vao = program.getVAO();

		if ( vao ) {

			vao.setAttribute( 'aIndex', this.indexBuffer_, 1 );

		}

		return program;

	}

	// 使っているシェーダー以外のコンパイル結果を捨てる（楽器の .glsl を保存するたびに古いものが残らないように）
	public releaseUnused( usedShaders: Set<string> ) {

		for ( const [ shader, program ] of this.programs_ ) {

			if ( usedShaders.has( shader ) ) continue;

			if ( program ) {

				program.dispose();

			}

			this.programs_.delete( shader );

		}

	}

	// out の start サンプル目から1かたまり（曲の終わりまでならそこまで）を作って書き込む
	public render( program: GLP.GLPowerProgram, out: AudioBuffer, start: number, bpm: number ) {

		const vao = program.getVAO();

		if ( ! vao ) return;

		program.setUniform( 'uBlockTime', '1f', [ start / out.sampleRate ] );
		program.setUniform( 'uSampleRate', '1f', [ out.sampleRate ] );
		program.setUniform( 'uBPM', '1f', [ bpm ] );

		program.use( () => {

			program.uploadUniforms();
			this.transformFeedback_.dispatchPoints( vao );

		} );

		this.leftBuffer_.read( this.left_ );
		this.rightBuffer_.read( this.right_ );

		const count = Math.min( BLOCK_SAMPLES, out.length - start );

		out.copyToChannel( this.left_.subarray( 0, count ), 0, start );
		out.copyToChannel( this.right_.subarray( 0, count ), 1, start );

	}

	public dispose() {

		this.releaseUnused( new Set() );

		this.indexBuffer_.dispose();
		this.leftBuffer_.dispose();
		this.rightBuffer_.dispose();

	}

}
