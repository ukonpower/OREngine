import { useContext } from "react";

import { HierarchyNode } from './HierarchyNode';
import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const Hierarchy = () => {

	const { gl } = useContext( EditorContext );
	const rootEntity = gl?.scene.root;

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} />}
	</div>;

};
