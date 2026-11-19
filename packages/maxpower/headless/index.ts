
// 描画しないプロジェクトのエントリ（core + headless）。`@or-renderer` の解決先
export * from '../core';
export * from './EditorDraw';
export * from './GLTFLoader';
export * from './Renderer';
export * from './TexProcedural';

// 軽量レンダラーは webgl にしか無い。rendererType が lite のシーンも、headless ではふつうのレンダラーで描く
export { createRenderer as createLiteRenderer } from './Renderer';
