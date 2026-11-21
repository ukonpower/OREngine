import { useEffect, useRef } from "react";

import { OREngineProjectData } from "orengine";

import { Engine } from "../../../../core/Engine";
import { rememberRendererSettings, rendererTypeOfProject, type RendererType } from "../../../lib/RendererType";
import { OREngineContext } from "../contexts/OREngineContext";
import { useOREngineContext } from "../hooks/useOREngineContext";

type OREngineProviderProps = {
	children?: React.ReactNode;
	project: OREngineProjectData | undefined;
	onEngineInit?: ( engine: Engine ) => void;
	// エディタの中でシーンのデータを差し替えるときに呼ぶ（レンダラーの種類の切り替え）。渡した project を返ってきたデータに置き換える
	onProjectChange?: ( project: OREngineProjectData ) => void;
}

// 1つの種類のレンダラーでエンジンを作り、シーンを読み込む
const OREngineProviderBody: React.FC<OREngineProviderProps & { rendererType: RendererType }> = ( props ) => {

	const context = useOREngineContext( { rendererType: props.rendererType, onProjectChange: props.onProjectChange } );
	const { engine } = context;

	// 呼び出し元がインライン関数を渡しても engine 生成時のみ発火させる
	const onEngineInitRef = useRef( props.onEngineInit );
	onEngineInitRef.current = props.onEngineInit;

	useEffect( () => {

		onEngineInitRef.current?.( engine );

	}, [ engine ] );

	useEffect( () => {

		rememberRendererSettings( engine, props.project );

		if ( props.project ) {

			engine.load( props.project );

		} else {

			engine.init();

		}

	}, [ engine, props.project ] );

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};

export const OREngineProvider: React.FC<OREngineProviderProps> = ( props ) => {

	const rendererType = rendererTypeOfProject( props.project );

	// シーンの指定するレンダラーの種類が変わったら、エンジンとその下のエディタを丸ごと作り直す（key が変わると配下が作り直される）。
	// エディタはエンジンに結び付いて作られるので、ページを開いた直後と同じ順（エンジン → エディタ → シーンの読み込み）でやり直す
	return <OREngineProviderBody key={rendererType} rendererType={rendererType} {...props} />;

};
