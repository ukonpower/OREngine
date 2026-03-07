# Plan: アセットエクスプローラのプレビューサムネイル

## 概要
AssetGrid のマテリアル・テクスチャアイテムのアイコンを、SVGアイコンからレンダリング結果のプレビューサムネイルに置き換える。Unity のように、マテリアルは球体にマテリアルを**そのまま適用**してdeferredパイプラインでレンダリングした結果、テクスチャはテクスチャの内容そのものをサムネイルとして表示する。

## アーキテクチャ方針

### テクスチャプレビュー: PostProcess パスでFBOにコピー → readPixels

既存の `TexProcedural` パターン（PostProcess → FBO）を活用:
- テクスチャを uniform として渡し、パススルーシェーダーで RGBA8 FBO にレンダリング
- `gl.readPixels` で読み出し → Canvas 2D で data URL 化

### マテリアルプレビュー: ミニシーン + 完全な deferred パイプライン

マテリアルをそのまま使うために、Renderer の完全なレンダリングパイプラインを通す:
1. **ミニシーン構築**: SphereGeometry + Mesh（実際のマテリアルを適用）+ Camera + DirectionalLight
2. **専用 RenderCameraTarget**: `Renderer.createRenderTarget()` でプレビュー用のFBOセットを作成
3. **`Renderer.render()`**: ミニシーンを専用 RenderCameraTarget にレンダリング（deferred shading, ライティング, PostProcess すべて通る）
4. **最終出力FBOから readPixels** で画像取得

この方式により:
- deferred マテリアルのフラグシェーダーがGBuffer出力を正しく行う
- ライティング計算が正確に行われる
- マテリアルの全uniform（テクスチャ含む）がそのまま反映される

## 実装ステップ

### 1. AssetPreviewManager クラスの作成（新規ファイル）

- **対象ファイル**: `packages/orengine/ts/Engine/AssetPreviewManager/index.ts`（新規）
- **変更内容**: プレビューサムネイルの生成・キャッシュを管理するクラス
- **コードスニペット**:
  ```typescript
  import * as GLP from 'glpower';
  import * as MXP from 'maxpower';
  import { Engine } from '..';

  const PREVIEW_SIZE = 128;

  export class AssetPreviewManager {
    private _gl: WebGL2RenderingContext;
    private _renderer: MXP.Renderer;
    private _cache: Map<string, string>; // key → data URL
    private _readBuffer: Uint8Array;
    private _canvas2d: HTMLCanvasElement;
    private _ctx2d: CanvasRenderingContext2D;

    // テクスチャプレビュー用
    private _texCopyPass: MXP.PostProcessPass;
    private _texCopyPostProcess: MXP.PostProcess;
    private _texPreviewFB: GLP.GLPowerFrameBuffer;

    // マテリアルプレビュー用ミニシーン
    private _matRenderTarget: MXP.RenderCameraTarget;
    private _matScene: MXP.Entity;       // ルートエンティティ
    private _matSphere: MXP.Entity;      // 球体エンティティ
    private _matMesh: MXP.Mesh;          // Meshコンポーネント（materialを差し替える）
    private _matCameraEntity: MXP.Entity; // カメラエンティティ
    private _matLightEntity: MXP.Entity;  // ライトエンティティ

    constructor( gl: WebGL2RenderingContext, renderer: MXP.Renderer ) {
      this._gl = gl;
      this._renderer = renderer;
      this._cache = new Map();
      this._readBuffer = new Uint8Array( PREVIEW_SIZE * PREVIEW_SIZE * 4 );
      this._canvas2d = document.createElement( 'canvas' );
      this._canvas2d.width = PREVIEW_SIZE;
      this._canvas2d.height = PREVIEW_SIZE;
      this._ctx2d = this._canvas2d.getContext( '2d' )!;

      // テクスチャプレビュー用: PostProcessパス
      this._texPreviewFB = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
      this._texPreviewFB.setTexture( [ new GLP.GLPowerTexture( gl ) ] );
      this._texPreviewFB.setSize( new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ) );
      this._texCopyPass = new MXP.PostProcessPass( gl, {
        frag: textureCopyFrag,
        renderTarget: this._texPreviewFB,
      } );
      this._texCopyPostProcess = new MXP.PostProcess( { passes: [ this._texCopyPass ] } );

      // マテリアルプレビュー用: ミニシーン
      this._matRenderTarget = MXP.Renderer.createRenderTarget( gl );
      MXP.Renderer.resizeRenderTarget( this._matRenderTarget, new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ) );
      this._setupMaterialPreviewScene();
    }

    private _setupMaterialPreviewScene() { ... }
    public getTexturePreview( name: string ): string | null { ... }
    public getMaterialPreview( name: string ): string | null { ... }
    public invalidate( key: string ): void { ... }
    public invalidateAll(): void { ... }
    private _readFBToDataURL( fb: GLP.GLPowerFrameBuffer ): string { ... }
    public dispose(): void { ... }
  }
  ```

