import * as GLP from 'glpower';

import { OREngineProjectData, ProjectIO } from '../../IO/ProjectIO';


export type OREngineEditorSettings = {
	currentProject?: OREngineProjectData,

}

export type OREngineEditorData = {
	projects: OREngineProjectData[],
	settings: OREngineEditorSettings
}

export class EditorDataManager extends GLP.EventEmitter {

	private projects: OREngineProjectData[];
	private projectIO: ProjectIO;

	private settings:OREngineEditorSettings;

	constructor() {

		super();

		this.projects = [];
		this.projectIO = new ProjectIO();
		this.settings = {};

	}

	public load( data: OREngineEditorData ) {

		this.projects = data.projects;
		this.settings = data.settings;

	}

	public serialize(): OREngineEditorData {

		return {
			projects: this.projects,
			settings: this.settings
		};

	}


}
