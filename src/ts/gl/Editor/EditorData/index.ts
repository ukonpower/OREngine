import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { ProjectIO, OREngineProjectData } from '../ProjectIO';


export type EditorStateBLidge = {
	blidge?: MXP.BLidge,
	enabled: boolean,
	url: string,
	gltfPath: string
}

export type EditorSettings = {
	currentProject?: string,
}

export class EditorData extends GLP.EventEmitter {

	private projectIO: ProjectIO;
	private projects: OREngineProjectData[];

	private settings:EditorSettings;

	constructor() {

		super();

		this.projectIO = new ProjectIO();
		this.projects = [];

		this.settings = {};

	}

}
