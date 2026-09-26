import { Component, ComponentParams, ComponentUpdateEvent, CurveTable, decodeKeyFrames, FCurve, Serializable, SerializeFieldValue } from 'maxpower';
import { Engine } from 'orengine';

// リンク1本。[ カーブ ID, 倍率, 足し算 ] で、フィールドの値は「カーブの値 × 倍率 + 足し算」
export type AnimationLink = [string, number, number];

// 対象ごとのリンク。エンティティのフィールドはパスのまま（position）、コンポーネントのフィールドは
// <コンポーネント名>:<パス>（Light:intensity）で書く。数値配列は要素ごとにリンクを並べ、null の要素は動かさない
export type AnimationLinks = { [target: string]: AnimationLink | ( AnimationLink | null )[] };

// 前のフレームから「再生で進んだ」とみなす、時刻の差と経過時間の食い違いの許容幅（秒×60）
const PLAY_TOLERANCE = 0.001;

// シーンのカーブの表（engine.curves）を時刻で評価し、リンクしたフィールドへ setField で入れる。
// 関数のフィールドへのリンクはイベントで、再生中に通過したキーの時刻で関数を呼ぶ
export class Animation extends Component {

	private links_: AnimationLinks;
	private linksChanged_: boolean;
	// 前回評価した時刻（秒×60）と表。値は時刻が変わったときと、カーブかリンクが編集されたときだけ入れる。
	// 毎フレーム入れると、エディタで手で変えた値がすぐカーブの値に戻ってしまう
	private frame_: number;
	private curves_: CurveTable | null;
	private fcurves_: Map<string, FCurve>;

	constructor( params: ComponentParams ) {

		super( params );

		// 同じエンティティのほかのコンポーネント（既定は 0）より先に値を入れ、そちらの update が今の時刻の値を読めるようにする。
		// BLidger（0）は後に走るので、Blender 側でカーブのある軸は Blender が勝つ
		this.order = - 1;

		this.links_ = {};
		this.linksChanged_ = false;
		this.frame_ = 0;
		this.curves_ = null;
		this.fcurves_ = new Map();

		this.field( "links", () => this.links_, ( v: AnimationLinks ) => {

			this.links_ = v;
			this.linksChanged_ = true;

		}, { hidden: true } );

	}

	protected updateImpl( event: ComponentUpdateEvent ): void {

		const frame = event.timeCodeFrame;
		const prevFrame = this.frame_;
		const curves = this.engine.curves;

		if ( frame == prevFrame && curves == this.curves_ && ! this.linksChanged_ ) return;

		// 表が差し替わったら（編集・読み込み）カーブを作り直す
		if ( curves != this.curves_ ) {

			this.fcurves_.clear();

		}

		this.frame_ = frame;
		this.curves_ = curves;
		this.linksChanged_ = false;

		// イベントは、前のフレームから再生で進んだぶんだけ時刻が動いたときに呼ぶ。
		// シーク・ループで先頭へ戻る・停止中は、時刻の差が経過時間と合わないので呼ばない
		const advance = frame - prevFrame;
		const played = event.playing && advance > 0 && Math.abs( advance - event.timeDelta * 60 ) < PLAY_TOLERANCE;
		const events: [number, () => void][] = [];

		for ( const target of Object.keys( this.links_ ) ) {

			const link = this.links_[ target ];
			const separator = target.indexOf( ":" );

			let serializable: Serializable | undefined = this.entity;
			let path = target;

			if ( separator >= 0 ) {

				const item = Engine.resources.getComponent( target.slice( 0, separator ) );

				serializable = item && this.entity.getComponent( item.component );
				path = target.slice( separator + 1 );

			}

			// 対象のコンポーネントが外れている・フィールドが無いリンクは、残したまま無視する（付け直すとまた効く）
			if ( ! serializable ) continue;

			const value = serializable.getField( path );

			if ( value === undefined ) continue;

			if ( typeof value == "function" ) {

				if ( played ) {

					this.collectEvents( link as AnimationLink, prevFrame, frame, value, events );

				}

				continue;

			}

			if ( Array.isArray( value ) ) {

				const elementLinks = link as ( AnimationLink | null )[];
				const next = value.slice();

				for ( let i = 0; i < next.length; i ++ ) {

					const elementLink = elementLinks[ i ];

					if ( ! elementLink ) continue;

					const elementValue = this.linkValue( elementLink, frame );

					if ( elementValue !== undefined ) next[ i ] = elementValue;

				}

				serializable.setField( path, next );

				continue;

			}

			const curveValue = this.linkValue( link as AnimationLink, frame );

			if ( curveValue === undefined ) continue;

			let result: SerializeFieldValue = curveValue;

			const opt = serializable.getFieldOpt( path );
			const format = opt && opt.format;

			if ( format && format.type == "select" ) {

				// select は format.list の番号のカーブ
				let list = format.list;

				if ( typeof list == "function" ) list = list();

				const item = list[ curveValue ];

				if ( item === undefined ) continue;

				result = item;

				if ( typeof item == "object" ) result = item.value;

			} else if ( typeof value == "boolean" ) {

				result = curveValue > 0.5;

			}

			serializable.setField( path, result );

		}

		// 1フレームの間に複数あれば時刻順に呼ぶ
		events.sort( ( a, b ) => a[ 0 ] - b[ 0 ] );

		for ( const [ , callback ] of events ) {

			callback();

		}

	}

	// リンク1本の今の値。カーブが表に無い・キーが1つも無いときは undefined
	private linkValue( link: AnimationLink, frame: number ) {

		const curve = this.getCurve( link[ 0 ] );

		if ( ! curve ) return undefined;

		return curve.getValue( frame ) * link[ 1 ] + link[ 2 ];

	}

	// 再生で通過した区間 [ from, to ) にあるイベントのキーを集める。
	// イベントの時刻ちょうどで止めてから再生を始めたときも呼ぶよう、始点を含める
	private collectEvents( link: AnimationLink, from: number, to: number, callback: () => void, events: [number, () => void][] ) {

		const curve = this.getCurve( link[ 0 ] );

		if ( ! curve ) return;

		for ( const keyframe of curve.keyframes ) {

			const time = keyframe.coordinate.x;

			if ( time >= from && time < to ) {

				events.push( [ time, callback ] );

			}

		}

	}

	// カーブ ID から FCurve を引く。表が差し替わるまでは作ったものを使い回す
	private getCurve( id: string ) {

		let curve = this.fcurves_.get( id );

		if ( curve ) return curve;

		const data = this.engine.curves[ id ];

		if ( ! data || data.k.length == 0 ) return undefined;

		curve = new FCurve( decodeKeyFrames( data.k ) );
		this.fcurves_.set( id, curve );

		return curve;

	}

}
