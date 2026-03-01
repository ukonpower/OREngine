import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export const projectsRouter = express.Router();

const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );
const ACTIVE_FILE = path.join( PROJECTS_DIR, '.active' );

// --- Active Project ---

projectsRouter.get( '/projects/active', ( _req, res ) => {

	try {

		const active = fs.readFileSync( ACTIVE_FILE, 'utf-8' ).trim();
		res.json( { name: active } );

	} catch {

		res.json( { name: 'default' } );

	}

} );

projectsRouter.post( '/projects/active', ( req, res ) => {

	const { name } = req.body;

	if ( !name || typeof name !== 'string' ) {

		res.status( 400 ).json( { error: 'Project name is required' } );
		return;

	}

	const projectDir = path.join( PROJECTS_DIR, name );

	if ( !fs.existsSync( projectDir ) ) {

		res.status( 404 ).json( { error: 'Project not found' } );
		return;

	}

	fs.writeFileSync( ACTIVE_FILE, name );
	res.json( { name } );

} );

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

		try {

			const active = fs.readFileSync( ACTIVE_FILE, 'utf-8' ).trim();

			if ( active === name ) {

				res.status( 400 ).json( { error: 'Cannot delete active project' } );
				return;

			}

		} catch {}

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

		try {

			const active = fs.readFileSync( ACTIVE_FILE, 'utf-8' ).trim();

			if ( active === name ) {

				fs.writeFileSync( ACTIVE_FILE, newName );

			}

		} catch {}

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

const INDEX_TEMPLATE = `
import * as MXP from 'maxpower';
import { ComponentGroup, Engine } from 'orengine';

import { COMPONENTLIST } from './_generated/componentList';

type ComponentLIst = {
	[key: string]: ( ComponentLIst | ( typeof MXP.Component ) )
};

export const initResouces = () => {

	/*-------------------------------
		Components
	-------------------------------*/

	Engine.resources.clear();

	const _ = ( list: ComponentLIst, group: ComponentGroup ) => {

		const keys = Object.keys( list );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];
			const value = list[ name ];

			if ( typeof value == "function" ) {

				group.addComponent( name, value );

			} else {

				const newGroup = group.createGroup( name );

				_( value, newGroup );

			}

		}

	};

	const light = Engine.resources.addComponentGroup( "Light" );
	light.addComponent( "Light", MXP.Light );

	const rootKeys = Object.keys( COMPONENTLIST );

	for ( let i = 0; i < rootKeys.length; i ++ ) {

		const name = rootKeys[ i ];
		const value = COMPONENTLIST[ name ];

		const group = Engine.resources.addComponentGroup( name );

		_( value, group );

	}

};
`;

const COMPONENTLIST_TEMPLATE = `export const COMPONENTLIST: {[key: string]: any} = {\n};\n`;

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

		fs.mkdirSync( path.join( projectDir, 'components' ), { recursive: true } );
		fs.mkdirSync( path.join( projectDir, '_generated' ), { recursive: true } );

		const defaultScene = {
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

		fs.writeFileSync(
			path.join( projectDir, 'globals.ts' ),
			GLOBALS_TEMPLATE
		);

		fs.writeFileSync(
			path.join( projectDir, 'index.ts' ),
			INDEX_TEMPLATE
		);

		fs.writeFileSync(
			path.join( projectDir, '_generated', 'componentList.ts' ),
			COMPONENTLIST_TEMPLATE
		);

		res.status( 201 ).json( { name, path: projectDir } );

	} catch ( err ) {

		console.error( 'Failed to create project:', err );
		res.status( 500 ).json( { error: 'Failed to create project' } );

	}

} );
