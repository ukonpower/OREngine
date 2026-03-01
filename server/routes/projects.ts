import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export const projectsRouter = express.Router();

const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );

projectsRouter.get( '/projects', ( _req, res ) => {

	try {

		if ( !fs.existsSync( PROJECTS_DIR ) ) {

			res.json( [] );
			return;

		}

		const entries = fs.readdirSync( PROJECTS_DIR, { withFileTypes: true } );
		const dirs = entries
			.filter( ( e ) => e.isDirectory() )
			.map( ( e ) => e.name );

		res.json( dirs );

	} catch ( err ) {

		console.error( 'Failed to list projects:', err );
		res.status( 500 ).json( { error: 'Failed to list projects' } );

	}

} );

projectsRouter.post( '/projects', ( req, res ) => {

	try {

		const { name } = req.body;

		if ( !name || typeof name !== 'string' ) {

			res.status( 400 ).json( { error: 'Project name is required' } );
			return;

		}

		// サニタイズ: ディレクトリトラバーサル防止
		if ( name.includes( '..' ) || name.includes( '/' ) || name.includes( '\\' ) ) {

			res.status( 400 ).json( { error: 'Invalid project name' } );
			return;

		}

		const projectDir = path.join( PROJECTS_DIR, name );

		if ( fs.existsSync( projectDir ) ) {

			res.status( 409 ).json( { error: 'Project already exists' } );
			return;

		}

		// プロジェクトディレクトリとサブディレクトリを作成
		fs.mkdirSync( path.join( projectDir, 'components' ), { recursive: true } );

		// テンプレートファイルを配置
		const defaultScene = {
			name: name,
			scene: {
				name: "root"
			},
			timeline: {
				duration: 0,
				fps: 30,
				tracks: []
			}
		};

		const defaultEditor = {
			camera: {
				position: [ 0, 1, 5 ],
				target: [ 0, 0, 0 ]
			}
		};

		fs.writeFileSync(
			path.join( projectDir, 'scene.json' ),
			JSON.stringify( defaultScene, null, '\t' ) + '\n'
		);

		fs.writeFileSync(
			path.join( projectDir, 'editor.json' ),
			JSON.stringify( defaultEditor, null, '\t' ) + '\n'
		);

		res.status( 201 ).json( { name, path: projectDir } );

	} catch ( err ) {

		console.error( 'Failed to create project:', err );
		res.status( 500 ).json( { error: 'Failed to create project' } );

	}

} );
