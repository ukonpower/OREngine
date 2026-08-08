import { useCallback, useEffect, useState } from 'react';

import { useOREditor } from '../OREditor/hooks/useOREditor';
import { useSerializableField } from '../SerializableField/hooks/useSerializableProps';

import { HierarchyNode } from './components/HierarchyNode';
import style from './index.module.scss';

// 開閉状態は UI 状態なので editor.json ではなく localStorage に持つ（開いているノードの uuid 一覧）
const OPEN_NODES_STORAGE_KEY = "hierarchyOpenNodes";

// localStorage から開いているノードの uuid 集合を読む
const loadOpenNodes = (): Set<string> => {

	try {

		const raw = localStorage.getItem( OPEN_NODES_STORAGE_KEY );

		if ( raw ) return new Set( JSON.parse( raw ) as string[] );

	} catch ( e ) { /* 壊れた値は初期状態として扱う */ }

	return new Set();

};

const saveOpenNodes = ( nodes: Set<string> ) => {

	localStorage.setItem( OPEN_NODES_STORAGE_KEY, JSON.stringify( Array.from( nodes ) ) );

};

export const Hierarchy = () => {

	const { editor, engine } = useOREditor();
	const [ selectedEntityId ] = useSerializableField<string>( editor, "selectedEntityId" );

	const rootEntity = engine.root;

	// 各ノードの開閉はツリー全体で1つの集合として持つ（選択に追従して外から開けるようにするため）
	const [ openNodes, setOpenNodes ] = useState<Set<string>>( loadOpenNodes );

	const setNodeOpen = useCallback( ( uuid: string, open: boolean ) => {

		setOpenNodes( ( prev ) => {

			const next = new Set( prev );

			if ( open ) {

				next.add( uuid );

			} else {

				next.delete( uuid );

			}

			saveOpenNodes( next );

			return next;

		} );

	}, [] );

	// ビューポートやギズモから選択されたエンティティが折りたたみの中に隠れていると見えないので、先祖をすべて開く
	useEffect( () => {

		if ( ! selectedEntityId ) return;

		const selected = rootEntity.findEntityByUUID( selectedEntityId );

		if ( ! selected ) return;

		const ancestors: string[] = [];

		let parent = selected.parent;

		while ( parent ) {

			ancestors.push( parent.uuid );
			parent = parent.parent;

		}

		setOpenNodes( ( prev ) => {

			if ( ancestors.every( uuid => prev.has( uuid ) ) ) return prev;

			const next = new Set( prev );

			ancestors.forEach( uuid => next.add( uuid ) );

			saveOpenNodes( next );

			return next;

		} );

	}, [ selectedEntityId, rootEntity ] );

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode entity={rootEntity} openNodes={openNodes} setNodeOpen={setNodeOpen} />}
	</div>;

};
