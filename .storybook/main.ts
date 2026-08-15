import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: [ '../packages/orengine/editor/**/*.stories.@(ts|tsx)' ],
	addons: [],

	framework: {
		name: '@storybook/react-vite',
		// main.ts は Node の ESM としてそのまま読まれ、ディレクトリ import（dir + index.ts）を
		// 解決できない。vite設定を別ファイルへ出すと Vite 自身のローダーが読むので、
		// エンジン側の import 規約のまま host/vite の部品を再利用できる
		options: { builder: { viteConfigPath: '.storybook/vite.config.ts' } },
	},
};

export default config;
