
import { MouseEvent, useCallback } from 'react';

import { Engine } from '../../../../../ts/Engine';
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

					if ( Engine.resources.getMaterial( name ) ) {

						alert( 'Material already exists' );
						return;

					}

					const data: { frag?: string } = {};

					if ( shader ) data.frag = shader;

					Engine.resources.addMaterial( name, data );
					closeAll();

				}} />
			</div>
		);

	}, [ pushContent, closeAll ] );

	return <div className={style.createBtn}>
		<Button onClick={onClickNew}>+ New</Button>
	</div>;

};
