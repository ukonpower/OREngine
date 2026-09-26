import { useCallback, useMemo, useRef, useState } from 'react';

import * as MTP from 'mathpower';
import * as MXP from 'maxpower';
import {
	countCurveUsers,
	deleteKeys,
	getLinks,
	keyFrameTime,
	moveHandle,
	moveKeys,
	pasteKeys,
	setHandleType,
	setInterpolation,
	snapKeyFrameTime,
	type Editor,
	type EditKey,
	type KeyFrameHandleSide,
	type KeyFrameHandleType,
	type TimelineKeyActions,
} from 'orengine/editor';

import { useEditorFrame } from '../../../../../hooks/useEditorFrame';
import { useOREditor } from '../../../../../hooks/useOREditor';
import { buildChannels, ENTITY_CHANNEL_ID, getCurveKeys, type KeyChannel } from '../lib/KeyChannels';
import { groupSelection, isAllSelected, keyRef, type KeySelection } from '../lib/KeySelection';

// キー表示（ドープシート）とカーブ表示（グラフエディタ）
export type KeyEditorMode = "keys" | "curves";

// カーブ表示に出すカーブ1本
export type GraphCurve = {
	id: string;
	element: number | null;
	shared: KeyChannel[ "shared" ];
};

type SceneState = {
	entity: MXP.Entity | null;
	curves: MXP.CurveTable;
	channels: KeyChannel[];
};

// コピーしたキー。行の識別子ごとにキーを持ち、時刻は start からのずれで貼る
type KeyClipboard = {
	entries: { channelId: string, keys: EditKey[] }[];
	start: number;
};

const EMPTY_SCENE: SceneState = { entity: null, curves: {}, channels: [] };

const selectedEntity = ( editor: Editor ) => {

	const id = editor.getField<string | null>( "selectedEntityId" );

	if ( ! id ) return null;

	return editor.engine.root.findEntityByUUID( id ) || null;

};

// 表示の作り直しが要るかを見るための並び（選択中のエンティティ・カーブの表・シーンのリンク）。
// カーブの表とリンクは編集のたびに差し替わる（書き換えない）ので、同じものかどうかで変化が分かる
const sceneSignature = ( editor: Editor ) => {

	const signature: unknown[] = [ selectedEntity( editor ), editor.engine.curves ];

	editor.engine.root.traverse( ( entity ) => {

		const links = getLinks( entity );

		// Animation の無いエンティティは毎回新しい空のオブジェクトが返るので入れない
		if ( Object.keys( links ).length > 0 ) signature.push( links );

	} );

	return signature;

};

const sameSignature = ( a: unknown[], b: unknown[] ) => {

	if ( a.length != b.length ) return false;

	for ( let i = 0; i < a.length; i ++ ) {

		if ( a[ i ] !== b[ i ] ) return false;

	}

	return true;

};

const buildScene = ( editor: Editor ): SceneState => {

	const entity = selectedEntity( editor );
	const curves = editor.engine.curves;

	if ( ! entity ) return { ...EMPTY_SCENE, curves };

	return { entity, curves, channels: buildChannels( entity, curves, countCurveUsers( editor.engine ) ) };

};

// 補間とハンドルを持つ（カーブ表示で値を編集できる）カーブか。boolean・select は補間を CONSTANT に固定し、イベントは値を持たない
const isNumericChannel = ( channel: KeyChannel ) => {

	return channel.kind == "number" || channel.kind == "array";

};

