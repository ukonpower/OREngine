import ReactDOM from 'react-dom/client';

import { EditorPage } from 'orengine/react';

import { initResouces, initResourceInstances } from '../Resources/registry';

import { projectPanels } from './editorPanels';


initResouces();

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<EditorPage
		projectName={__OR_PROJECT_NAME__}
		initResourceInstances={initResourceInstances}
		panels={projectPanels}
	/>
);
