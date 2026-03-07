# Plan: リソース選択UIの編集ボタン追加 & 右パネル上下分割

## 概要
1. Meshのmaterial/name等のリソース選択UIに「編集ボタン」を追加し、押すとアセットパネルでそのリソースが選択・編集可能になる
2. 右パネルを上下に分割し、上=EntityProperty（エンティティ）、下=AssetProperty（アセット編集）の独立表示にする

## 実装ステップ

### 1. 右パネルの上下分割（OREditor レイアウト変更）

- **対象ファイル**: `packages/orengine/tsx/components/OREditor/index.tsx`
- **変更内容**: 右パネル（300px）の `PanelContainer` 内を `LayoutSplit` で上下分割。上にEntityProperty、下にAssetPropertyを配置
- **コードスニペット**:
  ```tsx
  // 変更前（L111-129）: 右パネルは PanelContainer 内にタブで Entity/Project/Renderer
  // 変更後: 上下分割
  <LayoutSplit.Item size="300px">
    <LayoutSplit direction="vertical">
      <LayoutSplit.Item flex={1}>
        <PanelContainer>
          <PanelContainer.Tab title='Property'>
            <Panel>
              <EntityProperty />
            </Panel>
          </PanelContainer.Tab>
          <PanelContainer.Tab title='Project'>
            <Panel>
              <ProjectControl />
            </Panel>
          </PanelContainer.Tab>
          <PanelContainer.Tab title='Renderer'>
            <Panel>
              <RendererSettings />
            </Panel>
          </PanelContainer.Tab>
        </PanelContainer>
      </LayoutSplit.Item>
      <LayoutSplit.Item size="35%">
        <PanelContainer>
          <PanelContainer.Tab title='Asset'>
            <Panel>
              <AssetProperty />
            </Panel>
          </PanelContainer.Tab>
        </PanelContainer>
      </LayoutSplit.Item>
    </LayoutSplit>
  </LayoutSplit.Item>
  ```
- **注意点**: 下部のサイズは `35%` 程度が妥当か要検討。ユーザーの好みに合わせて調整

### 2. AssetProperty コンポーネントの分離

- **対象ファイル**: `packages/orengine/tsx/components/Panels/EntityProperty/index.tsx`
- **変更内容**:
  - `AssetPropertyView` を独立した `AssetProperty` コンポーネントとして分離
  - `EntityProperty` からはアセット表示ロジックを削除し、エンティティ専用にする
  - 新しい `AssetProperty` は `selectedAsset` を監視してアセット編集UIを表示
- **新規ファイル**: `packages/orengine/tsx/components/Panels/AssetProperty/index.tsx`
- **コードスニペット**:
  ```tsx
  // AssetProperty/index.tsx
  export const AssetProperty = () => {
    const { editor: gui } = useOREditor();
    const [ selectedAsset ] = useSerializableField<SelectedAssetInfo>( gui, "selectedAsset" );

    if ( !selectedAsset ) return null;

    const onClose = useCallback( () => {
      gui.setField( "selectedAsset", null );
    }, [ gui ] );

    return <div className={style.container}>
      <div className={style.header}>
        <span className={style.header_title}>{selectedAsset.assetType}: {selectedAsset.name}</span>
        <button className={style.header_close} onClick={onClose}><CrossIcon /></button>
      </div>
      <AssetPropertyView asset={selectedAsset} />
    </div>;
  };
  ```
- **動作**: `selectedAsset` が null なら何も表示しない。閉じるボタンで `selectedAsset` を null に戻す
- **EntityProperty の変更**: `propertyTarget` の分岐を削除し、常にエンティティのみ表示
  ```tsx
  export const EntityProperty = () => {
    const { editor: gui, engine } = useOREditor();
    const [ selectedEntityId ] = useSerializableField<string>( gui, "selectedEntityId" );
    // propertyTarget の監視は不要に

    const selectedEntity = useMemo( () => {
      if ( !selectedEntityId ) return undefined;
      return engine.findEntityByUUID( selectedEntityId );
    }, [ engine, selectedEntityId ] );

    if ( !selectedEntity ) return null;

    return <div className={style.container}>
      <Block label="Fields" accordion>
        <SerializeFieldView target={selectedEntity} />
      </Block>
      <Block label="Components" accordion>
        <ComponentList entity={selectedEntity}/>
        <ComponentAdd entity={selectedEntity} />
      </Block>
    </div>;
  };
  ```
