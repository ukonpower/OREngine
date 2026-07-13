import { buildClassTree } from '../core/Resources/classTree';

export const BUILTIN_COMPONENTLIST = buildClassTree(
	import.meta.glob( [ './Components/**/index.ts', '!**/_*/**' ], { eager: true } ),
	'Components'
);

export const BUILTIN_GEOMETRYLIST = buildClassTree(
	import.meta.glob( [ './Geometries/**/index.ts', '!**/_*/**' ], { eager: true } ),
	'Geometries'
);
