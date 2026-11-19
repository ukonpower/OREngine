// 軽量レンダラーだけを使うプロジェクトのエントリ（core + webgl の描画の土台 + LiteRenderer）。`maxpower` の解決先をここへ向けて使う。
// deferred・後処理・環境マップのコードとシェーダーをバンドルに入れないため、それらに繋がるモジュールはここから export しない
export * from '../backend/GLBackend';
export * from '../backend/ShaderParser';
export * from '../../core';
export * from '../Material';
export * from '../LiteRenderer';

// orengine の Engine は `maxpower` の Renderer / createRenderer を使うので、他のバックエンドのエントリと同じ名前でも出す
export { LiteRenderer as Renderer, createLiteRenderer as createRenderer } from '../LiteRenderer';
