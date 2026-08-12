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
						{ element: { types: [ "runtime", "backend-webgl", "backend-webgpu" ] } },
						{ file: { categories: "runtime" } },
					],
					disallow: [
						{ element: { types: "editor" } },
						{ file: { categories: "editor" } },
					],
					message: "ランタイム領域からエディタ領域への import は禁止です",
				},
				{
					from: { element: { types: [ "base-util", "base-math", "base-webgl" ] } },
					disallow: { element: { types: [ "runtime", "backend-webgl", "backend-webgpu", "editor" ] } },
					message: "第1層パッケージ（basepower/mathpower/glpower）から上位層への import は禁止です",
				},
				{
					from: { element: { types: "base-util" } },
					disallow: { element: { types: [ "base-math", "base-webgl" ] } },
					message: "basepower は他パッケージに依存できません",
				},
				{
					from: { element: { types: "base-math" } },
					disallow: { element: { types: "base-webgl" } },
					message: "mathpower は basepower 以外のパッケージに依存できません",
				},
				{
					from: { element: { types: "backend-webgl" } },
					disallow: { element: { types: "backend-webgpu" } },
					message: "webgl / webgpu バックエンドは互いに依存できません",
				},
				{
					from: { element: { types: "backend-webgpu" } },
					disallow: { element: { types: [ "backend-webgl", "base-webgl" ] } },
					message: "webgpu バックエンドは webgl バックエンド・glpower に依存できません",
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
	},

	rules: {
		"boundaries/dependencies": [ "error", {
			default: "disallow",
			message: "editor React 層のレイヤー依存ルール違反です（{{from.type}} から {{to.type}} は import できません）。CLAUDE.md の「editor の React 層構造」を参照してください。",
			policies: [
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
