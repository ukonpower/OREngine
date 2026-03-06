
import { MouseEvent, useCallback } from 'react';

import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { Button } from '../../../Button';
import { InputGroup } from '../../../InputGroup';

import style from './index.module.scss';

export const TextureCreateForm = () => {

	const { pushContent, closeAll } = useMouseMenu();

	const onClickNew = useCallback( ( _e: MouseEvent ) => {

		if ( ! pushContent || ! closeAll ) return;

		pushContent(
			<div className={style.form}>
				<InputGroup initialValues={{ name: '' }} onSubmit={( values ) => {

					const name = ( values.name as string ).trim();

					if ( ! name ) return;

					fetch( '/api/textures', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify( { name, resolution: [ 1024, 1024 ] } ),
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
