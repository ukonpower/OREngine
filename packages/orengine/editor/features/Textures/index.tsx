
import { Engine } from 'orengine';
import { useEffect, useState } from 'react';

import { useOREditor } from '../OREditor/hooks/useOREditor';

import style from './index.module.scss';

export const Textures = () => {

	const { engine } = useOREditor();
	const [ , setTick ] = useState( 0 );

	useEffect( () => {

		const onUpdate = () => {

			engine.assetPreviewManager.invalidateAll();
			setTick( ( v ) => v + 1 );

		};

		Engine.resources.on( "update", onUpdate );
		Engine.resources.on( "update/texture", onUpdate );

		return () => {

			Engine.resources.off( "update", onUpdate );
			Engine.resources.off( "update/texture", onUpdate );

		};

	}, [ engine ] );

	const textures = Engine.resources.textureList;

	return <div className={style.textures}>
		{textures.map( ( t ) => {

			const url = engine.assetPreviewManager.getTexturePreview( t.name );

			return <div key={t.name} className={style.item}>
				<div className={style.preview}>
					{url
						? <img src={url} className={style.img} />
						: <div className={style.placeholder} />}
				</div>
				<div className={style.name}>{t.name}</div>
			</div>;

		} )}
	</div>;

};
