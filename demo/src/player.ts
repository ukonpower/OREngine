import { startPlayer } from 'orengine/player';

import { initResouces, initResourceInstances } from '../Resources';
import SceneData from '../scene.json';


initResouces();

startPlayer( {
	sceneData: SceneData as any,
	initResourceInstances,
	title: __OR_PROJECT_NAME__,
} );
