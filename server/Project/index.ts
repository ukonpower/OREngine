import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { ProjectData } from './ProjectData';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export class ProjectManager {

	private _projects: Map<string, ProjectData> = new Map();
	private _projectsDir: string;
	private _externalProjectDir: string | null;

	constructor( projectsDir: string ) {

		this._projectsDir = projectsDir;
		this._externalProjectDir = process.env.ORENGINE_PROJECT_DIR
			? path.resolve( process.env.ORENGINE_PROJECT_DIR )
			: null;

	}

	get isExternalMode(): boolean {

		return this._externalProjectDir !== null;

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

	getExternalProjectName(): string | null {

		if ( ! this._externalProjectDir ) return null;

		return path.basename( this._externalProjectDir );

	}

	private _resolveProjectDir( name: string ): string | null {

		if ( this._externalProjectDir ) {

			if ( ! fs.existsSync( this._externalProjectDir ) ) return null;

			return this._externalProjectDir;

		}

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
