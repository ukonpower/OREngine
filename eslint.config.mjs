import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import boundaries from "eslint-plugin-boundaries";
import _import from "eslint-plugin-import";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const compat = new FlatCompat( {
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
} );

// editor feature の公開 API（feature 外から import してよいファイル）。
// contexts/・lib/・features/（子feature）は内部実装
const EDITOR_FEATURE_PUBLIC_API = {
	type: "editor-feature",
	fileInternalPath: [ "index.tsx", "components/**", "hooks/**", "providers/**" ],
};

export default [ {
	ignores: [ "**/dist", "scripts/" ],
}, ...fixupConfigRules( compat.extends(
	"mdcs",
	"eslint:recommended",
	"plugin:@typescript-eslint/recommended",
	"plugin:react-hooks/recommended",
) ), {
	plugins: {
		"react-refresh": reactRefresh,
		import: fixupPluginRules( _import ),
	},

	languageOptions: {
		globals: {
			...globals.browser,
		},

		parser: tsParser,
	},

}, {
	files: [
		"packages/orengine/core/**/*.{ts,tsx}",
		"packages/orengine/editor/lib/**/*.{ts,tsx}",
		"packages/orengine/builtin/**/*.{ts,tsx}",
	],

	rules: {
		"no-restricted-imports": [ "error", {
			paths: [
				{ name: "react", message: "React import禁止: このディレクトリは非Reactコア専用です" },
				{ name: "react-dom", message: "React import禁止: このディレクトリは非Reactコア専用です" },
			],
			patterns: [
				{ group: [ "react/*", "react-dom/*" ], message: "React import禁止" },
			],
		} ],
	},
}, {
	plugins: {
		boundaries,
	},

	settings: {
		// tsconfig paths（orengine/... 等のエイリアス import）を boundaries に解決させるために必須。
		// tsconfig.json を直接渡すと references の影響で paths が効かないため専用ファイルを使う
		"import/resolver": {
			typescript: {
				project: "./tsconfig.eslint.json",
			},
			node: {
				extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
			},
		},

		"boundaries/elements": [
			{ type: "base-util", pattern: [ "packages/basepower/**" ] },
			{ type: "base-math", pattern: [ "packages/mathpower/**" ] },
			{ type: "base-webgl", pattern: [ "packages/glpower/**" ] },
			// runtime より先に定義する（分類は先勝ちのため、packages/maxpower/** に飲まれないように）
			{ type: "backend-webgl", pattern: [ "packages/maxpower/webgl/**" ] },
			{ type: "backend-webgpu", pattern: [ "packages/maxpower/webgpu/**" ] },
			{ type: "backend-headless", pattern: [ "packages/maxpower/headless/**" ] },
			{ type: "runtime", pattern: [
				"packages/maxpower/**",
				"packages/orengine/core/**",
				"packages/orengine/builtin/**",
				"packages/orengine/player/**",
			] },
			{ type: "editor", pattern: [
				"packages/orengine/editor/**",
				"host/server/**",
				"host/vite/**",
			] },
		],

		// 単一ファイルは element でなく file category で分類する（v7 の boundaries/files 形式）
		"boundaries/files": [
			{ category: "runtime", pattern: [
				"packages/orengine/index.ts",
				"host/app/src/player.ts",
				"host/app/Resources/**",
			] },
			{ category: "editor", pattern: [
				"packages/orengine/react.tsx",
				"host/app/src/main.tsx",
				"host/app/src/static.tsx",
			] },
		],
	},

	rules: {
		"boundaries/dependencies": [ "error", {
			default: "allow",
			policies: [
				{
					from: [
						{ element: { types: [ "runtime", "backend-webgl", "backend-webgpu", "backend-headless" ] } },
						{ file: { categories: "runtime" } },
					],
					disallow: [
						{ to: { element: { types: "editor" } } },
						{ to: { file: { categories: "editor" } } },
					],
					message: "ランタイム領域からエディタ領域への import は禁止です",
				},
				{
					from: { element: { types: [ "base-util", "base-math", "base-webgl" ] } },
					disallow: { to: { element: { types: [ "runtime", "backend-webgl", "backend-webgpu", "backend-headless", "editor" ] } } },
					message: "第1層パッケージ（basepower/mathpower/glpower）から上位層への import は禁止です",
				},
				{
					from: { element: { types: "base-util" } },
					disallow: { to: { element: { types: [ "base-math", "base-webgl" ] } } },
					message: "basepower は他パッケージに依存できません",
				},
				{
					from: { element: { types: "base-math" } },
					disallow: { to: { element: { types: "base-webgl" } } },
					message: "mathpower は basepower 以外のパッケージに依存できません",
				},
				{
					from: { element: { types: "backend-webgl" } },
					disallow: { to: { element: { types: "backend-webgpu" } } },
					message: "webgl / webgpu バックエンドは互いに依存できません",
				},
				{
					from: { element: { types: "backend-webgpu" } },
					disallow: { to: { element: { types: [ "backend-webgl", "base-webgl" ] } } },
					message: "webgpu バックエンドは webgl バックエンド・glpower に依存できません",
				},
				{
					from: { element: { types: "backend-headless" } },
					disallow: { to: { element: { types: [ "backend-webgl", "backend-webgpu", "base-webgl" ] } } },
					message: "headless バックエンドは他バックエンド・glpower に依存できません",
				},
			],
		} ],
	},
}, {

	// editor React 層のレイヤー依存ルール（pages → features → components/ui の一方向）。
	// flat config の settings マージにより、editor 配下のファイルだけ elements 定義を差し替える
	files: [ "packages/orengine/editor/**/*.{ts,tsx}" ],

	settings: {
		"boundaries/elements": [
			{ type: "storybook-support", pattern: ".storybook/**" },
			{ type: "editor-page", pattern: "packages/orengine/editor/components/pages/*", capture: [ "pageName" ] },
			{ type: "editor-ui", pattern: "packages/orengine/editor/components/ui/*", capture: [ "componentName" ] },
			{ type: "editor-feature", pattern: "packages/orengine/editor/features/*", capture: [ "featureName" ] },
			{ type: "editor-shared-hooks", pattern: "packages/orengine/editor/hooks" },
			{ type: "editor-shared-contexts", pattern: "packages/orengine/editor/contexts" },
			{ type: "editor-core", pattern: "packages/orengine/editor/lib" },
			{ type: "editor-styles", pattern: "packages/orengine/editor/styles" },
			// editor 外のローカルファイル（ランタイムパッケージ等）は一括で分類し、依存可否は既存のパッケージ間ルールに委ねる
			{ type: "outside-editor", pattern: [ "packages/**", "host/**" ] },
		],

		// ストーリーは単一ファイルなので element ではなく file category で分類する。
		// feature の中に同居するが、レイヤー規則は別扱いにして .storybook の足場だけ余分に許す
		"boundaries/files": [
			{ category: "editor-story", pattern: [ "packages/orengine/editor/**/*.stories.tsx" ] },
		],
	},

	rules: {
		"boundaries/dependencies": [ "error", {
			default: "disallow",
			message: "editor React 層のレイヤー依存ルール違反です（{{from.type}} から {{to.type}} は import できません）。CLAUDE.md の「editor の React 層構造」を参照してください。",
			policies: [
				{
					// ストーリーは feature を単体で立てるためのもので、対象は自分が同居する
					// 子feature自身になる。公開APIの制限をかけると成立しないため feature 全体を許す
					from: { file: { categories: "editor-story" } },
					allow: { to: { element: { type: [ "editor-feature", "storybook-support", "editor-ui", "editor-shared-hooks", "editor-shared-contexts", "editor-core", "editor-styles", "outside-editor" ] } } },
				},
				{
					from: { element: { type: "editor-page" } },
					allow: { to: { element: [
						EDITOR_FEATURE_PUBLIC_API,
						{ type: [ "editor-ui", "editor-shared-hooks", "editor-shared-contexts", "editor-core", "editor-styles", "outside-editor" ] },
					] } },
				},
				{
					// feature が参照できる feature は自分自身（子feature含む）と、
					// エンジン供給 feature（OREngine）の公開 API のみ
					from: { element: { type: "editor-feature" } },
					allow: { to: { element: [
						{ type: "editor-feature", captured: { featureName: "{{from.featureName}}" } },
						{ ...EDITOR_FEATURE_PUBLIC_API, captured: { featureName: "OREngine" } },
						{ type: [ "editor-ui", "editor-shared-hooks", "editor-shared-contexts", "editor-core", "editor-styles", "outside-editor" ] },
					] } },
				},
				{
					from: { element: { type: "editor-ui" } },
					allow: { to: { element: { type: [ "editor-ui", "editor-shared-hooks", "editor-shared-contexts", "editor-styles", "outside-editor" ] } } },
				},
				{
					from: { element: { type: "editor-shared-hooks" } },
					allow: { to: { element: { type: [ "editor-shared-hooks", "editor-shared-contexts", "outside-editor" ] } } },
				},
				{
					from: { element: { type: "editor-shared-contexts" } },
					allow: { to: { element: { type: "outside-editor" } } },
				},
				{
					from: { element: { type: "editor-core" } },
					allow: { to: { element: { type: [ "editor-core", "outside-editor" ] } } },
				},
			],
		} ],
	},
}, {
	rules: {
		indent: [ "error", "tab" ],
		"no-self-assign": "off",
		"no-multiple-empty-lines": "error",
		"no-constant-condition": "off",
		"no-unreachable": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-empty-object-type": "off",

		// React Compiler 由来の新ルール（react-hooks v7）。既存の latest-ref パターンと
		// effect 内 setState の書き換えは別途リファクタリングで対応するまで無効化する
		"react-hooks/refs": "off",
		"react-hooks/set-state-in-effect": "off",

		"import/order": [ "error", {
			groups: [
				"builtin",
				"external",
				"internal",
				"parent",
				"sibling",
				"index",
				"object",
				"type",
			],

			"newlines-between": "always",
			pathGroupsExcludedImportTypes: [ "builtin" ],

			alphabetize: {
				order: "asc",
				caseInsensitive: true,
			},
		} ],
	},
} ];
