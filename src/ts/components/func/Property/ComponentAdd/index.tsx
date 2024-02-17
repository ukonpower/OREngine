
import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useContext, useRef, useState } from 'react';

import { MouseMenuContext } from '../../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { Button } from "~/ts/components/ui/Button";
import { InputGroup } from '~/ts/components/ui/InputGroup';
import { Picker } from '~/ts/components/ui/Picker';
import { ValueType } from '~/ts/components/ui/Property/Value';
import { EditorContext } from '~/ts/gl/React/useEditor';

type ComponentAddProps= {
	entity: MXP.Entity
}

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { editor } = useContext( EditorContext );
	const resources = editor?.resource;

	const currentContentRef = useRef<() => void>();

	const onClickAdd = useCallback( ( e: MouseEvent ) => {

		const listItem = resources?.componentList.map( ( compItem ) => {

			return {
				label: compItem.component.name,
				onClick: () => {

					if ( currentContentRef.current ) {

						currentContentRef.current();

					}

					if ( compItem.defaultArgs ) {

						const initialValues: { [key: string]: ValueType} = {};

						const args = compItem.defaultArgs;
						const propKeys = Object.keys( args );

						for ( let i = 0; i < propKeys.length; i ++ ) {

							const key = propKeys[ i ];
							const prop = args[ key ];

							initialValues[ key ] = prop;

						}

						const menuItem = pushContent && pushContent(
							<div className={style.argsInput}>
								<InputGroup initialValues={initialValues} onSubmit={( e ) => {

									const component = new compItem.component( e );

									props.entity.addComponent( compItem.name, component );

									closeAll && closeAll();

								}}/>
							</div>
						);

						if ( menuItem && menuItem.close ) {

							currentContentRef.current = menuItem.close;

						}

					} else {

						props.entity.addComponent( compItem.name, new compItem.component() );

						closeAll && closeAll();

					}

				}
			};

		} ) || [];

		pushContent && pushContent(
			<div className={style.picker}>
				<Picker list={listItem}/>
			</div>
		);

	}, [ pushContent, resources, props.entity, closeAll ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
