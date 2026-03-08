# Plan: テスト充実化

## 概要
OREngineプロジェクトにテストを導入・充実させる。現在テストがあるのは glpower パッケージ（Math/Animation）のみで、maxpower・server にはテストが一切ない。テスト効果が高く、実装が容易な箇所から段階的に導入する。

テストフレームワークは **Vitest** を採用する。理由:
- ルートプロジェクトが Vite ベース（`"type": "module"`）であり、ESM との親和性が高い
- `tsconfig.json` のパスエイリアス（`glpower`, `maxpower` 等）を Vite の resolve 設定で再利用可能
- glpower の既存 Jest テストはそのまま残す（glpower は独立サブモジュールのため）

## 実装ステップ

### 1. Vitest 環境セットアップ（カバレッジ含む）

- **対象ファイル**: `package.json`, `vitest.config.ts`（新規）
- **変更内容**:
  - `vitest` と `@vitest/coverage-v8` を devDependencies に追加
  - `vitest.config.ts` を新規作成（パスエイリアス・カバレッジ設定含む）
  - `package.json` に `test` / `test:watch` / `test:coverage` スクリプト追加
- **コードスニペット**:
  ```bash
  npm install -D vitest @vitest/coverage-v8
  ```
  ```typescript
  // vitest.config.ts
  import { defineConfig } from 'vitest/config';
  import path from 'path';

  export default defineConfig( {
  	test: {
  		include: [ 'packages/maxpower/**/*.test.ts', 'server/**/*.test.ts' ],
  		coverage: {
  			provider: 'v8',
  			reporter: [ 'text', 'text-summary', 'html', 'json-summary' ],
  			reportsDirectory: './coverage',
  			include: [
  				'packages/maxpower/Serializable/**/*.ts',
  				'packages/maxpower/Entity/**/*.ts',
  				'packages/maxpower/Component/index.ts',
  				'packages/maxpower/Geometry/**/*.ts',
  				'packages/maxpower/Utils/Ray/**/*.ts',
  				'server/Project/EntityStore/**/*.ts',
  			],
  			exclude: [
  				'**/*.test.ts',
  				'**/*.d.ts',
  				'packages/maxpower/Component/Renderer/**',
  				'packages/maxpower/Component/Mesh/**',
  				'packages/maxpower/Component/BLidge*/**',
  				'packages/orengine/tsx/**',
  			],
  			thresholds: {
  				// Phase 1 目標（基盤ロジック）
  				'packages/maxpower/Serializable/**/*.ts': {
  					lines: 80,
  					functions: 80,
  					branches: 70,
  				},
  				'packages/maxpower/Entity/**/*.ts': {
  					lines: 70,
  					functions: 70,
  					branches: 60,
  				},
  				'server/Project/EntityStore/**/*.ts': {
  					lines: 80,
  					functions: 80,
  					branches: 70,
  				},
  			},
  		},
  	},
  	resolve: {
  		alias: {
  			'glpower': path.resolve( __dirname, 'packages/glpower/packages/glpower/src' ),
  			'maxpower': path.resolve( __dirname, 'packages/maxpower' ),
  		},
  	},
  } );
  ```
  ```json
  // package.json scripts に追加
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
  ```
- **注意点**: glpower の既存 Jest テストとは独立。`vitest.config.ts` の `include` で対象を限定する

### 2. EventEmitter テスト

