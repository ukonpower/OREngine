import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export const componentsRouter = express.Router();

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );

function resolveProjectDir( name: string ): string | null {

	if ( !name || name.includes( '..' ) || name.includes( '/' ) || name.includes( '\\' ) ) {

		return null;

	}

	const projectDir = path.join( PROJECTS_DIR, name );
	const resolved = path.resolve( projectDir );

	if ( !resolved.startsWith( path.resolve( PROJECTS_DIR ) ) ) {

		return null;

	}

	return resolved;

}

componentsRouter.post( '/projects/:name/components', ( req, res ) => {

	try {

		const projectDir = resolveProjectDir( req.params.name );

		if ( !projectDir ) {

			res.status( 400 ).json( { error: 'Invalid project name' } );
			return;

		}

		const { category, componentName } = req.body;

		if ( !category || !componentName ) {

			res.status( 400 ).json( { error: 'category and componentName are required' } );
			return;

		}

		// サニタイズ
		if ( category.includes( '..' ) || category.includes( '/' ) || category.includes( '\\' ) ) {

			res.status( 400 ).json( { error: 'Invalid category name' } );
			return;

		}

		if ( componentName.includes( '..' ) || componentName.includes( '/' ) || componentName.includes( '\\' ) ) {

			res.status( 400 ).json( { error: 'Invalid component name' } );
			return;

		}

		const componentDir = path.join( projectDir, 'components', category, componentName );

		if ( fs.existsSync( componentDir ) ) {

			res.status( 409 ).json( { error: 'Component already exists' } );
			return;

		}

		fs.mkdirSync( componentDir, { recursive: true } );

		const template = `import * as MXP from 'maxpower';

export class ${componentName} extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

	}

}
`;

		fs.writeFileSync( path.join( componentDir, 'index.ts' ), template );

		res.status( 201 ).json( {
			category,
			componentName,
			path: path.join( 'components', category, componentName, 'index.ts' )
		} );

	} catch ( err ) {

		console.error( 'Failed to create component:', err );
		res.status( 500 ).json( { error: 'Failed to create component' } );

	}

} );

componentsRouter.get( '/projects/:name/components', ( req, res ) => {

	try {

		const projectDir = resolveProjectDir( req.params.name );

		if ( !projectDir ) {

			res.status( 400 ).json( { error: 'Invalid project name' } );
			return;

		}

		const componentsDir = path.join( projectDir, 'components' );

		if ( !fs.existsSync( componentsDir ) ) {

			res.json( [] );
			return;

		}

		const result: { category: string; componentName: string; path: string }[] = [];

		const categories = fs.readdirSync( componentsDir, { withFileTypes: true } )
			.filter( ( e ) => e.isDirectory() );

		for ( const cat of categories ) {

			const catDir = path.join( componentsDir, cat.name );
			const components = fs.readdirSync( catDir, { withFileTypes: true } )
				.filter( ( e ) => e.isDirectory() );

			for ( const comp of components ) {

				const indexPath = path.join( catDir, comp.name, 'index.ts' );

				if ( fs.existsSync( indexPath ) ) {

					result.push( {
						category: cat.name,
						componentName: comp.name,
						path: path.join( 'components', cat.name, comp.name, 'index.ts' )
					} );

				}

			}

		}

		res.json( result );

	} catch ( err ) {

		console.error( 'Failed to list components:', err );
		res.status( 500 ).json( { error: 'Failed to list components' } );

	}

} );
