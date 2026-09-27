import style from './index.module.scss';

export type ListItemProps = {
	selected?: boolean;
	// 選んだものの中の、操作の主対象（Blender のアクティブ）。selected と一緒に使い、背景を一段明るくする
	active?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	onClick?: ( event: React.MouseEvent<HTMLDivElement> ) => void;
	onDoubleClick?: ( event: React.MouseEvent<HTMLDivElement> ) => void;
	onContextMenu?: ( event: React.MouseEvent<HTMLDivElement> ) => void;
}

// 一覧の1行。行の高さと hover / 選択中・アクティブの背景だけを持ち、中身の並べ方は利用側が決める
export const ListItem = ( props: ListItemProps ) => {

	return <div
		className={props.className ? `${style.listItem} ${props.className}` : style.listItem}
		style={props.style}
		data-selected={props.selected}
		data-active={props.active}
		onClick={props.onClick}
		onDoubleClick={props.onDoubleClick}
		onContextMenu={props.onContextMenu}
	>{props.children}</div>;

};
