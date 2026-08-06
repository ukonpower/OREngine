import path from 'path';
import { fileURLToPath } from 'url';

import { wasRecentlyWritten } from '../../../server/recentWrites';

import type { Plugin } from 'vite';

const appRoot = path.resolve( fileURLToPath( import.meta.url ), '../../../../app' );

// Resources 配下を import.meta.glob で集めているモジュール。
// glob は変換時に静的展開されるので、ファイルが増減したらこれを作り直さないと登録一覧に出てこない
const registryModules = [
	path.join( appRoot, 'Resources/registry.ts' ),
	path.join( appRoot, 'Resources/registryCommon.ts' ),
];

// scene.json / editor.json の外部編集と、Resources のファイル増減を検知してフルリロードする
// （scene.json / editor.json はAPIによる直近書き込みを除外）
export const ProjectWatchReload = ( projectDir: string ): Plugin => ( {
	name: 'orengine-project-watch-reload',
	configureServer( server ) {

		const targets = [ 'scene.json', 'editor.json' ].map( ( f ) => path.resolve( path.join( projectDir, f ) ) );
		targets.forEach( ( t ) => server.watcher.add( t ) );

		// プロジェクトは vite の root 外にあり、変換したファイルしか watcher に載らない。
		// 新規ファイルの作成を拾うにはディレクトリごと監視に足す必要がある
		const resourcesDir = path.resolve( path.join( projectDir, 'Resources' ) );
		server.watcher.add( resourcesDir );

		server.watcher.on( 'change', ( file ) => {

			const resolved = path.resolve( file );

			if ( targets.includes( resolved ) && ! wasRecentlyWritten( resolved ) ) {

				server.ws.send( { type: 'full-reload' } );

			}

		} );

		// コンポーネント・ジオメトリ・テクスチャの増減を、レジストリを作り直して反映する
		const reloadRegistry = ( file: string ) => {

			if ( ! path.resolve( file ).startsWith( resourcesDir ) ) return;

			const moduleGraph = server.environments.client.moduleGraph;

			for ( const id of registryModules ) {

				const mod = moduleGraph.getModuleById( id );

				if ( mod ) moduleGraph.invalidateModule( mod );

			}

			server.ws.send( { type: 'full-reload' } );

		};

		server.watcher.on( 'add', reloadRegistry );
		server.watcher.on( 'unlink', reloadRegistry );

	},
} );
