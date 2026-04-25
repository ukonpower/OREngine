import { EditorPage } from 'orengine/react';
import ReactDOM from 'react-dom/client';

import { initResouces, initResourceInstances } from '../Resources/registry';


document.title = __OR_PROJECT_NAME__;

initResouces();

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<EditorPage
		projectName={__OR_PROJECT_NAME__}
		initResourceInstances={initResourceInstances}
	/>
);