### 2. マテリアルプレビュー用ミニシーンのセットアップ

- **対象ファイル**: `packages/orengine/ts/Engine/AssetPreviewManager/index.ts`
- **変更内容**: SphereGeometry + Camera + DirectionalLight のミニシーンを構築
- **コードスニペット**:
  ```typescript
  private _setupMaterialPreviewScene() {
    // ルート
    this._matScene = new MXP.Entity();
    this._matScene.name = "previewScene";

    // 球体
    this._matSphere = new MXP.Entity();
    this._matSphere.name = "previewSphere";
    this._matMesh = this._matSphere.addComponent( MXP.Mesh, {
      geometry: new MXP.SphereGeometry( { radius: 1, widthSegments: 32, heightSegments: 16 } ),
    } );
    this._matScene.add( this._matSphere );

    // カメラ
    this._matCameraEntity = new MXP.Entity();
    this._matCameraEntity.name = "previewCamera";
    const camera = this._matCameraEntity.addComponent( MXP.Camera );
    camera.fov = 40;
    camera.near = 0.1;
    camera.far = 100;
    camera.aspect = 1;
    camera.displayOut = false;
    this._matCameraEntity.position.set( 0, 0, 3.5 );
    this._matCameraEntity.updateMatrix();
    camera.updateViewMatrix();
    camera.updateProjectionMatrix();
    this._matScene.add( this._matCameraEntity );

    // ライト (DirectionalLight)
    this._matLightEntity = new MXP.Entity();
    this._matLightEntity.name = "previewLight";
    const light = this._matLightEntity.addComponent( MXP.Light );
    light.lightType = "directional";
    light.color.set( 1, 1, 1 );
    light.intensity = 2;
    light.castShadow = false;
    this._matLightEntity.position.set( 2, 3, 4 );
    // ライトの方向 = ライトのmatrixWorldから計算される
    this._matLightEntity.updateMatrix();
    this._matScene.add( this._matLightEntity );
  }
  ```
- **注意点**:
  - `Entity.updateMatrix()` でローカルマトリックスを更新後、`matrixWorld` が正しく設定される必要がある
  - Camera の `viewMatrix` と `projectionMatrix` は `updateViewMatrix()` / `updateProjectionMatrix()` で手動更新
  - Light は `castShadow = false` でシャドウマップ生成をスキップ（プレビューに影は不要）

### 3. マテリアルプレビューのレンダリング実装

- **対象ファイル**: `packages/orengine/ts/Engine/AssetPreviewManager/index.ts`
- **変更内容**: 実際のマテリアルを球体に適用し、完全なdeferredパイプラインでレンダリング
- **コードスニペット**:
  ```typescript
  public getMaterialPreview( name: string ): string | null {
    const key = "mat:" + name;
    const cached = this._cache.get( key );
    if ( cached ) return cached;

    const material = Engine.resources.getMaterialInstance( name );
    if ( !material ) return null;

    // マテリアルを球体に適用
    this._matMesh.material = material;

    // matrixWorldを更新（updateで通常やるが、ミニシーンは手動）
    this._matScene.updateMatrix();
    this._matSphere.updateMatrix();
    this._matCameraEntity.updateMatrix();
    this._matLightEntity.updateMatrix();

    // Rendererの解像度を一時的にプレビューサイズに変更
    const prevResolution = this._renderer.resolution.clone();
    this._renderer.resolution.set( PREVIEW_SIZE, PREVIEW_SIZE );

    // 完全なdeferredパイプラインでレンダリング
    const event: MXP.EntityUpdateEvent = {
      playing: false,
      timeElapsed: 0,
      timeDelta: 0,
      timeCode: 0,
      timeCodeFrame: 0,
      resolution: new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ),
      renderer: this._renderer,
      forceDraw: true,
    };

    this._renderer.render(
      this._matScene,
      this._matCameraEntity,
      event,
      this._matRenderTarget
    );

    // 解像度を戻す
    this._renderer.resolution.copy( prevResolution );

    // uiBuffer（最終出力先）からreadPixels
    const dataUrl = this._readFBToDataURL( this._matRenderTarget.uiBuffer );
    this._cache.set( key, dataUrl );
    return dataUrl;
  }
  ```
