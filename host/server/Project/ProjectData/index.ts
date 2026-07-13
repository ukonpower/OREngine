import * as fs from 'fs';
import * as path from 'path';

import type { SceneFileData } from '../types';

export class ProjectData {

	private _name: string;
	private _projectDir: string;

	constructor( name: string, projectDir: string ) {

		this._name = name;
		this._projectDir = projectDir;

	}

	get name(): string {

		return this._name;

	}

	getSceneFileData(): SceneFileData {

		const data = this._readSceneFile();

		if ( data.scene && ! data.scene.uuid ) {

			data.scene.uuid = '0';

		}

		return data;

	}

	private _readSceneFile(): SceneFileData {

		const filePath = path.join( this._projectDir, 'scene.json' );

		if ( ! fs.existsSync( filePath ) ) {

			throw new Error( `scene.json not found in project: ${this._name}` );

		}

		const content = fs.readFileSync( filePath, 'utf-8' );
		return JSON.parse( content ) as SceneFileData;

	}

}
