import express from 'express';

import { componentsRouter } from './routes/components';
import { editorRouter } from './routes/editor';
import { materialsRouter } from './routes/materials';
import { projectsRouter } from './routes/projects';
import { sceneRouter } from './routes/scene';
import { shadersRouter } from './routes/shaders';
import { initWSBridge } from './ws';

const app = express();
const PORT = process.env.ORENGINE_SERVER_PORT || 3001;

app.use( express.json( { limit: '50mb' } ) );

app.use( '/api', projectsRouter );
app.use( '/api', sceneRouter );
app.use( '/api', componentsRouter );
app.use( '/api', materialsRouter );
app.use( '/api', shadersRouter );
app.use( '/api', editorRouter );

const server = app.listen( PORT, () => {

	console.log( `OREngine Server running on port ${PORT}` );

} );

initWSBridge( server );