- **対象ファイル**: `packages/glpower/packages/glpower/src/utils/EventEmitter.ts`（テスト対象）
- **新規ファイル**: `packages/maxpower/tests/EventEmitter.test.ts`
- **変更内容**: EventEmitter の全メソッド（on, off, once, emit, hasEvent）のユニットテスト
- **コードスニペット**:
  ```typescript
  import { EventEmitter } from 'glpower';
  import { describe, it, expect, vi, beforeEach } from 'vitest';

  describe( 'EventEmitter', () => {

  	let emitter: EventEmitter;

  	beforeEach( () => {
  		emitter = new EventEmitter();
  	} );

  	describe( 'on / emit', () => {

  		it( 'should call listener when event is emitted', () => {
  			const cb = vi.fn();
  			emitter.on( 'test', cb );
  			emitter.emit( 'test' );
  			expect( cb ).toHaveBeenCalledTimes( 1 );
  		} );

  		it( 'should pass arguments to listener', () => {
  			const cb = vi.fn();
  			emitter.on( 'test', cb );
  			emitter.emit( 'test', [ 'arg1', 'arg2' ] );
  			expect( cb ).toHaveBeenCalledWith( 'arg1', 'arg2' );
  		} );

  		it( 'should support multiple listeners', () => {
  			const cb1 = vi.fn();
  			const cb2 = vi.fn();
  			emitter.on( 'test', cb1 );
  			emitter.on( 'test', cb2 );
  			emitter.emit( 'test' );
  			expect( cb1 ).toHaveBeenCalledTimes( 1 );
  			expect( cb2 ).toHaveBeenCalledTimes( 1 );
  		} );

  	} );

  	describe( 'once', () => {

  		it( 'should call listener only once', () => {
  			const cb = vi.fn();
  			emitter.once( 'test', cb );
  			emitter.emit( 'test' );
  			emitter.emit( 'test' );
  			expect( cb ).toHaveBeenCalledTimes( 1 );
  		} );

  	} );

  	describe( 'off', () => {

  		it( 'should remove specific listener', () => {
  			const cb = vi.fn();
  			emitter.on( 'test', cb );
  			emitter.off( 'test', cb );
  			emitter.emit( 'test' );
  			expect( cb ).not.toHaveBeenCalled();
  		} );

  		it( 'should remove all listeners for event when no cb given', () => {
  			const cb1 = vi.fn();
  			const cb2 = vi.fn();
  			emitter.on( 'test', cb1 );
  			emitter.on( 'test', cb2 );
  			emitter.off( 'test' );
  			emitter.emit( 'test' );
  			expect( cb1 ).not.toHaveBeenCalled();
  			expect( cb2 ).not.toHaveBeenCalled();
  		} );

  	} );

  	describe( 'hasEvent', () => {

  		it( 'should return true when listener exists', () => {
  			emitter.on( 'test', () => {} );
  			expect( emitter.hasEvent( 'test' ) ).toBe( true );
  		} );

  		it( 'should return false when no listener', () => {
  			expect( emitter.hasEvent( 'test' ) ).toBe( false );
  		} );

  	} );

  } );
  ```
- **テストケース**: 10件程度

### 3. Serializable テスト

