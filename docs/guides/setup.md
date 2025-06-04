# セットアップガイド

## 前提条件

- Node.js (最新の LTS バージョン推奨)
- npm または yarn
- WebGL 2.0 をサポートする現代的なウェブブラウザ

## インストール手順

### 1. リポジトリのクローン

```bash
git clone [repository-url]
cd OREngine
```

### 2. 依存関係のインストール

```bash
# npm を使用する場合
npm install

# yarn を使用する場合
yarn install
```

### 3. パッケージのビルド

```bash
npm run build
```

## プロジェクト設定

### 主要な設定ファイル

1. **vite.config.ts**: メインビルド設定

   ```typescript
   export default defineConfig({
     plugins: [
       // マングル最適化
       manglePlugin(),
       // リソース管理
       resourcePlugin(),
       // シェーダー最適化
       shaderMinifierPlugin(),
     ],
     build: {
       target: 'esnext',
       minify: 'terser',
     },
   });
   ```

2. **tsconfig.json**: TypeScript 設定

   ```json
   {
     "compilerOptions": {
       "target": "ESNext",
       "module": "ESNext",
       "strict": true,
       "moduleResolution": "Node",
       "skipLibCheck": true,
       "isolatedModules": true,
       "types": ["vite/client", "jest"]
     }
   }
   ```

3. **.env**: 環境変数

   ```plaintext
   # 開発サーバー設定
   VITE_DEV_SERVER_PORT=5173
   VITE_DEV_SERVER_HOST=localhost

   # ビルド設定
   VITE_BUILD_TARGET=esnext
   VITE_BUILD_MINIFY=true

   # デバッグ設定
   VITE_DEBUG_MODE=true
   VITE_RENDER_DEBUG=false
   ```

## 開発環境の構築

### 1. 開発サーバーの起動

```bash
npm run dev
```

サーバーが起動すると、以下の URL でアクセス可能になります：

- エディター: `http://localhost:5173`
- プレビュー: `http://localhost:5173/player.html`

### 2. ホットリロード

開発サーバーはホットリロードをサポートしています：

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: true,
    },
  },
});
```

### 3. デバッグ設定

```typescript
// src/ts/Utils/Debug.ts
class DebugManager {
  constructor() {
    this.enabled = import.meta.env.VITE_DEBUG_MODE === 'true';
    this.renderDebug = import.meta.env.VITE_RENDER_DEBUG === 'true';
  }

  log(message: string, level: LogLevel = 'info') {
    if (!this.enabled) return;
    console.log(`[OREngine] ${level}: ${message}`);
  }
}
```

## プロダクションビルド

### 1. ビルドの実行

```bash
npm run build
```

ビルドが完了すると、以下のファイルが生成されます：

```
dist/
├── index.html      # メインエディター
├── player.html     # シーンプレビュー
├── assets/         # 最適化されたアセット
│   ├── js/        # JavaScript
│   ├── css/       # スタイルシート
│   └── img/       # 画像
└── scene/         # シーンデータ
```

### 2. ビルド最適化

1. **コード最適化**

   ```typescript
   // plugins/MangleManager/index.ts
   class MangleManager {
     optimize(code: string) {
       // 変数名の短縮
       this.mangleVariables();

       // 未使用コードの削除
       this.removeUnusedCode();

       // コードの圧縮
       this.minifyCode();
     }
   }
   ```

2. **アセット最適化**
   ```typescript
   // plugins/ResourceManager/index.ts
   class ResourceManager {
     processAssets() {
       // 画像の最適化
       this.optimizeImages();

       // シェーダーの最適化
       this.optimizeShaders();

       // JSON の最適化
       this.optimizeJSON();
     }
   }
   ```

## テスト実行

```bash
# すべてのテストを実行
npm run test

# E2E テストのみ実行
npm run test:e2e

# ユニットテストのみ実行
npm run test:unit
```

## トラブルシューティング

### 一般的な問題と解決方法

1. **ビルドエラー**

   ```bash
   # 依存関係の再インストール
   rm -rf node_modules
   npm install

   # キャッシュのクリア
   npm run clean
   ```

2. **WebGL エラー**

   ```typescript
   // WebGL サポートの確認
   if (!gl) {
     console.error('WebGL not supported');
     return;
   }

   // 拡張機能の確認
   const ext = gl.getExtension('WEBGL_depth_texture');
   if (!ext) {
     console.error('Required extension not supported');
     return;
   }
   ```

3. **パフォーマンス問題**

   ```typescript
   // パフォーマンスモニタリング
   console.time('render');
   // レンダリング処理
   console.timeEnd('render');

   // メモリ使用量の確認
   console.log('Memory:', performance.memory);
   ```

### デバッグモード

```typescript
// デバッグモードの有効化
localStorage.setItem('debug', 'true');

// デバッグ情報の表示
if (localStorage.getItem('debug') === 'true') {
  this.showDebugInfo();
  this.enableDebugControls();
}
```
