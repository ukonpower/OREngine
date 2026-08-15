import * as path from 'path';

import { ProjectData } from './ProjectData';


export class ProjectManager {

	private _projectData: ProjectData;
	private _projectDir: string;

	constructor( projectDir: string ) {

		this._projectDir = path.resolve( projectDir );
		this._projectData = new ProjectData( this.name, this._projectDir );

	}

	get name(): string {

		return path.basename( this._projectDir );

	}

	get projectDir(): string {

		return this._projectDir;

	}

	getProject( _name?: string ): ProjectData {

		return this._projectData;

	}

}
