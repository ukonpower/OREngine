import path from 'path';
import { fileURLToPath } from 'url';

import { createDevConfig } from '../vite-configs';


const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export default createDevConfig( {
	projectDir: __dirname,
} );
