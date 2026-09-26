import * as MXP from 'maxpower';
import { usePopover } from 'uipower';

import { useComponentMenuItems } from './useComponentMenuItems';
import { useOREditor } from './useOREditor';

import type { ResouceComponentItem } from 'orengine';
import type { MenuItem } from 'uipower';

// Mesh は出さない。Mesh の geometry / material はシーン JSON に載らない
// （ProjectSerializer はコンポーネントの SerializeField しか書き出さない）ため、
// エディタで足しても読み込み直すと形の無いエンティティに戻ってしまう
const EXCLUDE_COMPONENTS = [ MXP.Mesh ];

// parent の子を追加するメニュー項目を作る。先頭に Empty、その下に Add Component と同じコンポーネントの階層を並べる。
// Hierarchy の右クリックと Shift+A で同じ並びを出すために共有する。
// 生成したエンティティはすぐリネームできるよう選択状態にする
export const useEntityAddMenuItems = ( parent: MXP.Entity ): MenuItem[] => {

	const { editor } = useOREditor();
	const { closeAll } = usePopover();

	const create = ( name: string, components: ( typeof MXP.Component )[] ) => {

		const entity = editor.api.createEntity( parent, { name, components } );

		editor.api.selectEntity( entity );

		closeAll();

	};

	const onSelectComponent = ( compItem: ResouceComponentItem ) => {

		create( compItem.name, [ compItem.component ] );

	};

	const componentItems = useComponentMenuItems( onSelectComponent, EXCLUDE_COMPONENTS );

	const items: MenuItem[] = [
		{ label: "Empty", onClick: () => create( "Empty", [] ) },
	];

	for ( const item of componentItems ) {

		items.push( item );

	}

	return items;

};
