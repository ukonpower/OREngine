import type { Engine } from '../../../../core/Engine';
import type { Editor } from '../../Editor';
import type { AgentOptions } from '../Protocol';

// プロジェクト内のシーン一覧と、開いているシーンの切替・作成・削除。実体はページ（EditorPage）が持つ。
// エディタ UI の Scene パネルも同じ窓口を使う（OREditorProvider の SceneSelection）
export type AgentSceneControl = {
	names: string[];
	current: string | null;
	// 読み込みの開始まで。エンジンの読み込み完了は engine の loaded で分かる
	onSelect: ( name: string ) => Promise<void>;
	// ファイルを作るだけで開かない。from を渡すとそのシーンの中身を複製する
	onCreate: ( name: string, from?: string ) => Promise<void>;
	onDelete: ( name: string ) => Promise<void>;
};

// コマンドから見えるエディタの状態
export type AgentCommandContext = {
	editor: Editor;
	engine: Engine;
	tabId: string;
	// CLI が headless Chromium で開いたページか（ユーザーのタブなら false）
	headless: boolean;
	// 開いているシーンのファイル名（scenes/<name>.json の name）。ページがシーンを持たないときは null
	sceneName: string | null;
	// シーンを切り替えられないページ（シーンを焼き込んだビルド等）では null
	scenes: AgentSceneControl | null;
	// 最後の保存（または読み込み）以降に EditorAPI 経由の変更があったか
	unsaved: boolean;
};

export type AgentCommandInput = {
	args: string[];
	options: AgentOptions;
};

// 戻り値は JSON にして CLI へ返す
export type AgentCommand = ( ctx: AgentCommandContext, input: AgentCommandInput ) => unknown | Promise<unknown>;

export type AgentCommandTable = { [ name: string ]: AgentCommand };

// CLI へ理由付きで返す失敗。candidates は「どれのことか」を選び直させたいときの候補
export class AgentCommandError extends Error {

	public candidates?: unknown;

	constructor( message: string, candidates?: unknown ) {

		super( message );

		this.candidates = candidates;

	}

}

// 位置引数を1つ取り出す。無ければ使い方付きで失敗させる
export const requireArg = ( input: AgentCommandInput, index: number, usage: string ) => {

	const value = input.args[ index ];

	if ( value === undefined ) {

		throw new AgentCommandError( `引数が足りません。使い方: ${usage}` );

	}

	return value;

};

// 投げられた値を CLI に返すメッセージにする
export const errorMessage = ( e: unknown ) => {

	if ( e instanceof Error ) {

		return e.message;

	}

	return String( e );

};
