import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent as ReactPointerEvent } from 'react';

import { InputNumber, Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import style from './index.module.scss';

// トラックの鳴らし方。楽器の .glsl が noteSound を書いていればノート、trackSound ならコード。どちらでもない（楽器が無い等）なら null
export type TrackKind = "note" | "code" | null;

type MusicTrackHeadProps = {
	name: string;
	instrument: string;
	kind: TrackKind;
	volume: number;
	pan: number;
	instrumentNames: string[];
	dropTarget: boolean;
	onPointerDown: ( e: ReactPointerEvent ) => void;
	onRename: ( name: string ) => void;
	onChangeNumber: ( update: { volume?: number, pan?: number } ) => void;
	onNumberDragStart: () => void;
	onNumberDragEnd: () => void;
	onChangeInstrument: ( instrument: string ) => void;
	onDelete: () => void;
};

const KIND_LABELS: Record<string, string> = {
	note: "Note",
	code: "Code",
};

// トラックの見出し（名前・鳴らし方・音量・パン）。右クリックで楽器の変更と削除のメニュー、名前のダブルクリックで名前の入力
export const MusicTrackHead = ( props: MusicTrackHeadProps ) => {

	const { open: openPopover, closeAll } = usePopover();

	// 名前の入力中だけ文字列を持つ（null = 入力していない）
	const [ editingName, setEditingName ] = useState<string | null>( null );

	// Escape で抜けたことを onBlur へ伝える目印。blur が同じイベント処理内で走るので state でなく ref で持つ（HierarchyNode と同じ）
	const renameCancelled = useRef( false );

	const onKeyDownName = ( e: KeyboardEvent<HTMLInputElement> ) => {

		if ( e.key === "Enter" ) {

			e.currentTarget.blur();

		}

		if ( e.key === "Escape" ) {

			renameCancelled.current = true;
			e.currentTarget.blur();

		}

	};

	const onBlurName = () => {

		const cancelled = renameCancelled.current;

		renameCancelled.current = false;

		const name = editingName;

		setEditingName( null );

		if ( cancelled || name === null ) return;

		props.onRename( name );

	};

	const onContextMenu = ( e: MouseEvent ) => {

		e.preventDefault();

		const instrumentItems: MenuItem[] = [];

		for ( const name of props.instrumentNames ) {

			instrumentItems.push( {
				label: name,
				onClick: () => {

					props.onChangeInstrument( name );
					closeAll();

				},
			} );

		}

		const items: MenuItem[] = [
			{ label: "Instrument", children: instrumentItems },
			{
				label: "Delete Track",
				onClick: () => {

					props.onDelete();
					closeAll();

				},
			},
		];

		openPopover( <Menu title={props.name} items={items} />, pointAnchor( e.clientX, e.clientY ) );

	};

	let nameElm = <span className={style.name_text} onDoubleClick={() => setEditingName( props.name )}>{props.name}</span>;

	if ( editingName !== null ) {

		nameElm = <input
			className={style.name_input}
			value={editingName}
			autoFocus
			onChange={( e ) => setEditingName( e.target.value )}
			onFocus={( e ) => e.currentTarget.select()}
			onKeyDown={onKeyDownName}
			onBlur={onBlurName}
		/>;

	}

	let kindLabel = "-";

	if ( props.kind ) {

		kindLabel = KIND_LABELS[ props.kind ];

	}

	return <div className={style.head} data-drop={props.dropTarget} onPointerDown={props.onPointerDown} onContextMenu={onContextMenu}>
		<div className={style.line}>
			<div className={style.name}>{nameElm}</div>
			<span className={style.kind} title={props.instrument}>{kindLabel}</span>
		</div>
		<div className={style.line}>
			<span className={style.label}>Vol</span>
			<div className={style.number}>
				<InputNumber value={props.volume} step={0.1} min={0} onChange={( volume ) => props.onChangeNumber( { volume } )} onDragStart={props.onNumberDragStart} onDragEnd={props.onNumberDragEnd} />
			</div>
			<span className={style.label}>Pan</span>
			<div className={style.number}>
				<InputNumber value={props.pan} step={0.1} min={- 1} max={1} onChange={( pan ) => props.onChangeNumber( { pan } )} onDragStart={props.onNumberDragStart} onDragEnd={props.onNumberDragEnd} />
			</div>
		</div>
	</div>;

};
