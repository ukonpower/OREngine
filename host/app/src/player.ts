import SceneData from '@or-scene';

import { startPlayer } from 'orengine/player';

import { initResouces, initResourceInstances } from '../Resources/registry';


initResouces();

startPlayer( {
	sceneData: SceneData as any,
	initResourceInstances,
	title: __OR_PROJECT_NAME__,
} );
