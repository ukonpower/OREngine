import childProcess from 'child_process';
import fs from 'fs';
import util from 'util';

import { createFilter } from '@rollup/pluginutils';

const exec = util.promisify( childProcess.exec );

export default function shaderMinifier( userOptions = {} ) {

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

			code = code.replaceAll( "\\n", "\n" );
			code = code.replaceAll( "\\t", "\t" );
			code = code.replaceAll( "precision highp float;", "\/\/\[\nprecision highp float;\n\/\/\]\n" );

			const fileName = id.replaceAll( '/', "_" ) + new Date().getTime();
			const inputFilePath = `./tmp/${fileName}_in.txt`;
			const outputFilePath = `./tmp/${fileName}_out.txt`;

			await fs.promises.writeFile( inputFilePath, code );

			let args = '--format text --preserve-externals';

			if ( id.indexOf( '.module.glsl' ) > - 1 ) {

				args += " --no-remove-unused";
				args += " --no-renaming";

			}

			// MINIFIER!!
			await exec( `shader_minifier.exe ${inputFilePath} -o ${outputFilePath} ${args}` );

			const compiledCode = await fs.promises.readFile( outputFilePath, 'utf-8' );

			fs.unlinkSync( inputFilePath );
			fs.unlinkSync( outputFilePath );

			return {
				code: `export default ${JSON.stringify( compiledCode )};`,
				map: { mappings: '' }
			};


		}
	};

}
