# Research: アクティブプロジェクト概念の廃止 - 現状の修正の分析

## タスク概要
現在の修正（未コミット）が「アクティブプロジェクト概念の廃止」を正しく実装しているか、よりシンプルにできないか調査する。

## 現在の修正の全体像（11ファイル）

| ファイル | 変更の種類 | 概要 |
|---------|-----------|------|
| `plugins/ProjectResolver/index.ts` | 大幅簡略化 | `.active`監視・chokidar・HMR通知を全削除。`process.env.ORENGINE_PROJECT`のみで解決 |
| `server/routes/projects.ts` | 削除 | `GET/POST /api/projects/active` API削除、削除時のアクティブチェック削除、リネーム時の`.active`更新削除 |
| `server/ws/index.ts` | リファクタ | `_client: WebSocket` → `_clients: Map<WebSocket, string>`。register/プロジェクト名ベースのルーティング |
| `server/routes/editor.ts` | 小修正 | `bridge.connected` → `bridge.isProjectConnected(projectName)`、`bridge.send(action)` → `bridge.send(projectName, action)` |
| `src/tsx/components/pages/EditorPage/index.tsx` | リファクタ | `~project/index` static import → `import.meta.glob` 動的import。resourcesReady状態管理追加 |
| `src/tsx/components/pages/ProjectSelectPage/index.tsx` | 簡略化 | `selectProject` async→sync。`POST /active` + HMR待機を削除 |
| `packages/orengine/ts/Editor/index.ts` | 小修正 | `constructor(engine)` → `constructor(engine, projectName?)` |
| `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` | 小修正 | `constructor(editor)` → `constructor(editor, projectName)`。onopen時にregister送信 |
| `packages/orengine/tsx/components/OREditor/Hooks/useOREditorContext/index.tsx` | 小修正 | `new Editor(engine)` → `new Editor(engine, projectName)` |
| `src/ts/Resources/index.ts` | デバッグ用 | `console.log("やっほー", ...)` 追加（**要削除**） |
| `projects/.active` | 削除 | ファイル自体を削除 |

## 分析: 設計品質

### 良い点
1. **ProjectResolverの簡略化**: chokidar・HMRイベント全削除。ビルド時専用に。クリーン
2. **WebSocketのマルチクライアント化**: `Map<WebSocket, string>` でプロジェクト名紐付け。正しい設計
3. **ProjectSelectPageの簡略化**: async+HMR待機 → 同期的な画面遷移
4. **server/routes/projects.ts**: `.active`関連コードの完全削除。副作用なし
5. **EditorAPIBridge**: register時にprojectName送信。最小限の変更

### シンプル化の核心: `import.meta.glob` は不要

各プロジェクトの `index.ts` は共通テンプレートで生成される:
```typescript
// projects/*/index.ts
export { initResouces, initResourceInstances } from '~/ts/Resources';
```

**全プロジェクトで同一コード**。つまり `import.meta.glob` による動的importは不要で、`~/ts/Resources` を直接importすればよい。

現在の実装:
```typescript
// 複雑: import.meta.glob + 非同期 + resourcesReady + ref + callback
const projectModules = import.meta.glob<...>('../../../../../projects/*/index.ts');
// ... 非同期ロード、状態管理、ref保持
```

シンプルな実装:
```typescript
// シンプル: 直接import + 同期
import { initResouces, initResourceInstances } from "~/ts/Resources";
initResouces();
```

**これにより以下が不要になる:**
- `import.meta.glob` とその深い相対パス (`../../../../../`)
- `resourcesReady` 状態
- `initResourceInstancesRef`
- `onEngineInit` コールバック
- console.logデバッグコード

## 推奨する最終的な変更

### そのままでOKなファイル（8ファイル）
- `plugins/ProjectResolver/index.ts` ✅
- `server/routes/projects.ts` ✅
- `server/ws/index.ts` ✅
- `server/routes/editor.ts` ✅
- `packages/orengine/ts/Editor/index.ts` ✅
- `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` ✅
- `packages/orengine/tsx/components/OREditor/Hooks/useOREditorContext/index.tsx` ✅
- `src/tsx/components/pages/ProjectSelectPage/index.tsx` ✅

### 修正が必要なファイル（2ファイル）

#### `src/tsx/components/pages/EditorPage/index.tsx`
`import.meta.glob` → `~/ts/Resources` 直接import に変更:
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
			<OREditor editorData={editorData} projectName={projectName} midiMixController={MIDIMIX} onSave={...} />
		</OREngine>
	);
};
```

#### `src/ts/Resources/index.ts`
デバッグ用 `console.log("やっほー", ...)` を削除。

## 制約・注意点
- 将来プロジェクトごとのカスタムリソースが必要になった場合は `import.meta.glob` に戻せばよい（YAGNI）
- Player (`src/ts/Player/index.ts`) は `~project` importを使うが、ビルド時に `ORENGINE_PROJECT` 環境変数で解決されるので影響なし
- `chokidar` パッケージがProjectResolverでのみ使われていた場合、`package.json` から削除可能（要確認）
