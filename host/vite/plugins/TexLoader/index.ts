import path from 'path';

import { Plugin } from 'vite';

// .tex(JSON) を「fragシェーダーを直importするJSモジュール」へ変換する
// playerビルドはterserのプロパティマングリングで文字列キーが変わるため、
// frag参照やテクスチャ名の解決を実行時のパス突き合わせに持ち込まず、ビルド時に確定させる
export const TexLoader = (): Plugin => ( {

	name: 'tex-loader',

	transform( code, id ) {

		if ( ! id.split( '?' )[ 0 ].endsWith( '.tex' ) ) return;

		let config: any;

		try {

			config = JSON.parse( code );

		} catch {

			// 書きかけの .tex は無効モジュールとして扱う
			return { code: 'export default null;', map: null };

		}

		const name = path.basename( id.split( '?' )[ 0 ], '.tex' );
		const fragImport = config.frag ? `import frag from ${JSON.stringify( config.frag )};` : 'const frag = undefined;';
		delete config.frag;

		return {
			code: `${fragImport}\nexport default { ...${JSON.stringify( { name, ...config } )}, frag };`,
			map: null,
		};

	},

} );
