// 帯を動かしたときに、作り終えた音を新しい位置へ移す。エディタの Music だけが使う（player では帯が変わらない）。
// 楽器は帯の中の拍と帯の数値だけで書く（music.module.glsl の Song に曲の頭からの時刻が無い）ので、
// 同じ中身の帯の、帯の中の同じ拍は、どこに置いても同じ音になる
import { BLOCK_SAMPLES } from './generator';
import { CLIP_PARAM_COUNT } from './instrument';

import type { MusicClip, MusicSegment } from './clips';

// サンプルの範囲 [start, end)
export type SampleRange = {
	start: number;
	end: number;
};

// 前の音の from サンプル目から length 個を、to サンプル目へ写す
export type SampleCopy = {
	from: number;
	to: number;
	length: number;
};

export type ClipMovePlan = {
	// 先に読んでおき、clear のあとで書く
	copies: SampleCopy[];
	// 書く前に無音にする範囲（前に鳴っていて今は鳴らない所と、写す・作り直す所）
	clear: SampleRange[];
	// 写せる音が無く、作り直す範囲
	missing: SampleRange[];
};

// 帯の中身の文字列。同じ文字列の帯は、帯の中の同じ拍で同じ音を出す。
// 数値は書かなかったものを 0 とみなすので、[ 1 ] と [ 1, 0 ] を同じにする
export const clipSoundKey = ( clip: MusicClip ) => {

	const params: number[] = [];

	for ( let i = 0; i < CLIP_PARAM_COUNT; i ++ ) {

		params.push( clip.params[ i ] || 0 );

	}

	return JSON.stringify( [ params, clip.notes ] );

};

// 区間の並びと、その帯の中身の文字列（区間の clip の番号で引く）
export type ClipLayout = {
	segments: MusicSegment[];
	keys: string[];
};

type MoveOptions = {
	// 曲の頭からの拍 → サンプルの番号。generator.ts の render と同じ丸めにする（継ぎ目が作り直したときと揃うように）
	toSample: ( beat: number ) => number;
	samplesPerBeat: number;
	// 前の音のその範囲を作り終えているか
	isReady: ( range: SampleRange ) => boolean;
	// ノートの楽器は区間の頭より前に始まったノートを落とし、区間の終わりでノートの長さを切るので、
	// 区間の中の一部だけを写すと音が変わる。帯の中の範囲がまったく同じ区間からだけ写す
	wholeSegments: boolean;
};

// 前の区間の並び（prev）で作った音から、今の区間の並び（next）の音を作る段取りを決める
export const planClipMove = ( prev: ClipLayout, next: ClipLayout, options: MoveOptions ): ClipMovePlan => {

	const copies: SampleCopy[] = [];
	const missing: SampleRange[] = [];
	// 前と同じ位置に同じ音があり、触らなくてよい範囲
	const kept: SampleRange[] = [];
	// 写す・作り直す範囲
	const written: SampleRange[] = [];

	for ( const segment of next.segments ) {

		const key = next.keys[ segment.clip ];

		// まだ音の決まっていない、帯の中の拍の範囲
		let rest: SampleRange[] = [ { start: segment.clipBeat, end: segment.clipBeat + segment.end - segment.start } ];

		// 同じ位置にある音を先に使う（写さずに済むので）
		for ( const inPlace of [ true, false ] ) {

			for ( const source of prev.segments ) {

				if ( prev.keys[ source.clip ] !== key ) continue;

				if ( options.wholeSegments && ! isSameRange( source, segment ) ) continue;

				// 帯の中の拍 b は、今は segment.start + b - segment.clipBeat に、前は source.start + b - source.clipBeat にある
				const shiftBeats = ( segment.start - segment.clipBeat ) - ( source.start - source.clipBeat );
				const shift = Math.round( shiftBeats * options.samplesPerBeat );

				if ( ( shift === 0 ) !== inPlace ) continue;

				const sourceFrom = source.clipBeat;
				const sourceTo = source.clipBeat + source.end - source.start;
				const nextRest: SampleRange[] = [];

				for ( const range of rest ) {

					const from = Math.max( range.start, sourceFrom );
					const to = Math.min( range.end, sourceTo );

					if ( to <= from ) {

						nextRest.push( range );

						continue;

					}

					// 継ぎ目は今の区間の拍から丸めるので、隣り合う範囲どうしに隙間も重なりもできない
					const dest = {
						start: options.toSample( segment.start + from - segment.clipBeat ),
						end: options.toSample( segment.start + to - segment.clipBeat ),
					};

					if ( ! options.isReady( { start: dest.start - shift, end: dest.end - shift } ) ) {

						nextRest.push( range );

						continue;

					}

					if ( shift === 0 ) {

						kept.push( dest );

					} else {

						copies.push( { from: dest.start - shift, to: dest.start, length: dest.end - dest.start } );
						written.push( dest );

					}

					if ( range.start < from ) nextRest.push( { start: range.start, end: from } );
					if ( to < range.end ) nextRest.push( { start: to, end: range.end } );

				}

				rest = nextRest;

			}

		}

		for ( const range of rest ) {

			const dest = {
				start: options.toSample( segment.start + range.start - segment.clipBeat ),
				end: options.toSample( segment.start + range.end - segment.clipBeat ),
			};

			if ( dest.end <= dest.start ) continue;

			missing.push( dest );
			written.push( dest );

		}

	}

	const touched: SampleRange[] = [];

	for ( const segment of prev.segments ) {

		touched.push( { start: options.toSample( segment.start ), end: options.toSample( segment.end ) } );

	}

	for ( const range of written ) {

		touched.push( range );

	}

	const clear = subtractRanges( mergeRanges( touched ), mergeRanges( kept ) );

	return { copies, clear, missing: mergeRanges( missing ) };

};

