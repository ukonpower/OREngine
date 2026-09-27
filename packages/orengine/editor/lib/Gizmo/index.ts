import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import type { TransformOrientation } from '../TransformUtils';

export type GizmoAxis = 'x' | 'y' | 'z';
export type GizmoPlane = 'xy' | 'yz' | 'xz';

// ドラッグで掴める部位。axis=単軸 / plane=2軸平面 / center=中心 / view=視線軸リング（回転のみ）
export type GizmoHandle = GizmoAxis | GizmoPlane | 'center' | 'view';

export type GizmoMode = 'select' | 'translate' | 'rotate' | 'scale';

// ドラッグの変化量。translate はワールド空間の移動量、rotate はワールド空間の回転、scale は軸ごとの倍率（TransformTargets に渡す）
export interface GizmoDragResult {
	translate?: MTP.Vector;
	rotate?: MTP.Quaternion;
	scale?: number[];
}

// ギズモを置く場所。position は変形の中心、quaternion はローカル軸の向き（アクティブのワールド回転）
export type GizmoTarget = {
	position: MTP.Vector;
	quaternion: MTP.Quaternion;
};

export interface Gizmo {
	entity: MXP.Entity;
	readonly activeHandle: GizmoHandle | null;
	readonly dragging: boolean;
	setTarget( target: GizmoTarget | null, cameraEntity: MXP.Entity | null, orientation: TransformOrientation ): void;
	setHover( handle: GizmoHandle | null ): void;
	getHandleEntities(): { handle: GizmoHandle, entity: MXP.Entity }[];
	startDrag( handle: GizmoHandle, ray: MXP.Ray ): void;
	updateDrag( ray: MXP.Ray ): GizmoDragResult | null;
	endDrag(): void;
}
