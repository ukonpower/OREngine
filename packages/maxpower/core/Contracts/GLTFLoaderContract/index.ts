import type { Entity } from '../../Entity';

export type GLTF = {
	scene: Entity;
}

// バックエンドごとのGLTFLoaderが満たす口。BLidgeはこの口越しにglbを読む
export interface GLTFLoaderContract {
	load( path: string ): Promise<GLTF>;
}
