import { createFilter } from '@rollup/pluginutils';

import fs from 'fs';
import util from 'util'
import childProcess from 'child_process';
const exec = util.promisify( childProcess.exec );

export default function shaderMinifier( userOptions = {} ) {

	console.log("aa");
	
	const options = Object.assign(
		{
			include: [
				'**/*.vs',
				'**/*.fs',
				'**/*.vert',
				'**/*.frag',
				'**/*.glsl',
				'**/*.module.glsl'
			]
		},
		userOptions
	);

	const filter = createFilter( options.include, options.exclude );

	return {
		name: 'shaderMinifier',

		buildStart() {

			if ( ! fs.existsSync( "./tmp" ) ) {

				fs.mkdirSync( "./tmp" );

			}

		},
		buildEnd() {

			if ( fs.existsSync( "./tmp" ) ) {

				return fs.promises.rm( "./tmp", { recursive: true, force: true, }, () => {} );

			}

		},
		async transform( code, id ) {

			if ( ! filter( id ) ) return;

			if ( process.platform == "darwin" || true ) {

				return {
					code: `export default ${JSON.stringify( code )};`,
					map: { mappings: '' }
				};

			}


		}
	};

}