# タスク完了時のチェックリスト

## 必須実行コマンド
タスク完了時には以下のコマンドを実行して問題がないことを確認する：

```bash
npm run lint     # ESLintによる静的解析チェック
npm run test     # Vitestによるテスト実行
```

## ビルド確認 (必要に応じて)
```bash
npm run build    # 本番ビルドの確認
npm run prebuild # プレビュービルドの確認
```

## Git関連の確認
- コミット前にlintとtestが通ることを確認
- `.gitignore` に適切にファイルが除外されているか確認
- サブモジュール `packages/glpower` の状態確認

## 特別な注意事項
- 初回作業時は `npm run init` でサブモジュールの初期化必須
- ShaderMinifierが必要な場合は適切にセットアップされているか確認
- 64KBサイズ制限を意識したコード作成
- TypeScript strict modeでエラーが出ないことを確認

## コードレビュー前
- ESLintルールに準拠しているか
- インポート順序が正しいか
- 未使用のimportがないか
- 適切なパスエイリアスを使用しているか