import { useCallback } from 'react';

import { ENTITY_PRESETS } from 'orengine/editor';
import { usePopover } from 'uipower';

import { useOREditor } from './useOREditor';

import type * as MXP from 'maxpower';
import type { MenuItem } from 'uipower';

// プリセットの追加項目を作る。Hierarchy の右クリックと Shift+A で同じ並びを出すために共有する。
// 生成したエンティティはすぐリネームできるよう選択状態にする
export const useEntityAddMenuItems = () => {

	const { editor } = useOREditor();
	const { closeAll } = usePopover();

	return useCallback( ( parent: MXP.Entity ): MenuItem[] => {

		const items: MenuItem[] = [];

		for ( const preset of ENTITY_PRESETS ) {

			items.push( {
				label: preset.name,
				onClick: () => {

					const entity = editor.api.createEntity( parent, preset );

					editor.api.selectEntity( entity );

					closeAll();

				},
			} );

		}

		return items;

	}, [ editor, closeAll ] );

};
