import React from 'react';
import ReactDOM from 'react-dom/client';

import { ProjectSelectPage } from '../components/pages/ProjectSelectPage';

import '~/styles/style.scss';

const LazyEditorPage = React.lazy( () =>
	import( '../components/pages/EditorPage' ).then( m => ( { default: m.EditorPage } ) )
);

const App = () => {

	const projectFromUrl = new URLSearchParams( location.search ).get( 'project' );

	if ( ! projectFromUrl ) {

		return <ProjectSelectPage onSelectProject={( name ) => {

			window.location.href = `/?project=${encodeURIComponent( name )}`;

		}} />;

	}

	return (
		<React.Suspense fallback={<div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>Loading...</div>}>
			<LazyEditorPage />
		</React.Suspense>
	);

};

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<App />
);
