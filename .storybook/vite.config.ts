import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { sharedCss, sharedResolve } from '../host/vite/configs';
import { ShaderBuilder } from '../host/vite/plugins/ShaderBuilder';
import { TexLoader } from '../host/vite/plugins/TexLoader';
import { WgslLoader } from '../host/vite/plugins/WgslLoader';

const storybookDir = path.dirname( fileURLToPath( import.meta.url ) );
const orengineRoot = path.join( storybookDir, '..' );

// ストーリーが読むコンポーネント・テクスチャの供給元（@or-resources の解決先）
const projectDir = path.join( orengineRoot, 'demo-webgl' );

// ルートに vite.config.ts が無く Storybook は何も継承しないため、
// エンジンをバンドルするのに要る部品だけをここで組み立てる
export default defineConfig( {
	resolve: {
		alias: [
			// レンダラーは headless 固定。ストーリーの目的はUIの確認で、
			// グラフィックスコンテキストを持たないぶんCIでもそのまま動く
			...sharedResolve( projectDir, 'headless' ).alias,
			{ find: /^@or-storybook\/(.*)$/, replacement: path.join( storybookDir, '$1' ) },
		],
	},
	css: sharedCss(),
	plugins: [
		// react-vite フレームワークは react プラグインを注入しないので自前で入れる
		react(),
		ShaderBuilder( { scanDirs: [ orengineRoot, projectDir ] } ),
		TexLoader(),
		WgslLoader( { moduleDirs: [ path.join( projectDir, 'Resources/shaders' ) ] } ),
	],
	define: {
		BASE_PATH: JSON.stringify( '' ),
		__OR_PROJECT_NAME__: JSON.stringify( path.basename( projectDir ) ),
	},
} );
