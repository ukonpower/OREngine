import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as MTP from 'mathpower';
import * as MXP from 'maxpower';
import {
	countCurveUses,
	deleteKeys,
	getLinks,
	keyFrameTime,
	pasteKeys,
	setHandleType,
	setInterpolation,
	snapKeyFrameTime,
	transformKeys,
	type Editor,
	type EditKey,
	type KeyFrameHandleRef,
	type KeyFrameHandleType,
	type KeyTransform,
	type ModalTransformMode,
	type TimelineKeyActions,
	type TimelineModal,
} from 'orengine/editor';

import { useEditorFrame } from '../../../../../hooks/useEditorFrame';
import { useOREditor } from '../../../../../hooks/useOREditor';
import { useTimeline } from '../../../hooks/useTimeline';
import { activeHandleSides, fitValueRange, graphScale, roundToPixel, type ValueRange } from '../lib/CurveGraph';
import { buildChannels, ENTITY_CHANNEL_ID, getCurveKeys, type KeyChannel } from '../lib/KeyChannels';
import { groupSelection, groupTransformSelection, handleRef, isAllSelected, keyRef, parseRef, type KeySelection } from '../lib/KeySelection';
import { KeyTransformModal, type KeyPointTransform, type KeyScreenMapping } from '../lib/KeyTransformModal';
import { suppressNextContextMenu } from '../lib/PointerDrag';

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

// 動かすキー・ハンドル（カーブごと）と、回転・伸縮の中心（時刻, 値）。
// individual なら、点ごとに属するキーを中心にする（ハンドルだけを選んでいるとき）
type TransformTargets = {
	keys: Map<string, number[]>;
	handles: Map<string, KeyFrameHandleRef[]>;
	center: MTP.IVector2;
	individual: boolean;
};

// 開始時のキーの領域での、キーの座標と画面座標の対応
type ScreenState = {
	mapping: KeyScreenMapping;
	framePerPx: number;
	valuePerPx: number;
};

// B の矩形選択の待機
type BoxSelectWait = {
	modal: TimelineModal;
	dispose: () => void;
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

	return { entity, curves, channels: buildChannels( entity, curves, countCurveUses( editor.engine ) ) };

};

// 補間とハンドルを持つ（カーブ表示で値を編集できる）カーブか。boolean・select は補間を CONSTANT に固定し、イベントは値を持たない
const isNumericChannel = ( channel: KeyChannel ) => {

	return channel.kind == "number" || channel.kind == "array";

};

// 点をすべて囲む範囲の中心
const boundsCenter = ( points: MTP.IVector2[] ) => {

	let minX = Infinity;
	let minY = Infinity;
	let maxX = - Infinity;
	let maxY = - Infinity;

	for ( const point of points ) {

		minX = Math.min( minX, point.x );
		minY = Math.min( minY, point.y );
		maxX = Math.max( maxX, point.x );
		maxY = Math.max( maxY, point.y );

	}

	return { x: ( minX + maxX ) / 2, y: ( minY + maxY ) / 2 };

};

