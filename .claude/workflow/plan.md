# Plan: Claude Codeによるシーン作成のAPI改善

## 概要
Claude CodeがREST API経由でOREngineのシーンをスムーズに作成できるよう、以下を実施する:
1. **バッチAPI**の追加（エンティティ一括作成・フィールド一括設定）
2. **シェーダーテンプレート**の用途別改善
3. **ドキュメント整備**（シェーダーリファレンス・コンポーネントフィールド一覧）
4. **CLAUDE.md**への知識追記

## 実装ステップ

### 1. バッチエンティティ作成API `POST /editor/entities`
- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: 複数エンティティを1リクエストで作成し、コンポーネント追加・フィールド設定まで一括実行するエンドポイントを追加
- **コードスニペット**:
  ```typescript
  // --- バッチエンティティ作成 ---
  editorRouter.post( '/projects/:projectName/editor/entities', async ( req, res ) => {

      try {

          const projectName = req.params.projectName;
          const { entities } = req.body as {
              entities: {
                  name?: string;
                  parentUuid: string;
                  position?: number[];
                  euler?: number[];
                  scale?: number[];
                  components?: {
                      componentName: string;
                      fields?: Record<string, unknown>;
                  }[];
              }[];
          };

          if ( !Array.isArray( entities ) ) {
              res.status( 400 ).json( { error: 'entities must be an array' } );
              return;
          }

          const results = [];

          for ( const entityDef of entities ) {

              // 1. エンティティ作成
              const createResult = await handleActionInternal(
                  projectName, 'createEntity',
                  { parentUuid: entityDef.parentUuid, name: entityDef.name }
              );
              const entityUuid = createResult.uuid;

              // 2. transform設定
              if ( entityDef.position ) {
                  await handleActionInternal( projectName, 'setField',
                      { targetUuid: entityUuid, path: 'position', value: entityDef.position } );
              }
              if ( entityDef.euler ) {
                  await handleActionInternal( projectName, 'setField',
                      { targetUuid: entityUuid, path: 'euler', value: entityDef.euler } );
              }
              if ( entityDef.scale ) {
                  await handleActionInternal( projectName, 'setField',
                      { targetUuid: entityUuid, path: 'scale', value: entityDef.scale } );
              }

              // 3. コンポーネント追加 + フィールド設定
              const componentResults = [];
              if ( entityDef.components ) {
                  for ( const compDef of entityDef.components ) {
                      const compResult = await handleActionInternal(
                          projectName, 'addComponent',
                          { uuid: entityUuid, componentName: compDef.componentName }
                      );
                      const compUuid = compResult.uuid;

                      if ( compDef.fields ) {
                          for ( const [ fieldPath, fieldValue ] of Object.entries( compDef.fields ) ) {
                              await handleActionInternal( projectName, 'setField',
                                  { targetUuid: compUuid, path: fieldPath, value: fieldValue } );
                          }
                      }

                      componentResults.push( { uuid: compUuid, componentName: compDef.componentName } );
                  }
              }

              results.push( { uuid: entityUuid, name: entityDef.name, components: componentResults } );

          }

          res.json( { entities: results } );

      } catch ( err: any ) {
          res.status( 400 ).json( { error: err.message || String( err ) } );
      }

  } );
  ```
- **注意点**:
  - `handleAction` を内部呼び出し用に `handleActionInternal` としてリファクタリングする必要がある（レスポンスオブジェクトなしでPromise<data>を返す版）
  - ブラウザ接続中は各操作がWebSocket経由で逐次実行されるため、エンティティ数が多い場合はタイムアウトに注意
  - sync（requestSync）はバッチ全体の最後に1回だけ行うよう最適化すべき

### 2. handleActionInternal の抽出
- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: 既存の`handleAction`からレスポンス処理を分離し、Promise<data>を返す内部関数を作成。既存の`handleAction`はこれを呼ぶラッパーにする
- **コードスニペット**:
  ```typescript
  // レスポンスなしの内部版（バッチAPIで使用）
  async function handleActionInternal(
      projectName: string,
      action: string,
      params: Record<string, unknown>,
  ): Promise<any> {

      const bridge = getWSBridge();
      const browserConnected = bridge && bridge.connected;

      if ( browserConnected ) {

          const result = await bridge!.send( action, params );
          if ( !result.success ) throw new Error( result.error );

          // リソース変更のファイル永続化
          if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {
              await persistResourceChange( action, params, result.data );
          }

          return result.data;

      } else {

          const project = projectManager.getProject( projectName );

          if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {
              await persistResourceChange( action, params, params );
              project.markDirty();
              return { success: true };
          } else if ( MUTATING_ACTIONS.has( action ) ) {
              const data = project.dispatch( action, params );
              project.markDirty();
              return data;
          } else {
              return project.dispatch( action, params );
          }

      }

  }

  // 既存APIはラッパーに変更
  async function handleAction(
      projectName: string,
      action: string,
      params: Record<string, unknown>,
      res: express.Response,
  ) {
      try {
          const data = await handleActionInternal( projectName, action, params );

          // MUTATING_ACTIONSの同期処理（バッチ内で個別にやるのは非効率なので、
          // 単体呼び出し時のみここで実行）
          if ( MUTATING_ACTIONS.has( action ) ) {
              const bridge = getWSBridge();
              if ( bridge && bridge.connected ) {
                  const project = projectManager.getProject( projectName );
                  const snapshot = await bridge.requestSync( projectName );
                  if ( snapshot ) project.syncFromBrowser( snapshot );
              }
          }

          res.json( data );
      } catch ( err: any ) {
          res.status( 400 ).json( { error: err.message || String( err ) } );
      }
  }
  ```