- **注意点**:
  - `Renderer.render()` の最終出力は `uiBuffer` にblitされる（Renderer L711-719）
  - Renderer の `resolution` を一時的に変更する必要がある（内部でviewport設定に使用）
  - `castShadow = false` でシャドウマップパスをスキップ
  - ミニシーンには envMap 用エンティティがないため、envMap パスは空で通過する

### 4. テクスチャプレビューの実装

- **対象ファイル**: `packages/orengine/ts/Engine/AssetPreviewManager/index.ts`
- **変更内容**: 既存テクスチャを PostProcess パスで RGBA8 FBO に縮小コピーし、readPixels で取得
- **コードスニペット**:
  ```typescript
  public getTexturePreview( name: string ): string | null {
    const key = "tex:" + name;
    const cached = this._cache.get( key );
    if ( cached ) return cached;

    const texture = Engine.resources.getTexture( name );
    if ( !texture ) return null;

    this._texCopyPass.uniforms.uPreviewTex = { value: texture, type: "1i" };
    this._renderer.renderPostProcess(
      this._texCopyPostProcess, undefined,
      new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE )
    );

    const dataUrl = this._readFBToDataURL( this._texPreviewFB );
    this._cache.set( key, dataUrl );
    return dataUrl;
  }
  ```

### 5. テクスチャコピー用シェーダー（新規）

- **対象ファイル**: `packages/orengine/ts/Engine/AssetPreviewManager/shaders/textureCopy.fs`（新規）
- **コードスニペット**:
  ```glsl
  precision highp float;
  in vec2 vUv;
  uniform sampler2D uPreviewTex;
  out vec4 fragColor;

  void main() {
    fragColor = texture( uPreviewTex, vUv );
  }
  ```

### 6. readPixels → data URL 変換

- **対象ファイル**: `packages/orengine/ts/Engine/AssetPreviewManager/index.ts`
- **コードスニペット**:
  ```typescript
  private _readFBToDataURL( fb: GLP.GLPowerFrameBuffer ): string {
    const gl = this._gl;
    gl.bindFramebuffer( gl.FRAMEBUFFER, fb.getFrameBuffer() );
    gl.readPixels( 0, 0, PREVIEW_SIZE, PREVIEW_SIZE, gl.RGBA, gl.UNSIGNED_BYTE, this._readBuffer );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    // readPixels はY軸反転なので、上下を入れ替えてCanvas 2Dに書き込む
    const imageData = this._ctx2d.createImageData( PREVIEW_SIZE, PREVIEW_SIZE );
    for ( let y = 0; y < PREVIEW_SIZE; y++ ) {
      const srcRow = ( PREVIEW_SIZE - 1 - y ) * PREVIEW_SIZE * 4;
      const dstRow = y * PREVIEW_SIZE * 4;
      for ( let x = 0; x < PREVIEW_SIZE * 4; x++ ) {
        imageData.data[ dstRow + x ] = this._readBuffer[ srcRow + x ];
      }
    }
    this._ctx2d.putImageData( imageData, 0, 0 );
    return this._canvas2d.toDataURL();
  }
  ```

### 7. AssetPreviewManager を Engine に統合

- **対象ファイル**: `packages/orengine/ts/Engine/index.ts`
- **変更内容**: Engine に AssetPreviewManager インスタンスを追加
- **コードスニペット**:
  ```typescript
  import { AssetPreviewManager } from './AssetPreviewManager';

  // フィールド追加
  private _assetPreviewManager: AssetPreviewManager;

  // コンストラクタ末尾
  this._assetPreviewManager = new AssetPreviewManager( gl, this._renderer );

  // getter
  public get assetPreviewManager() { return this._assetPreviewManager; }

  // dispose() に追加
  this._assetPreviewManager.dispose();
  ```

### 8. AssetGrid にプレビュー表示を追加

- **対象ファイル**: `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.tsx`
- **変更内容**: マテリアル・テクスチャアイテムでプレビュー画像を表示
- **コードスニペット**:
  ```tsx
  import { useOREditor } from '../../../../hooks/useOREditor';

  // AssetGrid コンポーネント内
  const { engine } = useOREditor();

  // getAssetIcon を拡張（engine を引数追加）
  function getAssetIcon( assetType: string, entry: AssetItem, engine: Engine ): ReactNode {
    const previewMgr = engine.assetPreviewManager;

    if ( assetType === "texture" ) {
      const preview = previewMgr.getTexturePreview( entry.name );
      if ( preview ) return <img src={preview} className={style.gridItem_preview} />;
    }

    if ( assetType === "material" ) {
      const preview = previewMgr.getMaterialPreview( entry.name );
      if ( preview ) return <img src={preview} className={style.gridItem_preview} />;
    }

    // フォールバック: 既存SVGアイコン
    switch ( assetType ) {
      case "component": return <ComponentIcon />;
      case "material": return <MaterialIcon />;
      case "shader": return <ShaderIcon />;
      case "texture": return <TextureIcon />;
      default: return null;
    }
  }
  ```
