
import { MouseEvent, useCallback } from 'react';

import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { Button } from '../../../Button';
import { InputGroup } from '../../../InputGroup';

import style from './index.module.scss';

export const MaterialCreateForm = () => {

	const { pushContent, closeAll } = useMouseMenu();

	const onClickNew = useCallback( ( _e: MouseEvent ) => {

		if ( ! pushContent || ! closeAll ) return;

		pushContent(
			<div className={style.form}>
				<InputGroup initialValues={{ name: '', shader: '' }} onSubmit={( values ) => {

					const name = ( values.name as string ).trim();
					const shader = ( values.shader as string ).trim();

					if ( ! name ) return;

					const body: any = { name };

					if ( shader ) body.shader = shader;

					fetch( '/api/materials', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify( body ),
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

	}, [ pushContent, closeAll ] );

	return <div className={style.createBtn}>
		<Button onClick={onClickNew}>+ New</Button>
	</div>;

};
