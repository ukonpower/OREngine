import * as fs from 'fs';
import * as path from 'path';

import type { SceneFileData } from '../types';

export class ProjectData {

	private _name: string;
	private _projectDir: string;
	private _sceneData: SceneFileData | null = null;
	private _revision = 0;

	constructor( name: string, projectDir: string ) {

		this._name = name;
		this._projectDir = projectDir;

	}

	get name(): string {

		return this._name;

	}

	get revision(): number {

		return this._revision;

	}

	incrementRevision(): void {

		this._revision ++;

	}

	getSceneFileData(): SceneFileData {

		return this._ensureLoaded();

	}

	syncFromBrowser( sceneData: SceneFileData ): void {

		this._sceneData = sceneData;
		this._revision = 0;

	}

	save(): void {

		if ( this._sceneData ) {

			this._writeSceneFile( this._sceneData );

		}

	}

	private _ensureLoaded(): SceneFileData {

		if ( ! this._sceneData ) {

			this._sceneData = this._readSceneFile();

		}

		if ( this._sceneData.scene && ! this._sceneData.scene.uuid ) {

			this._sceneData.scene.uuid = '0';

		}

		return this._sceneData;

	}

	private _readSceneFile(): SceneFileData {

		const filePath = path.join( this._projectDir, 'scene.json' );

		if ( ! fs.existsSync( filePath ) ) {

			throw new Error( `scene.json not found in project: ${this._name}` );

		}

		const content = fs.readFileSync( filePath, 'utf-8' );
		return JSON.parse( content ) as SceneFileData;

	}

	private _writeSceneFile( data: SceneFileData ): void {

		const filePath = path.join( this._projectDir, 'scene.json' );
		fs.writeFileSync( filePath, JSON.stringify( data, null, '\t' ) + '\n' );

	}

}
