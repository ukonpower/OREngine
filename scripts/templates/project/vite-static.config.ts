import path from 'path';
import { fileURLToPath } from 'url';

import { createStaticConfig } from '../vite-configs';


const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export default createStaticConfig( {
	projectDir: __dirname,
	input: path.join( __dirname, 'static.html' ),
} );
