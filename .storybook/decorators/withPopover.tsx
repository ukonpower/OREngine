import { Popover, PopoverProvider } from 'uipower';

import type { Decorator } from '@storybook/react-vite';

// usePopover を通るストーリー用。開閉状態しか要らないため、エンジンを立てずにこの階層だけを与える
export const withPopover: Decorator = ( Story ) => (
	<PopoverProvider>
		<Story />
		<Popover />
	</PopoverProvider>
);