// タイムラインのキー編集の状態と操作。選択中のエンティティの行・選んだキー・表示の切り替えを持ち、
// 編集はすべてカーブの表の差し替えとして EditorAPI に積む
export const useKeyEditorContext = () => {

	const { editor, engine } = useOREditor();

	const [ scene, setScene ] = useState<SceneState>( () => buildScene( editor ) );
	const signatureRef = useRef<unknown[]>( [] );

	// ここで差し替えたカーブの表。ほかからの差し替え（undo・I キー等）ではキーの番号がずれることがあるので、選択を外す
	const ownCurvesRef = useRef<MXP.CurveTable | null>( null );

	const [ mode, setMode ] = useState<KeyEditorMode>( "keys" );
	const [ selection, setSelection ] = useState<KeySelection>( () => new Set() );
	const [ collapsed, setCollapsed ] = useState<Set<string>>( () => new Set() );
	const [ activeChannelId, setActiveChannelId ] = useState( ENTITY_CHANNEL_ID );
	const [ scrollTop, setScrollTop ] = useState( 0 );

	// ドラッグの開始時に今の選択を読むので、state とは別に同期して持つ
	const selectionRef = useRef( selection );
	const clipboardRef = useRef<KeyClipboard | null>( null );

	const select = useCallback( ( next: KeySelection ) => {

		selectionRef.current = next;
		setSelection( next );

	}, [] );

	useEditorFrame( () => {

		const signature = sceneSignature( editor );
		const prev = signatureRef.current;

		if ( sameSignature( signature, prev ) ) return;

		signatureRef.current = signature;

		const entityChanged = signature[ 0 ] !== prev[ 0 ];
		const curvesReplaced = signature[ 1 ] !== prev[ 1 ] && signature[ 1 ] !== ownCurvesRef.current;

		if ( prev.length > 0 && ( entityChanged || curvesReplaced ) ) {

			select( new Set() );

		}

		setScene( buildScene( editor ) );

	} );

	/*-------------------------------
		Channels
	-------------------------------*/

	const channels = scene.channels;

	// 折りたたんだ行の配下を除いた、表示する行
	const visibleChannels = useMemo( () => {

		const hidden = new Set<string>();
		const result: KeyChannel[] = [];

		for ( const channel of channels ) {

			if ( channel.parentId && ( hidden.has( channel.parentId ) || collapsed.has( channel.parentId ) ) ) {

				hidden.add( channel.id );

				continue;

			}

			result.push( channel );

		}

		return result;

	}, [ channels, collapsed ] );

	// カーブ表示に出すカーブ。選んだ行の配下の数値のカーブで、共有しているカーブは1本にまとめる
	const graphCurves = useMemo( () => {

		let active = channels[ 0 ];

		for ( const channel of channels ) {

			if ( channel.id == activeChannelId ) active = channel;

		}

		const result: GraphCurve[] = [];
		const seen = new Set<string>();

		if ( ! active ) return result;

		for ( const channel of channels ) {

			if ( ! channel.leaf || ! isNumericChannel( channel ) ) continue;

			const under = active.id == ENTITY_CHANNEL_ID || channel.id == active.id || channel.parentId == active.id;

			if ( ! under ) continue;

			const id = channel.curveIds[ 0 ];

			if ( seen.has( id ) ) continue;

			seen.add( id );
			result.push( { id, element: channel.element, shared: channel.shared } );

		}

		return result;

	}, [ channels, activeChannelId ] );

	const toggleCollapsed = useCallback( ( id: string ) => {

		setCollapsed( ( current ) => {

			const next = new Set( current );

			if ( next.has( id ) ) {

				next.delete( id );

			} else {

				next.add( id );

			}

			return next;

		} );

	}, [] );

	/*-------------------------------
		Selection
	-------------------------------*/

	// キーの印を押したときの選択。Shift は足し引きし、それ以外は押した印が選ばれていなければそれだけを選ぶ。
	// 押す前から選ばれていたかを返す（ドラッグせずに離したら、それだけを選び直すため）
	const pressKeys = useCallback( ( refs: string[], shift: boolean ) => {

		const current = selectionRef.current;
		const wasSelected = isAllSelected( current, refs );

		if ( shift ) {

			const next = new Set( current );

			for ( const ref of refs ) {

				if ( wasSelected ) {

					next.delete( ref );

				} else {

					next.add( ref );

				}

			}

			select( next );

		} else if ( ! wasSelected ) {

			select( new Set( refs ) );

		}

		return wasSelected;

	}, [ select ] );

	// refs を選ぶ。add なら今の選択に足す（矩形選択の Shift）
	const selectRefs = useCallback( ( refs: string[], add: boolean ) => {

		let next = new Set<string>();

		if ( add ) next = new Set( selectionRef.current );

		for ( const ref of refs ) {

			next.add( ref );

		}

		select( next );

	}, [ select ] );

	/*-------------------------------
		Edit
	-------------------------------*/

	const snapTime = ( frame: number ) => snapKeyFrameTime( frame, engine.frameSetting.fps );

	const applyCurves = ( next: MXP.CurveTable ) => {

		ownCurvesRef.current = next;
		editor.api.setCurves( next );

	};

	// 補間・ハンドルを持つカーブの ID（補間とハンドルの種類を変えられるもの）
	const numericCurveIds = new Set<string>();

	for ( const channel of channels ) {

		if ( channel.leaf && isNumericChannel( channel ) ) numericCurveIds.add( channel.curveIds[ 0 ] );

	}

	const deleteSelectedKeys = () => {

		const groups = groupSelection( selectionRef.current, engine.curves );

		if ( groups.size == 0 ) return;

		const next = { ...engine.curves };

		for ( const [ id, indices ] of groups ) {

			next[ id ] = deleteKeys( engine.curves[ id ], indices );

		}

		applyCurves( next );
		select( new Set() );

	};

	// 選んだキーのうち、補間・ハンドルを持つカーブのキーを edit で書き換える
	const editSelectedKeys = ( edit: ( curve: MXP.CurveData, indices: number[] ) => MXP.CurveData ) => {

		const groups = groupSelection( selectionRef.current, engine.curves );
		const next = { ...engine.curves };

		let changed = false;

		for ( const [ id, indices ] of groups ) {

			if ( ! numericCurveIds.has( id ) ) continue;

			next[ id ] = edit( engine.curves[ id ], indices );
			changed = true;

		}

		if ( changed ) applyCurves( next );

	};

	const setSelectedInterpolation = ( interpolation: MXP.FCurveInterpolation ) => {

		editSelectedKeys( ( curve, indices ) => setInterpolation( curve, indices, interpolation ) );

	};

	const setSelectedHandleType = ( handleType: KeyFrameHandleType ) => {

		editSelectedKeys( ( curve, indices ) => setHandleType( curve, indices, handleType ) );

	};

	// 選んだキーを行ごとにコピーする。共有しているカーブは最初の行のぶんだけ持つ
	const copySelectedKeys = () => {

		const groups = groupSelection( selectionRef.current, engine.curves );
		const entries: KeyClipboard[ "entries" ] = [];
		const copied = new Set<string>();

		let start = Infinity;

		for ( const channel of channels ) {

			if ( ! channel.leaf ) continue;

			const id = channel.curveIds[ 0 ];
			const indices = groups.get( id );

			if ( ! indices || copied.has( id ) ) continue;

			copied.add( id );

			const curveKeys = getCurveKeys( engine.curves[ id ] );
			const keys: EditKey[] = [];

			for ( const index of indices ) {

				keys.push( curveKeys[ index ] );
				start = Math.min( start, curveKeys[ index ].coordinate.x );

			}

			entries.push( { channelId: channel.id, keys } );

		}

		if ( entries.length == 0 ) return;

		clipboardRef.current = { entries, start };

	};

	// コピーしたキーを、いちばん早いキーが今の時刻に来るように、同じ識別子の行へ貼る（その行が無ければ飛ばす）
	const pasteCopiedKeys = () => {

		const clipboard = clipboardRef.current;

		if ( ! clipboard ) return;

		const offset = keyFrameTime( engine ) - clipboard.start;
		const next = { ...engine.curves };
		const nextSelection: KeySelection = new Set();

		let pasted = false;

		for ( const entry of clipboard.entries ) {

			let target: KeyChannel | null = null;

			for ( const channel of channels ) {

				if ( channel.leaf && channel.id == entry.channelId ) target = channel;

			}

			if ( ! target ) continue;

			const id = target.curveIds[ 0 ];
			const result = pasteKeys( next[ id ], entry.keys, offset, snapTime );

			next[ id ] = result.curve;
			pasted = true;

			for ( const index of result.indices ) {

				nextSelection.add( keyRef( id, index ) );

			}

		}

		if ( ! pasted ) return;

		applyCurves( next );
		select( nextSelection );

	};

	// 選んだキーのドラッグ移動を始める。move は開始時からのずれで毎回カーブを作り直し、end で undo 1回ぶんとして確定する。
	// 値のずれは valueCurveIds のカーブにだけ効かせる（カーブ表示に出ているもの）
	const beginMove = ( valueCurveIds: Set<string> | null ) => {

		const origin = engine.curves;
		const groups = groupSelection( selectionRef.current, origin );
		const edit = editor.api.beginEdit( engine, "curves" );

		let moved = false;

		return {
			move: ( offset: MTP.IVector2, snapValue?: ( value: number ) => number ) => {

				const next = { ...origin };
				const nextSelection: KeySelection = new Set();

				for ( const [ id, indices ] of groups ) {

					let valueOffset = 0;

					if ( valueCurveIds && valueCurveIds.has( id ) ) valueOffset = offset.y;

					const result = moveKeys( origin[ id ], indices, { x: offset.x, y: valueOffset }, snapTime, snapValue );

					next[ id ] = result.curve;

					for ( const index of result.indices ) {

						nextSelection.add( keyRef( id, index ) );

					}

				}

				ownCurvesRef.current = next;
				edit.set( next );
				select( nextSelection );
				moved = true;

			},
			end: () => {

				if ( moved ) edit.commit();

			},
		};

	};

	// ハンドルのドラッグを始める。point はハンドルの行き先（時刻, 値）
	const beginHandleMove = ( curveId: string, index: number, side: KeyFrameHandleSide ) => {

		const origin = engine.curves;
		const edit = editor.api.beginEdit( engine, "curves" );

		let moved = false;

		return {
			move: ( point: MTP.IVector2 ) => {

				const next = { ...origin, [ curveId ]: moveHandle( origin[ curveId ], index, side, point ) };

				ownCurvesRef.current = next;
				edit.set( next );
				moved = true;

			},
			end: () => {

				if ( moved ) edit.commit();

			},
		};

	};

	/*-------------------------------
		Keyboard
	-------------------------------*/

	// キーボードの Delete / X・Ctrl+C・Ctrl+V は Editor が受けてここへ回す。Editor に渡すものは変わらない方がよいので、
	// 最新の操作を ref から呼ぶ入れ物を1つだけ作る
	const latestRef = useRef( { deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys } );
	latestRef.current = { deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys };

	const timelineActions = useMemo<TimelineKeyActions>( () => ( {
		deleteKeys: () => latestRef.current.deleteSelectedKeys(),
		copyKeys: () => latestRef.current.copySelectedKeys(),
		pasteKeys: () => latestRef.current.pasteCopiedKeys(),
	} ), [] );

	return {
		entity: scene.entity,
		curves: scene.curves,
		channels,
		visibleChannels,
		graphCurves,
		mode,
		setMode,
		selection,
		collapsed,
		toggleCollapsed,
		activeChannelId,
		setActiveChannelId,
		scrollTop,
		setScrollTop,
		pressKeys,
		selectRefs,
		select,
		deleteSelectedKeys,
		copySelectedKeys,
		pasteCopiedKeys,
		setSelectedInterpolation,
		setSelectedHandleType,
		beginMove,
		beginHandleMove,
		timelineActions,
	};

};