// タイムラインのキー編集の状態と操作。選択中のエンティティの行・選んだキー・表示の切り替えを持ち、
// 編集はすべてカーブの表の差し替えとして EditorAPI に積む
export const useKeyEditorContext = () => {

	const { editor, engine } = useOREditor();
	const { viewPort } = useTimeline();

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

	// キーの領域（キー表示・カーブ表示を重ねる要素）。G / R / S の座標の基準と、矩形選択の範囲
	const areaRef = useRef<HTMLDivElement>( null );

	// キーの領域の上の最後のポインタ位置（画面座標）。G / R / S は押した瞬間の位置を基準にする
	const pointerRef = useRef<MTP.IVector2>( { x: 0, y: 0 } );

	const modalRef = useRef<KeyTransformModal | null>( null );
	const boxSelectRef = useRef<BoxSelectWait | null>( null );
	const [ boxSelecting, setBoxSelecting ] = useState( false );

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

	const graphCurveIds = useMemo( () => {

		const ids: string[] = [];

		for ( const graphCurve of graphCurves ) {

			ids.push( graphCurve.id );

		}

		return ids;

	}, [ graphCurves ] );

	/*-------------------------------
		Value Range
	-------------------------------*/

	// カーブ表示の値の範囲。手で動かした範囲を保ち、表示中のカーブに合わせ直すのは選択中のエンティティが変わったときと Home だけ
	const [ valueRange, setValueRange ] = useState<ValueRange>( { min: - 1, max: 1 } );

	// 範囲を合わせたときのエンティティと、そのとき合わせるキーが無かったか。
	// キーが無くて合わせられなかったら、キーが入ったとき（初めて I で打ったとき等）にもう一度合わせる
	const [ fitted, setFitted ] = useState<{ entity: MXP.Entity | null, empty: boolean } | null>( null );

	let hasGraphKeys = false;

	for ( const id of graphCurveIds ) {

		if ( getCurveKeys( scene.curves[ id ] ).length > 0 ) hasGraphKeys = true;

	}

	if ( ! fitted || fitted.entity !== scene.entity || ( fitted.empty && hasGraphKeys ) ) {

		setFitted( { entity: scene.entity, empty: ! hasGraphKeys } );
		setValueRange( fitValueRange( scene.curves, graphCurveIds ) );

	}

	const frameAll = () => {

		setValueRange( fitValueRange( engine.curves, graphCurveIds ) );

	};

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

	// A は表示中のキーをすべて選び（キー表示はエンティティの全部、カーブ表示は出ているカーブ）、Alt+A は選択を外す
	const selectAllKeys = ( all: boolean ) => {

		const next: KeySelection = new Set();

		if ( all ) {

			let ids: string[] = [];

			if ( channels.length > 0 ) ids = channels[ 0 ].curveIds;
			if ( mode == "curves" ) ids = graphCurveIds;

			for ( const id of ids ) {

				const keys = getCurveKeys( engine.curves[ id ] );

				for ( let i = 0; i < keys.length; i ++ ) {

					next.add( keyRef( id, i ) );

				}

			}

		}

		select( next );

	};

	// B。次の左ドラッグ1回を矩形選択にする（KeyEditor が受ける）。右クリック・Esc・キーの領域の外での左クリックで取り消す
	const beginBoxSelect = () => {

		if ( boxSelectRef.current || modalRef.current ) return;

		const onDown = ( e: PointerEvent ) => {

			if ( e.button == 2 ) {

				e.preventDefault();
				e.stopPropagation();
				suppressNextContextMenu();
				endBoxSelect();

				return;

			}

			const area = areaRef.current;

			if ( e.button == 0 && area && e.target instanceof Node && area.contains( e.target ) ) return;

			endBoxSelect();

		};

		window.addEventListener( "pointerdown", onDown, { capture: true } );

		const modal: TimelineModal = {
			handleKeyDown: ( e ) => {

				if ( e.key != "Escape" ) return false;

				endBoxSelect();

				return true;

			},
		};

		boxSelectRef.current = {
			modal,
			dispose: () => {

				window.removeEventListener( "pointerdown", onDown, { capture: true } );

			},
		};

		editor.beginTimelineModal( modal );
		setBoxSelecting( true );

	};

	// 矩形選択の待機を終える（左ドラッグを始めたとき・取り消したとき）
	const endBoxSelect = () => {

		const wait = boxSelectRef.current;

		if ( ! wait ) return;

		wait.dispose();
		editor.endTimelineModal( wait.modal );
		boxSelectRef.current = null;
		setBoxSelecting( false );

	};

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

	/*-------------------------------
		Transform
	-------------------------------*/

	// キーの領域の今の大きさ・表示の範囲での、キーの座標と画面座標の対応。キー表示では値（縦）の対応は使わない
	const readScreen = (): ScreenState | null => {

		const area = areaRef.current;

		if ( ! area ) return null;

		const rect = area.getBoundingClientRect();
		const scale = graphScale( viewPort, valueRange, rect.width, rect.height );

		return {
			mapping: {
				toScreen: ( point ) => ( { x: rect.left + scale.toX( point.x ), y: rect.top + scale.toY( point.y ) } ),
				toPoint: ( screen ) => ( { x: scale.toFrame( screen.x - rect.left ), y: scale.toValue( screen.y - rect.top ) } ),
			},
			framePerPx: scale.framePerPx,
			valuePerPx: scale.valuePerPx,
		};

	};

	// 動かすキー・ハンドル。キー表示はキーの時刻だけを見せているのでハンドルは入れない。
	// カーブ表示の回転・伸縮は出ているカーブだけを対象にし、キーが1つだけならそのキーを中心にハンドルだけを回す・伸縮する
	const transformTargets = ( transformMode: ModalTransformMode ): TransformTargets | null => {

		const { keys, handles } = groupTransformSelection( selectionRef.current, engine.curves );

		if ( mode == "keys" ) handles.clear();

		if ( mode == "curves" && transformMode != "translate" ) {

			const shown = new Set( graphCurveIds );

			for ( const id of Array.from( keys.keys() ) ) {

				if ( ! shown.has( id ) ) keys.delete( id );

			}

			for ( const id of Array.from( handles.keys() ) ) {

				if ( ! shown.has( id ) ) handles.delete( id );

			}

		}

		if ( keys.size == 0 && handles.size == 0 ) return null;

		// 中心は選んだキー全体を囲む範囲の中心（Blender の既定と同じ）。キーが無ければ、ハンドルの持ち主のキーで測る
		let points: MTP.IVector2[] = [];
		const handleKeyPoints: MTP.IVector2[] = [];

		for ( const [ id, indices ] of keys ) {

			const curveKeys = getCurveKeys( engine.curves[ id ] );

			for ( const index of indices ) {

				points.push( curveKeys[ index ].coordinate );

			}

		}

		for ( const [ id, curveHandles ] of handles ) {

			const curveKeys = getCurveKeys( engine.curves[ id ] );

			for ( const handle of curveHandles ) {

				handleKeyPoints.push( curveKeys[ handle.index ].coordinate );

			}

		}

		const individual = points.length == 0;

		if ( individual ) points = handleKeyPoints;

		// カーブ表示の回転・伸縮でキーが1つなら、キーを動かさずに両側のハンドルとして回す・伸縮する（ハンドルの傾き・長さが変わる）
		if ( mode == "curves" && transformMode != "translate" && points.length == 1 && ! individual ) {

			for ( const [ id, indices ] of keys ) {

				const curveHandles = handles.get( id ) || [];

				for ( const side of activeHandleSides( getCurveKeys( engine.curves[ id ] ), indices[ 0 ] ) ) {

					curveHandles.push( { index: indices[ 0 ], side } );

				}

				handles.set( id, curveHandles );

			}

			keys.clear();

		}

		return { keys, handles, center: boundsCenter( points ), individual };

	};

	// targets の変形を始める。apply は開始時のカーブの表から毎回作り直し（ポインタの動きに追従）、commit で undo 1回ぶんとして確定する
	const beginTransform = ( targets: TransformTargets ) => {

		const origin = engine.curves;
		const startSelection = selectionRef.current;
		const edit = editor.api.beginEdit( engine, "curves" );

		const ids = new Set<string>();

		for ( const id of targets.keys.keys() ) {

			ids.add( id );

		}

		for ( const id of targets.handles.keys() ) {

			ids.add( id );

		}

		let changed = false;

		return {
			apply: ( transformOf: ( curveId: string ) => KeyTransform ) => {

				const next = { ...origin };
				const nextSelection: KeySelection = new Set();

				// 動かしたカーブの選択は、動かした後の番号で選び直す
				for ( const ref of startSelection ) {

					if ( ! ids.has( parseRef( ref ).curveId ) ) nextSelection.add( ref );

				}

				for ( const id of ids ) {

					const result = transformKeys( origin[ id ], targets.keys.get( id ) || [], targets.handles.get( id ) || [], transformOf( id ) );

					next[ id ] = result.curve;

					for ( const index of result.indices ) {

						nextSelection.add( keyRef( id, index ) );

					}

					for ( const handle of result.handles ) {

						nextSelection.add( handleRef( id, handle.index, handle.side ) );

					}

				}

				ownCurvesRef.current = next;
				edit.set( next );
				select( nextSelection );
				changed = true;

			},
			commit: () => {

				if ( changed ) edit.commit();

			},
			cancel: () => {

				ownCurvesRef.current = origin;
				edit.cancel();
				select( startSelection );

			},
		};

	};

	// point で動かすときのカーブごとの動かし方。キー表示は時刻だけを動かし、ハンドルはキーと一緒にずらす。
	// カーブ表示は、画面の 1px より細かい桁を丸める。出ていないカーブ（キー表示で選んだもの）は時刻だけを動かす
	const transformOf = ( point: KeyPointTransform, transformMode: ModalTransformMode, screen: ScreenState ) => {

		const shown = new Set( graphCurveIds );

		return ( curveId: string ): KeyTransform => {

			if ( mode == "keys" ) {

				return { point, transformHandles: false, snapTime };

			}

			let curvePoint = point;

			if ( ! shown.has( curveId ) ) {

				curvePoint = ( target, key ) => ( { x: point( target, key ).x, y: target.y } );

			}

			return {
				point: curvePoint,
				transformHandles: transformMode != "translate",
				snapTime,
				roundTime: ( frame ) => roundToPixel( frame, screen.framePerPx ),
				roundValue: ( value ) => roundToPixel( value, screen.valuePerPx ),
			};

		};

	};

	// 選んだキー・ハンドルのドラッグを始める（押したまま動かす）。G と同じ動かし方を、押した位置からのずれ（px）で行う
	const beginDrag = () => {

		const screen = readScreen();
		const targets = transformTargets( "translate" );

		if ( ! screen || ! targets ) return null;

		const session = beginTransform( targets );
		const origin = screen.mapping.toPoint( { x: 0, y: 0 } );

		return {
			move: ( dx: number, dy: number ) => {

				const moved = screen.mapping.toPoint( { x: dx, y: dy } );

				let offsetY = moved.y - origin.y;

				if ( mode == "keys" ) offsetY = 0;

				const offset = { x: moved.x - origin.x, y: offsetY };

				session.apply( transformOf( ( point ) => ( { x: point.x + offset.x, y: point.y + offset.y } ), "translate", screen ) );

			},
			end: () => session.commit(),
		};

	};

	// G / R / S のモーダル操作を始める。キー表示の R は何もしない
	const startTransform = ( transformMode: ModalTransformMode ) => {

		if ( modalRef.current ) return;

		if ( mode == "keys" && transformMode == "rotate" ) return;

		endBoxSelect();

		const screen = readScreen();
		const targets = transformTargets( transformMode );

		if ( ! screen || ! targets ) return;

		const session = beginTransform( targets );

		let center = targets.center;

		// キー表示の伸縮は今の時刻を中心にする（Blender と同じ）
		if ( mode == "keys" ) center = { x: keyFrameTime( engine ), y: 0 };

		const finish = () => {

			if ( modalRef.current ) editor.endTimelineModal( modalRef.current );

			modalRef.current = null;

		};

		const modal = new KeyTransformModal( {
			mode: transformMode,
			mapping: screen.mapping,
			pointer: { ...pointerRef.current },
			center,
			individual: targets.individual,
			timeOnly: mode == "keys",
			onChange: ( point ) => session.apply( transformOf( point, transformMode, screen ) ),
			onStatus: ( status ) => editor.setModalStatus( status ),
			onConfirm: () => {

				session.commit();
				finish();

			},
			onCancel: () => {

				session.cancel();
				finish();

			},
		} );

		modalRef.current = modal;
		editor.beginTimelineModal( modal );

	};

	// パネルごと消えたら、モーダル操作・矩形選択の待機を取り消す
	useEffect( () => {

		return () => {

			if ( modalRef.current ) modalRef.current.cancel();

			const wait = boxSelectRef.current;

			if ( wait ) {

				wait.dispose();
				editor.endTimelineModal( wait.modal );
				boxSelectRef.current = null;

			}

		};

	}, [ editor ] );

	/*-------------------------------
		Keyboard
	-------------------------------*/

	// キーボードのキーの操作は Editor が受けてここへ回す。Editor に渡すものは変わらない方がよいので、
	// 最新の操作を ref から呼ぶ入れ物を1つだけ作る
	const latestRef = useRef( { deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys, startTransform, beginBoxSelect, selectAllKeys, frameAll } );
	latestRef.current = { deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys, startTransform, beginBoxSelect, selectAllKeys, frameAll };

	const timelineActions = useMemo<TimelineKeyActions>( () => ( {
		deleteKeys: () => latestRef.current.deleteSelectedKeys(),
		copyKeys: () => latestRef.current.copySelectedKeys(),
		pasteKeys: () => latestRef.current.pasteCopiedKeys(),
		transformKeys: ( transformMode ) => latestRef.current.startTransform( transformMode ),
		boxSelect: () => latestRef.current.beginBoxSelect(),
		selectAllKeys: ( all ) => latestRef.current.selectAllKeys( all ),
		frameAll: () => latestRef.current.frameAll(),
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
		areaRef,
		pointerRef,
		valueRange,
		setValueRange,
		boxSelecting,
		endBoxSelect,
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
		beginDrag,
		timelineActions,
	};

};
