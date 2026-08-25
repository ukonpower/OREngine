import { PanelContainer } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/PanelContainer',
	component: PanelContainer,
	// タブ下のコンテンツ領域が潰れないよう枠を与える
	decorators: [ ( Story ) => <div style={{ width: '320px', height: '180px' }}><Story /></div> ],
} satisfies Meta<typeof PanelContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

const body = ( label: string ) => <div style={{ padding: '10px', color: '#777' }}>{label} の中身</div>;

// 選択タブは storageKey があると localStorage から復元されるため、story では指定しない
export const TwoTabs: Story = {
	render: () => (
		<PanelContainer>
			<PanelContainer.Tab title="Property">{body( 'Property' )}</PanelContainer.Tab>
			<PanelContainer.Tab title="Hierarchy">{body( 'Hierarchy' )}</PanelContainer.Tab>
		</PanelContainer>
	),
};

export const DefaultTabSelected: Story = {
	render: () => (
		<PanelContainer defaultTabTitle="Hierarchy">
			<PanelContainer.Tab title="Property">{body( 'Property' )}</PanelContainer.Tab>
			<PanelContainer.Tab title="Hierarchy">{body( 'Hierarchy' )}</PanelContainer.Tab>
		</PanelContainer>
	),
};

export const ManyTabs: Story = {
	render: () => (
		<PanelContainer>
			{[ 'Property', 'Hierarchy', 'Textures', 'Renderer', 'Settings', 'GPUTimer' ].map( ( title ) => (
				<PanelContainer.Tab key={title} title={title}>{body( title )}</PanelContainer.Tab>
			) )}
		</PanelContainer>
	),
};

// データ駆動モード（タブ状態の持ち主がレイアウトツリー）。ヘッダー右端にタブ追加の「+」が出る
export const DataDriven: Story = {
	render: () => (
		<PanelContainer
			tabs={[
				{ id: 'property', title: 'Property', content: body( 'Property' ) },
				{ id: 'hierarchy', title: 'Hierarchy', content: body( 'Hierarchy' ) },
			]}
			active="hierarchy"
			onSelect={() => {}}
			onAddClick={() => {}}
		/>
	),
};
