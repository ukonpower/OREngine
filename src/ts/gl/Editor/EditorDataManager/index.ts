import * as GLP from 'glpower';

import { OREngineProjectData } from '../../IO/ProjectSerializer';


export type OREngineEditorSettings = {
	currentProject?: string,
}

export type OREngineEditorData = {
	projects: OREngineProjectData[],
	settings: OREngineEditorSettings
}

export class EditorDataManager extends GLP.EventEmitter {

	private _projects: OREngineProjectData[];
	private _settings:OREngineEditorSettings;

	constructor() {

		super();

		this._projects = [];
		this._settings = {};

	}

	public setEditorData( data: OREngineEditorData ) {

		this._projects = data.projects;
		this._settings = data.settings;

	}

	// project

	public getProject( name: string ) {

		return this._projects.find( p => {

			return p.setting.name == name;

		} );

	}

	public setProject( project: OREngineProjectData ) {

		const sameprojetIndex = this._projects.findIndex( p => p.setting.name == project.setting.name );

		if ( sameprojetIndex > - 1 ) {

			this._projects[ sameprojetIndex ] = project;

		} else {

			this._projects.push( project );

		}

	}

	// setting

	public get settings() {

		return this._settings;

	}

	// save

	public serialize(): OREngineEditorData {

		return {
			projects: this._projects,
			settings: this._settings
		};

	}


}
