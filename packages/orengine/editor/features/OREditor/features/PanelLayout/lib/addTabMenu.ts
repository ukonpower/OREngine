import type { PanelDefinition } from './types';
import type { TreeMenuBranch, TreeMenuItem } from '../../MouseMenu/components/TreeMenu';

// 追加できるパネル定義から「+」メニューの木を組む。category が "/" 区切りのメニューパスで、
// 省略した定義はルート直下に出る。並びは定義の宣言順で、同じ category は最初に現れた位置にまとめる
export function buildAddTabMenu( panels: PanelDefinition[], onSelect: ( def: PanelDefinition ) => void ): TreeMenuItem[] {

	const root: TreeMenuItem[] = [];

	for ( const def of panels ) {

		let items = root;

		if ( def.category ) {

			for ( const name of def.category.split( "/" ) ) {

				if ( name === "" ) continue;

				let branch: TreeMenuBranch | undefined = undefined;

				for ( const item of items ) {

					if ( item.label === name && "children" in item ) {

						branch = item;
						break;

					}

				}

				if ( ! branch ) {

					branch = { label: name, children: [] };
					items.push( branch );

				}

				items = branch.children;

			}

		}

		items.push( { label: def.title, onClick: () => onSelect( def ) } );

	}

	return root;

}
