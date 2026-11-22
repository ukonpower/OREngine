// orengine-cli のコマンド一覧。help の表示・タイムアウト・書き込み系かどうか（中断されたときに撮り直してよいか）をここで決める

export type CommandSpec = {
	usage: string;
	description: string;
	timeoutMs: number;
	// 書き込み系。途中でタブがリロードされても撮り直さない（反映されたかが分からないので、確かめさせる）
	write?: boolean;
};

export const COMMANDS: { [ name: string ]: CommandSpec } = {
	status: { usage: 'status', description: '接続先の dev サーバー（立っている全部）・タブ・コードの版・シーン名・未保存の変更の有無', timeoutMs: 5000 },
	tree: { usage: 'tree', description: '展開後の全エンティティ（ワールド座標・前方ベクトル・境界ボックス・コンポーネント）', timeoutMs: 10000 },
	get: { usage: 'get <entity>', description: '1エンティティのフィールドと全コンポーネントのフィールド値（<entity> は uuid かルートの名前から始まる名前パス）', timeoutMs: 10000 },
	// 全コンポーネントを一度ずつ生成してフィールド定義を読むので他より長く待つ
	components: { usage: 'components', description: '登録済みコンポーネントの一覧とフィールド定義', timeoutMs: 30000 },
	errors: { usage: 'errors', description: 'シェーダーエラー・GPU エラー・コンソールのエラー・解決できなかったコンポーネント', timeoutMs: 5000 },
	// 書き込みは EditorAPI 経由でタブに反映し、応答の前にファイルへ保存する
	'add-entity': { usage: 'add-entity <parent> [--name <name>]', description: 'コンポーネントの無いエンティティを追加して uuid を返す（名前の省略時は Empty）', timeoutMs: 10000, write: true },
	'remove-entity': { usage: 'remove-entity <entity>', description: 'エンティティを子ごと削除する', timeoutMs: 10000, write: true },
	reparent: { usage: 'reparent <entity> <parent>', description: '親を付け替える（子ごと移す。ワールド座標は保ち、名前がぶつかれば Name.001 に採番する）。新しいパスを返す', timeoutMs: 10000, write: true },
	'add-component': { usage: 'add-component <entity> <Name>', description: 'コンポーネントを付ける（Name は components の name）', timeoutMs: 10000, write: true },
	'remove-component': { usage: 'remove-component <entity> <Name>', description: 'コンポーネントを外す（Name は登録名か uuid）', timeoutMs: 10000, write: true },
	set: { usage: 'set <entity> [<component>] <path> <value>', description: 'フィールドを書き換える。値はフィールドの型で解釈する（数値 / 1,2,3 / true|false / 文字列 / 選択肢）', timeoutMs: 10000, write: true },
	undo: { usage: 'undo', description: '直前の操作を取り消す（GUI の操作と履歴を共有）', timeoutMs: 5000, write: true },
	redo: { usage: 'redo', description: '取り消した操作をやり直す', timeoutMs: 5000, write: true },
	settings: { usage: 'settings [renderer|timeline|editor]', description: 'シーン以外の設定（renderer / timeline は開いているシーン、editor は editor.json）の現在値と書き換えられる path', timeoutMs: 10000 },
	'set-setting': { usage: 'set-setting <renderer|timeline|editor> <path> <value>', description: '設定を書き換える（undo が効く）。値の解釈は set と同じ', timeoutMs: 10000, write: true },
	// キーフレーム。<path> は set と同じフィールドの path で、数値配列の要素1つは <path>/<番号>（position/1 = y）。時刻は秒
	curves: { usage: 'curves', description: 'カーブの一覧（ID・名前・キー数・使用数・使っているエンティティとフィールド）', timeoutMs: 10000 },
	'curve-get': { usage: 'curve-get <curveId>', description: 'カーブの中身を JSON（{ name?, keys: [ { time, value, interpolation, handleType, left, right } ] }。時刻・ハンドルの x は秒）で返す', timeoutMs: 10000 },
	'curve-set': { usage: 'curve-set <curveId> <json>', description: 'カーブの中身を curve-get と同じ形の JSON で差し替える（ハンドルは種類に従って置き直す。自動系の種類は left / right を省略できる。keys を空にするとリンクも外れる）', timeoutMs: 10000, write: true },
	'key-insert': { usage: 'key-insert <entity> [<component>] <path> --time <秒> [--value <値>]', description: 'キーを打つ（I と同じ。数値配列は要素を指定しなければ全要素）。--value が無ければフィールドの今の値。時刻は timeline/fps のコマに揃える', timeoutMs: 10000, write: true },
	'key-delete': { usage: 'key-delete <entity> [<component>] <path> --time <秒>', description: 'キーを消す（Alt+I と同じ。最後のキーを消すとリンクも外れる）', timeoutMs: 10000, write: true },
	'curve-paste': { usage: 'curve-paste <entity> [<component>] <path> <curveId> --link | --copy', description: 'カーブを要素1つに貼り付ける（--link は共有、--copy は複製）', timeoutMs: 10000, write: true },
	'curve-unlink': { usage: 'curve-unlink <entity> [<component>] <path>', description: '要素1つが共有しているカーブを複製して指し直す', timeoutMs: 10000, write: true },
	'curve-link-settings': { usage: 'curve-link-settings <entity> [<component>] <path> [--scale <倍率>] [--offset <足し算>] [--name <カーブ名>]', description: '要素1つのリンクの倍率・足し算と、リンク先のカーブの名前を変える（--name "" で名前を外す）', timeoutMs: 10000, write: true },
	// 一覧・中身はファイルを読むだけなので、タブを通さず dev サーバーの REST から読む（headless も起動しない）
	scenes: { usage: 'scenes', description: 'シーン名の一覧・タブが開いているシーン・editor.json に残っている最後に開いたシーン', timeoutMs: 5000 },
	'scene-get': { usage: 'scene-get <name>', description: 'シーンファイルの中身（renderer / timeline 込み）', timeoutMs: 5000 },
	// 作成・削除はその場でファイルに反映される。scene-open はタブのシーンを差し替える（未保存の変更があればエラー）
	'scene-create': { usage: 'scene-create <name> [--from <scene>] [--open]', description: '空のシーンを作る（--from でそのシーンを複製、--open で作ったシーンを開く）', timeoutMs: 15000, write: true },
	'scene-delete': { usage: 'scene-delete <name>', description: 'シーンを削除する（開いているシーンは不可）', timeoutMs: 10000, write: true },
	'scene-open': { usage: 'scene-open <name>', description: 'タブが開くシーンを切り替える（未保存の変更があるときはエラー）', timeoutMs: 15000, write: true },
	// 描画・GPU からの読み戻し・PNG エンコードを待つ（webgpu の初回はパイプライン生成も入る）
	shot: { usage: 'shot <out.png> [--camera <entity> | --from x,y,z --to x,y,z] [--time <秒> [--frames <コマ数>]] [--size <幅>x<高さ>] [--view <final|パス名>]', description: '指定したカメラ・時刻の描画を PNG に書き出す（--frames は時刻の何コマ前から 1/60 秒ずつ進めて撮るか、--size は出力の大きさで省略時は editor.json の resolution/*、--view はパスのラベルで省略時は final）', timeoutMs: 60000 },
	// 書き込みを含むかは中身で決まる（index.ts）
	batch: { usage: 'batch [<file>]', description: '1行1コマンド（先頭の orengine-cli は省く。# で始まる行と空行は飛ばす）をまとめて実行する。ファイルを省くと標準入力から読む。途中で失敗したらそれまでの書き込みをすべて取り消し、成功したら undo 1回ぶんにまとめて保存は1回', timeoutMs: 120000 },
	dev: { usage: 'dev [list | start | stop]', description: '立っている dev サーバーの一覧（list・省略時）／自分用の dev サーバーを立てる（start）／自分用の dev サーバーを閉じる（stop。本人の dev サーバーは止めない）', timeoutMs: 120000 },
};

export const usageText = () => {

	const lines = [
		'Usage: npx orengine-cli <command> [args...] [--project <dir>] [--renderer <webgl|webgpu>] [--url <devServerUrl>] [--timeout <ms>]',
		'',
		'  接続先は立っている dev サーバーから選ぶ（本人のタブが最後にフォーカスされたもの）。--project でプロジェクトを絞れる。',
		'  1台も無ければ、本人のものとぶつからないポート（3400〜）で自分用の dev サーバーを立てる（10 分使わなければ閉じる）。',
		'',
		'Commands:',
	];

	for ( const spec of Object.values( COMMANDS ) ) {

		// 書き込み系は usage が長く桁が揃わないので、説明は次の行に下げる
		lines.push( `  ${spec.usage}`, `      ${spec.description}` );

	}

	return lines.join( '\n' );

};
