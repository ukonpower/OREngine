import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectData } from '../../ProjectScene/IO/ProjectSerializer';


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

export class EditorData extends MXP.Serializable {

	public projects: OREngineProjectData[];
	public settings:OREngineEditorSettings;

	constructor() {

		super();

		this.projects = [];
		this.settings = {};

	}

	public get props() {

		return {
			projects: { value: this.projects },
			settings: { value: this.settings }
		};

	}

	public deserializer( props: MXP.TypedSerializableProps<this> ): void {

		this.projects = props.projects.value;
		this.settings = props.settings.value;

	}

	public getProject( name: string ): OREngineProjectData | null {

		return this.projects.find( ( project ) => project.setting.name === name ) || null;

	}

	public setProject( project: OREngineProjectData ) {

		const sameprojetIndex = this.projects.findIndex( p => p.setting.name == project.setting.name );

		if ( sameprojetIndex > - 1 ) {

			this.projects[ sameprojetIndex ] = project;

		} else {

			this.projects.push( project );

		}

	}

}
