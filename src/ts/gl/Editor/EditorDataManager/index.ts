import * as GLP from 'glpower';
import * as MXP from 'maxpower';

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

			return p.setting.name == name;

		} );

	}

	public setProject( project: OREngineProjectData ) {

		const sameprojetIndex = this.projects.findIndex( p => p.setting.name == project.setting.name );

		if ( sameprojetIndex > - 1 ) {

			this.projects[ sameprojetIndex ] = project;

		} else {

			this.projects.push( project );

		}

	}

	public deleteProject( name: string ) {

		const index = this.projects.findIndex( p => p.setting.name == name );

		if ( index > - 1 ) {

			this.projects.splice( index, 1 );

		}

	}

	// setting

	public setSetting( setting: MXP.ExportablePropsSerialized ) {

		this.settings = setting;

	}

	// save

	public serialize(): OREngineEditorData {

		return {
			projects: this.projects,
			settings: this.settings
		};

	}


}
