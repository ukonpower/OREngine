
import { MouseEvent, useCallback } from 'react';

import { Engine } from '../../../../../ts/Engine';
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

					if ( Engine.resources.getTextureResource( name ) ) {

						alert( 'Texture already exists' );
						return;

					}

					Engine.resources.addTextureResource( name, { resolution: [ 1024, 1024 ] } );
					closeAll();

				}} />
			</div>
		);

	}, [ pushContent, closeAll ] );

	return <div className={style.createBtn}>
		<Button onClick={onClickNew}>+ New</Button>
	</div>;

};
