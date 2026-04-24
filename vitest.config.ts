import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig( {
	plugins: [
		{
			name: 'glsl-raw',
			transform( _code, id ) {

				if ( /\.(fs|vs|glsl)$/.test( id ) ) {

					return {
						code: 'export default "";',
						map: null,
					};

				}

			},
		},
	],
	test: {
		include: [ 'packages/maxpower/**/*.test.ts', 'server/**/*.test.ts' ],
		coverage: {
			provider: 'v8',
			reporter: [ 'text', 'text-summary', 'html', 'json-summary' ],
			reportsDirectory: './coverage',
			include: [
				'packages/maxpower/Serializable/**/*.ts',
				'packages/maxpower/Entity/**/*.ts',
				'packages/maxpower/Component/index.ts',
				'packages/maxpower/Geometry/**/*.ts',
				'packages/maxpower/Utils/Ray/**/*.ts',
				'server/Project/EntityStore/**/*.ts',
			],
			exclude: [
				'**/*.test.ts',
				'**/*.d.ts',
				'packages/maxpower/Component/Renderer/**',
				'packages/maxpower/Component/Mesh/**',
				'packages/maxpower/Component/BLidge*/**',
				'packages/orengine/tsx/**',
			],
			thresholds: {
				'packages/maxpower/Serializable/**/*.ts': {
					lines: 80,
					functions: 80,
					branches: 70,
				},
				'packages/maxpower/Entity/**/*.ts': {
					lines: 70,
					functions: 70,
					branches: 60,
				},
				'server/Project/EntityStore/**/*.ts': {
					lines: 80,
					functions: 80,
					branches: 70,
				},
			},
		},
	},
	resolve: {
		alias: {
			'glpower': path.resolve( __dirname, 'packages/glpower/packages/glpower/src' ),
			'maxpower': path.resolve( __dirname, 'packages/maxpower' ),
			'orengine': path.resolve( __dirname, 'packages/orengine' ),
			'packages/orengine': path.resolve( __dirname, 'packages/orengine' ),
			'~': path.resolve( __dirname, 'src' ),
		},
	},
} );
