# Plan: skill/API設計の改善

## 概要

今回のセッションで発生した5つの問題に対する修正。
大きく「A. APIサーバー改善」「B. シェーダーエラー取得システム」「C. skillドキュメント修正」の3グループに分ける。

---

## A. APIサーバー改善

### A-1. バッチAPI: `componentName` 未指定時にバリデーションエラーを返す

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: `entityDef.components` のループ内で `compDef.componentName` が
  falsy な場合にエラーをスローする。現在は `componentName: undefined` のまま
  `addComponent` アクションが呼ばれ、UUID だけのゾンビコンポーネントが生まれる。

```typescript
for ( const compDef of entityDef.components ) {

    // ↓ この行を追加
    if ( ! compDef.componentName ) {
        throw new Error( `components[].componentName is required` );
    }

    const compResult = await handleActionInternal( ... );
```

---

### A-2. Timeout エラーに `hint` を付与

- **対象ファイル**: `server/ws/index.ts`（または `handleActionInternal` のエラーハンドリング箇所）
- **変更内容**: ブラウザ未接続でタイムアウトした際のエラーレスポンスに
  `hint` フィールドを追加する。

```typescript
// 現在
res.status( 503 ).json( { error: 'Browser not connected' } );

// 変更後
res.status( 503 ).json( {
    error: 'Browser not connected',
    hint: '対象プロジェクトをブラウザで開いてください',
} );
```

---

### A-3. `check-server.sh` に接続中プロジェクトを表示

- **対象ファイル**: `.claude/skills/orengine/scripts/check-server.sh`
- **変更内容**: `GET /api/projects/:p/editor/status` を全プロジェクトに対して
  実行し、ブラウザ接続中のものを表示する。

```bash
echo ""
echo "=== Browser Connection ==="
for project in $(curl -s http://localhost:3001/api/projects | python3 -c "import sys,json; [print(p) for p in json.load(sys.stdin)]"); do
    status=$(curl -s "http://localhost:3001/api/projects/$project/editor/status" 2>/dev/null)
    connected=$(echo "$status" | python3 -c "import sys,json; d=json.load(sys.stdin); print('CONNECTED' if d.get('connected') else 'disconnected')" 2>/dev/null)
    echo "  $project: $connected"
done
```

---

## B. シェーダーエラー取得システム（新規）

シェーダーコンパイルエラーは現在ブラウザの `console.error()` にしか出ない。
これを「サーバーから取得可能」にする。

### B-1. ブラウザ側: シェーダーエラーをストアに蓄積

- **対象ファイル**: `packages/glpower/packages/glpower/src/GLPowerProgram.ts`
- **変更内容**: `console.error` に加えて、エラーをモジュールレベルの
  `Map<string, string>` に蓄積する。シェーダーの識別は `programName`（または
  ソースの先頭コメント等）で行う。

```typescript
// ファイル内に追加
export const shaderErrors: Map<string, string> = new Map();

// compileShader 内のエラー処理に追加
if ( errorLog ) {
    shaderErrors.set( this.name ?? shaderSrc.slice( 0, 40 ), errorLog );
    // ... 既存の console.error ...
}
```

> ※ `GLPowerProgram` に `name` フィールドが無い場合は追加、または呼び出し元から
> シェーダー名を渡す形に変更する。

---

### B-2. ブラウザ側: `getShaderErrors` WebSocket アクションに応答

- **対象**: ブラウザ側の WebSocket アクションハンドラ（エディタアクション処理部分）
- **変更内容**: `action === 'getShaderErrors'` を受け取ったら
  `shaderErrors` の内容を返す。

```typescript
case 'getShaderErrors': {
    const errors = Array.from( shaderErrors.entries() ).map( ( [ name, log ] ) => ( { name, log } ) );
    return { errors };
}
```

---

### B-3. サーバー側: `GET /editor/shader-errors` エンドポイント追加

- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: ブラウザに `getShaderErrors` アクションを送り、結果を返す
  エンドポイントを追加する。

```typescript
editorRouter.get( '/projects/:projectName/editor/shader-errors', async ( req, res ) => {

    try {

        const data = await handleActionInternal( req.params.projectName, 'getShaderErrors', {} );
        res.json( data );

    } catch ( err: any ) {

        res.status( 503 ).json( { error: err.message, hint: 'ブラウザが接続されていません' } );

    }

} );
```

レスポンス例:
```json
{
  "errors": [
    { "name": "BikabikaShader", "log": "ERROR: 0:15: 'localPosition' : undeclared..." }
  ]
}
```

---

### B-4. skill: Guardrail にシェーダーエラー確認を追加

- **対象ファイル**: `.claude/skills/orengine/orengine.md`（または `references/troubleshooting.md`）
- **変更内容**: Guardrails セクションに以下を追加する。

