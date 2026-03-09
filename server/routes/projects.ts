import * as crypto from 'crypto';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export const projectsRouter = express.Router();

const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );

// --- Project List ---

projectsRouter.get( '/projects', ( _req, res ) => {

	try {

		if ( !fs.existsSync( PROJECTS_DIR ) ) {

			res.json( [] );
			return;

		}

		const entries = fs.readdirSync( PROJECTS_DIR, { withFileTypes: true } );
		const projects = entries
			.filter( ( e ) => e.isDirectory() )
			.map( ( e ) => e.name );

		res.json( projects );

	} catch ( err ) {

		console.error( 'Failed to list projects:', err );
		res.status( 500 ).json( { error: 'Failed to list projects' } );

	}

} );

// --- Validation ---

const validateProjectName = ( name: unknown ): string | null => {

	if ( !name || typeof name !== 'string' ) return 'Project name is required';
	if ( name.includes( '..' ) || name.includes( '/' ) || name.includes( '\\' ) ) return 'Invalid project name';
	return null;

};

// --- Project Delete ---

projectsRouter.delete( '/projects/:name', async ( req, res ) => {

	try {

		const { name } = req.params;
		const projectDir = path.join( PROJECTS_DIR, name );

		if ( !fs.existsSync( projectDir ) ) {

			res.status( 404 ).json( { error: 'Project not found' } );
			return;

		}

		await fs.promises.rm( projectDir, { recursive: true } );
		res.json( { success: true } );

	} catch ( err ) {

		console.error( 'Failed to delete project:', err );
		res.status( 500 ).json( { error: 'Failed to delete project' } );

	}

} );

// --- Project Rename ---

projectsRouter.put( '/projects/:name', async ( req, res ) => {

	try {

		const { name } = req.params;
		const { newName } = req.body;

		const err = validateProjectName( newName );

		if ( err ) {

			res.status( 400 ).json( { error: err } );
			return;

		}

		const oldDir = path.join( PROJECTS_DIR, name );
		const newDir = path.join( PROJECTS_DIR, newName );

		if ( !fs.existsSync( oldDir ) ) {

			res.status( 404 ).json( { error: 'Project not found' } );
			return;

		}

		if ( fs.existsSync( newDir ) ) {

			res.status( 409 ).json( { error: 'Project already exists' } );
			return;

		}

		await fs.promises.rename( oldDir, newDir );

		res.json( { name: newName } );

	} catch ( err ) {

		console.error( 'Failed to rename project:', err );
		res.status( 500 ).json( { error: 'Failed to rename project' } );

	}

} );

// --- Project Duplicate ---

projectsRouter.post( '/projects/:name/duplicate', async ( req, res ) => {

	try {

		const { name } = req.params;
		const { newName } = req.body;

		const err = validateProjectName( newName );

		if ( err ) {

			res.status( 400 ).json( { error: err } );
			return;

		}

		const srcDir = path.join( PROJECTS_DIR, name );
		const destDir = path.join( PROJECTS_DIR, newName );

		if ( !fs.existsSync( srcDir ) ) {

			res.status( 404 ).json( { error: 'Project not found' } );
			return;

		}

		if ( fs.existsSync( destDir ) ) {

			res.status( 409 ).json( { error: 'Project already exists' } );
			return;

		}

		await fs.promises.cp( srcDir, destDir, { recursive: true } );

		res.status( 201 ).json( { name: newName } );

	} catch ( err ) {

		console.error( 'Failed to duplicate project:', err );
		res.status( 500 ).json( { error: 'Failed to duplicate project' } );

	}

} );

// --- Project Creation ---

const GLOBALS_TEMPLATE = `export { canvas, gl, power, globalUniforms } from '~/ts/Globals';
`;

const INDEX_TEMPLATE = `export { initResouces, initResourceInstances } from '~/ts/Resources';
`;


projectsRouter.post( '/projects', ( req, res ) => {

	try {

		const { name } = req.body;

		const validationError = validateProjectName( name );

		if ( validationError ) {

			res.status( 400 ).json( { error: validationError } );
			return;

		}

		const projectDir = path.join( PROJECTS_DIR, name );

		if ( fs.existsSync( projectDir ) ) {

			res.status( 409 ).json( { error: 'Project already exists' } );
			return;

		}

		fs.mkdirSync( projectDir, { recursive: true } );

		const defaultScene = {
			scene: {
				name: "root",
				childs: [
					{
						name: "Cube",
						uuid: crypto.randomUUID(),
						pos: [ 0, 0.5, 0 ],
						components: [
							{
								name: "Mesh",
								uuid: crypto.randomUUID(),
								props: {
									"geometry/type": "Cube",
									"geometry/width": 1,
									"geometry/height": 1,
									"geometry/depth": 1,
									"geometry/widthSegments": 8,
									"geometry/heightSegments": 8,
									"material/name": ""
								}
							}
						]
					},
					{
						name: "Light",
						uuid: crypto.randomUUID(),
						pos: [ 3, 4, 2 ],
						rot: [ 1.0196797, 0.6664389, - 0.7878875 ],
						components: [
							{
								name: "Light",
								uuid: crypto.randomUUID()
							}
						]
					},
					{
						name: "Camera",
						uuid: crypto.randomUUID(),
						pos: [ 0, 1.5, 4 ],
						rot: [ - 0.2, 0, 0 ],
						components: [
							{
								name: "Camera",
								uuid: crypto.randomUUID()
							},
							{
								name: "CameraController",
								uuid: crypto.randomUUID()
							}
						]
					}
				]
			},
			timeline: {
				duration: 0,
				fps: 30,
				tracks: []
			}
		};

		const defaultEditor = {
			"camera/position": [ 0, 1, 5 ],
			"camera/target": [ 0, 0, 0 ]
		};

		fs.writeFileSync(
			path.join( projectDir, 'scene.json' ),
			JSON.stringify( defaultScene, null, '\t' ) + '\n'
		);

		fs.writeFileSync(
			path.join( projectDir, 'editor.json' ),
			JSON.stringify( defaultEditor, null, '\t' ) + '\n'
		);

		fs.writeFileSync(
			path.join( projectDir, 'globals.ts' ),
			GLOBALS_TEMPLATE
		);

		fs.writeFileSync(
			path.join( projectDir, 'index.ts' ),
			INDEX_TEMPLATE
		);

		res.status( 201 ).json( { name, path: projectDir } );

	} catch ( err ) {

		console.error( 'Failed to create project:', err );
		res.status( 500 ).json( { error: 'Failed to create project' } );

	}

} );
