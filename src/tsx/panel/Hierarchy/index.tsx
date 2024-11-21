import { useOREngineGUI } from '~/tsx/components/OREngineGUI';
import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';

export const Hierarchy = () => {

	const { editor } = useOREngineGUI();
	const rootEntity = editor.engine.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
