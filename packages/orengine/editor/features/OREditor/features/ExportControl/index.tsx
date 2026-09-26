import { useEffect, useState } from 'react';

import { SceneExporterProgress } from 'orengine/editor';
import { Block, Button } from 'uipower';

import { useOREditor } from '../../hooks/useOREditor';

import style from './index.module.scss';

// シーンを動画として書き出す。書き出す長さと fps は Timeline の設定をそのまま使う
export const ExportControl = () => {

	const { editor } = useOREditor();
	const [ exportProgress, setExportProgress ] = useState<SceneExporterProgress | null>( null );

	useEffect( () => {

		const onExportUpdate = () => {

			setExportProgress( editor.exportProgress ? { ...editor.exportProgress } : null );

		};

		editor.on( "update/export", onExportUpdate );

		return () => {

			editor.off( "update/export", onExportUpdate );

		};

	}, [ editor ] );

	return <div className={style.exportControl}>
		<div className={style.exportControl_inner}>
			<Block label="MP4" accordion>
				<div className={style.export}>
					<Button onClick={() => {

						if ( ! editor.isExporting ) {

							editor.exportMP4();

						}

					}}>{ exportProgress
							? `Exporting... ${ Math.floor( exportProgress.current / exportProgress.total * 100 ) }%`
							: 'Export MP4' }</Button>
				</div>
			</Block>
		</div>
	</div>;

};
