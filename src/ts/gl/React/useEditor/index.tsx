import * as MXP from 'maxpower';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { TGLContext } from '../useGL';

export const EditorContext = createContext<HooksContext<typeof useEditor>>( {} );

export const useEditor = ( glContext: TGLContext ) => {

	const { gl } = glContext;
	const editor = gl?.editor;

	// reflesh

	const [ refleshCounter, setRefleshCounter ] = useState( 0 );
	const refleshCounterRef = useRef<number>( 0 );
	refleshCounterRef.current = refleshCounter;

	const reflesh = useCallback( () => {

		setRefleshCounter( refleshCounterRef.current + 1 );

	}, [] );

	// selected

	const [ active, setSelected ] = useState<MXP.Entity | null>( null );

	const onChangeSelected = useCallback( ( entity: MXP.Entity ) => {

		setSelected( entity );

	}, [] );

	useEffect( () => {

		if ( editor ) {

			editor.on( "control/select", onChangeSelected );

		}

		return () => {

			if ( editor ) {

				editor.off( "control/select", onChangeSelected );

			}

		};

	}, [ editor, onChangeSelected ] );

	// root

	useEffect( () => {

		if ( ! gl ) return;

		gl.editor.on( "changed", reflesh );

		return () => {

			gl.editor.off( "changed", reflesh );

		};

	}, [ gl, reflesh ] );

	return {
		gl,
		editor,
		active,
		reflesh,
	};

};