- **対象ファイル**: `packages/maxpower/Serializable/index.ts`
- **新規ファイル**: `packages/maxpower/tests/Serializable.test.ts`
- **変更内容**: フィールドシステム（field/fieldDir/serialize/deserialize/serializeToDirectory）のテスト
- **コードスニペット**:
  ```typescript
  import { Serializable } from 'maxpower';
  import { describe, it, expect, vi, beforeEach } from 'vitest';

  describe( 'Serializable', () => {

  	let s: Serializable;

  	beforeEach( () => {
  		s = new Serializable();
  	} );

  	describe( 'field / serialize / deserialize', () => {

  		it( 'should register and serialize a field', () => {
  			let value = 42;
  			s.field( 'myField', () => value, ( v ) => { value = v; } );
  			const result = s.serialize();
  			expect( result[ 'myField' ] ).toBe( 42 );
  		} );

  		it( 'should deserialize and update value', () => {
  			let value = 42;
  			s.field( 'myField', () => value, ( v: number ) => { value = v; } );
  			s.deserialize( { 'myField': 100 } );
  			expect( value ).toBe( 100 );
  		} );

  		it( 'should skip noExport fields in export mode', () => {
  			s.field( 'visible', () => 1, ( v: number ) => {} );
  			s.field( 'internal', () => 2, { noExport: true } );
  			const result = s.serialize( { mode: 'export' } );
  			expect( result[ 'visible' ] ).toBe( 1 );
  			expect( result[ 'internal' ] ).toBeUndefined();
  		} );

  		it( 'should ignore unknown keys on deserialize', () => {
  			let value = 42;
  			s.field( 'myField', () => value, ( v: number ) => { value = v; } );
  			s.deserialize( { 'unknownKey': 999 } );
  			expect( value ).toBe( 42 );
  		} );

  		it( 'should mark field as readOnly when no setter given', () => {
  			s.field( 'readOnly', () => 'hello' );
  			const opt = s.getFieldOpt( 'readOnly' );
  			expect( opt?.readOnly ).toBe( true );
  			expect( opt?.noExport ).toBe( true );
  		} );

  	} );

  	describe( 'fieldDir', () => {

  		it( 'should create nested fields', () => {
  			let x = 1, y = 2;
  			const dir = s.fieldDir( 'transform' );
  			dir.field( 'x', () => x, ( v: number ) => { x = v; } );
  			dir.field( 'y', () => y, ( v: number ) => { y = v; } );
  			const result = s.serialize();
  			expect( result[ 'transform/x' ] ).toBe( 1 );
  			expect( result[ 'transform/y' ] ).toBe( 2 );
  		} );

  		it( 'should support nested dirs', () => {
  			let v = 10;
  			const outer = s.fieldDir( 'a' );
  			const inner = outer.dir( 'b' );
  			inner.field( 'c', () => v, ( val: number ) => { v = val; } );
  			const result = s.serialize();
  			expect( result[ 'a/b/c' ] ).toBe( 10 );
  		} );

  	} );

  	describe( 'serializeToDirectory', () => {

  		it( 'should convert flat fields to tree structure', () => {
  			s.field( 'geometry/type', () => 'Cube', ( v: string ) => {} );
  			s.field( 'geometry/size', () => 1, ( v: number ) => {} );
  			const dir = s.serializeToDirectory();
  			expect( dir.type ).toBe( 'folder' );
  			if ( dir.type === 'folder' ) {
  				expect( dir.childs[ 'geometry' ].type ).toBe( 'folder' );
  				if ( dir.childs[ 'geometry' ].type === 'folder' ) {
  					const typeChild = dir.childs[ 'geometry' ].childs[ 'type' ];
  					expect( typeChild.type ).toBe( 'value' );
  					if ( typeChild.type === 'value' ) {
  						expect( typeChild.value ).toBe( 'Cube' );
  					}
  				}
  			}
  		} );

  	} );

  	describe( 'setField / getField', () => {

  		it( 'should set and get field value', () => {
  			let value = 0;
  			s.field( 'x', () => value, ( v: number ) => { value = v; } );
  			s.setField( 'x', 42 );
  			expect( value ).toBe( 42 );
  			expect( s.getField( 'x' ) ).toBe( 42 );
  		} );

  	} );

  	describe( 'removeField', () => {

  		it( 'should remove a registered field', () => {
  			s.field( 'temp', () => 1, ( v: number ) => {} );
  			s.removeField( 'temp' );
  			const result = s.serialize();
  			expect( result[ 'temp' ] ).toBeUndefined();
  		} );

  	} );

  	describe( 'noticeField', () => {

  		it( 'should emit event on field update via setter', () => {
  			let value = 0;
  			const cb = vi.fn();
  			s.field( 'x', () => value, ( v: number ) => { value = v; } );
  			s.on( 'fields/update', cb );
  			s.setField( 'x', 5 );
  			expect( cb ).toHaveBeenCalled();
  		} );

  	} );

  } );
  ```
- **テストケース**: 15件程度

### 4. Entity テスト

