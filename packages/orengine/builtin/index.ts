import { buildClassTree } from '../core/Resources/classTree';
import { collectLibrary } from '../core/Resources/Library';

export type { ClonerLayout, ClonerLayoutParams, ClonerPlacement } from './Components/Utility/Cloner/layout';

export const BUILTIN_COMPONENTLIST = buildClassTree(
	import.meta.glob( [ './Components/**/index.ts', '!**/_*/**' ], { eager: true } ),
	'Components'
);

export const BUILTIN_GEOMETRYLIST = buildClassTree(
	import.meta.glob( [ './Geometries/**/index.ts', '!**/_*/**' ], { eager: true } ),
	'Geometries'
);

export const BUILTIN_LIBRARY = collectLibrary(
	import.meta.glob( [ './Library/*/*/index.ts', '!**/_*/**' ], { eager: true } )
);
