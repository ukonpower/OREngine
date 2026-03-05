
import style from './index.module.scss';

type LayoutSplitItemProps = {
	flex?: number;
	size?: string;
	overflow?: boolean;
	padding?: boolean;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

const Item = ( props: LayoutSplitItemProps ) => {

	const itemStyle: React.CSSProperties = { ...props.style };

	if ( props.size ) {

		itemStyle.flexShrink = 0;
		itemStyle.flexGrow = 0;
		itemStyle.flexBasis = props.size;

	} else {

		itemStyle.flex = props.flex ?? 1;

	}

	if ( props.overflow ) {

		itemStyle.overflow = 'auto';

	}

	const content = props.padding
		? <div className={style.item_inner}>{props.children}</div>
		: props.children;

	return <div className={style.item} style={itemStyle}>
		{content}
	</div>;

};

type LayoutSplitProps = {
	direction?: "horizontal" | "vertical";
	children?: React.ReactNode;
};

export const LayoutSplit = ( props: LayoutSplitProps ) => {

	return <div
		className={style.layout}
		data-direction={props.direction || "horizontal"}
	>
		{props.children}
	</div>;

};

LayoutSplit.Item = Item;
