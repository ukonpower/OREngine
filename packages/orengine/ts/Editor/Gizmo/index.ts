import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export function createHitAreaMaterial(): MXP.Material {

	const mat = new MXP.Material();
	mat.visibilityFlag = {
		deferred: false, forward: false,
		shadowMap: false, envMap: false,
		ui: false, postprocess: false,
	};

	return mat;

}

export type GizmoAxis = 'x' | 'y' | 'z';
export type GizmoMode = 'translate' | 'rotate' | 'scale';

export interface GizmoDragResult {
	position?: GLP.Vector;
	euler?: GLP.Vector;
	scale?: GLP.Vector;
}

export interface Gizmo {
	entity: MXP.Entity;
	readonly activeAxis: GizmoAxis | null;
	readonly dragging: boolean;
	setTarget( entity: MXP.Entity | null ): void;
	getAxisEntities(): { axis: GizmoAxis, entity: MXP.Entity }[];
	startDrag( axis: GizmoAxis, ray: MXP.Ray, targetEntity: MXP.Entity ): void;
	updateDrag( ray: MXP.Ray, targetEntity: MXP.Entity ): GizmoDragResult | null;
	endDrag(): void;
}