- **対象ファイル**: `packages/maxpower/Entity/index.ts`
- **新規ファイル**: `packages/maxpower/tests/Entity.test.ts`
- **変更内容**: シーングラフ操作、コンポーネント管理、行列計算、検索、disposeのテスト
- **コードスニペット**:
  ```typescript
  import { Entity } from 'maxpower';
  import { Component } from 'maxpower';
  import { describe, it, expect, vi, beforeEach } from 'vitest';

  describe( 'Entity', () => {

  	describe( 'constructor', () => {

  		it( 'should initialize with default values', () => {
  			const e = new Entity();
  			expect( e.name ).toBe( '' );
  			expect( e.children ).toHaveLength( 0 );
  			expect( e.parent ).toBeNull();
  			expect( e.visible ).toBe( true );
  		} );

  		it( 'should accept name param', () => {
  			const e = new Entity( { name: 'test' } );
  			expect( e.name ).toBe( 'test' );
  		} );

  	} );

  	describe( 'add / remove', () => {

  		it( 'should add child and set parent', () => {
  			const parent = new Entity();
  			const child = new Entity();
  			parent.add( child );
  			expect( parent.children ).toContain( child );
  			expect( child.parent ).toBe( parent );
  		} );

  		it( 'should remove child from previous parent', () => {
  			const parent1 = new Entity();
  			const parent2 = new Entity();
  			const child = new Entity();
  			parent1.add( child );
  			parent2.add( child );
  			expect( parent1.children ).not.toContain( child );
  			expect( parent2.children ).toContain( child );
  		} );

  		it( 'should remove child', () => {
  			const parent = new Entity();
  			const child = new Entity();
  			parent.add( child );
  			parent.remove( child );
  			expect( parent.children ).not.toContain( child );
  		} );

  	} );

  	describe( 'findEntityByName / findEntityByUUID', () => {

  		it( 'should find entity by name in tree', () => {
  			const root = new Entity( { name: 'root' } );
  			const child = new Entity( { name: 'target' } );
  			root.add( child );
  			expect( root.findEntityByName( 'target' ) ).toBe( child );
  		} );

  		it( 'should find entity by UUID', () => {
  			const root = new Entity();
  			const child = new Entity();
  			root.add( child );
  			expect( root.findEntityByUUID( child.uuid ) ).toBe( child );
  		} );

  		it( 'should return undefined for non-existent', () => {
  			const root = new Entity();
  			expect( root.findEntityByUUID( 'nonexistent' ) ).toBeUndefined();
  		} );

  	} );

  	describe( 'getRootEntity', () => {

  		it( 'should return root of tree', () => {
  			const root = new Entity();
  			const child = new Entity();
  			const grandchild = new Entity();
  			root.add( child );
  			child.add( grandchild );
  			expect( grandchild.getRootEntity() ).toBe( root );
  		} );

  	} );

  	describe( 'addComponent / removeComponent / getComponent', () => {

  		it( 'should add and retrieve component', () => {
  			const e = new Entity();
  			const c = e.addComponent( Component );
  			expect( e.getComponent( Component ) ).toBe( c );
  		} );

  		it( 'should replace existing component of same type', () => {
  			const e = new Entity();
  			const c1 = e.addComponent( Component );
  			const c2 = e.addComponent( Component );
  			expect( e.getComponent( Component ) ).toBe( c2 );
  			expect( e.getComponent( Component ) ).not.toBe( c1 );
  		} );

  		it( 'should remove component', () => {
  			const e = new Entity();
  			e.addComponent( Component );
  			e.removeComponent( Component );
  			expect( e.getComponent( Component ) ).toBeUndefined();
  		} );

  	} );

  	describe( 'traverse', () => {

  		it( 'should visit all entities in tree', () => {
  			const root = new Entity();
  			const c1 = new Entity();
  			const c2 = new Entity();
  			root.add( c1 );
  			root.add( c2 );
  			const visited: Entity[] = [];
  			root.traverse( e => visited.push( e ) );
  			expect( visited ).toEqual( [ root, c1, c2 ] );
  		} );

  	} );

  	describe( 'isVisibleTraverse', () => {

  		it( 'should return false when parent is invisible', () => {
  			const parent = new Entity();
  			const child = new Entity();
  			parent.add( child );
  			parent.visible = false;
  			expect( child.isVisibleTraverse() ).toBe( false );
  		} );

  		it( 'should return true when all ancestors visible', () => {
  			const parent = new Entity();
  			const child = new Entity();
  			parent.add( child );
  			expect( child.isVisibleTraverse() ).toBe( true );
  		} );

  	} );

  	describe( 'getScenePath', () => {

  		it( 'should return full path from root', () => {
  			const root = new Entity( { name: 'Scene' } );
  			const child = new Entity( { name: 'Cube' } );
  			root.add( child );
  			expect( child.getScenePath() ).toBe( '/Scene/Cube' );
  		} );

  	} );

  	describe( 'dispose', () => {

  		it( 'should emit dispose event', () => {
  			const e = new Entity();
  			const cb = vi.fn();
  			e.on( 'dispose', cb );
  			e.dispose();
  			expect( cb ).toHaveBeenCalled();
  		} );

  		it( 'should remove from parent', () => {
  			const parent = new Entity();
  			const child = new Entity();
  			parent.add( child );
  			child.dispose();
  			expect( parent.children ).not.toContain( child );
  		} );

  		it( 'should dispose all components', () => {
  			const e = new Entity();
  			const c = e.addComponent( Component );
  			const cb = vi.fn();
  			c.on( 'dispose', cb );
  			e.dispose();
  			expect( cb ).toHaveBeenCalled();
  		} );

  	} );

  	describe( 'updateMatrix', () => {

  		it( 'should compute identity matrixWorld when no transform', () => {
  			const e = new Entity();
  			e.updateMatrix();
  			// position (0,0,0), scale (1,1,1), no rotation => identity
  			const elm = e.matrixWorld.elm;
  			expect( elm[ 0 ] ).toBeCloseTo( 1 );
  			expect( elm[ 5 ] ).toBeCloseTo( 1 );
  			expect( elm[ 10 ] ).toBeCloseTo( 1 );
  			expect( elm[ 15 ] ).toBeCloseTo( 1 );
  		} );

  		it( 'should include position in matrixWorld', () => {
  			const e = new Entity();
  			e.position.set( 3, 4, 5 );
  			e.updateMatrix();
  			expect( e.matrixWorld.elm[ 12 ] ).toBeCloseTo( 3 );
  			expect( e.matrixWorld.elm[ 13 ] ).toBeCloseTo( 4 );
  			expect( e.matrixWorld.elm[ 14 ] ).toBeCloseTo( 5 );
  		} );

  		it( 'should combine parent and child matrices', () => {
  			const parent = new Entity();
  			const child = new Entity();
  			parent.add( child );
  			parent.position.set( 10, 0, 0 );
  			parent.updateMatrix();
  			child.position.set( 5, 0, 0 );
  			child.updateMatrix();
  			// child world position should be 15
  			expect( child.matrixWorld.elm[ 12 ] ).toBeCloseTo( 15 );
  		} );

  	} );

  } );
  ```
