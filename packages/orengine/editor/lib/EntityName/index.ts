import * as MXP from 'maxpower';

// 兄弟の中で衝突しない名前を返す。Blender と同じく "Light" → "Light.001" → "Light.002" の採番
export const uniqueEntityName = ( parent: MXP.Entity, baseName: string ): string => {

	const used = new Set<string>();

	for ( const child of parent.children ) {

		used.add( child.name );

	}

	if ( ! used.has( baseName ) ) return baseName;

	let index = 1;

	while ( used.has( `${baseName}.${String( index ).padStart( 3, "0" )}` ) ) {

		index ++;

	}

	return `${baseName}.${String( index ).padStart( 3, "0" )}`;

};
