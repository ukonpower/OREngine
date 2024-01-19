import * as MXP from 'maxpower';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { GLContext } from '../useGL';

export const EditorContext = createContext<HooksContext<typeof useEditor>>( {} );

export const useEditor = () => {

	const { gl } = useContext( GLContext );

	// reflesh

	const [ refleshCounter, setRefleshCounter ] = useState( 0 );
	const refleshCounterRef = useRef<number>( 0 );
	refleshCounterRef.current = refleshCounter;

	const reflesh = useCallback( () => {

		setRefleshCounter( refleshCounterRef.current + 1 );

	}, [] );

	// selected

	const [ selected, setSelected ] = useState<MXP.Entity | null>( null );

	const onChangeSelected = useCallback( ( entity: MXP.Entity ) => {

		setSelected( entity );

	}, [] );

	useEffect( () => {

		if ( ! gl ) return;

		gl.editor.on( "control/select", onChangeSelected );

		return () => {

			gl.editor.off( "control/select", onChangeSelected );

		};

	}, [ gl, onChangeSelected ] );

	// root

	const [ rootEntity, setRootEntity ] = useState<MXP.Entity>();

	useEffect( () => {

		if ( ! gl ) return;

		setRootEntity( gl.scene );

		gl.editor.on( "graph/update", reflesh );

		return () => {

			gl.editor.off( "graph/update", reflesh );

		};

	}, [ gl, reflesh ] );

	return {
		gl,
		selected,
		rootEntity,
		counter: refleshCounter
	};

};
