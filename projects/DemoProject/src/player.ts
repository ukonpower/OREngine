import { startPlayer } from 'orengine/player';

import SceneData from '../scene.json';
import { initResouces, initResourceInstances } from '../Resources';


initResouces();

startPlayer( {
	sceneData: SceneData as any,
	initResourceInstances,
	title: 'DemoProject',
} );
