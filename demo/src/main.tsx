import ReactDOM from 'react-dom/client';

import { EditorPage } from 'orengine/react';

import { initResouces, initResourceInstances } from '../Resources';


initResouces();

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<EditorPage
		projectName="DemoProject"
		initResourceInstances={initResourceInstances}
	/>
);
