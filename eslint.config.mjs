import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
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
	ignores: [ "**/dist", "packages/glpower/" ],
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
