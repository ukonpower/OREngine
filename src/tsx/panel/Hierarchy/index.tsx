import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';

import { useOREditor } from "~/tsx/gl/OREditor";


export const Hierarchy = () => {

	const { editor } = useOREditor();
	const rootEntity = editor.engine.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
