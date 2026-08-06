import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { SetFieldCommand } from '../../command/Commands/SetFieldCommand';
import { EditorCamera } from '../../EditorCamera';
import { GizmoHandle, GizmoMode } from '../../gizmo/Gizmo';
import { GizmoManager } from '../../gizmo/GizmoManager';
import { HelperManager } from '../../helper/HelperManager';
import { EntityHelper } from '../../helper/Helpers/EntityHelper';
import { clientToNDC, getContentRect } from '../PointerUtils';

import type { EditorAPI } from '../../EditorAPI';

type ClickCandidate = { entity: MXP.Entity, distance: number, type: 'helper' | 'mesh' };

// ヒットエリアを外したクリックでもヘルパーを拾う画面上の許容半径（px）
const HELPER_ASSIST_RADIUS_PX = 12;

// カメラの枠線（錐台のワイヤ・ビューポートの縁）のクリックをカメラ選択として拾う許容距離（px）
const FRAME_SELECT_RADIUS_PX = 12;

export class PointerHandler {

	private _raycaster: MXP.Raycaster;
	private _pointerDownPos: GLP.Vector | null;
	private _gizmoDragging: boolean;
	private _gizmoDragStartValue: { position: number[], euler: number[], scale: number[] } | null;
	private _hoveredTarget: 'gizmo' | 'helper' | 'mesh' | null;
	private _lastClickNDC: GLP.Vector | null;
	private _lastClickCandidateUUIDs: string[];
	private _lastClickCycleIndex: number;
	private _disposeListeners: () => void;

