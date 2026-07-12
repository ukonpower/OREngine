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
	ignores: [ "**/dist", "packages/glpower/", "scripts/", "**/_data/" ],
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
		"packages/orengine/core/**/*.ts",
		"packages/orengine/editor/lib/**/*.ts",
		"packages/orengine/builtin/**/*.ts",
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
		"import/resolver": {
			node: {
				extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
			},
		},

		"boundaries/elements": [
			{ type: "runtime", pattern: [
				"packages/glpower/**",
				"packages/maxpower/**",
				"packages/orengine/core/**",
				"packages/orengine/builtin/**",
			] },
			{ type: "runtime", partialMatch: false, pattern: [
				"packages/orengine/player.ts",
				"packages/orengine/index.ts",
			] },
			{ type: "editor", pattern: [
				"packages/orengine/editor/**",
				"server/**",
			] },
			{ type: "editor", partialMatch: false, pattern: [
				"packages/orengine/editor.ts",
				"packages/orengine/react.tsx",
			] },
		],
	},

	rules: {
		"boundaries/dependencies": [ "error", {
			default: "allow",
			policies: [
				{
					from: { element: { types: "runtime" } },
					disallow: { element: { types: "editor" } },
					message: "ランタイム領域からエディタ領域への import は禁止です",
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