- **注意点**: sync処理の分離。バッチAPIでは最後に1回だけsyncする。単体APIでは毎回sync（既存動作維持）

### 3. バッチフィールド設定API `POST /editor/fields`
- **対象ファイル**: `server/routes/editor.ts`
- **変更内容**: 複数フィールドを1リクエストで設定するエンドポイント追加
- **コードスニペット**:
  ```typescript
  editorRouter.post( '/projects/:projectName/editor/fields', async ( req, res ) => {

      try {

          const projectName = req.params.projectName;
          const { fields } = req.body as {
              fields: { targetUuid: string; path: string; value: unknown }[];
          };

          if ( !Array.isArray( fields ) ) {
              res.status( 400 ).json( { error: 'fields must be an array' } );
              return;
          }

          for ( const field of fields ) {
              await handleActionInternal( projectName, 'setField', field );
          }

          // バッチ完了後に1回だけsync
          const bridge = getWSBridge();
          if ( bridge && bridge.connected ) {
              const project = projectManager.getProject( projectName );
              const snapshot = await bridge.requestSync( projectName );
              if ( snapshot ) project.syncFromBrowser( snapshot );
          }

          res.json( { success: true, count: fields.length } );

      } catch ( err: any ) {
          res.status( 400 ).json( { error: err.message || String( err ) } );
      }

  } );
  ```

### 4. シェーダーテンプレートの用途別改善
- **対象ファイル**: `server/routes/shaders.ts`
- **変更内容**: `template` パラメータに応じて用途別テンプレートを生成
- **コードスニペット**:
  ```typescript
  const VERT_TEMPLATE_MINIMAL = `void main() {
  	gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );
  }
  `;

  const FRAG_TEMPLATE_MINIMAL = `void main() {
  	outColor0 = vec4( 1.0, 1.0, 1.0, 1.0 );
  }
  `;

  const VERT_TEMPLATE_MESH = `#include <common>
  #include <vert_h>

  void main( void ) {

  	#include <vert_in>

  	#include <vert_out>

  }
  `;

  const FRAG_TEMPLATE_MESH = `#include <common>
  #include <packing>
  #include <frag_h>

  void main( void ) {

  	#include <frag_in>

  	outColor = vec4( 1.0 );

  	#include <frag_out>

  }
  `;

  const FRAG_TEMPLATE_TEXTURE = `#include <common>
  #include <frag_h>

  layout ( location = 0 ) out vec4 outColor;

  void main( void ) {

  	outColor = vec4( vUv, 0.0, 1.0 );

  }
  `;

  // POSTハンドラ内で:
  const { name, template } = req.body;  // template: "mesh" | "texture" | "minimal" (default)

  let vertContent: string;
  let fragContent: string;

  switch ( template ) {
      case 'mesh':
          vertContent = VERT_TEMPLATE_MESH;
          fragContent = FRAG_TEMPLATE_MESH;
          break;
      case 'texture':
          vertContent = VERT_TEMPLATE_MINIMAL;  // テクスチャはvertを使わない
          fragContent = FRAG_TEMPLATE_TEXTURE;
          break;
      default:
          vertContent = VERT_TEMPLATE_MINIMAL;
          fragContent = FRAG_TEMPLATE_MINIMAL;
  }
  ```
- **注意点**: 既存のデフォルト動作（template未指定）は変更しない。後方互換性維持

### 5. ドキュメント: `docs/shader-reference.md` の新設
- **対象ファイル**: `docs/shader-reference.md`（新規作成）
- **変更内容**: シェーダー開発に必要な全リファレンスを1ファイルにまとめる
- **含める内容**:
  - 頂点シェーダーで使えるuniform一覧（uModelMatrix, uViewMatrix等）
  - フラグメントシェーダーで使えるuniform一覧（+ uCameraPosition, uResolution）
  - varying一覧（vUv, vPos, vNormal等）
  - フラグメント出力変数一覧（outColor, outEmission, outRoughness等）
  - #include可能なモジュール一覧と主要関数シグネチャ
  - 用途別テンプレート（メッシュ用、テクスチャ用）
  - テクスチャシェーダーの注意事項（`in vec2 vUv;` 宣言が必要な場合）