- **テストケース**: 20件程度

### 5. Component テスト

- **対象ファイル**: `packages/maxpower/Component/index.ts`
- **新規ファイル**: `packages/maxpower/tests/Component.test.ts`
- **変更内容**: ライフサイクル（update/dispose）、enabled制御のテスト
- **コードスニペット**:
  ```typescript
  import { Entity, Component } from 'maxpower';

  describe( 'Component', () => {

  	it( 'should not call updateImpl when disabled', () => {
  		const e = new Entity();
  		const c = e.addComponent( Component );
  		c.enabled = false;
  		const spy = vi.spyOn( c as any, 'updateImpl' );
  		c.update( {} as any );
  		expect( spy ).not.toHaveBeenCalled();
  	} );

  	it( 'should call updateImpl when enabled', () => {
  		const e = new Entity();
  		const c = e.addComponent( Component );
  		const spy = vi.spyOn( c as any, 'updateImpl' );
  		c.update( {} as any );
  		expect( spy ).toHaveBeenCalled();
  	} );

  	it( 'should set disposed flag on dispose', () => {
  		const e = new Entity();
  		const c = e.addComponent( Component );
  		c.dispose();
  		expect( ( c as any )._disposed ).toBe( true );
  	} );

  } );
  ```
- **テストケース**: 5件程度

### 6. EntityStore テスト（サーバーサイド）

