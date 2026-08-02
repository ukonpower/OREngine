import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export type GizmoAxis = 'x' | 'y' | 'z';
export type GizmoMode = 'select' | 'translate' | 'rotate' | 'scale';

export interface GizmoDragResult {
	position?: GLP.Vector;
	euler?: GLP.Vector;
	scale?: GLP.Vector;
}

export interface Gizmo {
	entity: MXP.Entity;
	readonly activeAxis: GizmoAxis | null;
	readonly dragging: boolean;
	setTarget( entity: MXP.Entity | null, cameraEntity: MXP.Entity | null ): void;
	getAxisEntities(): { axis: GizmoAxis, entity: MXP.Entity }[];
	startDrag( axis: GizmoAxis, ray: MXP.Ray, targetEntity: MXP.Entity ): void;
	updateDrag( ray: MXP.Ray, targetEntity: MXP.Entity ): GizmoDragResult | null;
	endDrag(): void;
}
