# Research: エンジンのスカイボックスにマテリアルが設定されない問題

## タスク概要
scene.jsonで`renderer.sky/material`を`"SkyBox"`に設定したが、エンジンのRendererSkyにマテリアルが適用されていない。

## 調査したフロー

### マテリアル登録〜適用の全フロー

1. **モジュールロード時**: `initResouces()` が呼ばれる（EditorPage.tsx L11 / Player L14）
2. **シェーダー登録**: `Engine.resources.addShader()` で全シェーダーをMap登録（`_shaders`）
3. **マテリアル登録**: `Engine.resources.addMaterial("SkyBox", data)` で：
   - `_shaders.get("SkyBox/frag")` → fragソース取得
   - `new MXP.Material({frag: fragSource, phase: ["deferred","envMap"], ...})` 作成
   - `_materialInstances.set("SkyBox", material)` に登録
4. **コールバック設定**: `Mesh.getMaterialInstance = (name) => Engine.resources.getMaterialInstance(name)`
5. **Engine作成**: `new Engine(gl)` → `new MXP.Renderer(gl)` → `new RendererSky()` (デフォルトsky)
6. **シーンロード**: `engine.load(project)` → `this.deserialize(project)` → Rendererのフィールドセッターが起動
7. **sky/material適用**: `this.sky.materialType = "SkyBox"` → `_rebuildMaterial()` → `Mesh.getMaterialInstance("SkyBox")`

### `_rebuildMaterial()` の実装（Renderer index.ts L87-104）
```typescript
private _rebuildMaterial(): void {
    if ( ! this._materialType ) {
        this.mesh.material = this.material; // デフォルトに戻す
        return;
    }
    const instance = Mesh.getMaterialInstance( this._materialType );
    if ( instance ) {
        this.mesh.material = instance;
    }
}
```
`Mesh.getMaterialInstance("SkyBox")`が`undefined`を返した場合、`if (instance)`が`false`になり、**何も起きない**（デフォルトマテリアルのままになる）。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/maxpower/Component/Renderer/index.ts` L87-104 | `RendererSky._rebuildMaterial` | マテリアル差し替えロジック |
| `packages/maxpower/Component/Mesh/index.ts` L19 | `Mesh.getMaterialInstance` (static) | デフォルト `() => undefined` |
| `src/ts/Resources/index.ts` L178 | コールバック設定 | `Engine.resources.getMaterialInstance` に委譲 |
| `packages/orengine/ts/Engine/Resources/index.ts` L369-373 | `Resources.getMaterialInstance` | `_materialInstances.get(name)` |
| `packages/orengine/tsx/components/OREngine/index.tsx` | OREngineコンポーネント | 初期化とロード順序 |

## 依存関係
- `RendererSky._rebuildMaterial` → `Mesh.getMaterialInstance` (static callback)
- `Mesh.getMaterialInstance` → `Engine.resources.getMaterialInstance` (実行時に設定)
- `Engine.resources.addMaterial` → `_shaders.get()` → `_materialInstances.set()`

## 問題の可能性

### 仮説1: タイミング問題（EditorPage経由）
EditorPage.tsx の処理順:
1. モジュールトップレベル: `initResouces()` → マテリアル登録 + `Mesh.getMaterialInstance`コールバック設定
2. React useEffect 1: `onEngineInit(gl)` = `initResourceInstances(gl)` → テクスチャビルド
3. React useEffect 2: `engine.load(project)` → `deserialize` → `sky.materialType = "SkyBox"`

**コールバックは手順1で設定済み、マテリアルも手順1で登録済みなので、手順3の実行時には問題ないはず。**

### 仮説2: `resources.clear()` が途中で呼ばれている
`Engine.init()` → `_root.disposeRecursive()` のみ。`resources.clear()`は呼ばれない。**排除。**

### 仮説3: RendererのSerializable field登録前にdeserializeが呼ばれる
Rendererのコンストラクタ内でskyフィールドはL388-426で登録される。`engine.load()`はコンストラクタ完了後にuseEffectで呼ばれるので、フィールドは登録済み。**排除。**

### 仮説4: Rendererの`deserialize`が`"renderer"`キーで正しく呼ばれていない
Engine.field("renderer", getter, setter)のsetterは `(v) => this._renderer.deserialize(v)`。
scene.jsonの`"renderer": {"sky/material": "SkyBox", ...}`がvとして渡される。
Renderer.deserialize()は`fields_.get("sky/material")`で正しくフィールドを見つけるはず。**排除。**

### 仮説5: 実際にはマテリアルは適用されているが、見た目が変わらない
RendererSkyの球は半径500だが、SkyBoxシェーダーは`outPos * 0.15`でノイズ計算しているため、半径500ではノイズスケールが大きく変わり見た目が異なる可能性。ただしユーザーは「設定されていない」と言っているので、エディタUI上で確認している可能性が高い。

### 仮説6: EditorのReactレンダリングで、project propsが`undefined`で先にmountされ`engine.init()`が呼ばれた後、projectが設定されて再度`engine.load()`が呼ばれる際に何かがリセットされている
EditorPage.tsx:
```tsx
const [ projectData, setProjectData ] = useState<OREngineProjectData>();
// fetch後にsetProjectData
```
`<OREngine project={projectData}>` の中で:
```tsx
useEffect( () => {
    if ( props.project ) {
        engine.load( props.project );
    } else {
        engine.init();
    }
}, [ engine, props.project ] );
```
最初のレンダリング時に`project`は`undefined`なので`engine.init()`が呼ばれ、次にfetch完了後に`project`がセットされて`engine.load(project)`が呼ばれる。この間にRendererの状態がリセットされることはない。**排除。**

## 結論
コードフロー上は正しく動作するはずで、明確なバグは見つからなかった。問題の根本原因を特定するには、以下のアプローチが必要:

1. **ブラウザdevtoolsでのデバッグ**: `_rebuildMaterial`にブレークポイントを置き、`Mesh.getMaterialInstance("SkyBox")`の戻り値を確認
2. **確認すべき点**:
   - `Mesh.getMaterialInstance`が正しくコールバック設定されているか
   - `Engine.resources._materialInstances`に"SkyBox"が存在するか
   - `RendererSky.materialType`セッターが実際に呼ばれているか

## 制約・注意点
- `Mesh.getMaterialInstance`はstaticプロパティでデフォルト`() => undefined`。`initResouces()`が呼ばれていない環境では必ず`undefined`を返す
- `_rebuildMaterial`で`getMaterialInstance`が`undefined`を返した場合、**失敗を黙殺する**（ログも出さない）
