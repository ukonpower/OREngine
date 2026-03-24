
import { MouseEvent, useCallback } from 'react';

import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { useOREditor } from '../../../../hooks/useOREditor';
import { Button } from '../../../Button';
import { InputGroup } from '../../../InputGroup';

import style from './index.module.scss';

export const ComponentCreateForm = () => {

	const { pushContent, closeAll } = useMouseMenu();
	const { projectName } = useOREditor();

	const onClickNew = useCallback( ( _e: MouseEvent ) => {

		if ( ! pushContent || ! closeAll ) return;

		pushContent(
			<div className={style.form}>
				<InputGroup initialValues={{ directory: '', name: '' }} onSubmit={( values ) => {

					const dirPath = ( values.directory as string ).trim();
					const componentName = ( values.name as string ).trim();

					if ( ! componentName ) return;

					fetch( `/api/projects/${projectName}/components`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify( { dirPath: dirPath || undefined, componentName } ),
					} ).then( r => {

						if ( r.ok ) {

							closeAll();

						} else {

							r.json().then( data => alert( data.error ) );

						}

					} );

				}} />
			</div>
		);

	}, [ pushContent, closeAll, projectName ] );

	return <div className={style.createBtn}>
		<Button onClick={onClickNew}>+ New</Button>
	</div>;

};
