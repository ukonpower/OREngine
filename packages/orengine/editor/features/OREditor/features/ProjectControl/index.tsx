
import { useEffect, useState } from 'react';

import { SceneExporterProgress } from 'orengine/editor';

import { Block } from '../../../../components/ui/Block';
import { Button } from '../../../../components/ui/Button';
import { ArrowIcon } from '../../../../components/ui/Icons/ArrowIcon';
import { InputSelect } from '../../../../components/ui/Input';
import { useOREditor } from '../../hooks/useOREditor';

import style from './index.module.scss';

const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'default';

// シーン名はそのままファイル名になるので、サーバー側の制限と同じ文字だけを通す
const SCENE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;

export const ProjectControl = () => {

	const { editor, scenes } = useOREditor();
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

	const onCreateScene = () => {

		if ( ! scenes ) return;

		const name = window.prompt( 'New scene name' );

		if ( ! name ) return;

		if ( ! SCENE_NAME_PATTERN.test( name ) ) {

			window.alert( 'Scene name must be alphanumeric, "-" or "_"' );
			return;

		}

		if ( scenes.names.includes( name ) ) {

			window.alert( `Scene "${name}" already exists` );
			return;

		}

		scenes.onCreate( name );

	};

	let sceneElm = null;

	if ( scenes ) {

		sceneElm = <div className={style.scene}>
			<div className={style.sceneSelect}>
				<InputSelect value={scenes.current ?? ''} selectList={scenes.names} onChange={( name ) => {

					scenes.onSelect( name );

				}} />
			</div>
			<Button onClick={onCreateScene}>New</Button>
		</div>;

	}

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label={projectName} accordion >
				{sceneElm}
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
