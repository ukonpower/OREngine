import path from 'path';

import { wasRecentlyWritten } from '../../../server/recentWrites';

import type { Plugin } from 'vite';

// scene.json / editor.json の外部編集を検知してフルリロードする（APIによる直近書き込みは除外）
export const ProjectWatchReload = ( projectDir: string ): Plugin => ( {
	name: 'orengine-project-watch-reload',
	configureServer( server ) {

		const targets = [ 'scene.json', 'editor.json' ].map( ( f ) => path.resolve( path.join( projectDir, f ) ) );
		targets.forEach( ( t ) => server.watcher.add( t ) );

		server.watcher.on( 'change', ( file ) => {

			const resolved = path.resolve( file );

			if ( targets.includes( resolved ) && ! wasRecentlyWritten( resolved ) ) {

				server.ws.send( { type: 'full-reload' } );

			}

		} );

	},
} );
