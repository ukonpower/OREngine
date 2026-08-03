
import { Engine } from 'orengine';
import { useEffect, useState } from 'react';

import { useOREditor } from '../OREditor/hooks/useOREditor';

import style from './index.module.scss';

export const Textures = () => {

	const { engine, editor } = useOREditor();
	const [ , setTick ] = useState( 0 );

	useEffect( () => {

		const onUpdate = () => {

			editor.assetPreviewManager?.invalidateAll();
			setTick( ( v ) => v + 1 );

		};

		const onPreviewReady = () => setTick( ( v ) => v + 1 );

		Engine.resources.on( "update", onUpdate );
		editor.assetPreviewManager?.on( "update", onPreviewReady );

		return () => {

			Engine.resources.off( "update", onUpdate );
			editor.assetPreviewManager?.off( "update", onPreviewReady );

		};

	}, [ engine, editor ] );

	const textures = Engine.resources.textureList;

	return <div className={style.textures}>
		{textures.map( ( t ) => {

			const url = editor.assetPreviewManager?.getTexturePreview( t.name );

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
