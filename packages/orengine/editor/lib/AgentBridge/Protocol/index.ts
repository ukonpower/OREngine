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

// 接続中のタブが無いときにサーバーが返す HTTP ステータス。CLI はこれを見て headless で開き直す
export const AGENT_NO_TAB_STATUS = 503;

// CLI が headless で開くエディタ URL に付けるクエリ。ページはこれで自分が headless だと知る
export const AGENT_HEADLESS_PARAM = 'agent-headless';

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
	headless: boolean;
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

// saved: headless のタブが書き込みの後に editor.save() を呼んだ。CLI はファイルへの書き込みが終わるまでブラウザを閉じずに待つ
export type AgentResult =
	| { ok: true; result: unknown; saved?: boolean }
	| { ok: false; error: string; candidates?: unknown };
