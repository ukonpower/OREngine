#!/usr/bin/env node
// orengine-cli の入口（package.json の bin）。本体は TypeScript なので tsx を読み込んでから実行する。
// tsx は OREngine の devDependencies にあり、submodule で取り込んだ外部プロジェクト（package.json の bin でこのファイルを指す）からも orengine/node_modules から解決される
import { register } from 'tsx/esm/api';

register();

await import( './index.ts' );
