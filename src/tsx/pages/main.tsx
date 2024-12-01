import ReactDOM from 'react-dom/client';

import { EditorPage } from './Editor';
import '~/styles/style.scss';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<>
		{/* <React.StrictMode> */}
		<EditorPage />
		{/* </React.StrictMode> */}
	</>
);
