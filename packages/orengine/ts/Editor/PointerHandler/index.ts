import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../Engine';
import { SetFieldCommand } from '../Commands/SetFieldCommand';
import { EditorCamera } from '../EditorCamera';
import { GizmoAxis, GizmoMode } from '../Gizmo';
import { GizmoManager } from '../GizmoManager';

import type { EditorAPI } from '../EditorAPI';

export class PointerHandler {

	private _raycaster: MXP.Raycaster;
	private _pointerDownPos: GLP.Vector | null;
	private _gizmoDragging: boolean;
	private _gizmoDragStartValue: { position: number[], euler: number[], scale: number[] } | null;
	private _disposeListeners: () => void;

	constructor(
		engine: Engine,
		editorCamera: EditorCamera,
		gizmoManager: GizmoManager,
		api: EditorAPI,
		getSelectedEntityId: () => string | null,
		getGizmoMode: () => GizmoMode,
		onSelectEntity: ( entity: MXP.Entity | null ) => void,
	) {

		this._raycaster = new MXP.Raycaster();
		this._pointerDownPos = null;
		this._gizmoDragging = false;
		this._gizmoDragStartValue = null;

		const canvasElm = engine.canvas as HTMLCanvasElement;

		const getNDC = ( e: PointerEvent ): GLP.Vector => {

			const rect = canvasElm.getBoundingClientRect();
			const x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
			const y = - ( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;

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

			if ( ! this._gizmoDragging ) return;

			const selectedEntityId = getSelectedEntityId();
			const selectedEntity = selectedEntityId
				? engine.root.findEntityByUUID( selectedEntityId )
				: null;

			if ( ! selectedEntity ) return;

			const ndc = getNDC( e );
			const cameraEntity = getCameraEntity();

			if ( ! cameraEntity ) return;

			this._raycaster.setFromCamera( ndc, cameraEntity );
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

		};

		const onPointerUp = ( e: PointerEvent ) => {

			if ( this._gizmoDragging ) {

				gizmoManager.activeGizmo.endDrag();
				this._gizmoDragging = false;
				editorCamera.orbitControls.enabled = true;

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
			const results = this._raycaster.intersectEntities( engine.root );

			if ( results.length > 0 ) {

				const hit = results.find( r => r.entity.initiator !== "god" );
				onSelectEntity( hit ? hit.entity : null );

			} else {

				onSelectEntity( null );

			}

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