- **注意点**: `propertyTarget` フィールドは後方互換のため残すが、UIの排他制御には使わなくなる

### 3. フォーマット型の拡張 - `resource` タイプ追加

- **対象ファイル**: `packages/maxpower/Serializable/index.ts`
- **変更内容**: `SerializableFieldFormat` に新しいリソース参照型を追加
- **コードスニペット**:
  ```typescript
  interface SerializeFieldFormatResource {
    type: "resource",
    resourceType: "material" | "texture" | "shader",
    list: SelectList | ( () => SelectList )
  }

  export type SerializableFieldFormat =
    SerializeFieldFormatVector | SerializeFieldFormatSelect | SerializeFieldFormatArray |
    SerializeFieldFormatEntity | SerializeFieldFormatComponent | SerializeFieldFormatResource
  ```
- **注意点**: 既存の `select` 型との後方互換を維持。`resource` 型は `select` + 「編集ボタン」

### 4. AssetViewer の外部ナビゲーション対応

- **対象ファイル**: `packages/orengine/ts/Editor/index.ts`
- **変更内容**: Editor に `navigateAsset` フィールドを追加。編集ボタン押下時にこのフィールドをセットし、AssetViewer が監視してナビゲーションを実行
- **コードスニペット**（Editor側）:
  ```typescript
  export type NavigateAssetRequest = {
    assetType: "material" | "texture" | "shader" | "component";
    name: string;
  } | null;

  // Editorコンストラクタ内
  this._navigateAsset = null;
  this.field( "navigateAsset", () => this._navigateAsset, v => {
    this._navigateAsset = v;
  } );
  ```

- **対象ファイル**: `packages/orengine/tsx/components/Panels/AssetViewer/index.tsx`
- **変更内容**: `navigateAsset` フィールドを監視し、値が変わったら `currentPath` を適切なフォルダに変更し、該当アイテムを選択
- **コードスニペット**（AssetViewer側）:
  ```tsx
  const [ navigateAsset ] = useSerializableField<NavigateAssetRequest>( editor, "navigateAsset" );

  useEffect( () => {
    if ( !navigateAsset ) return;

    // assetType → ルートフォルダ名のマッピング
    const folderMap: Record<string, string> = {
      material: "Materials",
      texture: "Textures",
      shader: "Shaders",
      component: "Components",
    };
    const folder = folderMap[ navigateAsset.assetType ];
    if ( folder ) {
      setCurrentPath( [ folder ] );
      // 選択状態もセット
      // selectedAsset は編集ボタン側で既にセットされている
    }

    // 消費済みにする
    editor.setField( "navigateAsset", null );
  }, [ navigateAsset, editor ] );
  ```
- **注意点**: `navigateAsset` は一回限りのリクエストなので、処理後に `null` に戻す

### 5. InputResourceSelect コンポーネントの新規作成

- **新規ファイル**: `packages/orengine/tsx/components/Input/InputResourceSelect/index.tsx`
- **変更内容**: `InputSelect` を拡張し、セレクトボックスの横に「編集」ボタンを配置
- **コードスニペット**:
  ```tsx
  type InputResourceSelectProps<T> = {
    value: T;
    selectList: SelectList | ( () => SelectList );
    resourceType: "material" | "texture" | "shader";
    onChange?: ( value: T ) => void;
  };

  export const InputResourceSelect = <T extends string | number,>( props: InputResourceSelectProps<T> ) => {
    const { editor } = useOREditor();

    const onClickEdit = useCallback( () => {
      if ( !props.value ) return;

      // AssetViewer にナビゲーションを指示
      editor.setField( "navigateAsset", {
        assetType: props.resourceType,
        name: String( props.value ),
      } );

      // アセットプロパティパネルに選択状態をセット
      editor.setField( "selectedAsset", {
        name: String( props.value ),
        assetType: props.resourceType,
      } );
    }, [ editor, props.value, props.resourceType ] );

    return <div className={style.inputResourceSelect}>
      <InputSelect
        value={props.value}
        selectList={props.selectList}
        onChange={props.onChange}
      />
      {props.value && <button
        className={style.editButton}
        onClick={onClickEdit}
        title="Edit resource"
      >
        ✎
      </button>}
    </div>;
  };
  ```
- **SCSS**: セレクトボックスとボタンを横並びにするスタイル

### 6. Value コンポーネントで resource フォーマットの処理追加

