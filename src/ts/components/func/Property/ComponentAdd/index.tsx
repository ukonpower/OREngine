
import * as MXP from 'maxpower';
import { MouseEvent, ReactNode, useCallback, useContext, useRef, useState } from 'react';

import { MouseMenuContext } from '../../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { Button } from "~/ts/components/ui/Button";
import { InputGroup } from '~/ts/components/ui/InputGroup';
import { Picker } from '~/ts/components/ui/Picker';
import { ValueType } from '~/ts/components/ui/Property/Value';
import { EditorContext } from '~/ts/gl/React/useEditor';
import { ResouceComponentItem } from '~/ts/gl/Scene/Resources';

type ComponentAddProps= {
	entity: MXP.Entity
}

const getPickerCategory = ( name: string, componentList: ResouceComponentItem[], onClick: ( compItem: ResouceComponentItem ) =>void ) => {

	const listItem = componentList.map( ( compItem ) => {

		return {
			label: compItem.component.name,
			onClick: () => {

				onClick( compItem );

			}
		};

	} ) || [];

	return <Picker list={listItem}/>;

};

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { editor } = useContext( EditorContext );
	const resources = editor?.resource;

	const currentContentRef = useRef<() => void>();

	const onClickAdd = useCallback( ( e: MouseEvent ) => {

		const onClickComponentItem = ( compItem: ResouceComponentItem ) => {

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

							props.entity.addComponent( compItem.key, component );

							closeAll && closeAll();

						}}/>
					</div>
				);

				if ( menuItem && menuItem.close ) {

					currentContentRef.current = menuItem.close;

				}

			} else {

				props.entity.addComponent( compItem.key, new compItem.component() );

				closeAll && closeAll();

			}

		};

		const pickerList: ReactNode[] = [];

		resources && resources.componentListCategrized.forEach( ( compList, catName ) => {


			pickerList.push(
				<div className="">
					{catName}
					{getPickerCategory( catName, compList, onClickComponentItem )}
				</div>
			);

		} );

		pushContent && pushContent(

			<div className={style.picker}>
				{pickerList}
			</div>
		);

	}, [ pushContent, resources, props.entity, closeAll ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
