import { useEffect } from 'react';

import { InputWindow, InputWindowProvider, MouseMenu, MouseMenuProvider, OREditorProvider, OREngineProvider, useOREditor } from 'orengine/react';

import { initResouces, initResourceInstances } from '../../host/app/Resources/registry';

import type { Decorator } from '@storybook/react-vite';
import type * as MXP from 'maxpower';
import type { OREngineProjectData } from 'orengine';
import type { Editor } from 'orengine/editor';

export type OREditorFixture = {
	scene: OREngineProjectData;
	editorData?: MXP.SerializeField;
	// シーン読み込み後に一度だけ走る初期操作（seek・play・音源の投入など）
	setup?: ( editor: Editor ) => void;
};

// コンポーネント・ジオメトリ・テクスチャの登録はプロセスに1回で足りる
initResouces();

const FixtureSetup = ( { setup }: { setup: ( editor: Editor ) => void } ) => {

	const { editor } = useOREditor();

	useEffect( () => {

		const engine = editor.engine;

		const apply = () => setup( editor );

		// engine.load は外側の OREngineProvider の effect で走る。React は子の effect を
		// 先に流すので、ここで購読しておけば読み込み完了を取りこぼさない。
		// また Timeline 側の "loaded" 購読より後に並ぶので、ビューポートの初期化に上書きされない
		engine.on( 'loaded', apply );

		return () => {

			engine.off( 'loaded', apply );

		};

	}, [ editor, setup ] );

	return null;

};

// 本物の Engine と Editor をひとつ立てて配下へ供給する。
// エディタのパネルはどれも OREditor と同じ Provider 階層を前提にしているので、
// 単体で立てるにも同じ積み方をなぞる（数値入力の InputWindow・右クリックの MouseMenu を含む）
export const OREditorFixtureHost: React.FC<{ fixture: OREditorFixture, children?: React.ReactNode }> = ( props ) => (
	<OREngineProvider project={props.fixture.scene} onEngineInit={initResourceInstances}>
		<OREditorProvider projectName="storybook" editorData={props.fixture.editorData}>
			<MouseMenuProvider>
				<InputWindowProvider>
					{props.children}
					{props.fixture.setup && <FixtureSetup setup={props.fixture.setup} />}
					<InputWindow />
					<MouseMenu />
				</InputWindowProvider>
			</MouseMenuProvider>
		</OREditorProvider>
	</OREngineProvider>
);

export const withOREditor = ( fixture: OREditorFixture ): Decorator => ( Story ) => (
	<OREditorFixtureHost fixture={fixture}>
		<Story />
	</OREditorFixtureHost>
);

// OREditor 本体（Provider 一式を内蔵する）のストーリー用。外側で必要なのはエンジン供給だけ
export const withOREngine = ( scene: OREngineProjectData ): Decorator => ( Story ) => (
	<OREngineProvider project={scene} onEngineInit={initResourceInstances}>
		<Story />
	</OREngineProvider>
);
