import { useOREngineGUI } from '~/tsx/components/OREngineGUI';
import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';

export const Hierarchy = () => {

	const { gui } = useOREngineGUI();
	const rootEntity = gui.engine.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
