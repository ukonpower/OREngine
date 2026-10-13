import * as MXP from 'maxpower';

// Hierarchy に並べる子。Cloner の持ち場のような editorHidden は出さず、名前順に並べる
export const getHierarchyChildren = ( entity: MXP.Entity ): MXP.Entity[] => {

	const children: MXP.Entity[] = [];

	for ( const child of entity.children ) {

		if ( child.editorHidden ) continue;

		children.push( child );

	}

	children.sort( ( a, b ) => a.name.localeCompare( b.name ) );

	return children;

};

// 今 Hierarchy に見えている行を上から順に並べる（畳んだノードの子は入れない）。Shift+クリックの範囲選択に使う
export const getVisibleEntities = ( root: MXP.Entity, openNodes: Set<string> ): MXP.Entity[] => {

	const entities: MXP.Entity[] = [];

	const visit = ( entity: MXP.Entity ) => {

		entities.push( entity );

		if ( ! openNodes.has( entity.uuid ) ) return;

		for ( const child of getHierarchyChildren( entity ) ) {

			visit( child );

		}

	};

	visit( root );

	return entities;

};
