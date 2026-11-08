import { defineConfig } from 'vite';

// uipower を単独でビルドする設定。ホストの vite 設定（エイリアス・sass の loadPaths）を使わずに
// ビルドが通ることで、uipower がリポジトリの他の場所へ暗黙に依存していないことを確かめる
export default defineConfig( {
	root: import.meta.dirname,
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		lib: {
			entry: 'index.ts',
			formats: [ 'es' ],
			fileName: 'uipower',
			cssFileName: 'uipower',
		},
		rollupOptions: {
			// peerDependencies と同じもの。利用側の React を使わせるため同梱しない
			external: [ 'react', 'react-dom', 'react/jsx-runtime' ],
		},
	},
} );
