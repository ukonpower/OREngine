import '../packages/orengine/editor/styles/style.scss';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
	parameters: {
		// エディタのパネルは親いっぱいに広がる前提なので余白を挟まない
		layout: 'fullscreen',
	},
};

export default preview;
