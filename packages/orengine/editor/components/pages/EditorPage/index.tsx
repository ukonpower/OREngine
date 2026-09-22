import { useCallback, useEffect, useState } from "react";

import * as MXP from 'maxpower';
import { OREngineProjectData } from "orengine";
import { Engine } from "orengine";

import { OREditor, type EditorCustomTabs, type SceneSelection } from "../../../features/OREditor";
import { OREngineProvider } from "../../../features/OREngine/providers/OREngineProvider";

import "../../../styles/style.scss";

export interface EditorPageProps {
	projectName?: string;
	sceneData?: OREngineProjectData;
	editorData?: MXP.SerializeField;
	initResourceInstances: ( engine: Engine ) => void;
	customTabs?: EditorCustomTabs;
	onBeforeSave?: () => void;
}

// 最後に開いていたシーン名は editor.json に持つ。
// エディタ本体（lib）はファイルを知らないので、キーの付け外しはこのページが行う
const EDITOR_SCENE_KEY = 'scene';

const fetchJson = async <T, >( url: string ): Promise<T | null> => {

	try {

		const res = await fetch( url );

		if ( ! res.ok ) return null;

		return await res.json() as T;

	} catch {

		return null;

	}

};

const postJson = ( url: string, body: unknown ) => {

	return fetch( url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify( body ),
	} );

};

// 新規シーンの初期内容。renderer / timeline は省略するとエンジンの既定値になる
const emptySceneData = ( name: string ): OREngineProjectData => ( {
	name,
	scene: { name: 'Root', uuid: '0' },
} );

export const EditorPage = ( props: EditorPageProps ) => {

	const projectName = props.projectName ?? 'DefaultProject';
	const apiBase = `/api/projects/${projectName}`;

	const [ projectData, setProjectData ] = useState<OREngineProjectData | undefined>( props.sceneData );
	const [ editorData, setEditorData ] = useState<MXP.SerializeField | undefined>( props.editorData );
	const [ sceneNames, setSceneNames ] = useState<string[]>( [] );
	const [ sceneName, setSceneName ] = useState<string | null>( null );

	const openScene = useCallback( async ( name: string ) => {

		const data = await fetchJson<OREngineProjectData>( `${apiBase}/scenes/${name}` );

		if ( ! data ) return;

		setSceneName( name );
		setProjectData( data );

	}, [ apiBase ] );

	// 起動時: editor.json に残っている前回のシーン名を優先し、無ければ一覧の先頭を開く
	useEffect( () => {

		if ( props.sceneData ) return;

		( async () => {

			const [ editor, names ] = await Promise.all( [
				fetchJson<MXP.SerializeField>( `${apiBase}/editor` ),
				fetchJson<string[]>( `${apiBase}/scenes` ),
			] );

			if ( editor ) {

				setEditorData( editor );

			}

			const list = names ?? [];
			setSceneNames( list );

			if ( list.length === 0 ) return;

			let initial = list[ 0 ];
			const last = editor ? editor[ EDITOR_SCENE_KEY ] : undefined;

			if ( typeof last === 'string' && list.includes( last ) ) {

				initial = last;

			}

			await openScene( initial );

		} )();

	}, [ props.sceneData, apiBase, openScene ] );

	const createScene = useCallback( async ( name: string ) => {

		const res = await postJson( `${apiBase}/scenes/${name}`, emptySceneData( name ) );

		if ( ! res.ok ) return;

		const names = await fetchJson<string[]>( `${apiBase}/scenes` );

		if ( names ) {

			setSceneNames( names );

		}

		await openScene( name );

	}, [ apiBase, openScene ] );

	const deleteScene = useCallback( async ( name: string ) => {

		const res = await fetch( `${apiBase}/scenes/${name}`, { method: "DELETE" } );

		if ( ! res.ok ) return;

		const names = await fetchJson<string[]>( `${apiBase}/scenes` ) ?? [];
		setSceneNames( names );

		// 開いているシーンを消したときは、残っているシーンへ移る
		if ( name === sceneName && names.length > 0 ) {

			await openScene( names[ 0 ] );

		}

	}, [ apiBase, sceneName, openScene ] );

	const scenes: SceneSelection = {
		names: sceneNames,
		current: sceneName,
		onSelect: openScene,
		onCreate: createScene,
		onDelete: deleteScene,
	};

	return (
		<OREngineProvider project={projectData} onEngineInit={( engine ) => {

			props.initResourceInstances( engine );

		}} >
			<OREditor editorData={editorData} projectName={projectName} customTabs={props.customTabs} scenes={scenes} onSave={( savedScene, savedEditor ) => {

				props.onBeforeSave?.();

				if ( sceneName ) {

					postJson( `${apiBase}/scenes/${sceneName}`, savedScene );

				}

				postJson( `${apiBase}/editor`, { ...savedEditor, [ EDITOR_SCENE_KEY ]: sceneName } );

			}} />
		</OREngineProvider>
	);

};
