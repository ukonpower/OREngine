
import * as MXP from 'maxpower';
import { MouseEvent, ReactNode, useCallback, useContext, useRef } from 'react';

import { MouseMenuContext } from '../../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { EditorContext } from '~/ts/components/gl/useEditor';
import { Button } from "~/ts/components/ui/Button";
import { InputGroup } from '~/ts/components/ui/InputGroup';
import { Picker } from '~/ts/components/ui/Picker';
import { ValueType } from '~/ts/components/ui/Property/Value';
import { ResouceComponentItem } from '~/ts/gl/Resources';

type ComponentAddProps= {
	entity: MXP.Entity
}

type ComponentCategoryGroupProps = {
	categoryName: string;
	componentList: ResouceComponentItem[];
	onClick: ( compItem: ResouceComponentItem ) =>void;
}

const ComponentCategoryGroup = ( { categoryName, componentList, onClick }: ComponentCategoryGroupProps ) => {

	const listItem = componentList.map( ( compItem ) => {

		return {
			label: compItem.component.name,
			onClick: () => {

				onClick( compItem );

			}
		};

	} ) || [];

	return <div className={style.catGroup}>
		<Picker label={categoryName} list={listItem}/>
	</div>;

};

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { glEditor } = useContext( EditorContext );
	const resources = glEditor && glEditor.resource;

	const argsInputCloseRef = useRef<() => void>();

	const onClickAdd = useCallback( ( e: MouseEvent ) => {

		if ( ! resources ) return;

		const onClickComponentItem = ( compItem: ResouceComponentItem ) => {

			if ( argsInputCloseRef.current ) {

				argsInputCloseRef.current();

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

				const argsMenu = pushContent && pushContent(
					<div className={style.argsInput}>
						<InputGroup initialValues={initialValues} onSubmit={( e ) => {

							props.entity.addComponent( new compItem.component( e ) ).initiator = 'user';

							closeAll && closeAll();

						}}/>
					</div>
				);

				if ( argsMenu && argsMenu.close ) {

					argsInputCloseRef.current = argsMenu.close;

				}

			} else {

				props.entity.addComponent( new compItem.component() ).initiator = 'user';

				closeAll && closeAll();

			}

		};

		const cagegoryGroupList: ReactNode[] = [];

		resources.comListCats.forEach( ( compList, catName ) => {

			cagegoryGroupList.push(
				<ComponentCategoryGroup key={catName} categoryName={catName} componentList={compList} onClick={onClickComponentItem} />
			);

		} );

		pushContent && pushContent(

			<div className={style.picker}>
				{cagegoryGroupList}
			</div>

		);

	}, [ pushContent, resources, props.entity, closeAll ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
