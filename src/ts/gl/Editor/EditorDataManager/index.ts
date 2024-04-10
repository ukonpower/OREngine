import * as GLP from 'glpower';

import { OREngineProjectData } from '../../IO/ProjectSerializer';


export type OREngineEditorViewType = "render" | "debug";

export type OREngineEditorSettings = {
	currentProjectName?: string,
	viewType?: OREngineEditorViewType,
	resolutionScale?: number,
}

export type OREngineEditorData = {
	projects: OREngineProjectData[],
	settings: OREngineEditorSettings
}

export class EditorDataManager extends GLP.EventEmitter {

	public projects: OREngineProjectData[];
	public settings:OREngineEditorSettings;

	constructor() {

		super();

		this.projects = [];
		this.settings = {};

	}

	public setEditorData( data: OREngineEditorData ) {

		this.projects = data.projects || [];
		this.settings = data.settings || {};

	}

	// project

	public getProject( name: string ) {

		return this.projects.find( p => {

			return p.editor.name == name;

		} );

	}

	public setProject( project: OREngineProjectData ) {

		const sameprojetIndex = this.projects.findIndex( p => p.editor.name == project.editor.name );

		if ( sameprojetIndex > - 1 ) {

			this.projects[ sameprojetIndex ] = project;

		} else {

			this.projects.push( project );

		}

	}
	// save

	public serialize(): OREngineEditorData {

		return {
			projects: this.projects,
			settings: this.settings
		};

	}


}