	constructor(
		engine: Engine,
		editorCamera: EditorCamera,
		gizmoManager: GizmoManager,
		helperManager: HelperManager,
		api: EditorAPI,
		getSelectedEntityId: () => string | null,
		getGizmoMode: () => GizmoMode,
		onSelectEntity: ( entity: MXP.Entity | null ) => void,
		isModalActive: () => boolean,
		onEscapeToEditorCamera: () => void,
	) {

		this._raycaster = new MXP.Raycaster();
		this._pointerDownPos = null;
		this._gizmoDragging = false;
		this._gizmoDragStartValue = null;
		this._hoveredTarget = null;
		this._lastClickNDC = null;
		this._lastClickCandidateUUIDs = [];
		this._lastClickCycleIndex = - 1;

		const canvasElm = engine.canvas as HTMLCanvasElement;

		const getCameraEntity = (): MXP.Entity | null => {

			return editorCamera.getCameraEntity( engine );

		};

		// ワールド座標をカメラの NDC へ投影する（カメラ背後は null）
		const projectToNDC = ( worldPos: GLP.Vector, cameraEntity: MXP.Entity ): GLP.Vector | null => {

			const camera = cameraEntity.getComponentsByTag<MXP.Camera>( 'camera' )[ 0 ];

			if ( ! camera ) return null;

			const p = new GLP.Vector( worldPos.x, worldPos.y, worldPos.z, 1 );
			p.applyMatrix4( camera.viewMatrix ).applyMatrix4( camera.projectionMatrix );

			if ( p.w <= 0 ) return null;

			return new GLP.Vector( p.x / p.w, p.y / p.w );

		};

		// カメラとヘルパー原点の間にシーンメッシュの面があるか（画面上で見えていないヘルパーの近傍アシストを抑止する）
		const occlusionRaycaster = new MXP.Raycaster();

		const isOccluded = ( worldPos: GLP.Vector ): boolean => {

			const origin = this._raycaster.ray.origin;
			const dx = worldPos.x - origin.x;
			const dy = worldPos.y - origin.y;
			const dz = worldPos.z - origin.z;
			const distance = Math.sqrt( dx * dx + dy * dy + dz * dz );

			if ( distance < 1e-4 ) return false;

			occlusionRaycaster.ray.origin.copy( origin );
			occlusionRaycaster.ray.direction.set( dx / distance, dy / distance, dz / distance );

			const hits = occlusionRaycaster.intersectEntities( engine.root );

			for ( const hit of hits ) {

				if ( hit.entity.initiator === 'god' ) continue;

				return hit.distance < distance - 1e-3;

			}

			return false;

		};

		// ヒット領域が画面のほぼ全体を覆っているか（四隅へのレイが全部当たるかで見る）。
		// 視点がカメラの錐台やライトの錐体の中にいると、どこをクリックしてもそのヘルパーに当たってしまう
		const coverRaycaster = new MXP.Raycaster();
		const coverNDC = new GLP.Vector();

		const coversViewport = ( hitEntity: MXP.Entity, cameraEntity: MXP.Entity ): boolean => {

			// ±1.0 ちょうどだと視点がカメラ位置に一致したとき境界上で判定が揺れる。
			// ±0.8 まで内側に寄せて、視点が少し後ろへ引いた（錐台が画面の8割強を覆う）状態まで「覆っている」とみなす
			for ( const [ x, y ] of [[ - 0.8, - 0.8 ], [ 0.8, - 0.8 ], [ - 0.8, 0.8 ], [ 0.8, 0.8 ]] ) {

				coverNDC.set( x, y );
				coverRaycaster.setFromCamera( coverNDC, cameraEntity );

				if ( coverRaycaster.intersectEntities( hitEntity ).length === 0 ) return false;

			}

			return true;

		};

		// クリック位置がヘルパーのワイヤ線分の近くにあるか（画面上のpx距離で判定）
		const isNearHelperLines = ( helper: EntityHelper, ndc: GLP.Vector, cameraEntity: MXP.Entity, content: { width: number, height: number } ): boolean => {

			for ( const seg of helper.getWorldSegments() ) {

				const a = projectToNDC( seg.a, cameraEntity );
				const b = projectToNDC( seg.b, cameraEntity );

				if ( ! a || ! b ) continue;

				// クリック位置を原点にしたpx座標へ移し、原点から線分への最短距離を測る
				const ax = ( a.x - ndc.x ) * content.width * 0.5;
				const ay = ( a.y - ndc.y ) * content.height * 0.5;
				const bx = ( b.x - ndc.x ) * content.width * 0.5;
				const by = ( b.y - ndc.y ) * content.height * 0.5;

				const dx = bx - ax;
				const dy = by - ay;
				const len2 = dx * dx + dy * dy;
				const t = len2 > 0 ? Math.max( 0, Math.min( 1, - ( ax * dx + ay * dy ) / len2 ) ) : 0;

				const px = ax + dx * t;
				const py = ay + dy * t;

				if ( Math.sqrt( px * px + py * py ) <= FRAME_SELECT_RADIUS_PX ) return true;

			}

			return false;

		};

		// カーソル下の選択候補を「見えている順」で集める。
		// 優先順位: 見えているヘルパー → カーソル近傍の未遮蔽ヘルパー → メッシュ手前順 → メッシュに隠れたヘルパー
		const collectCandidates = ( ndc: GLP.Vector ): ClickCandidate[] => {

			const cameraEntity = getCameraEntity();

			if ( ! cameraEntity ) return [];

			this._raycaster.setFromCamera( ndc, cameraEntity );

			const meshCandidates: ClickCandidate[] = [];

			for ( const r of this._raycaster.intersectEntities( engine.root ) ) {

				if ( r.entity.initiator !== 'god' ) {

					meshCandidates.push( { entity: r.entity, distance: r.distance, type: 'mesh' } );

				}

			}

			const firstMeshDistance = meshCandidates.length > 0 ? meshCandidates[ 0 ].distance : Infinity;

			const visibleHelpers: ClickCandidate[] = [];
			const hiddenHelpers: ClickCandidate[] = [];
			const directHitUUIDs = new Set<string>();
			const helpers = helperManager.getHelpers();
			const content = getContentRect( canvasElm );

			for ( const helper of helpers ) {

				const targetEntity = engine.root.findEntityByUUID( helper.targetEntityUUID );

				if ( ! targetEntity ) continue;

				// emptyは体積の当たり判定を持たない。Blenderと同じく、描かれている十字線の近くをクリックしたときだけ拾う
				if ( helper.type === 'empty' ) {

					if ( ! isNearHelperLines( helper, ndc, cameraEntity, content ) ) continue;

					directHitUUIDs.add( helper.targetEntityUUID );

					const elm = helper.entity.matrixWorld.elm;
					const dx = elm[ 12 ] - this._raycaster.ray.origin.x;
					const dy = elm[ 13 ] - this._raycaster.ray.origin.y;
					const dz = elm[ 14 ] - this._raycaster.ray.origin.z;
					const distance = Math.sqrt( dx * dx + dy * dy + dz * dz );

					const candidate: ClickCandidate = { entity: targetEntity, distance, type: 'helper' };

					if ( distance <= firstMeshDistance ) {

						visibleHelpers.push( candidate );

					} else {

						hiddenHelpers.push( candidate );

					}

					continue;

				}

				const hits = this._raycaster.intersectEntities( helper.hitAreaEntity );

				if ( hits.length === 0 ) continue;

				directHitUUIDs.add( helper.targetEntityUUID );

				const candidate: ClickCandidate = { entity: targetEntity, distance: hits[ 0 ].distance, type: 'helper' };

				// ヒット領域が画面全体を覆っている状態では面のヒットを捨てて、
				// 見えている枠線の近くをクリックしたときだけ選択として拾う
				if ( coversViewport( helper.hitAreaEntity, cameraEntity ) ) {

					if ( isNearHelperLines( helper, ndc, cameraEntity, content ) ) {

						visibleHelpers.push( candidate );

					}

					continue;

				}

				if ( hits[ 0 ].distance <= firstMeshDistance ) {

					visibleHelpers.push( candidate );

				} else {

					hiddenHelpers.push( candidate );

				}

			}

			// シーンカメラ視点ではそのカメラのヘルパーが出ないため、ビューポートの縁のクリックをカメラ選択として拾う（Blenderのカメラ枠クリック相当）
			if ( editorCamera.view === 'camera' ) {

				const edgePx = Math.min(
					( 1 - Math.abs( ndc.x ) ) * content.width * 0.5,
					( 1 - Math.abs( ndc.y ) ) * content.height * 0.5
				);

				if ( edgePx <= FRAME_SELECT_RADIUS_PX ) {

					visibleHelpers.push( { entity: cameraEntity, distance: 0, type: 'helper' } );

				}

			}

			visibleHelpers.sort( ( a, b ) => a.distance - b.distance );
			hiddenHelpers.sort( ( a, b ) => a.distance - b.distance );

			// 近傍アシスト: ヒットエリアを外していても、原点がカーソル近傍で遮蔽されていないヘルパーは拾う
			const assistHelpers: { candidate: ClickCandidate, screenDistance: number }[] = [];

			for ( const { targetEntityUUID } of helpers ) {

				if ( directHitUUIDs.has( targetEntityUUID ) ) continue;

				const targetEntity = engine.root.findEntityByUUID( targetEntityUUID );

				if ( ! targetEntity ) continue;

				const elm = targetEntity.matrixWorld.elm;
				const worldPos = new GLP.Vector( elm[ 12 ], elm[ 13 ], elm[ 14 ] );
				const helperNDC = projectToNDC( worldPos, cameraEntity );

				if ( ! helperNDC ) continue;

				const dxPx = ( helperNDC.x - ndc.x ) * content.width * 0.5;
				const dyPx = ( helperNDC.y - ndc.y ) * content.height * 0.5;
				const screenDistance = Math.sqrt( dxPx * dxPx + dyPx * dyPx );

				if ( screenDistance > HELPER_ASSIST_RADIUS_PX ) continue;
				if ( isOccluded( worldPos ) ) continue;

				const ox = worldPos.x - this._raycaster.ray.origin.x;
				const oy = worldPos.y - this._raycaster.ray.origin.y;
				const oz = worldPos.z - this._raycaster.ray.origin.z;

				assistHelpers.push( {
					candidate: {
						entity: targetEntity,
						distance: Math.sqrt( ox * ox + oy * oy + oz * oz ),
						type: 'helper',
					},
					screenDistance,
				} );

			}

			assistHelpers.sort( ( a, b ) => a.screenDistance - b.screenDistance );

			return [
				...visibleHelpers,
				...assistHelpers.map( ( a ) => a.candidate ),
				...meshCandidates,
				...hiddenHelpers,
			];

		};

		// アクティブなギズモのハンドルのうち、レイに最も近いものを拾う（raycaster は設定済みであること）
		const pickGizmoHandle = (): { handle: GizmoHandle, distance: number } | null => {

			const gizmo = gizmoManager.activeGizmo;

			if ( ! gizmo || ! gizmo.entity.visible ) return null;

			let closest: { handle: GizmoHandle, distance: number } | null = null;

			for ( const { handle, entity } of gizmo.getHandleEntities() ) {

				const hits = this._raycaster.intersectEntities( entity );

				if ( hits.length > 0 && ( ! closest || hits[ 0 ].distance < closest.distance ) ) {

					closest = { handle, distance: hits[ 0 ].distance };

				}

			}

			return closest;

		};

		// モーダル変形は window の capture リスナーでポインタを奪うが、取りこぼした場合の保険として二重に止める
		const onPointerDown = ( e: PointerEvent ) => {

			if ( isModalActive() ) return;

			// 右クリック・中クリックでギズモドラッグや選択が走らないようにする
			if ( e.pointerType === 'mouse' && e.button !== 0 ) return;

			// プレビュー中は編集操作を受けないが、ドラッグ離脱の判定に押下位置だけ追う
			if ( editorCamera.preview ) {

				( e.target as HTMLElement ).setPointerCapture( e.pointerId );
				this._pointerDownPos = new GLP.Vector( e.clientX, e.clientY );
				return;

			}

			if ( e.pointerType === 'touch' && this._gizmoDragging ) return;

			( e.target as HTMLElement ).setPointerCapture( e.pointerId );
			this._pointerDownPos = new GLP.Vector( e.clientX, e.clientY );

			if ( gizmoManager.activeGizmo && gizmoManager.activeGizmo.entity.visible ) {

				const ndc = clientToNDC( canvasElm, e.clientX, e.clientY );
				const cameraEntity = getCameraEntity();

				if ( cameraEntity ) {

					this._raycaster.setFromCamera( ndc, cameraEntity );

					const closestHit = pickGizmoHandle();

					if ( closestHit ) {

						const selectedEntityId = getSelectedEntityId();
						const selectedEntity = selectedEntityId
							? engine.root.findEntityByUUID( selectedEntityId )
							: null;

						if ( selectedEntity ) {

							this._gizmoDragging = true;
							editorCamera.orbitControls.enabled = false;
							canvasElm.style.cursor = 'grabbing';

							this._gizmoDragStartValue = {
								position: selectedEntity.position.getElm( 'vec3' ) as number[],
								euler: selectedEntity.euler.getElm( 'vec3' ) as number[],
								scale: selectedEntity.scale.getElm( 'vec3' ) as number[],
							};

							gizmoManager.activeGizmo.startDrag( closestHit.handle, this._raycaster.ray, selectedEntity );

						}

					}

				}

			}

		};

		const onPointerMove = ( e: PointerEvent ) => {

			if ( isModalActive() ) return;

			// シーンカメラ視点・プレビューのドラッグはエディタカメラへ抜けて、その視点から操作を続ける（Blenderのカメラビュー相当）
			if ( ( editorCamera.preview || editorCamera.view === "camera" ) && this._pointerDownPos && ! this._gizmoDragging ) {

				const dragX = e.clientX - this._pointerDownPos.x;
				const dragY = e.clientY - this._pointerDownPos.y;

				if ( Math.sqrt( dragX * dragX + dragY * dragY ) > 5 ) {

					onEscapeToEditorCamera();

				}

			}

			// プレビュー中は編集操作を受けない
			if ( editorCamera.preview ) {

				canvasElm.style.cursor = '';
				return;

			}

			const ndc = clientToNDC( canvasElm, e.clientX, e.clientY );
			const cameraEntity = getCameraEntity();

			if ( ! cameraEntity ) return;

			this._raycaster.setFromCamera( ndc, cameraEntity );

			if ( this._gizmoDragging ) {

				const selectedEntityId = getSelectedEntityId();
				const selectedEntity = selectedEntityId
					? engine.root.findEntityByUUID( selectedEntityId )
					: null;

				if ( ! selectedEntity ) return;

				const result = gizmoManager.activeGizmo!.updateDrag( this._raycaster.ray, selectedEntity );

				if ( result ) {

					if ( result.position ) {

						const localPos = result.position.clone();

						if ( selectedEntity.parent ) {

							// 位置ベクトルとして親ローカルへ変換する（applyMatrix4 は w=0 の方向変換になり平行移動が落ちる）
							localPos.applyMatrix4AsPosition( selectedEntity.parent.matrixWorld.clone().inverse() );

						}

						selectedEntity.position.copy( localPos );

					}

					if ( result.euler ) {

						selectedEntity.euler.set( result.euler.x, result.euler.y, result.euler.z );

					}

					if ( result.scale ) {

						selectedEntity.scale.set( result.scale.x, result.scale.y, result.scale.z );

					}

					selectedEntity.updateMatrix( true );

				}

				return;

			}

			// hover detection
			let newHover: 'gizmo' | 'helper' | 'mesh' | null = null;

			if ( gizmoManager.activeGizmo && gizmoManager.activeGizmo.entity.visible ) {

				const gizmoHit = pickGizmoHandle();

				if ( gizmoHit ) newHover = 'gizmo';

				// 掴めるハンドルを掴む前に光らせる（Blenderのホバーハイライト相当）
				gizmoManager.activeGizmo.setHover( gizmoHit ? gizmoHit.handle : null );

			}

			if ( ! newHover ) {

				const candidates = collectCandidates( ndc );

				if ( candidates.length > 0 ) {

					newHover = candidates[ 0 ].type;

				}

			}

			if ( newHover !== this._hoveredTarget ) {

				this._hoveredTarget = newHover;

				if ( newHover === 'gizmo' ) {

					canvasElm.style.cursor = 'grab';

				} else if ( newHover === 'helper' || newHover === 'mesh' ) {

					canvasElm.style.cursor = 'pointer';

				} else {

					canvasElm.style.cursor = '';

				}

			}

		};

		const onPointerUp = ( e: PointerEvent ) => {

			if ( isModalActive() ) return;

			// プレビュー中は編集操作を受けない
			if ( editorCamera.preview ) {

				this._pointerDownPos = null;
				return;

			}

			if ( this._gizmoDragging ) {

				gizmoManager.activeGizmo!.endDrag();
				this._gizmoDragging = false;

				// エディタカメラで見ているときだけオービットを有効へ戻す
				editorCamera.orbitControls.enabled = editorCamera.usingEditorCamera;
				canvasElm.style.cursor = this._hoveredTarget === 'gizmo' ? 'grab' : '';

				const selectedEntityId = getSelectedEntityId();
				const selectedEntity = selectedEntityId
					? engine.root.findEntityByUUID( selectedEntityId )
					: null;

				if ( selectedEntity && this._gizmoDragStartValue ) {

					const gizmoMode = getGizmoMode();
					const fieldName = gizmoMode === 'translate' ? 'position'
						: gizmoMode === 'rotate' ? 'euler'
							: 'scale';

					const oldValue = this._gizmoDragStartValue[ fieldName ];
					const newValue = selectedEntity[ fieldName ].getElm( 'vec3' ) as number[];

					api.commandManager.execute(
						new SetFieldCommand( selectedEntity, fieldName, oldValue, newValue )
					);

				}

				this._gizmoDragStartValue = null;
				this._pointerDownPos = null;

				return;

			}

			if ( ! this._pointerDownPos ) return;

			const dx = e.clientX - this._pointerDownPos.x;
			const dy = e.clientY - this._pointerDownPos.y;
			const dist = Math.sqrt( dx * dx + dy * dy );
			this._pointerDownPos = null;

			if ( dist > 5 ) return;

			const ndc = clientToNDC( canvasElm, e.clientX, e.clientY );

			if ( ! getCameraEntity() ) return;

			const validCandidates = collectCandidates( ndc );

			if ( validCandidates.length === 0 ) {

				this._lastClickNDC = null;
				this._lastClickCandidateUUIDs = [];
				this._lastClickCycleIndex = - 1;
				onSelectEntity( null );
				return;

			}

			// cycle selection on repeated clicks at the same position
			const CYCLE_THRESHOLD = 0.02;
			const isSamePosition = this._lastClickNDC &&
				Math.abs( ndc.x - this._lastClickNDC.x ) < CYCLE_THRESHOLD &&
				Math.abs( ndc.y - this._lastClickNDC.y ) < CYCLE_THRESHOLD;

			const candidateUUIDs = validCandidates.map( c => c.entity.uuid );
			const isSameCandidates = isSamePosition &&
				candidateUUIDs.length === this._lastClickCandidateUUIDs.length &&
				candidateUUIDs.every( ( uuid, i ) => uuid === this._lastClickCandidateUUIDs[ i ] );

			let cycleIndex = 0;

			if ( isSameCandidates && validCandidates.length > 1 ) {

				cycleIndex = ( this._lastClickCycleIndex + 1 ) % validCandidates.length;

			}

			this._lastClickNDC = new GLP.Vector( ndc.x, ndc.y );
			this._lastClickCandidateUUIDs = candidateUUIDs;
			this._lastClickCycleIndex = cycleIndex;

			onSelectEntity( validCandidates[ cycleIndex ].entity );

		};

		// 右クリックはビューポート操作に使うのでブラウザのメニューを出さない
		const onContextMenu = ( e: MouseEvent ) => {

			e.preventDefault();

		};

		canvasElm.addEventListener( "pointerdown", onPointerDown );
		canvasElm.addEventListener( "pointermove", onPointerMove );
		canvasElm.addEventListener( "pointerup", onPointerUp );
		canvasElm.addEventListener( "contextmenu", onContextMenu );

		this._disposeListeners = () => {

			canvasElm.removeEventListener( "pointerdown", onPointerDown );
			canvasElm.removeEventListener( "pointermove", onPointerMove );
			canvasElm.removeEventListener( "pointerup", onPointerUp );
			canvasElm.removeEventListener( "contextmenu", onContextMenu );

		};

	}

	public get gizmoDragging() {

		return this._gizmoDragging;

	}

	public dispose() {

		this._disposeListeners();

	}

}
