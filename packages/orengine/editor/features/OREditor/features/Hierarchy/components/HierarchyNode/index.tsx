import { KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as MXP from 'maxpower';
import { ArrowIcon, CameraIcon, CursorIcon, EyeIcon, LightIcon, ListItem, MeshIcon, Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useEntityAddMenuItems } from '../../../../hooks/useEntityAddMenuItems';
import { useOREditor } from '../../../../hooks/useOREditor';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';

import style from './index.module.scss';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
	openNodes: Set<string>;
	setNodeOpen: ( uuid: string, open: boolean ) => void;
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { editor, engine } = useOREditor();
	const [ selectedEntityId ] = useSerializableField<string>( editor, "selectedEntityId" );
	const selectedEntity = selectedEntityId !== undefined && engine.root.findEntityByUUID( selectedEntityId );
	const isSelected = Boolean( selectedEntity && selectedEntity.uuid == props.entity.uuid );

	const [ entityName ] = useSerializableField<string>( props.entity, "name" );
	const [ entityVisible, setEntityVisible ] = useSerializableField<boolean>( props.entity, "visible" );
	const [ unselectableIds, setUnselectableIds ] = useSerializableField<string[]>( editor, "unselectableEntityIds" );
	const [ childrenIdList ] = useSerializableField<string[]>( props.entity, "children" );

	const entitySelectable = ! ( unselectableIds || [] ).includes( props.entity.uuid );

	const childrens = ( childrenIdList || [] ).map( id => engine.root.findEntityByUUID( id ) ).filter( e => e !== undefined ) as MXP.Entity[];

	const depth = props.depth || 0;
	const sortedChildren = childrens && childrens.concat().sort( ( a, b ) => a.name.localeCompare( b.name ) ) || [];
	const hasChild = sortedChildren.length > 0;
	const offsetPx = depth * 20;

	const noEditable = props.entity.initiator == "script";

	// component icon

	const icon = useMemo( () => {

		const iconSize = 14;

		if ( props.entity.getComponent( MXP.Light ) ) return <LightIcon size={iconSize} />;
		if ( props.entity.getComponent( MXP.Camera ) ) return <CameraIcon size={iconSize} />;
		if ( props.entity.getComponent( MXP.Mesh ) ) return <MeshIcon size={iconSize} />;

		return null;

	}, [ props.entity ] );

	// click fold controls

	const open = props.openNodes.has( props.entity.uuid );

	const onClickFoldControls = useCallback( ( e: MouseEvent ) => {

		props.setNodeOpen( props.entity.uuid, ! open );

		e.stopPropagation();

	}, [ open, props ] );

	// click node

	const onClickNode = useCallback( () => {

		if ( ! editor ) return;

		editor.selectEntity( props.entity );

	}, [ editor, props.entity ] );

	// toggle visibility

	const onClickVisibility = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		if ( setEntityVisible ) {

			setEntityVisible( ! entityVisible );

		}

	}, [ entityVisible, setEntityVisible ] );

	// toggle selectable

	const onClickSelectable = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		const ids = new Set( unselectableIds || [] );

		if ( entitySelectable ) {

			ids.add( props.entity.uuid );

		} else {

			ids.delete( props.entity.uuid );

		}

		setUnselectableIds( Array.from( ids ) );

	}, [ entitySelectable, unselectableIds, setUnselectableIds, props.entity.uuid ] );

	// rename (編集中だけ input になる。null = 非編集)

	const [ editingName, setEditingName ] = useState<string | null>( null );

	// Escape で抜けたことを onBlur へ伝える目印。state だと blur が同じイベント処理内で
	// 走るぶん更新前の値しか見えないので ref で持つ
	const renameCancelled = useRef( false );

	const startRename = useCallback( () => {

		if ( noEditable ) return;

		setEditingName( props.entity.name );

	}, [ noEditable, props.entity ] );

	// F2（editor 側の "request/renameEntity"）はダブルクリックと同じ名前入力を開く。対象が自分のノードのときだけ応じる
	useEffect( () => {

		const onRequest = ( entity: MXP.Entity ) => {

			if ( entity !== props.entity ) return;

			startRename();

		};

		editor.on( "request/renameEntity", onRequest );

		return () => {

			editor.off( "request/renameEntity", onRequest );

		};

	}, [ editor, props.entity, startRename ] );

	// Enter / Escape はどちらも blur させて、確定処理を onBlur の1経路にまとめる
	const onKeyDownName = useCallback( ( e: KeyboardEvent<HTMLInputElement> ) => {

		if ( e.key === "Enter" ) {

			e.currentTarget.blur();

		}

		if ( e.key === "Escape" ) {

			renameCancelled.current = true;

			e.currentTarget.blur();

		}

	}, [] );

	const onBlurName = useCallback( () => {

		const cancelled = renameCancelled.current;

		renameCancelled.current = false;

		setEditingName( null );

		if ( cancelled || editingName === null ) return;

		const newName = editingName.trim();

		if ( newName === "" || newName === props.entity.name ) return;

		editor.api.setField( props.entity, "name", newName );

	}, [ editingName, editor, props.entity ] );

	// right click node

	const { open: openPopover, closeAll } = usePopover();
	const addMenuItems = useEntityAddMenuItems( props.entity );

	const onRightClickNode = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		if ( ! editor || noEditable ) return;

		editor.selectEntity( props.entity );

		const items: MenuItem[] = [
			{
				label: "Add Entity",
				children: addMenuItems,
			},
		];

		// 複製先は同じ親の下に置くので、親の無いルートは複製できない
		if ( props.entity.parent ) {

			items.push( {
				label: "Duplicate",
				onClick: () => {

					// Shift+D と違い、マウスが Hierarchy 上にあるのでモーダル変形には入らず選択だけで止める
					const duplicated = editor.api.duplicateEntity( props.entity );

					editor.selectEntity( duplicated );

					closeAll();

				},
			} );

		}

		items.push(
			{
				label: "Rename",
				onClick: () => {

					// F2 と同じ経路。メニューを閉じる更新と同じ commit で名前入力が autoFocus されるので、
					// 検索欄の除去より後にフォーカスが入る
					editor.emit( "request/renameEntity", [ props.entity ] );

					closeAll();

				},
			},
			{
				label: "Delete Entity",
				onClick: () => {

					editor.api.deleteEntity( props.entity );

					closeAll();

				},
			},
		);

		openPopover( <Menu title={props.entity.name} items={items} />, pointAnchor( e.clientX, e.clientY ) );

	}, [ editor, props.entity, openPopover, closeAll, noEditable, addMenuItems ] );

	let nameElm = <p>{entityName || "-"}</p>;

	if ( editingName !== null ) {

		nameElm = <input
			className={style.self_name_input}
			value={editingName}
			autoFocus
			onChange={( e ) => setEditingName( e.target.value )}
			onFocus={( e ) => e.currentTarget.select()}
			onKeyDown={onKeyDownName}
			onBlur={onBlurName}
			onClick={( e ) => e.stopPropagation()}
		/>;

	}

	return <div className={style.node} data-no_export={noEditable}>
		<ListItem className={style.self} style={{ paddingLeft: offsetPx }} onClick={onClickNode} onContextMenu={onRightClickNode} selected={isSelected}>
			<div className={style.fold} data-hnode_open={open}>
				{hasChild && <button className={style.fold_button} onClick={onClickFoldControls} ><ArrowIcon open={open}/></button> }
			</div>
			{icon && <div className={style.icon}>{icon}</div>}
			<div className={style.self_name} onDoubleClick={startRename}>
				{nameElm}
			</div>
			<button className={style.selectable} onClick={onClickSelectable} data-selectable={entitySelectable}><CursorIcon size={14} selectable={entitySelectable} /></button>
			<button className={style.visibility} onClick={onClickVisibility} data-visible={entityVisible !== false}><EyeIcon size={14} visible={entityVisible !== false} /></button>
			{! noEditable && <button className={style.menu} onClick={onRightClickNode}>⋯</button>}
		</ListItem>
		{hasChild && <div className={style.child} data-open={open} >
			{
				sortedChildren.map( item => {

					return <HierarchyNode key={item.uuid} entity={item} depth={depth + 1} openNodes={props.openNodes} setNodeOpen={props.setNodeOpen} />;

				} )
			}
			<div className={style.child_line} style={{ marginLeft: offsetPx + 4 }}></div>
		</div>}
	</div>;

};
