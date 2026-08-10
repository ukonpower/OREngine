// Node環境にはWebGLが無く、maxpowerのGLBackendがモジュールロード時に
// WebGL2RenderingContextを参照するため、最小のスタブをグローバルへ置く
globalThis.WebGL2RenderingContext ??= class WebGL2RenderingContext {};