```markdown
- **Meshコンポーネントを持つエンティティを作成・更新したら、必ずシェーダーエラーを確認する**
  ```bash
  curl -s http://localhost:3001/api/projects/{PROJECT}/editor/shader-errors | python3 -m json.tool
  ```
  `errors` 配列が空でない場合はシェーダーを修正してから次の作業へ進む。
```

---

## C. skillドキュメント修正

### C-1. `shader-guide.md`: `<vert_in>` / `<frag_in>` の変数一覧を追記

- **対象ファイル**: `.claude/skills/orengine/references/shader-guide.md`
- **変更内容**: 「カスタマイズ可能な出力変数」テーブルに `<vert_in>` の変数も
  追記し、`outMetalic`（実際のスペル）に修正する。

```markdown
### `<vert_in>` で展開される書き込み可能変数（頂点シェーダー）

| 変数 | 型 | 説明 |
|------|----|------|
| `outPos` | vec3 | 頂点位置（変形に使う） |
| `outNormal` | vec3 | 法線 |
| `outUv` | vec2 | UV座標 |

### `<frag_in>` で展開される書き込み可能変数（フラグメントシェーダー）

| 変数 | 型 | デフォルト | 説明 |
|------|-----|----------|------|
| `outColor` | vec4 | `vec4(1.0)` | アルベドカラー |
| `outRoughness` | float | `0.5` | ラフネス |
| `outMetalic` | float | `0.0` | メタリック ※スペル注意（l が1つ） |
| `outEmission` | vec3 | `vec3(0.0)` | エミッション |
| `outNormal` | vec3 | 頂点法線 | 法線 |
| `outPos` | vec3 | `vPos` | フラグメント位置（読み取り） |
```

---

### C-2. `api-scene.md`: `componentName` を強調

- **対象ファイル**: `.claude/skills/orengine/references/api-scene.md`
- **変更内容**: バッチAPIのコンポーネント指定部分に注釈を追加。

```markdown
> ⚠️ **`componentName` は必須**。`name` では動作しない。
> 未指定の場合はサーバーがエラーを返す（A-1の修正後）。
```

---

### C-3. orengine.md（鉄則）: 複数プロジェクト時の確認を追加

- **対象ファイル**: `.claude/skills/orengine/orengine.md`
- **変更内容**: 「鉄則」セクションに追記。

```markdown
- **プロジェクトが複数存在する場合は、操作対象をユーザーに確認してから進める**
  （check-server.sh の「Browser Connection」欄で接続中プロジェクトを確認する手段も使える）
```

---

### C-4. `api-resources.md`: 未実装エンドポイントの注記

- **対象ファイル**: `.claude/skills/orengine/references/api-resources.md`
- **変更内容**: `GET /projects/:p/editor/resources` に注釈を追加。

```markdown
| GET | `/projects/:p/editor/resources` | リソース一覧 ※現在未実装 (`Unknown action: getResources` が返る) |
```

---

## 変更対象ファイル一覧

### APIサーバー
- [x] `server/routes/editor.ts` — A-1: componentName バリデーション、A-2: Timeoutヒント、B-3: shader-errors エンドポイント

### ブラウザ/エンジン
- [x] `packages/glpower/packages/glpower/src/GLPowerProgram.ts` — B-1: shaderErrors ストア、name フィールド追加
- [x] `packages/maxpower/Component/Renderer/ProgramManager/index.ts` — material.name を get() に渡す
- [x] `packages/maxpower/Component/Renderer/index.ts` — programManager.get() に material.name を渡す
- [x] `packages/orengine/ts/Editor/EditorAPIBridge/index.ts` — B-2: getShaderErrors アクション対応

### skill
- [x] `.claude/skills/orengine/scripts/check-server.sh` — A-3: 接続中プロジェクト表示
- [x] `.claude/skills/orengine/SKILL.md` — B-4, C-3: Guardrailsとプロジェクト確認
- [x] `.claude/skills/orengine/references/shader-guide.md` — C-1: 変数一覧追記
- [x] `.claude/skills/orengine/references/api-scene.md` — C-2: componentName強調、shader-errors API追記
- [x] `.claude/skills/orengine/references/api-resources.md` — C-4: 未実装注記

---

## 考慮事項・リスク

- **B-1 の `shaderErrors` Map**: ページ遷移やシェーダー再コンパイル時に古いエラーが残る可能性がある。
  シェーダー再コンパイル成功時にエントリを削除する処理も追加する。
- **B-2 のブラウザ側アクションハンドラ**: 現在の実装箇所を先に調査する必要がある。
- **A-1 のバリデーション**: `componentName` が undefined のときに現在ブラウザ側で
  どう処理されているかを確認してから修正する（ブラウザ側もエラーを返しているかもしれない）。

## 実装順序の推奨

1. **C グループ（skill修正）** — コード変更なし、即効果が高い
2. **A グループ（APIサーバー）** — 比較的シンプルな変更
3. **B グループ（シェーダーエラー）** — ブラウザ/エンジン側まで及ぶため最後
