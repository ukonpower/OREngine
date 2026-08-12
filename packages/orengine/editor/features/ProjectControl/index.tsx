
import { useEffect, useState } from 'react';

import { SceneExporterProgress } from 'orengine/editor';

import { Block } from '../../components/primitives/Block';
import { Button } from '../../components/primitives/Button';
import { ArrowIcon } from '../../components/primitives/Icons/ArrowIcon';
import { useOREditor } from '../OREditor/hooks/useOREditor';

import style from './index.module.scss';

const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'default';

export const ProjectControl = () => {

	const { editor } = useOREditor();
	const [ exportProgress, setExportProgress ] = useState<SceneExporterProgress | null>( null );

	useEffect( () => {

		if ( ! editor ) return;

		const onExportUpdate = () => {

			setExportProgress( editor.exportProgress ? { ...editor.exportProgress } : null );

		};

		editor.on( "update/export", onExportUpdate );

		return () => {

			editor.off( "update/export", onExportUpdate );

		};

	}, [ editor ] );

	if ( ! editor ) return null;

	const isExporting = editor.isExporting;

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label={projectName} accordion >
				<Button onClick={() => {

					if ( editor ) {

						editor.save();

					}

				}}>Save</Button>
				<Button onClick={() => {

					window.location.href = '/';

				}}>Projects</Button>
				<div className={style.export}>
					<Button onClick={() => {

						if ( editor ) {

							editor.save();

							window.open( `/player`, '_blank' );

						}

					}} >Play <ArrowIcon /></Button>
					<Button onClick={() => {

						if ( editor && ! isExporting ) {

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
