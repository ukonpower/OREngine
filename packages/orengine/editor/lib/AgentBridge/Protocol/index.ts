// CLI ⇔ dev サーバー（host/vite/plugins/AgentBridge）⇔ エディタタブの間でやり取りする形。
// node 側（Vite プラグイン・scripts/scene.ts）からも相対パスで import するので、ブラウザ依存のコードを置かない

// CLI が叩く HTTP エンドポイント。`POST ${AGENT_ENDPOINT}/<command>`
export const AGENT_ENDPOINT = '/__agent';

// HMR WebSocket のカスタムイベント名
export const AGENT_EVENT = {
	hello: 'orengine:agent:hello',
	focus: 'orengine:agent:focus',
	request: 'orengine:agent:request',
	response: 'orengine:agent:response',
} as const;

// timeoutMs を省いたときにサーバーが待つ時間
export const DEFAULT_TIMEOUT_MS = 10000;

// タブ → サーバーの応答を分ける単位（文字数）。1 メッセージが ws の maxPayload（既定 100MiB）を超えると
// HMR の接続ごと切られるので、大きな応答でも1通を小さく保つ
export const RESPONSE_CHUNK_SIZE = 256 * 1024;

export type AgentOptions = { [ key: string ]: string | boolean };

// CLI → サーバーの HTTP body
export type AgentHttpRequest = {
	args: string[];
	options: AgentOptions;
	timeoutMs?: number;
};

export type AgentHello = {
	tabId: string;
	url: string;
	focused: boolean;
};

export type AgentFocus = {
	tabId: string;
};

export type AgentRequest = {
	id: string;
	tabId: string;
	command: string;
	args: string[];
	options: AgentOptions;
};

// 応答の JSON 文字列（AgentResult）を分割したもの。index 順に連結すると元に戻る
export type AgentResponseChunk = {
	id: string;
	index: number;
	count: number;
	chunk: string;
};

export type AgentResult =
	| { ok: true; result: unknown }
	| { ok: false; error: string; candidates?: unknown };
