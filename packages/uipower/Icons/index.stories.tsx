import { ArrowIcon, CameraIcon, CheckIcon, ComponentIcon, CrossIcon, CursorIcon, EyeIcon, FolderIcon, LightIcon, MaterialIcon, MeshIcon, ShaderIcon, TextureIcon } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Icons',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// CrossIcon / CheckIcon は親の大きさいっぱいに描かれるので、一覧では枠側で寸法を決める
const ICON_BOX = 24;

const icons: { label: string, node: React.ReactNode }[] = [
	{ label: 'ArrowIcon', node: <ArrowIcon /> },
	{ label: 'ArrowIcon（open）', node: <ArrowIcon open={true} /> },
	{ label: 'CameraIcon', node: <CameraIcon /> },
	{ label: 'CheckIcon', node: <CheckIcon /> },
	{ label: 'ComponentIcon', node: <ComponentIcon /> },
	{ label: 'CrossIcon', node: <CrossIcon /> },
	{ label: 'CursorIcon', node: <CursorIcon /> },
	{ label: 'CursorIcon（selectable false）', node: <CursorIcon selectable={false} /> },
	{ label: 'EyeIcon', node: <EyeIcon /> },
	{ label: 'EyeIcon（visible false）', node: <EyeIcon visible={false} /> },
	{ label: 'FolderIcon', node: <FolderIcon /> },
	{ label: 'FolderIcon（component）', node: <FolderIcon assetType="component" /> },
	{ label: 'FolderIcon（material）', node: <FolderIcon assetType="material" /> },
	{ label: 'FolderIcon（shader）', node: <FolderIcon assetType="shader" /> },
	{ label: 'FolderIcon（texture）', node: <FolderIcon assetType="texture" /> },
	{ label: 'LightIcon', node: <LightIcon /> },
	{ label: 'MaterialIcon', node: <MaterialIcon /> },
	{ label: 'MeshIcon', node: <MeshIcon /> },
	{ label: 'ShaderIcon', node: <ShaderIcon /> },
	{ label: 'TextureIcon', node: <TextureIcon /> },
];

export const AllIcons: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px', padding: '16px', color: '#ccc' }}>
			{icons.map( ( { label, node } ) => (
				<div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					<div style={{ width: `${ ICON_BOX }px`, height: `${ ICON_BOX }px`, flexShrink: 0 }}>{node}</div>
					<div style={{ fontSize: '11px', color: '#777' }}>{label}</div>
				</div>
			) )}
		</div>
	),
};
