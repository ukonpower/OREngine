import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent as ReactPointerEvent } from 'react';

import { Button, InputSlider, Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import style from './index.module.scss';

// トラックの鳴らし方。楽器の .glsl が noteSound を書いていればノート、trackSound ならコード。どちらでもない（楽器が無い等）なら null
export type TrackKind = "note" | "code" | null;

type MusicTrackHeadProps = {
	name: string;
	instrument: string;
	kind: TrackKind;
	volume: number;
	pan: number;
	muted: boolean;
	soloed: boolean;
	// ミュート・ほかのトラックのソロで鳴っていない
	silent: boolean;
	instrumentNames: string[];
	dropTarget: boolean;
	onPointerDown: ( e: ReactPointerEvent ) => void;
	onRename: ( name: string ) => void;
	onChangeNumber: ( update: { volume?: number, pan?: number } ) => void;
	onNumberDragStart: () => void;
	onNumberDragEnd: () => void;
	onNumberDragCancel: () => void;
	onChangeInstrument: ( instrument: string ) => void;
	onDelete: () => void;
	onToggleMute: () => void;
	// additive は Ctrl / Cmd を押していたか（ソロに足し引きする）
	onToggleSolo: ( additive: boolean ) => void;
};

// 音量のスライダーの上限。DAW のフェーダーの上限（+6dB ≒ 2倍）に合わせる。値そのものは制限しないので、これより大きい値もそのまま鳴る
const VOLUME_MAX = 2;

const KIND_LABELS: Record<string, string> = {
	note: "Note",
	code: "Code",
};

// トラックの見出し（名前・ミュート・ソロ・鳴らし方・音量・パン）。右クリックで楽器の変更と削除のメニュー、名前のダブルクリックで名前の入力
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

	return <div className={style.head} data-drop={props.dropTarget} data-silent={props.silent} onPointerDown={props.onPointerDown} onContextMenu={onContextMenu}>
		<div className={style.line}>
			<div className={style.name}>{nameElm}</div>
			<div className={style.monitor}>
				<Button square active={props.muted} title="Mute" onClick={props.onToggleMute}>M</Button>
				<Button square active={props.soloed} title="Solo（Ctrl / Cmd+クリックで足す）" onClick={( e ) => props.onToggleSolo( e.ctrlKey || e.metaKey )}>S</Button>
			</div>
			<span className={style.kind} title={props.instrument}>{kindLabel}</span>
		</div>
		<div className={style.line}>
			<span className={style.label}>Vol</span>
			<div className={style.number}>
				<InputSlider value={props.volume} min={0} max={VOLUME_MAX} step={0.01} defaultValue={1} onChange={( volume ) => props.onChangeNumber( { volume } )} onDragStart={props.onNumberDragStart} onDragEnd={props.onNumberDragEnd} onDragCancel={props.onNumberDragCancel} />
			</div>
			<span className={style.label}>Pan</span>
			<div className={style.number}>
				<InputSlider value={props.pan} min={- 1} max={1} step={0.01} origin={0} defaultValue={0} onChange={( pan ) => props.onChangeNumber( { pan } )} onDragStart={props.onNumberDragStart} onDragEnd={props.onNumberDragEnd} onDragCancel={props.onNumberDragCancel} />
			</div>
		</div>
	</div>;

};
