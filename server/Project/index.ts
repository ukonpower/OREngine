import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { ProjectData } from './ProjectData';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export class ProjectManager {

	private _projects: Map<string, ProjectData> = new Map();
	private _projectsDir: string;

	constructor( projectsDir: string ) {

		this._projectsDir = projectsDir;

	}

	getProject( name: string ): ProjectData {

		if ( ! this._projects.has( name ) ) {

			const projectDir = this._resolveProjectDir( name );

			if ( ! projectDir ) throw new Error( `Invalid project name: ${name}` );

			this._projects.set( name, new ProjectData( name, projectDir ) );

		}

		return this._projects.get( name )!;

	}

	removeProject( name: string ): void {

		this._projects.delete( name );

	}

	getResourcesDir( name: string ): string | null {

		const projectDir = this._resolveProjectDir( name );

		if ( ! projectDir ) return null;

		return path.join( projectDir, 'Resources' );

	}

	private _resolveProjectDir( name: string ): string | null {

		if ( ! name || name.includes( '..' ) || name.includes( '/' ) || name.includes( '\\' ) ) {

			return null;

		}

		const projectDir = path.join( this._projectsDir, name );
		const resolved = path.resolve( projectDir );

		if ( ! resolved.startsWith( path.resolve( this._projectsDir ) ) ) {

			return null;

		}

		if ( ! fs.existsSync( resolved ) ) {

			return null;

		}

		return resolved;

	}

}

export const projectManager = new ProjectManager(
	path.resolve( __dirname, '../../projects' )
);
