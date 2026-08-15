import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import type { TransformOrientation } from '../../transform/TransformUtils';

export type GizmoAxis = 'x' | 'y' | 'z';
export type GizmoPlane = 'xy' | 'yz' | 'xz';

// ドラッグで掴める部位。axis=単軸 / plane=2軸平面 / center=中心 / view=視線軸リング（回転のみ）
export type GizmoHandle = GizmoAxis | GizmoPlane | 'center' | 'view';

export type GizmoMode = 'select' | 'translate' | 'rotate' | 'scale';

export interface GizmoDragResult {
	position?: MTP.Vector;
	euler?: MTP.Vector;
	scale?: MTP.Vector;
}

export interface Gizmo {
	entity: MXP.Entity;
	readonly activeHandle: GizmoHandle | null;
	readonly dragging: boolean;
	setTarget( entity: MXP.Entity | null, cameraEntity: MXP.Entity | null, orientation: TransformOrientation ): void;
	setHover( handle: GizmoHandle | null ): void;
	getHandleEntities(): { handle: GizmoHandle, entity: MXP.Entity }[];
	startDrag( handle: GizmoHandle, ray: MXP.Ray, targetEntity: MXP.Entity ): void;
	updateDrag( ray: MXP.Ray, targetEntity: MXP.Entity ): GizmoDragResult | null;
	endDrag(): void;
}
