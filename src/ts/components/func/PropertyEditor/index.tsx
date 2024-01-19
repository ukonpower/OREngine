import { useContext } from 'react';

import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const PropertyEditor = () => {

	const { selected } = useContext( EditorContext );

	return <div className={style.property}>
		{
			selected && <div className={style.content}>
				{selected.name}
			</div>
		}
	</div>;


};