- **JSX内の呼び出し修正**:
  ```tsx
  // 変更前
  {getAssetIcon( entry.assetType )}
  // 変更後
  {getAssetIcon( entry.assetType, entry, engine )}
  ```

### 9. プレビュー再生成のタイミング

- **対象ファイル**: `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.tsx`
- **変更内容**: リソース更新時にプレビューキャッシュを無効化
- **コードスニペット**:
  ```tsx
  useEffect( () => {
    const previewMgr = engine.assetPreviewManager;
    const onUpdate = () => previewMgr.invalidateAll();

    Engine.resources.on( "update", onUpdate );
    Engine.resources.on( "update/texture", onUpdate );
    return () => {
      Engine.resources.off( "update", onUpdate );
      Engine.resources.off( "update/texture", onUpdate );
    };
  }, [ engine ] );
  ```

### 10. SCSS の調整

- **対象ファイル**: `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.module.scss`
- **変更内容**: プレビュー画像用のスタイル追加
- **コードスニペット**:
  ```scss
  .gridItem_preview {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: $radius1;
  }
  ```

## 変更対象ファイル一覧
- [x] `packages/orengine/ts/Engine/AssetPreviewManager/index.ts` - 新規: プレビュー生成・キャッシュ管理（ミニシーン+deferred pipeline）
- [x] `packages/orengine/ts/Engine/AssetPreviewManager/shaders/textureCopy.fs` - 新規: テクスチャコピー用シェーダー
- [x] `packages/orengine/ts/Engine/index.ts` - AssetPreviewManager統合
- [x] `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.tsx` - プレビュー表示・キャッシュ管理
- [x] `packages/orengine/tsx/components/Panels/AssetViewer/AssetGrid/index.module.scss` - スタイル追加

## 考慮事項・リスク

### 技術的課題
1. **Renderer.resolution の一時変更**: `render()` 内部で `this.resolution` を viewport やポストプロセスの解像度に使用するため、プレビューレンダリング中は一時的に PREVIEW_SIZE に変更し、完了後に元に戻す必要がある
2. **matrixWorld の手動更新**: ミニシーンのエンティティは通常の update ループに参加しないため、`updateMatrix()` を手動で呼ぶ必要がある。ただし `Entity.update()` を呼ぶとコンポーネントのライフサイクル全体が走るため、行列更新だけ行う方法を検討
3. **readPixels のYフリップ**: WebGL の readPixels は下から上に読むため、Canvas 2D に書き込む際にY軸反転が必要
4. **FLOAT FBO からの readPixels**: uiBuffer が UNSIGNED_BYTE テクスチャを使っている場合は直接 readPixels 可能。FLOAT の場合は変換が必要

### パフォーマンス
5. **完全なレンダリングパイプラインのコスト**: 1マテリアルにつき1回の完全 render() 呼び出し。多数のマテリアルがある場合に重い
   - 対策: キャッシュ、遅延生成、リソース更新時のみ再生成
6. **readPixels のコスト**: GPU→CPU 転送はボトルネック
   - 対策: PREVIEW_SIZE を 128 程度に抑える
7. **プレビュー用 RenderCameraTarget のメモリ**: gBuffer等のFBOセットをプレビュー用に1セット追加で持つ
   - PREVIEW_SIZE が小さいのでメモリ影響は軽微

### Entity matrixWorld 更新の課題
8. **`Entity.updateMatrix()` と `matrixWorld`**: Entity の update フロー内で `matrixWorld` が計算される。ミニシーンでは `Entity.update()` を呼ぶか、手動で `matrixWorld` を設定する必要がある
   - `Entity.update( event )` を呼ぶのが最も安全（内部で `updateMatrix` + `matrixWorld` 計算が行われる）
   - ただしコンポーネントの `updateImpl` も走るため副作用に注意

## テスト方針
- `npm run typecheck` で型エラーなし
- エディタ起動後、AssetViewer の Textures フォルダでテクスチャのプレビューが表示される
- AssetViewer の Materials フォルダでマテリアルが球体に適用されたプレビューが表示される
- マテリアルのシェーダーやuniformの変更がプレビューに反映される
- メインビューポートのレンダリングに影響がない
- プレビューが存在しないアセット（シェーダー・コンポーネント）は従来のSVGアイコンが表示される
