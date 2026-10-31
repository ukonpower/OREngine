import type { MusicTrackData } from './instrument';

// エディタの Music パネルのミュート・ソロ。どちらもトラック名の並びで、editor.json の music/mute・music/solo に保存する。
// 聴き比べのための状態なので、シーンには持たず player では読まない
export type MusicMonitor = {
	mute: string[];
	solo: string[];
};

// トラック name を鳴らすか。ミュートしていれば鳴らさず、曲の中にソロのトラックがあればソロのトラックだけを鳴らす。
// 今の曲に無い名前のソロは数えない（消した・別のシーンのトラックのソロが残っていても、全部が黙らないように）
export const isTrackAudible = ( monitor: MusicMonitor, tracks: MusicTrackData[], name: string ) => {

	if ( monitor.mute.includes( name ) ) return false;

	let soloing = false;

	for ( const track of tracks ) {

		if ( monitor.solo.includes( track[ 0 ] ) ) {

			soloing = true;
			break;

		}

	}

	if ( ! soloing ) return true;

	return monitor.solo.includes( name );

};
