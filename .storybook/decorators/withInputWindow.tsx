import { InputWindowProvider } from 'orengine/react';

import type { Decorator } from '@storybook/react-vite';

// InputNumber / InputText は useInputWindow を通るので Provider 無しでは例外になる。
// 入力ウィンドウの開閉状態しか要らないため、エンジンを立てずにこの階層だけを与える
export const withInputWindow: Decorator = ( Story ) => (
	<InputWindowProvider>
		<Story />
	</InputWindowProvider>
);