- **対象ファイル**: `server/Project/EntityStore/index.ts`
- **新規ファイル**: `server/Project/EntityStore/EntityStore.test.ts`
- **変更内容**: ツリー検索、CRUD操作、フィールド設定、_setNestedValue の境界条件テスト
- **コードスニペット**:
  ```typescript
  import { EntityStore } from './index';
  import { describe, it, expect, beforeEach } from 'vitest';

  describe( 'EntityStore', () => {

  	let store: EntityStore;
  	let root: any;

  	beforeEach( () => {
  		store = new EntityStore();
  		root = {
  			uuid: 'root-uuid',
  			name: 'Root',
  			childs: [
  				{
  					uuid: 'child-1',
  					name: 'Child1',
  					components: [
  						{ uuid: 'comp-1', name: 'Mesh', props: {} }
  					]
  				},
  				{
  					uuid: 'child-2',
  					name: 'Child2',
  				}
  			]
  		};
  	} );

  	describe( 'findEntity', () => {

  		it( 'should find root', () => {
  			expect( store.findEntity( root, 'root-uuid' ) ).toBe( root );
  		} );

  		it( 'should find nested child', () => {
  			const found = store.findEntity( root, 'child-1' );
  			expect( found?.name ).toBe( 'Child1' );
  		} );

  		it( 'should return null for unknown uuid', () => {
  			expect( store.findEntity( root, 'unknown' ) ).toBeNull();
  		} );

  	} );

  	describe( 'findParent', () => {

  		it( 'should find parent of child', () => {
  			expect( store.findParent( root, 'child-1' ) ).toBe( root );
  		} );

  		it( 'should return null for root', () => {
  			expect( store.findParent( root, 'root-uuid' ) ).toBeNull();
  		} );

  	} );

  	describe( 'findComponent', () => {

  		it( 'should find component by uuid', () => {
  			const result = store.findComponent( root, 'comp-1' );
  			expect( result?.component.name ).toBe( 'Mesh' );
  			expect( result?.entity.uuid ).toBe( 'child-1' );
  		} );

  		it( 'should return null for unknown component', () => {
  			expect( store.findComponent( root, 'unknown' ) ).toBeNull();
  		} );

  	} );

  	describe( 'createEntity', () => {

  		it( 'should create entity under parent', () => {
  			const created = store.createEntity( root, 'root-uuid', 'New' );
  			expect( created.name ).toBe( 'New' );
  			expect( root.childs ).toContain( created );
  		} );

  		it( 'should throw for unknown parent', () => {
  			expect( () => store.createEntity( root, 'unknown', 'X' ) ).toThrow();
  		} );

  	} );

  	describe( 'deleteEntity', () => {

  		it( 'should remove entity', () => {
  			store.deleteEntity( root, 'child-1' );
  			expect( root.childs.length ).toBe( 1 );
  		} );

  		it( 'should throw when deleting root', () => {
  			expect( () => store.deleteEntity( root, 'root-uuid' ) ).toThrow( 'Cannot delete root' );
  		} );

  	} );

  	describe( 'setField', () => {

  		it( 'should set entity field (name)', () => {
  			store.setField( root, 'child-1', 'name', 'Renamed' );
  			expect( store.findEntity( root, 'child-1' )?.name ).toBe( 'Renamed' );
  		} );

  		it( 'should set entity position', () => {
  			store.setField( root, 'child-1', 'position', [ 1, 2, 3 ] );
  			expect( store.findEntity( root, 'child-1' )?.pos ).toEqual( [ 1, 2, 3 ] );
  		} );

  		it( 'should set component field', () => {
  			store.setField( root, 'comp-1', 'geometry/type', 'Sphere' );
  			const comp = store.findComponent( root, 'comp-1' );
  			expect( ( comp?.component.props as any ).geometry.type ).toBe( 'Sphere' );
  		} );

  		it( 'should throw for unknown target', () => {
  			expect( () => store.setField( root, 'unknown', 'x', 1 ) ).toThrow();
  		} );

  	} );

  	describe( '_setNestedValue (via setField on component)', () => {

  		it( 'should create intermediate objects', () => {
  			store.setField( root, 'comp-1', 'a/b/c', 42 );
  			const props = store.findComponent( root, 'comp-1' )?.component.props as any;
  			expect( props.a.b.c ).toBe( 42 );
  		} );

  		it( 'should handle paths with empty segments', () => {
  			store.setField( root, 'comp-1', 'a//b', 99 );
  			const props = store.findComponent( root, 'comp-1' )?.component.props as any;
  			expect( props.a.b ).toBe( 99 );
  		} );

  	} );

  	describe( 'searchEntities', () => {

  		it( 'should find entities by name (case-insensitive)', () => {
  			const results = store.searchEntities( root, 'child' );
  			expect( results.length ).toBe( 2 );
  		} );

  	} );

  	describe( 'buildSceneTree', () => {

  		it( 'should build tree response with defaults', () => {
  			const tree = store.buildSceneTree( root );
  			expect( tree.uuid ).toBe( 'root-uuid' );
  			expect( tree.position ).toEqual( { x: 0, y: 0, z: 0 } );
  			expect( tree.children.length ).toBe( 2 );
  		} );

  	} );

  } );
  ```
- **テストケース**: 20件程度
- **注意点**: EntityStore は Node.js 環境で動作。`crypto.randomUUID()` を使用しているため、Node 19+ が必要（Volta で node 23.3.0 設定済みなので問題なし）

## 変更対象ファイル一覧

- [x] `package.json` - `vitest` + `@vitest/coverage-v8` devDependency 追加、`test` / `test:watch` / `test:coverage` スクリプト追加
- [x] `vitest.config.ts` - 新規作成（テスト設定、パスエイリアス、カバレッジ設定、GLSLプラグイン）
- [x] `packages/maxpower/tests/EventEmitter.test.ts` - 新規作成
- [x] `packages/maxpower/tests/Serializable.test.ts` - 新規作成
- [x] `packages/maxpower/tests/Entity.test.ts` - 新規作成
- [x] `packages/maxpower/tests/Component.test.ts` - 新規作成
- [x] `server/Project/EntityStore/EntityStore.test.ts` - 新規作成

