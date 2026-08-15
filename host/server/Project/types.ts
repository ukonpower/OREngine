// scene.json のエンティティ構造（ProjectSerializer と同一）
export interface SceneDataEntity {
	name: string;
	uuid: string;
	pos?: number[];
	rot?: number[];
	scale?: number[];
	components?: SceneDataComponent[];
	childs?: SceneDataEntity[];
}

export interface SceneDataComponent {
	name: string;
	uuid: string;
	props?: Record<string, unknown>;
}

// scene.json のトップレベル構造
export interface SceneFileData {
	name: string;
	scene: SceneDataEntity;
	[key: string]: unknown;
}
