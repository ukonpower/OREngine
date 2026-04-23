import ReactDOM from 'react-dom/client';

import { EditorPageStatic } from 'orengine/react';

import SceneData from '../scene.json';
import EditorData from '../editor.json';
import { initResouces, initResourceInstances } from '../Resources';


initResouces();

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<EditorPageStatic
		projectName={__OR_PROJECT_NAME__}
		sceneData={SceneData as any}
		editorData={EditorData as any}
		initResourceInstances={initResourceInstances}
	/>
);