## カバレッジ目標

### 方針
- **ロジック重視**: 純粋なロジック・データ処理を中心にカバレッジを上げる
- **UI除外**: React コンポーネント（`orengine/tsx/`）、WebGL 依存クラス（Renderer等）はカバレッジ対象外
- **段階的目標**: Phase 1 で基盤を固め、Phase 2 以降で拡大

### Phase 1 目標（今回実装分）

| 対象 | Lines | Functions | Branches | 備考 |
|------|-------|-----------|----------|------|
| `maxpower/Serializable/` | 80% | 80% | 70% | フィールドシステム基盤。serialize/deserialize/serializeToDirectory |
| `maxpower/Entity/` | 70% | 70% | 60% | シーングラフ・コンポーネント管理・行列計算 |
| `maxpower/Component/index.ts` | 80% | 80% | 80% | ライフサイクル（update/dispose/enabled） |
| `server/EntityStore/` | 80% | 80% | 70% | ツリー検索・CRUD・setField |
| EventEmitter (glpower) | 90% | 100% | 80% | 全システムの基盤。小さなクラスなので高カバレッジを目指す |

### Phase 2 目標（将来）

| 対象 | Lines | Functions | Branches | 備考 |
|------|-------|-----------|----------|------|
| `maxpower/Geometry/` | 70% | 70% | 60% | 頂点・インデックス生成ロジック |
| `maxpower/Utils/Ray/` | 80% | 80% | 70% | 交差判定は数学的に検証可能 |
| `server/routes/` バリデーション | 80% | 80% | 80% | validateProjectName, validateName 等 |
| `orengine/CommandManager/` | 70% | 70% | 60% | Undo/Redo ロジック |

### カバレッジ対象外（明示的に除外）

| 除外対象 | 理由 |
|---------|------|
| `maxpower/Component/Renderer/` | WebGL2 コンテキストに強く依存 |
| `maxpower/Component/Mesh/` | Material/Geometry の WebGL 構築に依存 |
| `maxpower/Component/BLidge*/` | WebSocket 通信・Blender 連携 |
| `orengine/tsx/` | React UI コンポーネント |
| `packages/glpower/**/GLPower*.ts` | WebGL API 直接操作 |

### スクリプト一覧

| コマンド | 用途 |
|---------|------|
| `npm run test` | 全テスト実行 |
| `npm run test:watch` | ファイル監視モードで継続実行 |
| `npm run test:coverage` | カバレッジレポート付きテスト実行（`./coverage/` に HTML レポート出力） |

`npm run test:coverage` 実行後、`./coverage/index.html` をブラウザで開くとファイルごとの詳細カバレッジを確認可能。

## 考慮事項・リスク

- **パスエイリアス解決**: `vitest.config.ts` で `glpower` / `maxpower` エイリアスを正しく設定しないとインポートが解決できない。Vite の `resolve.alias` で対応
- **Serializable の import 問題**: `Serializable` が `packages/orengine/tsx/components/Input/InputSelect` をインポートしているため、React/DOM 依存のモジュール解決が必要になる可能性がある。その場合は vitest の `deps.inline` またはモック対応
- **Component のコンストラクタ**: `ComponentParams` に `entity` が必須なため、テスト時は必ず Entity を先に作成する必要がある
- **glpower の既存 Jest テスト**: 変更しない。Vitest は `packages/maxpower` と `server` のみを対象とする
- **CI未設定**: 今回はローカルテスト環境のみ。CI統合は将来課題
- **カバレッジ閾値**: 初回は thresholds を設定するが、テスト追加に伴い徐々に引き上げる運用

## テスト方針

- **ロジック重視**: 純粋なデータ処理・アルゴリズムを中心にテスト。UI・WebGL 描画はスコープ外
- **既存コードスタイル踏襲**: MrDoob Code Style（タブインデント、括弧内スペース、padded-blocks）
- **describe/it パターン**: 機能グループごとに describe でネスト
- **vi.fn() / vi.spyOn()**: コールバック・メソッド呼び出しの検証に使用
- **各テストの独立性**: beforeEach で状態リセット
- **テスト実行**: `npm run test` で全テスト、`npm run test:watch` で開発中の継続実行、`npm run test:coverage` でカバレッジ確認
