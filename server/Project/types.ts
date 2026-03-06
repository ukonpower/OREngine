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

// API レスポンス用
export interface EntityTreeResponse {
	uuid: string;
	name: string;
	position: { x: number; y: number; z: number };
	euler: { x: number; y: number; z: number };
	scale: { x: number; y: number; z: number };
	components: { uuid: string; name: string }[];
	children: EntityTreeResponse[];
}

export interface EntityDetailResponse {
	uuid: string;
	name: string;
	position: { x: number; y: number; z: number };
	euler: { x: number; y: number; z: number };
	scale: { x: number; y: number; z: number };
	components: { uuid: string; name: string; fields: Record<string, unknown> }[];
	childrenCount: number;
	parentUuid: string | null;
}

// WS メッセージ型
export type SyncRequest = {
	type: 'syncRequest';
	id: string;
	projectName: string;
};

export type ExecuteAction = {
	type: 'executeAction';
	projectName: string;
	action: string;
	params: Record<string, unknown>;
};

export type SyncResponse = {
	type: 'syncResponse';
	id: string;
	sceneData: SceneFileData;
};
