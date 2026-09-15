import * as fs from 'fs';
import * as path from 'path';

import type { SceneFileData } from '../types';

// プロジェクト内のシーンは scenes/<name>.json に1ファイルずつ置く。
// シーン名はファイル名（拡張子なし）で、ディレクトリを跨がない文字だけを許す
const SCENE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;

export const isValidSceneName = ( name: string ): boolean => {

	return SCENE_NAME_PATTERN.test( name );

};

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

	get scenesDir(): string {

		return path.join( this._projectDir, 'scenes' );

	}

	sceneFilePath( sceneName: string ): string {

		return path.join( this.scenesDir, sceneName + '.json' );

	}

	listSceneNames(): string[] {

		if ( ! fs.existsSync( this.scenesDir ) ) {

			return [];

		}

		const names: string[] = [];

		for ( const file of fs.readdirSync( this.scenesDir ) ) {

			if ( path.extname( file ) !== '.json' ) continue;

			const name = path.basename( file, '.json' );

			if ( ! isValidSceneName( name ) ) continue;

			names.push( name );

		}

		names.sort();

		return names;

	}

	getSceneFileData( sceneName: string ): SceneFileData {

		const data = this._readSceneFile( sceneName );

		if ( data.scene && ! data.scene.uuid ) {

			data.scene.uuid = '0';

		}

		return data;

	}

	private _readSceneFile( sceneName: string ): SceneFileData {

		const filePath = this.sceneFilePath( sceneName );

		if ( ! fs.existsSync( filePath ) ) {

			throw new Error( `scene "${sceneName}" not found in project: ${this._name}` );

		}

		const content = fs.readFileSync( filePath, 'utf-8' );
		return JSON.parse( content ) as SceneFileData;

	}

}
