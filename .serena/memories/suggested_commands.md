# OREngine 開発で使用すべきコマンド

## 初期セットアップ
```bash
npm run init  # サブモジュールの初期化と依存関係のインストール
```

## 開発・実行
```bash
npm run dev   # 開発サーバーの起動
npm run preview  # プレビューサーバーの起動
```

## ビルド
```bash
npm run build    # 本番用ビルド (compeko.jsによる最適化含む)
npm run prebuild # プレビュー用ビルド (ShaderMinifier無し)
```

## コード品質管理
```bash
npm run lint  # ESLintによる静的解析
npm run test  # Vitestによるテスト実行
```

## Storybook
```bash
npm run storybook       # Storybook開発サーバー
npm run build-storybook # Storybookビルド
```

## その他のシステムコマンド (macOS)
```bash
git status
git add .
git commit -m "message"
ls -la
find . -name "*.ts"
grep -r "search term" .
```

## 特殊な要件
- ShaderMinifierのセットアップが必要 (macOS: /Documents/application/shader_minifier/shader_minifier.exe + mono)
- 初回ビルド・テスト前に必ず `npm run init` を実行してサブモジュールを初期化すること