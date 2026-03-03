
import { ComponentGroup, ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import { useCallback } from 'react';

import { Block } from '../../../Block';
import { ComponentExplorerItem } from '../ComponentExplorerItem';

import style from './index.module.scss';

type ComponentExplorerGroupProps = {
	group: ComponentGroup;
	displayName?: string;
	isBuiltin: boolean;
	onSelect: ( item: ResouceComponentItem, path?: string ) => void;
	selected: ResouceComponentItem | null;
	parentPath?: string;
};

export const ComponentExplorerGroup = ( { group, displayName, isBuiltin, onSelect, selected, parentPath }: ComponentExplorerGroupProps ) => {

	const groupPath = parentPath ? `${parentPath}/${group.name}` : group.name;

	const handleSelect = useCallback( ( item: ResouceComponentItem ) => {

		const componentPath = isBuiltin ? undefined : `${groupPath}/${item.name}`;
		onSelect( item, componentPath );

	}, [ groupPath, isBuiltin, onSelect ] );

	return <div className={style.group}>
		<Block label={displayName || group.name} accordion defaultClose>
			{group.child.map( ( child, i ) => {

				if ( 'child' in child ) {

					return <ComponentExplorerGroup
						key={i}
						group={child}
						isBuiltin={isBuiltin}
						onSelect={onSelect}
						selected={selected}
						parentPath={groupPath}
					/>;

				}

				return <ComponentExplorerItem
					key={i}
					item={child}
					isBuiltin={isBuiltin}
					selected={selected === child}
					onSelect={handleSelect}
					componentPath={isBuiltin ? undefined : `${groupPath}/${child.name}`}
				/>;

			} )}
		</Block>
	</div>;

};
