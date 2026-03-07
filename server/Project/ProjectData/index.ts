import * as fs from 'fs';
import * as path from 'path';

import { EntityStore } from '../EntityStore';
import type { SceneFileData } from '../types';

export class ProjectData {

	private _name: string;
	private _projectDir: string;
	private _entityStore: EntityStore;
	private _sceneData: SceneFileData | null = null;
	private _dirty: boolean = false;

	constructor( name: string, projectDir: string ) {

		this._name = name;
		this._projectDir = projectDir;
		this._entityStore = new EntityStore();

	}

	get name(): string {

		return this._name;

	}

	// --- dirty管理 ---

	get dirty(): boolean {

		return this._dirty;

	}

	markDirty(): void {

		this._dirty = true;

	}

	clearDirty(): void {

		this._dirty = false;

	}

	// --- リソース状態取得（ファイルから読み込み） ---

	getResourcesSnapshot(): {
		materials: { name: string; config: any }[];
		textures: { name: string; config: any }[];
	} {

		return {
			materials: this._readMaterialFiles(),
			textures: this._readTextureFiles(),
		};

	}

	private _readMaterialFiles(): { name: string; config: any }[] {

		const materialsDir = path.resolve( this._projectDir, '../../src/ts/Resources/Materials' );

		if ( ! fs.existsSync( materialsDir ) ) return [];

		const items: { name: string; config: any }[] = [];

		const files = fs.readdirSync( materialsDir ).filter( f => f.endsWith( '.mat' ) );

		for ( const file of files ) {

			const name = path.basename( file, '.mat' );
			const config = JSON.parse( fs.readFileSync( path.join( materialsDir, file ), 'utf-8' ) );
			items.push( { name, config } );

		}

		return items;

	}

	private _readTextureFiles(): { name: string; config: any }[] {

		const texturesDir = path.resolve( this._projectDir, '../../src/ts/Resources/Textures' );

		if ( ! fs.existsSync( texturesDir ) ) return [];

		const items: { name: string; config: any }[] = [];

		const files = fs.readdirSync( texturesDir ).filter( f => f.endsWith( '.tex' ) );

		for ( const file of files ) {

			const name = path.basename( file, '.tex' );
			const config = JSON.parse( fs.readFileSync( path.join( texturesDir, file ), 'utf-8' ) );
			items.push( { name, config } );

		}

		return items;

	}

	// --- オンメモリ状態管理 ---

	private _ensureLoaded(): SceneFileData {

		if ( ! this._sceneData ) {

			this._sceneData = this._readSceneFile();

		}

		return this._sceneData;

	}

	getSceneFileData(): SceneFileData {

		return this._ensureLoaded();

	}

	syncFromBrowser( sceneData: SceneFileData ): void {

		this._sceneData = sceneData;

	}

	save(): void {

		if ( this._sceneData ) {

			this._writeSceneFile( this._sceneData );

		}

	}

	// --- ファイル I/O ---

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

	// --- アクションディスパッチ ---

	dispatch( action: string, params: Record<string, unknown> ): unknown {

		const scene = this._ensureLoaded();

		switch ( action ) {

			case 'getStatus':
				return { connected: true, canUndo: false, canRedo: false, selectedEntityId: null };

			case 'getScene':
				return this._entityStore.buildSceneTree( scene.scene );

			case 'getEntity':
				return this._entityStore.serializeEntity( scene.scene, params.uuid as string );

			case 'searchEntities':
				return this._entityStore.searchEntities( scene.scene, params.query as string || '' );

			case 'getAvailableComponents':
				return this._getAvailableComponents();

			case 'createEntity': {

				const entity = this._entityStore.createEntity( scene.scene, params.parentUuid as string, params.name as string );
				return { uuid: entity.uuid, name: entity.name };

			}

			case 'deleteEntity':
				this._entityStore.deleteEntity( scene.scene, params.uuid as string );
				return { success: true };

			case 'addComponent': {

				const comp = this._entityStore.addComponent( scene.scene, params.uuid as string, params.componentName as string );
				return { uuid: comp.uuid, componentName: params.componentName };

			}

			case 'removeComponent':
				this._entityStore.removeComponent( scene.scene, params.uuid as string, params.componentName as string );
				return { success: true };

			case 'setField':
				this._entityStore.setField( scene.scene, params.targetUuid as string, params.path as string, params.value );
				return { success: true };

			default:
				throw new Error( `Unknown action: ${action}` );

		}

	}

	private _getAvailableComponents(): { name: string; className: string }[] {

		const componentsDir = path.resolve( this._projectDir, '../../src/ts/Resources/Components' );

		if ( ! fs.existsSync( componentsDir ) ) return [];

		return this._scanComponents( componentsDir, '' );

	}

	private _scanComponents( dir: string, prefix: string ): { name: string; className: string }[] {

		const results: { name: string; className: string }[] = [];

		if ( ! fs.existsSync( dir ) ) return results;

		const entries = fs.readdirSync( dir, { withFileTypes: true } )
			.filter( e => e.isDirectory() && ! e.name.startsWith( '_' ) );

		for ( const entry of entries ) {

			const entryPath = path.join( dir, entry.name );
			const hasIndex = fs.existsSync( path.join( entryPath, 'index.ts' ) );

			if ( hasIndex ) {

				results.push( {
					name: prefix ? `${prefix}/${entry.name}` : entry.name,
					className: entry.name,
				} );

			}

			const children = this._scanComponents( entryPath, prefix ? `${prefix}/${entry.name}` : entry.name );
			results.push( ...children );

		}

		return results;

	}

}
