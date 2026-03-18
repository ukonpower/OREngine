import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../Engine';
import { SetFieldCommand } from '../Commands/SetFieldCommand';
import { EditorCamera } from '../EditorCamera';
import { GizmoAxis, GizmoMode } from '../Gizmo';
import { GizmoManager } from '../GizmoManager';
import { HelperManager } from '../HelperManager';

import type { EditorAPI } from '../EditorAPI';

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
	) {

		this._raycaster = new MXP.Raycaster();
		this._pointerDownPos = null;
		this._gizmoDragging = false;
		this._gizmoDragStartValue = null;
		this._hoveredTarget = null;
		this._lastClickNDC = null;
		this._lastClickCandidateUUIDs = [];
		this._lastClickCycleIndex = -1;

		const canvasElm = engine.canvas as HTMLCanvasElement;

		const getNDC = ( e: PointerEvent ): GLP.Vector => {

			const rect = canvasElm.getBoundingClientRect();
			const canvasAspect = canvasElm.width / canvasElm.height;
			const rectAspect = rect.width / rect.height;

			let contentWidth = rect.width;
			let contentHeight = rect.height;
			let offsetX = 0;
			let offsetY = 0;

			if ( rectAspect > canvasAspect ) {

				contentWidth = rect.height * canvasAspect;
				offsetX = ( rect.width - contentWidth ) / 2;

			} else {

				contentHeight = rect.width / canvasAspect;
				offsetY = ( rect.height - contentHeight ) / 2;

			}

			const x = ( ( e.clientX - rect.left - offsetX ) / contentWidth ) * 2 - 1;
			const y = - ( ( e.clientY - rect.top - offsetY ) / contentHeight ) * 2 + 1;

			return new GLP.Vector( x, y );

		};

		const getCameraEntity = (): MXP.Entity | null => {

			return editorCamera.getCameraEntity( engine );

		};

		const onPointerDown = ( e: PointerEvent ) => {

			if ( e.pointerType === 'touch' && this._gizmoDragging ) return;

			( e.target as HTMLElement ).setPointerCapture( e.pointerId );
			this._pointerDownPos = new GLP.Vector( e.clientX, e.clientY );

			if ( gizmoManager.activeGizmo.entity.visible ) {

				const ndc = getNDC( e );
				const cameraEntity = getCameraEntity();

				if ( cameraEntity ) {

					this._raycaster.setFromCamera( ndc, cameraEntity );

					const axisEntities = gizmoManager.activeGizmo.getAxisEntities();
					let closestHit: { axis: GizmoAxis, distance: number } | null = null;

					for ( const { axis, entity: axisEntity } of axisEntities ) {

						const hits = this._raycaster.intersectEntities( axisEntity );

						if ( hits.length > 0 && ( ! closestHit || hits[ 0 ].distance < closestHit.distance ) ) {

							closestHit = { axis, distance: hits[ 0 ].distance };

						}

					}

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

							gizmoManager.activeGizmo.startDrag( closestHit.axis, this._raycaster.ray, selectedEntity );

						}

					}

				}

			}

		};

		const onPointerMove = ( e: PointerEvent ) => {

			const ndc = getNDC( e );
			const cameraEntity = getCameraEntity();

			if ( ! cameraEntity ) return;

			this._raycaster.setFromCamera( ndc, cameraEntity );

			if ( this._gizmoDragging ) {

				const selectedEntityId = getSelectedEntityId();
				const selectedEntity = selectedEntityId
					? engine.root.findEntityByUUID( selectedEntityId )
					: null;

				if ( ! selectedEntity ) return;

				const result = gizmoManager.activeGizmo.updateDrag( this._raycaster.ray, selectedEntity );

				if ( result ) {

					if ( result.position ) {

						const localPos = result.position.clone();

						if ( selectedEntity.parent ) {

							localPos.applyMatrix4( selectedEntity.parent.matrixWorld.clone().inverse() );

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

			if ( gizmoManager.activeGizmo.entity.visible ) {

				const axisEntities = gizmoManager.activeGizmo.getAxisEntities();

				for ( const { entity: axisEntity } of axisEntities ) {

					const hits = this._raycaster.intersectEntities( axisEntity );

					if ( hits.length > 0 ) {

						newHover = 'gizmo';
						break;

					}

				}

			}

			if ( ! newHover ) {

				const hitAreas = helperManager.getHitAreaEntities();

				for ( const { hitEntity } of hitAreas ) {

					const hits = this._raycaster.intersectEntities( hitEntity );

					if ( hits.length > 0 ) {

						newHover = 'helper';
						break;

					}

				}

			}

			if ( ! newHover ) {

				const sceneHits = this._raycaster.intersectEntities( engine.root );
				const meshHit = sceneHits.find( r => r.entity.initiator !== "god" );

				if ( meshHit ) {

					newHover = 'mesh';

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

			if ( this._gizmoDragging ) {

				gizmoManager.activeGizmo.endDrag();
				this._gizmoDragging = false;
				editorCamera.orbitControls.enabled = true;
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

			const ndc = getNDC( e );
			const cameraEntity = getCameraEntity();

			if ( ! cameraEntity ) return;

			this._raycaster.setFromCamera( ndc, cameraEntity );

			// unified raycast: helpers + scene meshes
			type ClickCandidate = { entity: MXP.Entity, distance: number, type: 'helper' | 'mesh' };
			const candidates: ClickCandidate[] = [];

			const hitAreas = helperManager.getHitAreaEntities();

			for ( const { hitEntity, targetEntityUUID } of hitAreas ) {

				const hits = this._raycaster.intersectEntities( hitEntity );

				if ( hits.length > 0 ) {

					const targetEntity = engine.root.findEntityByUUID( targetEntityUUID );

					if ( targetEntity ) {

						candidates.push( {
							entity: targetEntity,
							distance: hits[ 0 ].distance,
							type: 'helper',
						} );

					}

				}

			}

			const sceneResults = this._raycaster.intersectEntities( engine.root );

			for ( const r of sceneResults ) {

				if ( r.entity.initiator !== "god" ) {

					candidates.push( {
						entity: r.entity,
						distance: r.distance,
						type: 'mesh',
					} );

				}

			}

			candidates.sort( ( a, b ) => a.distance - b.distance );

			// filter: helpers are transparent, first mesh blocks everything behind it
			const validCandidates: ClickCandidate[] = [];

			for ( const c of candidates ) {

				validCandidates.push( c );

				if ( c.type === 'mesh' ) break;

			}

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

		canvasElm.addEventListener( "pointerdown", onPointerDown );
		canvasElm.addEventListener( "pointermove", onPointerMove );
		canvasElm.addEventListener( "pointerup", onPointerUp );

		this._disposeListeners = () => {

			canvasElm.removeEventListener( "pointerdown", onPointerDown );
			canvasElm.removeEventListener( "pointermove", onPointerMove );
			canvasElm.removeEventListener( "pointerup", onPointerUp );

		};

	}

	public get gizmoDragging() {

		return this._gizmoDragging;

	}

	public dispose() {

		this._disposeListeners();

	}

}
