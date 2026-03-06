import { useOREditor } from '../../../hooks/useOREditor';

import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';


export const Hierarchy = () => {

	const { editor } = useOREditor();

	const rootEntity = editor.engine.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
