import path from 'path';
import { fileURLToPath } from 'url';

import { startOrengineServer } from './factory';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const projectDir = process.env.ORENGINE_PROJECT_DIR
	? path.resolve( process.env.ORENGINE_PROJECT_DIR )
	: path.resolve( __dirname, '../demo' );

startOrengineServer( { projectDir } );
