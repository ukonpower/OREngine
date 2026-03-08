# Plan: アクティブプロジェクト概念の廃止（シンプル版）

## 概要
「アクティブプロジェクト」（`.active` ファイル + ProjectResolver の HMR 監視）を廃止し、URLクエリパラメータ `?project=<name>` のみでプロジェクトを指定する設計に移行する。

現在の未コミット修正のうち8ファイルはそのまま採用し、`EditorPage` の `import.meta.glob` を `~/ts/Resources` 直接importに置き換えることで大幅にシンプル化する。

## 現在の修正の評価

### そのまま採用（8ファイル）
これらは既に正しく実装されており、変更不要:
- `plugins/ProjectResolver/index.ts` - chokidar・HMR削除、環境変数ベースのみに
- `server/routes/projects.ts` - active API削除、delete/renameの`.active`連携削除
- `server/ws/index.ts` - `_client` → `_clients: Map<WebSocket, string>` マルチクライアント化
- `server/routes/editor.ts` - `bridge.send(projectName, action)` に変更
- `packages/orengine/ts/Editor/index.ts` - `constructor(engine, projectName?)` に変更
- `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` - register時にprojectName送信
- `packages/orengine/tsx/components/OREditor/Hooks/useOREditorContext/index.tsx` - projectName伝搬
- `src/tsx/components/pages/ProjectSelectPage/index.tsx` - selectProject同期化

### 修正が必要（2ファイル）
調査で判明: 全プロジェクトの `index.ts` は `~/ts/Resources` のre-exportであり、`import.meta.glob` は過剰。

## 実装ステップ

### 1. EditorPage を `~/ts/Resources` 直接importに変更

- **対象ファイル**: `src/tsx/components/pages/EditorPage/index.tsx`
- **変更内容**: `import.meta.glob` による動的import → `~/ts/Resources` の静的importに置き換え
- **コードスニペット**（ファイル全体の最終形）:
  ```typescript
  import * as MXP from 'maxpower';
  import { OREditor, OREngine } from "orengine/react";
  import { OREngineProjectData } from "orengine";
  import { Engine } from "orengine/ts/Engine";
  import { useEffect, useState } from "react";

  import { gl } from "~/ts/Globals";
  import { initResouces, initResourceInstances } from "~/ts/Resources";
  import { MIDIMIX } from "~/ts/Resources/Components/_Samples/MIDI/MIDIMIX";

  initResouces();

  const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'default';

  export const EditorPage = () => {

  	const [ projectData, setProjectData ] = useState<OREngineProjectData>();
  	const [ editorData, setEditorData ] = useState<MXP.SerializeField>();

  	useEffect( () => {

  		fetch( `/api/projects/${projectName}/scene` ).then( r => r.json() ).then( ( data ) => {

  			if ( ! data ) return;

  			setProjectData( data );

  		} ).catch( () => {} );

  		fetch( `/api/projects/${projectName}/editor` ).then( r => r.json() ).then( ( data ) => {

  			if ( ! data ) return;

  			setEditorData( data );

  		} ).catch( () => {} );

  	}, [] );

  	return (
  		<OREngine gl={gl} project={projectData} onEngineInit={initResourceInstances} >
  			<OREditor editorData={editorData} projectName={projectName} midiMixController={MIDIMIX} onSave={( projectData, editorData ) => {
  				// ... onSave は現在の修正のまま維持 ...
  			}} />
  		</OREngine>
  	);

  };
  ```
- **削除されるもの**:
  - `import.meta.glob` とその型定義
  - `console.log( '[EditorPage] projectModules:' ... )`
  - `resourcesReady` 状態と `if ( ! resourcesReady ) return null`
  - `initResourceInstancesRef` と `onEngineInit` コールバック
  - `useCallback`, `useRef` のimport（不要になる場合）
- **注意点**: `onSave` コールバックの中身は現在の修正のまま維持する

### 2. Resources のデバッグ用 console.log 削除

- **対象ファイル**: `src/ts/Resources/index.ts`
- **変更内容**: `console.log("やっほー", Engine.resources)` を削除
- **注意点**: 181行目付近の1行のみ

## 変更対象ファイル一覧

- [x] `plugins/ProjectResolver/index.ts` - 現在の修正のまま
- [x] `server/routes/projects.ts` - 現在の修正のまま
- [x] `server/ws/index.ts` - 現在の修正のまま
- [x] `server/routes/editor.ts` - 現在の修正のまま
- [x] `packages/orengine/ts/Editor/index.ts` - 現在の修正のまま
- [x] `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` - 現在の修正のまま
- [x] `packages/orengine/tsx/components/OREditor/Hooks/useOREditorContext/index.tsx` - 現在の修正のまま
- [x] `src/tsx/components/pages/ProjectSelectPage/index.tsx` - 現在の修正のまま
- [x] `src/tsx/components/pages/EditorPage/index.tsx` - `import.meta.glob` → 直接import
- [x] `src/ts/Resources/index.ts` - デバッグ console.log 削除
- [x] `projects/.active` - ファイル削除のまま

## 考慮事項・リスク

1. **将来のプロジェクト固有リソース**: 現在は全プロジェクトの `index.ts` が同一テンプレートだが、将来カスタマイズが必要になった場合は `import.meta.glob` に戻せる（YAGNI原則）
2. **Player ビルドへの影響**: なし。`vite-player.config.ts` は環境変数 `ORENGINE_PROJECT` で `~project` を解決しており、今回の変更と独立

## テスト方針

- `npm run typecheck` が通ること
- 開発サーバーでプロジェクト選択→エディタ表示が正常に動作すること
- WebSocket接続が正しくプロジェクト名で登録されること
