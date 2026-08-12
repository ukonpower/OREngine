import { useCallback } from 'react';

import { SelectList } from 'maxpower';

import { InputSelect } from '../../../../../../components/ui/Input/InputSelect';
import { useOREditor } from '../../../../hooks/useOREditor';

import style from './index.module.scss';

type InputResourceSelectProps<T> = {
	value: T;
	selectList: SelectList | ( () => SelectList );
	resourceType: "material" | "texture" | "shader";
	onChange?: ( value: T ) => void;
};

export const InputResourceSelect = <T extends string | number, >( props: InputResourceSelectProps<T> ) => {

	const { editor } = useOREditor();

	const onClickEdit = useCallback( () => {

		if ( ! props.value ) return;

		editor.setField( "navigateAsset", {
			assetType: props.resourceType,
			name: String( props.value ),
		} );

		editor.setField( "selectedAsset", {
			name: String( props.value ),
			assetType: props.resourceType,
		} );

	}, [ editor, props.value, props.resourceType ] );

	return <div className={style.inputResourceSelect}>
		<div className={style.select}>
			<InputSelect
				value={props.value}
				selectList={props.selectList}
				onChange={props.onChange}
			/>
		</div>
		{props.value && <button
			className={style.editButton}
			onClick={onClickEdit}
			title="Edit resource"
		>
			✎
		</button>}
	</div>;

};
