import { EditorPage } from 'packages/orengine/tsx/Editor';
import ReactDOM from 'react-dom/client';

import '~/styles/style.scss';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<>
		{/* <React.StrictMode> */}
		<EditorPage />
		{/* </React.StrictMode> */}
	</>
);
