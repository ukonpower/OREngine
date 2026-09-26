import { useCallback, useEffect, useState } from 'react';

import { Button, ListItem, Modal } from 'uipower';

import style from './index.module.scss';

import type { SceneSelection } from '../../../../providers/OREditorProvider';
import type { AnchorRect } from 'uipower';

// シーン名はそのままファイル名になるので、サーバー側の制限と同じ文字だけを通す
const SCENE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;

type SceneWindowProps = {
	scenes: SceneSelection;
	projectName?: string;
	// 開いたクリックの位置。省略すると画面中央に出る
	anchor?: AnchorRect;
	onClose: () => void;
};

// シーンの選択・新規作成・削除をまとめたウィンドウ。
// 行を選んだだけでは切り替わらず、Open（またはダブルクリック）で初めてシーンを差し替える
export const SceneWindow = ( props: SceneWindowProps ) => {

	const { scenes, onClose } = props;

	const [ selected, setSelected ] = useState<string | null>( scenes.current );
	const [ newName, setNewName ] = useState<string | null>( null );
	const [ newError, setNewError ] = useState<string | null>( null );
	const [ confirmDelete, setConfirmDelete ] = useState( false );

	const openScene = useCallback( ( name: string ) => {

		if ( name !== scenes.current ) {

			scenes.onSelect( name );

		}

		onClose();

	}, [ scenes, onClose ] );

	// Esc は開いている入力・削除確認を1段ずつ畳み、何も無ければウィンドウを閉じる
	useEffect( () => {

		const onKeyDown = ( event: KeyboardEvent ) => {

			if ( event.key !== "Escape" ) return;

			if ( newName !== null ) {

				setNewName( null );
				setNewError( null );
				return;

			}

			if ( confirmDelete ) {

				setConfirmDelete( false );
				return;

			}

			onClose();

		};

		window.addEventListener( "keydown", onKeyDown );

		return () => {

			window.removeEventListener( "keydown", onKeyDown );

		};

	}, [ newName, confirmDelete, onClose ] );

	// 入力された名前を検証して新規シーンを作る。作成後はそのシーンが開くのでウィンドウを閉じる
	const submitNew = () => {

		const name = ( newName ?? "" ).trim();

		if ( ! SCENE_NAME_PATTERN.test( name ) ) {

			setNewError( "A-Z a-z 0-9 - _ のみ使えます" );
			return;

		}

		if ( scenes.names.includes( name ) ) {

			setNewError( `"${name}" は既にあります` );
			return;

		}

		const create = async () => {

			await scenes.onCreate( name );
			await scenes.onSelect( name );

		};

		create();
		onClose();

	};

	const submitDelete = () => {

		if ( ! selected ) return;

		scenes.onDelete( selected );
		setSelected( null );
		setConfirmDelete( false );

	};

	const itemElms = [];

	for ( const name of scenes.names ) {

		const isCurrent = name === scenes.current;

		itemElms.push(
			<ListItem
				key={name}
				className={style.item}
				selected={name === selected}
				onClick={() => {

					setSelected( name );
					setConfirmDelete( false );

				}}
				onDoubleClick={() => {

					openScene( name );

				}}
			>
				<span className={style.item_name}>{name}</span>
				{isCurrent && <span className={style.item_badge}>opened</span>}
			</ListItem>
		);

	}

	let newItemElm = null;

	if ( newName !== null ) {

		newItemElm = <div className={style.newItem}>
			<form onSubmit={( event ) => {

				event.preventDefault();
				submitNew();

			}}>
				<input
					className={style.newItem_input}
					autoFocus
					value={newName}
					placeholder="scene name"
					onChange={( event ) => {

						setNewName( event.target.value );
						setNewError( null );

					}}
				/>
			</form>
			{newError && <div className={style.newItem_error}>{newError}</div>}
		</div>;

	}

	let footerElm = null;

	if ( confirmDelete && selected ) {

		footerElm = <>
			<span className={style.footer_message}>Delete &quot;{selected}&quot; ?</span>
			<Button onClick={() => {

				setConfirmDelete( false );

			}}>Cancel</Button>
			<Button onClick={submitDelete}>Delete</Button>
		</>;

	} else {

		// 最後の1つを消すとエディタが開けるシーンを失うので、1つのときは削除させない
		const canDelete = selected !== null && scenes.names.length > 1;
		const canOpen = selected !== null && selected !== scenes.current;

		footerElm = <>
			<Button onClick={() => {

				setNewName( "" );
				setNewError( null );
				setConfirmDelete( false );

			}}>+ New</Button>
			<div className={style.footer_spacer} />
			<Button disabled={! canDelete} onClick={() => {

				setConfirmDelete( true );

			}}>Delete</Button>
			<Button disabled={! canOpen} onClick={() => {

				if ( selected ) openScene( selected );

			}}>Open</Button>
		</>;

	}

	return <Modal title="Scenes" note={props.projectName} width={360} anchor={props.anchor} onClose={onClose} footer={footerElm}>
		<div className={style.list}>
			{itemElms}
			{newItemElm}
		</div>
	</Modal>;

};
