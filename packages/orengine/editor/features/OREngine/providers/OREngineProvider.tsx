
import { useEffect, useRef } from "react";

import { OREngineProjectData } from "orengine";

import { Engine } from "../../../../core/Engine";
import { OREngineContext } from "../contexts/OREngineContext";
import { useOREngineContext } from "../hooks/useOREngineContext";

export const OREngineProvider: React.FC<{children?: React.ReactNode, project:OREngineProjectData | undefined, onEngineInit?: ( engine: Engine ) => void }> = ( props ) => {

	const context = useOREngineContext();
	const { engine } = context;

	// 呼び出し元がインライン関数を渡しても engine 生成時のみ発火させる
	const onEngineInitRef = useRef( props.onEngineInit );
	onEngineInitRef.current = props.onEngineInit;

	useEffect( () => {

		onEngineInitRef.current?.( engine );

	}, [ engine ] );

	useEffect( () => {

		if ( props.project ) {

			engine.load( props.project );

		} else {

			engine.init();

		}

	}, [ engine, props.project ] );

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};
