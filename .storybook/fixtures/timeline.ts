import { storyEditorData, storyEmptyScene, storyScene } from './scene';

import type { OREditorFixture } from '../decorators/withOREditor';
import type { OREngineDataEntity, OREngineProjectData } from 'orengine';

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

// キーを打った Cube を選んだ状態。position は要素ごとのカーブ、scale は3要素で1本のカーブを共有する（共有の印と使用数が出る）
const keyFrameChilds: OREngineDataEntity[] = [];

for ( const child of storyScene.scene?.childs || [] ) {

	if ( child.uuid != 'sb-cube' ) {

		keyFrameChilds.push( child );

		continue;

	}

	keyFrameChilds.push( {
		...child,
		components: [
			...( child.components || [] ),
			{
				name: 'Animation',
				uuid: 'sb-cube-animation',
				props: {
					links: {
						position: [[ 'c1', 1, 0 ], [ 'c2', 1, 0 ], [ 'c3', 1, 0 ]],
						scale: [[ 'c4', 1, 0 ], [ 'c4', 1, 0 ], [ 'c4', 1, 0 ]],
					},
				},
			},
		],
	} );

}

const keyFrameScene: OREngineProjectData = {
	...storyScene,
	curves: {
		c1: { k: [[ 2, [ 0, 0, - 40, 0, 40, 0 ]], [ 2, [ 120, 2, 80, 2, 160, 2 ]], [ 2, [ 180, 0, 260, 0, 340, 0 ]]] },
		c2: { k: [[ 0, [ 60, 0 ]], [ 0, [ 240, 3 ]]] },
		c3: { k: [[ 1, [ 120, 0 ]], [ 1, [ 180, 1 ]]] },
		c4: { name: 'pulse', k: [[ 2, [ 0, 1, - 50, 1, 50, 1 ]], [ 2, [ 150, 1.5, 100, 1.5, 200, 1.5 ]], [ 2, [ 150, 1, 250, 1, 350, 1 ]]] },
	},
	scene: { name: 'root', uuid: '0', childs: keyFrameChilds },
};

export const timelineKeyFrames: OREditorFixture = {
	scene: keyFrameScene,
	editorData: { ...storyEditorData, selectedEntityId: 'sb-cube' },
	setup: ( editor ) => editor.engine.seek( 120 ),
};
