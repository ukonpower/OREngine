import { useContext } from "react";

import { EditorContext } from "../../gl/useEditor";

import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';


export const Hierarchy = () => {

	const { glEditor } = useContext( EditorContext );
	const rootEntity = glEditor?.scene.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
