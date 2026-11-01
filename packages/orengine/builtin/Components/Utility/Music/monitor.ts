import type { MusicTrackData } from './instrument';

// エディタの Music パネルのミュート・ソロとメトロノーム。editor.json の music/mute・music/solo・music/metronome に保存する。
// 聴き比べのための状態なので、シーンには持たず player では読まない
export type MusicMonitor = {
	// トラック名の並び
	mute: string[];
	solo: string[];
	metronome: boolean;
};

// トラック name を鳴らすか。ミュートしていれば鳴らさず、曲の中にソロのトラックがあればソロのトラックだけを鳴らす。
// 今の曲に無い名前のソロは数えない（消した・別のシーンのトラックのソロが残っていても、全部が黙らないように）
export const isTrackAudible = ( monitor: Pick<MusicMonitor, 'mute' | 'solo'>, tracks: MusicTrackData[], name: string ) => {

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
