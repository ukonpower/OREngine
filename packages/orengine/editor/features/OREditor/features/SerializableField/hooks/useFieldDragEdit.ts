import { useRef } from 'react';

import * as MXP from 'maxpower';
import { type FieldEdit } from 'orengine/editor';

import { useOREditor } from '../../../hooks/useOREditor';

// フィールドの入力を EditorAPI へ流す。ドラッグ中は beginEdit の1編集にまとめ、確定で undo 1回ぶん、取り消しなら履歴に積まない
export const useFieldDragEdit = ( target: MXP.Serializable, path: string ) => {

	const { editor } = useOREditor();

	const editRef = useRef<FieldEdit | null>( null );

	const onChange = ( value: MXP.SerializeFieldValue ) => {

		if ( editRef.current ) {

			editRef.current.set( value );

		} else {

			editor.api.setField( target, path, value );

		}

	};

	const onDragStart = () => {

		editRef.current = editor.api.beginEdit( target, path );

	};

	const onDragEnd = () => {

		if ( editRef.current ) editRef.current.commit();

		editRef.current = null;

	};

	const onDragCancel = () => {

		if ( editRef.current ) editRef.current.cancel();

		editRef.current = null;

	};

	return { onChange, onDragStart, onDragEnd, onDragCancel };

};
