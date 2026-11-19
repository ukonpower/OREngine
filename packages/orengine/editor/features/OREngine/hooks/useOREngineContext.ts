import React, { useCallback, useEffect } from "react";

import { OREngineProjectData } from "orengine";

import { Engine } from "../../../../core/Engine";
import { completeExportedProject, createEngine, writeRendererType, type RendererType } from "../../../lib/RendererType";

type OREngineContextParams = {
	// エンジンを作るレンダラーの種類。途中では変えられない（canvas はレンダラーが作るので、エンジンを残したままレンダラーだけ差し替えることはできない）。
	// 種類を変えるときは、このフックを使うコンポーネントごと作り直す（OREngineProvider）
	rendererType: RendererType;
	// エディタの中でシーンのデータを差し替えるときに呼ぶ（レンダラーの種類の切り替え）。渡されなければ切り替えられない
	onProjectChange?: ( project: OREngineProjectData ) => void;
}

export const useOREngineContext = ( params: OREngineContextParams ) => {

	const { rendererType, onProjectChange } = params;

	const [ engine, setEngine ] = React.useState<Engine>( () => createEngine( rendererType ) );
	const engineRef = React.useRef<Engine>( engine );
	engineRef.current = engine;

	useEffect( () => {

		if ( ! engineRef.current.disposed ) return;

		setEngine( createEngine( rendererType ) );

	}, [ rendererType ] );

	useEffect( () => {

		return () => {

			engine.dispose();

		};


	}, [ engine ] );

	const load = useCallback( ( data: OREngineProjectData | undefined ) => {

		if ( data ) {

			engine.load( data );

		}

	}, [ engine ] );

	// 今のシーンの内容を保ったまま、レンダラーの種類だけ変えたデータに差し替える
	const changeRendererType = useCallback( ( type: RendererType ) => {

		if ( ! onProjectChange ) return;

		const project = engine.serialize( { mode: "export" } ) as OREngineProjectData;

		completeExportedProject( engine, project );
		writeRendererType( project, type );

		onProjectChange( project );

	}, [ engine, onProjectChange ] );

	return {
		engine,
		load,
		rendererType,
		canChangeRendererType: onProjectChange !== undefined,
		changeRendererType,
	};

};
