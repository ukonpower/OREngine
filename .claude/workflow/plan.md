# Plan: RendererSettingsパネルにSky設定を追加

## 概要
Rendererはエンティティツリーに存在しないため選択できない。既存のRendererSettingsパネルにSkyセクションを追加し、スカイボックスの色・強度・マテリアルをエディタUIから設定できるようにする。

## 実装ステップ

### 1. RendererSettingsにSkyブロックを追加
- **対象ファイル**: `packages/orengine/tsx/components/Panels/RendererSettings/index.tsx`
- **変更内容**: 既存の Pipeline ブロックの後に Sky ブロックを追加
- **コードスニペット**:
  ```tsx
  <Block label="Sky" accordion>
      <SerializeFieldView target={renderer} filter="sky" />
  </Block>
  ```
- **注意点**: 既存パターン（Resolution, Pipeline）と同じ構造。Rendererには `fieldDir("sky")` が定義済みなので、`filter="sky"` で自動的に skyColor, groundColor, intensity, material の4フィールドが表示される。

## 変更対象ファイル一覧
- [x] `packages/orengine/tsx/components/Panels/RendererSettings/index.tsx` - Skyブロック追加

## 考慮事項・リスク
- なし。既存パターンの踏襲であり、バックエンド変更不要。

## テスト方針
- エディタを開き、RendererSettingsパネルで Sky アコーディオンが表示されることを確認
- skyColor, groundColor, intensity, material の4フィールドが操作可能であることを確認
- `npm run typecheck` でエラーなし
