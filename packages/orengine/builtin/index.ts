import { buildClassTree } from '../core/Resources/classTree';
import { collectLayouts } from '../core/Resources/ClonerLayout';

export const BUILTIN_COMPONENTLIST = buildClassTree(
	import.meta.glob( [ './Components/**/index.ts', '!**/_*/**' ], { eager: true } ),
	'Components'
);

export const BUILTIN_GEOMETRYLIST = buildClassTree(
	import.meta.glob( [ './Geometries/**/index.ts', '!**/_*/**' ], { eager: true } ),
	'Geometries'
);

export const BUILTIN_LAYOUTS = collectLayouts(
	import.meta.glob( [ './Layouts/*/index.ts', '!**/_*/**' ], { eager: true } )
);
