# Research: RendererSettingsパネルにSky設定を追加

## タスク概要
Rendererはエンティティツリーに存在しないため、エディタのヒエラルキーから選択してプロパティを編集することができない。既存のRendererSettingsパネルにSky設定セクションを追加し、エディタUIからスカイボックスの色・強度・マテリアルを設定できるようにする。

## 関連ファイル・シンボル

| ファイル | 主要シンボル | 役割 |
|---------|------------|------|
| `packages/orengine/tsx/components/Panels/RendererSettings/index.tsx` | `RendererSettings` | RendererSettingsパネル。現在は Resolution と Pipeline のみ表示 |
| `packages/orengine/tsx/components/Panels/RendererSettings/index.module.scss` | `.renderer`, `.renderer_inner` | パネルのスタイル |
| `packages/maxpower/Component/Renderer/index.ts` L388-426 | `Renderer` | `fieldDir("sky")` で skyColor, groundColor, intensity, material の4フィールドを定義済み |
| `packages/orengine/tsx/components/SerializeFieldView/index.tsx` | `SerializeFieldView` | `filter` propでディレクトリ指定してフィールドUIを自動生成 |
| `packages/orengine/tsx/components/Block/index.tsx` | `Block` | UIブロック（accordion対応） |

## 既存パターン

RendererSettingsパネルの既存コード:
```tsx
<Block label="Resolution" accordion>
    <SerializeFieldView target={editor} filter="resolution" />
</Block>
<Block label="Pipeline" accordion>
    <SerializeFieldView target={renderer} filter="pipeline" />
</Block>
```

- `Block` で囲んでアコーディオンラベルを付ける
- `SerializeFieldView` の `target` に対象Serializableオブジェクト、`filter` にディレクトリ名を渡す

## Rendererのskyフィールド定義（L388-426）

`this.fieldDir("sky")` 以下に4フィールドが定義済み:
- `skyColor` (vector3: 空の色)
- `groundColor` (vector3: 地面の色)
- `intensity` (number: 明るさ, step: 0.1)
- `material` (resource/material: マテリアル選択)

## 実装方針

RendererSettingsの `<div className={style.renderer_inner}>` 内に以下を追加するだけ:
```tsx
<Block label="Sky" accordion>
    <SerializeFieldView target={renderer} filter="sky" />
</Block>
```

## 制約・注意点
- Rendererにはすでにskyフィールドが登録されているため、バックエンド側の変更は不要
- SerializeFieldViewがフィールド定義から自動でUIを生成するため、UIコンポーネントの追加も不要
- 変更はRendererSettingsの1ファイルのみ
