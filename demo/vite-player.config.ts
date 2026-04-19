import path from 'path';
import { fileURLToPath } from 'url';

import { createPlayerConfig } from '../vite-configs';


const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export default createPlayerConfig( {
	projectDir: __dirname,
} );
