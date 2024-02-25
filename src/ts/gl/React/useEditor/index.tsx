import * as MXP from 'maxpower';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { TGLContext } from '../useGL';

export const EditorContext = createContext<HooksContext<typeof useEditor>>( {} );

export const useEditor = ( glContext: TGLContext ) => {

	const { glEditor } = glContext;

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

		if ( glEditor ) {

			glEditor.on( "control/select", onChangeSelected );

		}

		return () => {

			if ( glEditor ) {

				glEditor.off( "control/select", onChangeSelected );

			}

		};

	}, [ glEditor, onChangeSelected ] );

	// root

	useEffect( () => {

		if ( ! glEditor ) return;

		glEditor.on( "changed", reflesh );

		return () => {

			glEditor.off( "changed", reflesh );

		};

	}, [ glEditor, reflesh ] );

	return {
		glEditor,
		active,
		reflesh,
	};

};
