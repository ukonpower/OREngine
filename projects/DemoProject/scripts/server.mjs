import path from 'path';
import { fileURLToPath } from 'url';

import { startOrengineServer } from 'orengine/server';


const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const projectDir = path.resolve( __dirname, '..' );

startOrengineServer( { projectDir } );
