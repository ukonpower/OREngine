import { cameraEntity, storyEditorData, storyEmptyScene } from './scene';

import type { MusicOutput } from '../../packages/orengine/builtin/Components/Utility/Music';
import type { OREditorFixture } from '../decorators/withOREditor';
import type { OREngineProjectData } from 'orengine';

// 波形表示用の合成音源（2ch）。拍ごとの減衰と後半に向かう盛り上がりで起伏を作る。period は減衰の周期（秒）
const createTrackBuffer = ( seconds: number, period: number, frequency: number ) => {

	const sampleRate = 44100;
	const length = Math.floor( seconds * sampleRate );
	const buffer = new OfflineAudioContext( 2, length, sampleRate ).createBuffer( 2, length, sampleRate );

	for ( let channel = 0; channel < 2; channel ++ ) {

		const data = buffer.getChannelData( channel );

		for ( let i = 0; i < length; i ++ ) {

			const t = i / sampleRate;
			const phase = ( t % period ) / period;
			const envelope = Math.pow( 1 - phase, 3 ) * ( 0.3 + 0.7 * ( t / seconds ) );

			data[ i ] = Math.sin( t * Math.PI * 2 * frequency ) * envelope;

		}

	}

	return buffer;

};

// Music が update/music で出す形（MusicOutput）の合成音源。トラックごとに減衰の周期を変える。
// 最初のトラックは Timeline の WithMusic の波形（0.5 秒ごとの減衰・220Hz）になる
export const createMusicOutput = ( seconds: number, trackCount: number ): MusicOutput => {

	const tracks: MusicOutput[ 'tracks' ] = [];

	for ( let i = 0; i < trackCount; i ++ ) {

		tracks.push( { buffer: createTrackBuffer( seconds, 0.5 / ( i + 1 ), 220 * ( i + 1 ) ), volume: 1 } );

	}

	const length = tracks[ 0 ].buffer!.length;

	return { sampleRate: 44100, length, tracks, start: 0, end: length };

};

// 32 秒（BPM 100 で 53 拍余り）
const MUSIC_DURATION = 32 * 60;

// ノートの帯（Lead）の中身。1/4 拍ごとに上下するアルペジオを2小節と、強さの違い・帯の終わりより後ろ（鳴らない）のノート
const leadNotes = () => {

	const notes: [ number, number, number, number ][] = [];
	const pattern = [ 0, 4, 7, 12, 7, 4 ];

	for ( let i = 0; i < 32; i ++ ) {

		let delta = 0.25;

		if ( i === 0 ) delta = 0;

		notes.push( [ delta, 0.25, 72 + pattern[ i % pattern.length ], 0.4 + 0.6 * ( ( i % 4 ) / 3 ) ] );

	}

	// 和音（同じ時刻は差分 0）と、帯の終わり（中の時間の 8 拍）より後ろのノート
	notes.push( [ 0.25, 2, 60, 1 ], [ 0, 2, 64, 0.8 ], [ 0, 2, 67, 0.6 ], [ 2, 1, 72, 1 ] );

	return notes;

};

// Music パネル用のシーン。重なった帯（Pad の 8〜16 拍）・頭を削った帯（Arpeggio の 2 つ目）・数値の名前の無い楽器（Metronome）・
// ノートの帯（Lead）を含む
const musicScene: OREngineProjectData = {
	...storyEmptyScene,
	scene: {
		name: 'root',
		uuid: '0',
		childs: [
			cameraEntity,
			{
				name: 'Music',
				uuid: 'sb-music',
				components: [
					{
						name: 'Music',
						uuid: 'sb-music-body',
						props: {
							bpm: 100,
							tracks: [
								[ 'Kick', 'Kick', 1, 0, [[ 0, 16, 0, [ 0, 1 ]], [ 16, 16, 0, [ 0, 0, 1 ]]]],
								[ 'Pad', 'Pad', 1, 0, [[ 0, 32, 0, [ 0.6 ]], [ 8, 8, 0, [ 1 ]]]],
								[ 'Arpeggio', 'Arpeggio', 0.8, - 0.3, [[ 4, 8, 0, [ 1 ]], [ 12, 12, 4, [ 1, 0.5 ]]]],
								[ 'Click', 'Metronome', 0.5, 0, [[ 0, 48, 0 ]]],
								[ 'Lead', 'Lead', 0.8, 0, [[ 16, 8, 0, [ 1 ], leadNotes() ], [ 16, 8, 0, [ 0.5 ], leadNotes() ]]],
							],
						},
					},
				],
			},
		],
	},
	'timeline/duration': MUSIC_DURATION,
	'timeline/fps': 60,
};

export const musicDefault: OREditorFixture = {
	scene: musicScene,
	editorData: storyEditorData,
	setup: ( editor ) => {

		editor.engine.seek( 600 );
		editor.engine.emit( 'update/music', [ createMusicOutput( MUSIC_DURATION / 60, 4 ) ] );

	},
};

// ピアノロール用。Lead の最初の帯を開く（MusicRoll の story が引く）
export const MUSIC_ROLL_TRACK = 4;

export const musicEmpty: OREditorFixture = {
	scene: storyEmptyScene,
	editorData: storyEditorData,
};
