import { storyEditorData, storyEmptyScene, storyScene } from './scene';

import type { OREditorFixture } from '../decorators/withOREditor';

// Timeline のビューポートは読み込み時に [ 0, duration ] へ合わされるので、
// duration と fps を変えるとグリッド間隔と目盛りのラベルがまとめて変わる
const scene = ( duration: number, fps: number, empty = false ) => ( {
	...( empty ? storyEmptyScene : storyScene ),
	'timeline/duration': duration,
	'timeline/fps': fps,
} );

let musicBuffer: AudioBuffer | null = null;

// 波形表示用の合成音源。0.5秒ごとの減衰と後半に向かう盛り上がりで起伏を作る
const getMusicBuffer = ( seconds: number ) => {

	if ( musicBuffer ) return musicBuffer;

	const sampleRate = 44100;
	const length = Math.floor( seconds * sampleRate );
	const buffer = new OfflineAudioContext( 1, length, sampleRate ).createBuffer( 1, length, sampleRate );
	const data = buffer.getChannelData( 0 );

	for ( let i = 0; i < length; i ++ ) {

		const t = i / sampleRate;
		const beat = ( t % 0.5 ) / 0.5;
		const envelope = Math.pow( 1 - beat, 3 ) * ( 0.3 + 0.7 * ( t / seconds ) );

		data[ i ] = Math.sin( t * Math.PI * 2 * 220 ) * envelope;

	}

	musicBuffer = buffer;

	return buffer;

};

export const timelineDefault: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
};

export const timelineMinimal: OREditorFixture = {
	scene: scene( 60, 30, true ),
	editorData: storyEditorData,
};

export const timelineLongDuration: OREditorFixture = {
	scene: scene( 7200, 60 ),
	editorData: storyEditorData,
};

export const timelineSeeked: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
	setup: ( editor ) => editor.engine.seek( 300 ),
};

export const timelineLoopRange: OREditorFixture = {
	scene: storyScene,
	editorData: {
		...storyEditorData,
		'frameLoop/enabled': true,
		'frameLoop/start': 150,
		'frameLoop/end': 450,
	},
	setup: ( editor ) => editor.engine.seek( 300 ),
};

export const timelineWithMusic: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
	// Editor は engine の "update/music" を購読して波形の元データを受け取る
	setup: ( editor ) => editor.engine.emit( 'update/music', [ getMusicBuffer( 10 ) ] ),
};

export const timelinePlaying: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
	setup: ( editor ) => editor.engine.play(),
};
