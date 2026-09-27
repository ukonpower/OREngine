import { KeyboardEvent, MouseEvent, PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as MXP from 'maxpower';
import { ArrowIcon, CameraIcon, CursorIcon, EyeIcon, LightIcon, ListItem, MeshIcon, Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useEntityAddMenuItems } from '../../../../hooks/useEntityAddMenuItems';
import { useOREditor } from '../../../../hooks/useOREditor';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';
import { getHierarchyChildren } from '../../lib/entityTree';

import style from './index.module.scss';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
	openNodes: Set<string>;
	setNodeOpen: ( uuid: string, open: boolean ) => void;
	// ドラッグ中に落とすと親になる行の uuid
	dropTargetId: string | null;
	// 行を押したとき。クリック（選択）とドラッグ（親の付け替え）の見分けは Hierarchy が行う
	onNodePointerDown: ( e: PointerEvent, entity: MXP.Entity ) => void;
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { editor } = useOREditor();
	const [ activeEntityId ] = useSerializableField<string | null>( editor, "selectedEntityId" );
	const [ selectedEntityIds ] = useSerializableField<string[]>( editor, "selectedEntityIds" );
	const isSelected = ( selectedEntityIds || [] ).includes( props.entity.uuid );
	const isActive = activeEntityId === props.entity.uuid;

	const [ entityName ] = useSerializableField<string>( props.entity, "name" );
	const [ entityVisible, setEntityVisible ] = useSerializableField<boolean>( props.entity, "visible" );
	const [ unselectableIds, setUnselectableIds ] = useSerializableField<string[]>( editor, "unselectableEntityIds" );
	// 子の増減で描き直すために購読する（並べる子は entity.children から引く）
	useSerializableField<string[]>( props.entity, "children" );

	const entitySelectable = ! ( unselectableIds || [] ).includes( props.entity.uuid );

	const depth = props.depth || 0;
	const sortedChildren = getHierarchyChildren( props.entity );
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

	const { onNodePointerDown } = props;

	const onPointerDownNode = useCallback( ( e: PointerEvent ) => {

		onNodePointerDown( e, props.entity );

	}, [ onNodePointerDown, props.entity ] );

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

		// 選んでいる行ならその選択のまま、選んでいない行ならその行だけを選んでメニューを出す（複製・削除は選択が対象）
		if ( ! editor.selectedEntities.includes( props.entity ) ) {

			editor.selectEntity( props.entity );

		}

		const selectedCount = editor.selectedEntities.length;

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
					editor.duplicateSelected();

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

					editor.deleteSelected();

					closeAll();

				},
			},
		);

		let title = props.entity.name;

		if ( selectedCount > 1 ) {

			title = `${selectedCount} Entities`;

		}

		openPopover( <Menu title={title} items={items} />, pointAnchor( e.clientX, e.clientY ) );

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

	let selfClassName = style.self;

	if ( props.dropTargetId === props.entity.uuid ) {

		selfClassName = `${style.self} ${style.self_drop}`;

	}

	return <div className={style.node} data-no_export={noEditable}>
		<div data-hnode_uuid={props.entity.uuid} onPointerDown={onPointerDownNode}>
			<ListItem className={selfClassName} style={{ paddingLeft: offsetPx }} onContextMenu={onRightClickNode} selected={isSelected} active={isActive}>
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
		</div>
		{hasChild && <div className={style.child} data-open={open} >
			{
				sortedChildren.map( item => {

					return <HierarchyNode
						key={item.uuid}
						entity={item}
						depth={depth + 1}
						openNodes={props.openNodes}
						setNodeOpen={props.setNodeOpen}
						dropTargetId={props.dropTargetId}
						onNodePointerDown={props.onNodePointerDown}
					/>;

				} )
			}
			<div className={style.child_line} style={{ marginLeft: offsetPx + 4 }}></div>
		</div>}
	</div>;

};