- **対象ファイル**: `packages/orengine/tsx/components/Value/index.tsx`
- **変更内容**: `format.type == "resource"` の分岐を追加
- **コードスニペット**:
  ```tsx
  } else if ( format.type == "resource" ) {
    inputElm = <InputResourceSelect
      value={value}
      onChange={onChangeValue}
      selectList={format.list}
      resourceType={format.resourceType}
    />;
  }
  ```

### 7. Mesh の material/name フィールドを resource 型に変更

- **対象ファイル**: `packages/maxpower/Component/Mesh/index.ts`
- **変更内容**: `material/name` の `format` を `select` → `resource` に変更
- **コードスニペット**:
  ```typescript
  mat.field( "name", () => this._materialType, ( v ) => {
    this._materialType = v;
    this._rebuildMaterial();
  }, {
    format: {
      type: "resource",
      resourceType: "material",
      list: () => {
        const list: { label: string, value: string }[] = [ { label: "(None)", value: "" } ];
        Mesh.getMaterialList().forEach( m => {
          list.push( { label: m.name, value: m.name } );
        } );
        return list;
      }
    }
  } );
  ```

### 8. MaterialResource の uniform sampler2D を resource 型に変更

- **対象ファイル**: `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts`
- **変更内容**: テクスチャ参照のuniformフィールドの format を `resource` 型に変更
- **コードスニペット**: テクスチャ選択部分（`_textureResources.forEach`でリスト構築している箇所）のformatを `type: "resource", resourceType: "texture"` に変更

### 9. Editor の状態管理調整（任意）

- **対象ファイル**: `packages/orengine/ts/Editor/index.ts`
- **変更内容**: `selectedEntityId` 設定時の `propertyTarget = "entity"` 切替を削除（上下分割により排他制御不要）。`selectedAsset` 設定時の `propertyTarget = "asset"` も不要だが、互換性のため残しても良い
- **注意点**: 上下分割により排他制御は不要だが、副作用の検証が必要

## 変更対象ファイル一覧
- [x] `packages/maxpower/Serializable/index.ts` - `SerializeFieldFormatResource` 型追加
- [x] `packages/orengine/ts/Editor/index.ts` - `navigateAsset` フィールド追加 + 状態管理調整
- [x] `packages/orengine/tsx/components/Panels/AssetViewer/index.tsx` - `navigateAsset` 監視でナビゲーション連動
- [x] `packages/orengine/tsx/components/Input/InputResourceSelect/index.tsx` - 新規作成
- [x] `packages/orengine/tsx/components/Input/InputResourceSelect/index.module.scss` - 新規作成
- [x] `packages/orengine/tsx/components/Value/index.tsx` - `resource` フォーマット分岐追加
- [x] `packages/orengine/tsx/components/Panels/AssetProperty/index.tsx` - 新規作成（AssetPropertyView を移動）
- [x] `packages/orengine/tsx/components/Panels/AssetProperty/index.module.scss` - 新規作成
- [x] `packages/orengine/tsx/components/Panels/EntityProperty/index.tsx` - アセット表示ロジック削除、エンティティ専用に
- [x] `packages/orengine/tsx/components/OREditor/index.tsx` - 右パネル上下分割レイアウト
- [x] `packages/maxpower/Component/Mesh/index.ts` - material/name の format を resource 型に
- [x] `packages/orengine/ts/Engine/Resources/MaterialResource/index.ts` - sampler2D uniform の format を resource 型に（vert/frag のシェーダー選択も含む）

## 考慮事項・リスク
- **排他制御の廃止**: 現在はentity/assetの排他表示だが、分割後は両方同時に見える。`propertyTarget` の扱いを整理する必要がある
- **パネルサイズ**: 右パネル300pxを上下分割すると、それぞれの表示領域が狭くなる可能性。スクロール対応が重要
- **モバイルレイアウト**: PC版のみ上下分割し、モバイル版は現状維持か別の対応が必要
- **シェーダーの「編集」**: シェーダーは外部エディタで編集するため、resourceType="shader" の編集ボタンはAssetViewerでの選択ではなく外部エディタ起動にするか検討

## テスト方針
- `npm run typecheck` で型チェック通過を確認
- 開発サーバーで以下を確認:
  1. 右パネルが上下分割され、上にEntityProperty、下にAssetPropertyが表示される
  2. Meshのmaterial/nameセレクトに「編集ボタン」が表示される
  3. 編集ボタン押下でAssetPropertyパネルに該当マテリアルの編集UIが表示される
  4. エンティティ選択とアセット選択が独立して動作する
  5. モバイルレイアウトが壊れていない
