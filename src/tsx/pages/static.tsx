import React from 'react';
import ReactDOM from 'react-dom/client';

import { EditorPageStatic } from '../components/pages/EditorPageStatic';

import '~/styles/style.scss';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<EditorPageStatic />
);
