import * as MXP from 'maxpower';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { EditorResources } from '../../Editor/EditorResources';
import { GLContext } from '../useGL';

export const EditorContext = createContext<HooksContext<typeof useEditor>>( {} );

export const useEditor = () => {

	const { gl } = useContext( GLContext );

	const [ resources, setEditorResources ] = useState<EditorResources>();

	useEffect( () => {

		if ( gl ) {

			setEditorResources( gl.editor.resources );

		}

	}, [ gl ] );

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

		gl.editor.on( "changed", reflesh );

		return () => {

			gl.editor.off( "changed", reflesh );

		};

	}, [ gl, reflesh ] );

	// blidge

	const [ blidge, setBLidge ] = useState<MXP.BLidge>();

	useEffect( ()=> {

		if ( gl ) {

			setBLidge( gl.editor.blidge );

		} else {

			setBLidge( undefined );

		}

	}, [ gl ] );

	return {
		gl,
		resources,
		active,
		rootEntity,
		blidge,
		refleshCounter,
		reflesh
	};

};
