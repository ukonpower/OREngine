import { useOREditor } from '../../../hooks/useOREditor';

import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';


export const Hierarchy = () => {

	const { gui } = useOREditor();
	const rootEntity = gui.engine.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
