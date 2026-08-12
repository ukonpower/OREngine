import ReactDOM from 'react-dom/client';

import EditorData from '@or-editor';
import SceneData from '@or-scene';
import { EditorPageStatic } from 'orengine/react';

import { initResouces, initResourceInstances } from '../Resources/registry';


document.title = __OR_PROJECT_NAME__;

initResouces();

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<EditorPageStatic
		projectName={__OR_PROJECT_NAME__}
		sceneData={SceneData as any}
		editorData={EditorData as any}
		initResourceInstances={initResourceInstances}
	/>
);
