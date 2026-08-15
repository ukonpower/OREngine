import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const templateDir = path.resolve( fileURLToPath( import.meta.url ), '../../host/template/project' );

// テンプレートを再帰コピーしつつ {{KEY}} 形式のプレースホルダを置換する
const copyDir = ( src: string, dst: string, replacements: Record<string, string> ) => {

	fs.mkdirSync( dst, { recursive: true } );

	for ( const entry of fs.readdirSync( src, { withFileTypes: true } ) ) {

		const s = path.join( src, entry.name );
		const d = path.join( dst, entry.name );

		if ( entry.isDirectory() ) {

			copyDir( s, d, replacements );

		} else {

			let content = fs.readFileSync( s, 'utf-8' );
			for ( const [ k, v ] of Object.entries( replacements ) ) {

				content = content.split( `{{${k}}}` ).join( v );

			}
			fs.writeFileSync( d, content );

		}

	}

};

// プロジェクトディレクトリが無ければテンプレートから生成する
export const ensureProjectExists = ( projectDir: string, projectName: string ) => {

	if ( fs.existsSync( projectDir ) ) return;

	console.log( `[orengine] creating new project from template: ${projectName}` );
	copyDir( templateDir, projectDir, { PROJECT_NAME: projectName } );

};