### 6. ドキュメント: `docs/component-fields.md` の新設
- **対象ファイル**: `docs/component-fields.md`（新規作成）
- **変更内容**: 主要コンポーネントのフィールドパス・型・有効値・デフォルト値を一覧化
- **含める内容**:
  - **Mesh**: geometry/type（有効値: `""`, `"Cube"`, `"Sphere"`, `"Plane"`, `"Cylinder"`）、各パラメータ、material/name
  - **Light**: lightType, color, intensity, castShadow, angle, blend, distance, decay
  - **Camera**: cameraType, fov, near, far, aspect
  - **PostProcess系**: Bloom, ColorGrading等のパラメータ

### 7. 既存ドキュメントの改善
- **対象ファイル**: `docs/editor-rest-api.md`
- **変更内容**:
  - バッチAPI（`POST /editor/entities`, `POST /editor/fields`）のドキュメント追加
  - フィールドAPIの型情報詳細化（geometry/typeの有効値リスト等）
  - AIエージェント向けワークフローにバッチAPIの使用例を追加
- **対象ファイル**: `docs/resource-api.md`
- **変更内容**:
  - .matファイルのuniform形式（`"uniforms/uName": value`）を明記
  - .texファイルのconfigスキーマ詳細化
  - シェーダーAPI `template` パラメータの説明追加

### 8. CLAUDE.mdへのシーン作成知識追記
- **対象ファイル**: `CLAUDE.md`
- **変更内容**: `## シーン作成` セクションを追加し、AIエージェントが必要とする知識を集約
- **コードスニペット**:
  ```markdown
  ## シーン作成（REST API経由）

  ### エンティティのバッチ作成
  `POST /api/projects/{name}/editor/entities` でエンティティ・コンポーネント・フィールドを一括作成可能。

  ### Meshコンポーネント
  - `geometry/type`: `"Cube"` | `"Sphere"` | `"Plane"` | `"Cylinder"` (PascalCase必須)
  - `material/name`: マテリアル名（文字列）
  - フィールド設定には**コンポーネントUUID**（エンティティUUIDではない）が必要

  ### Lightコンポーネント
  - `lightType`: `"spot"` (default) | `"directional"`
  - `color`: [r, g, b]、`intensity`: number、`castShadow`: boolean
  - spot専用: `angle`, `blend`, `distance`, `decay`

  ### マテリアル (.mat) config
  - uniform形式: `"uniforms/uName": value`
  - 型: float→number, vec3→[x,y,z], sampler2D→テクスチャ名(string)

  ### シェーダー作成
  - `POST /api/shaders` に `"template": "mesh"` でメッシュ用テンプレート生成
  - `"template": "texture"` でテクスチャ用テンプレート生成
  - 頂点で使えないuniform: `uCameraPosition`, `uResolution`（frag_h専用）
  - テクスチャ用FSには `in vec2 vUv;` を明示宣言するか `#include <frag_h>` を使用

  ### 詳細リファレンス
  - `docs/shader-reference.md` - シェーダーuniform/varying/モジュール全一覧
  - `docs/component-fields.md` - コンポーネントフィールド一覧
  ```

## 変更対象ファイル一覧
- [x] `server/routes/editor.ts` - handleActionInternal抽出 + バッチAPI 2つ追加
- [x] `server/routes/shaders.ts` - 用途別テンプレート追加
- [x] `docs/shader-reference.md` - 新規作成（シェーダーリファレンス）
- [x] `docs/component-fields.md` - 新規作成（コンポーネントフィールド一覧）
- [x] `docs/editor-rest-api.md` - バッチAPI・フィールド詳細追記
- [x] `docs/resource-api.md` - .mat/.texスキーマ・templateパラメータ追記
- [x] `CLAUDE.md` - シーン作成セクション追加

## 考慮事項・リスク

1. **バッチAPI + ブラウザファースト設計**: ブラウザ接続中は各操作がWebSocket経由で逐次実行される。sync（requestSync）をバッチ全体の最後に1回だけにすることで、大幅にオーバーヘッドを削減する。ただしバッチ途中で失敗した場合のロールバックは非対応（Undo可能なので許容）
2. **タイムアウト**: 大量エンティティ（50+）のバッチでは、WebSocket send の累積時間が問題になる可能性。将来的に`executeAction`（Fire & Forget）ベースに切り替える余地を残す
3. **後方互換性**: 全ての変更は既存APIに影響しない。テンプレートのデフォルト値も既存のまま

## テスト方針

- `npm run typecheck` で型エラーなし
- `npm run lint` でリントエラーなし
- バッチAPI手動テスト:
  - `POST /editor/entities` で複数エンティティ+Mesh+Light一括作成
  - 作成されたエンティティのgeometry/material/transformが正しいことを `GET /editor/scene` で確認
  - ブラウザ画面にも反映されていることを確認
- シェーダーテンプレートテスト:
  - `POST /api/shaders` に `template: "mesh"` で作成 → index.vs/index.fs がメッシュテンプレートになっていることを確認
  - `template: "texture"` → テクスチャテンプレート
  - `template` 未指定 → 従来のminimalテンプレート（後方互換）
- ドキュメントレビュー:
  - 新設ドキュメントの内容がresearch.mdの調査結果と一致していることを確認
