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
	saved: 'orengine:agent:saved',
	ready: 'orengine:agent:ready',
	updated: 'orengine:agent:updated',
} as const;

// 接続中のタブが無いときにサーバーが返す HTTP ステータス。CLI はこれを見て headless で開き直す
export const AGENT_NO_TAB_STATUS = 503;

// CLI が headless で開くエディタ URL に付けるクエリ。ページはこれで自分が headless だと知る。
// 値が AGENT_HEADLESS_KEEP なら orengine-cli の自分用 dev サーバーが開いたままにするページ（undo 履歴がコマンドをまたいで残る）
export const AGENT_HEADLESS_PARAM = 'agent-headless';
export const AGENT_HEADLESS_KEEP = 'keep';

// エディタ URL に付けると、editor.json の scene の代わりにこのシーンを開く（EditorPage が読む）。
// 開くだけでは保存しないので、editor.json の scene は書き換わらない（scene-shots がシーンを順に開き直すのに使う）
export const AGENT_SCENE_PARAM = 'agent-scene';

// timeoutMs を省いたときにサーバーが待つ時間
export const DEFAULT_TIMEOUT_MS = 10000;

// コマンドを送る前に、タブがコードの更新・リロード・シーンの読み込みを終えるのを待つ上限（waitMs の既定）。
// 初回のリロードは vite の変換とシェーダーの minify が走るので長めに取る
export const DEFAULT_WAIT_MS = 60000;

// タブ → サーバーの応答を分ける単位（文字数）。1 メッセージが ws の maxPayload（既定 100MiB）を超えると
// HMR の接続ごと切られるので、大きな応答でも1通を小さく保つ
export const RESPONSE_CHUNK_SIZE = 256 * 1024;

export type AgentOptions = { [ key: string ]: string | boolean };

// CLI → サーバーの HTTP body
export type AgentHttpRequest = {
	args: string[];
	options: AgentOptions;
	timeoutMs?: number;
	waitMs?: number;
};

// tabId はタブ（sessionStorage）ごとに固定で、リロードしても変わらない。サーバーはこれでリロード後のタブを同じタブとして待つ
export type AgentHello = {
	tabId: string;
	url: string;
	focused: boolean;
	headless: boolean;
	ready: boolean;
	scene: string | null;
};

// シーンを読み込み終えてコマンドを受けられるようになった（ready: true）／エディタが外れた（false）
export type AgentReady = {
	tabId: string;
	ready: boolean;
	scene: string | null;
};

// HMR の更新（update）を1つ反映し終えた。サーバーは送った数と突き合わせて、反映待ちのタブへコマンドを送らない
export type AgentUpdated = {
	tabId: string;
};

export type AgentFocus = {
	tabId: string;
};

// 書き込み系コマンドでシーンをファイルへ保存し終えたタブ。サーバーはこのタブ以外のエディタタブをリロードさせる
export type AgentSaved = {
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

// 書き込み系コマンドの書き込み先。保存は接続先によらず応答の前に済んでいる。
// headless は1コマンドごとに閉じるので undo / redo が効かない。その区別のために返す
// tab: 本人のタブ / headless: CLI が1コマンドだけ開いたページ / own: orengine-cli の自分用 dev サーバーが開いたままにしているページ
export type AgentConnection = 'tab' | 'headless' | 'own';

export type AgentWriteInfo = {
	connection: AgentConnection;
};

// write: 書き込み系コマンドのときだけ付く。接続先はコマンドごとに変わりうるので、書き込みのたびに返す。
// interrupted: 実行中にタブがリロード・コードの更新を受けたので、結果を信じられない（読み取り系なら CLI が撮り直す）
export type AgentResult =
	| { ok: true; result: unknown; write?: AgentWriteInfo }
	| { ok: false; error: string; candidates?: unknown; interrupted?: boolean };

// GET ${AGENT_ENDPOINT} の応答。orengine-cli が接続先を選ぶのと status に使う
export type AgentTabInfo = {
	id: string;
	url: string;
	headless: boolean;
	// false = リロード中で切れている（再接続を待っている）
	connected: boolean;
	ready: boolean;
	scene: string | null;
	focusedAt: number;
	registeredAt: number;
	// 送ったが反映し終えていない HMR の更新の数
	pendingUpdates: number;
	// リロードを送ったのにページが読み込み直されていない（未保存の確認で止まっているなど）。古いコードのまま
	stale: boolean;
};

export type AgentServerInfo = {
	project: string;
	projectDir: string;
	renderer: string;
	owner: 'user' | 'cli';
	pid: number;
	startedAt: number;
	// 最後にコマンドを受けた時刻（0 = まだ無い）。自分用の dev サーバーはこれで使われなくなったかを判断する
	lastRequestAt: number;
	tabs: AgentTabInfo[];
};

// コマンドの応答に付くヘッダー。どのタブで実行したかを CLI が status の情報と突き合わせるのに使う
export const AGENT_TAB_HEADER = 'x-orengine-agent-tab';