// 帯の並びと、それを切った区間
type ClipState = {
	clips: MusicClip[];
	segments: MusicSegment[];
};

// 帯だけが変わったトラックで、前の帯（prev）で作り終えた音を今の帯（next）の位置へ移す。
// done はかたまりごとに作り終えたか（Music の MusicTrack.done）で、移せる音の無い所のかたまりを作り直す対象に戻す。
// changed は書き換えたサンプルの範囲、missing は作り直す所が残ったか
export const moveClipSounds = ( buffer: AudioBuffer, done: Uint8Array, prev: ClipState, next: ClipState, bpm: number, wholeSegments: boolean ) => {

	const beatSec = 60 / bpm;
	const sampleRate = buffer.sampleRate;

	const isReady = ( range: SampleRange ) => {

		if ( range.start < 0 || range.end > buffer.length ) return false;

		for ( let block = Math.floor( range.start / BLOCK_SAMPLES ); block * BLOCK_SAMPLES < range.end; block ++ ) {

			if ( ! done[ block ] ) return false;

		}

		return true;

	};

	const plan = planClipMove( clipLayout( prev ), clipLayout( next ), {
		// generator.ts の render と同じ式で丸める
		toSample: ( beat ) => Math.round( beat * beatSec * sampleRate ),
		samplesPerBeat: beatSec * sampleRate,
		isReady,
		wholeSegments,
	} );

	const left = buffer.getChannelData( 0 );
	const right = buffer.getChannelData( 1 );

	// 写す元が clear で消える・ほかの写し先で上書きされることがあるので、先に全部読んでおく
	const saved: Float32Array[][] = [];

	for ( const copy of plan.copies ) {

		saved.push( [ left.slice( copy.from, copy.from + copy.length ), right.slice( copy.from, copy.from + copy.length ) ] );

	}

	const changed: SampleRange[] = [];

	for ( const range of plan.clear ) {

		left.fill( 0, range.start, range.end );
		right.fill( 0, range.start, range.end );

		changed.push( range );

	}

	for ( let i = 0; i < plan.copies.length; i ++ ) {

		const copy = plan.copies[ i ];

		// 曲の終わりより後ろに置いた帯の音は入れ物に入らない
		const length = Math.min( copy.length, buffer.length - copy.to );

		if ( length <= 0 ) continue;

		left.set( saved[ i ][ 0 ].subarray( 0, length ), copy.to );
		right.set( saved[ i ][ 1 ].subarray( 0, length ), copy.to );

		changed.push( { start: copy.to, end: copy.to + length } );

	}

	for ( const range of plan.missing ) {

		for ( let block = Math.floor( range.start / BLOCK_SAMPLES ); block * BLOCK_SAMPLES < range.end && block < done.length; block ++ ) {

			done[ block ] = 0;

		}

	}

	// 帯は曲の終わりより後ろにも置けるので、入れ物の中に収める
	const clamped: SampleRange[] = [];

	for ( const range of mergeRanges( changed ) ) {

		const start = Math.max( 0, range.start );
		const end = Math.min( buffer.length, range.end );

		if ( start < end ) clamped.push( { start, end } );

	}

	return { changed: clamped, missing: plan.missing.length > 0 };

};

const clipLayout = ( state: ClipState ): ClipLayout => {

	const keys: string[] = [];

	for ( const clip of state.clips ) {

		keys.push( clipSoundKey( clip ) );

	}

	return { segments: state.segments, keys };

};

// 2つの区間の、帯の中の拍の範囲が同じか
const isSameRange = ( a: MusicSegment, b: MusicSegment ) => {

	if ( Math.abs( a.clipBeat - b.clipBeat ) > 1e-9 ) return false;

	return Math.abs( ( a.end - a.start ) - ( b.end - b.start ) ) <= 1e-9;

};

/*-------------------------------
	Ranges
-------------------------------*/

// 範囲を開始の順に並べ、重なり・接する範囲をまとめる。空の範囲は落とす
export const mergeRanges = ( ranges: SampleRange[] ): SampleRange[] => {

	const sorted: SampleRange[] = [];

	for ( const range of ranges ) {

		if ( range.end > range.start ) sorted.push( { start: range.start, end: range.end } );

	}

	sorted.sort( ( a, b ) => a.start - b.start );

	const merged: SampleRange[] = [];

	for ( const range of sorted ) {

		const last = merged[ merged.length - 1 ];

		if ( last && range.start <= last.end ) {

			last.end = Math.max( last.end, range.end );

		} else {

			merged.push( range );

		}

	}

	return merged;

};

// ranges から remove を除いた範囲。どちらも mergeRanges でまとめたもの
const subtractRanges = ( ranges: SampleRange[], remove: SampleRange[] ): SampleRange[] => {

	const result: SampleRange[] = [];

	for ( const range of ranges ) {

		let start = range.start;

		for ( const cut of remove ) {

			if ( cut.end <= start || cut.start >= range.end ) continue;

			if ( cut.start > start ) result.push( { start, end: cut.start } );

			start = Math.max( start, cut.end );

		}

		if ( start < range.end ) result.push( { start, end: range.end } );

	}

	return result;

};
