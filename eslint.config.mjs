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
		// tsconfig paths（orengine/... 等のエイリアス import）を boundaries に解決させるために必須
		"import/resolver": {
			typescript: {
				project: "./tsconfig.json",
			},
			node: {
				extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
			},
		},

		"boundaries/elements": [
			{ type: "base-util", pattern: [ "packages/basepower/**" ] },
			{ type: "base-math", pattern: [ "packages/mathpower/**" ] },
			{ type: "base-webgl", pattern: [ "packages/glpower/**" ] },
			{ type: "base-webgpu", pattern: [ "packages/gpupower/**" ] },
			{ type: "runtime", pattern: [
				"packages/maxpower/**",
				"packages/orengine/core/**",
				"packages/orengine/builtin/**",
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
				"packages/orengine/player.ts",
				"packages/orengine/index.ts",
				"host/app/src/player.ts",
				"host/app/Resources/**",
			] },
			{ category: "editor", pattern: [
				"packages/orengine/editor.ts",
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
						{ element: { types: "runtime" } },
						{ file: { categories: "runtime" } },
					],
					disallow: [
						{ element: { types: "editor" } },
						{ file: { categories: "editor" } },
					],
					message: "ランタイム領域からエディタ領域への import は禁止です",
				},
				{
					from: { element: { types: [ "base-util", "base-math", "base-webgl", "base-webgpu" ] } },
					disallow: { element: { types: [ "runtime", "editor" ] } },
					message: "第1層パッケージ（basepower/mathpower/glpower/gpupower）から上位層への import は禁止です",
				},
				{
					from: { element: { types: "base-util" } },
					disallow: { element: { types: [ "base-math", "base-webgl", "base-webgpu" ] } },
					message: "basepower は他パッケージに依存できません",
				},
				{
					from: { element: { types: "base-math" } },
					disallow: { element: { types: [ "base-webgl", "base-webgpu" ] } },
					message: "mathpower は basepower 以外のパッケージに依存できません",
				},
				{
					from: { element: { types: "base-webgl" } },
					disallow: { element: { types: "base-webgpu" } },
					message: "glpower と gpupower は互いに依存できません",
				},
				{
					from: { element: { types: "base-webgpu" } },
					disallow: { element: { types: "base-webgl" } },
					message: "glpower と gpupower は互いに依存できません",
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
