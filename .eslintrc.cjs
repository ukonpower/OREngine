module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
	"@typescript-eslint/no-unused-vars": "off",
	"indent": ["error", "tab"],
	'@typescript-eslint/no-explicit-any': 'off',
	"no-self-assign": 'off',
  },
  overrides: [
	{
		files: [
			"*.ts"
		],
		extends: [
			"mdcs"
		],
		rules: {
			"no-unused-vars": "off",
			"import/order": [
				2,
				{
					"alphabetize": { "order": "asc" },
					"newlines-between": "always",
				}
			]
		}
	}
]
}
