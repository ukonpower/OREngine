import style from './index.module.scss';

export type PanelProps = {
	title?: string;
	children?: React.ReactNode;
	bgColor?: string;
	noHeader?: boolean;
	noPadding?: boolean;
}

export const Panel = ( props: PanelProps ) => {

	return <div className={style.panel} style={{ backgroundColor: props.bgColor }}>
		<div className={style.panel_inner}>
			<div className={style.content} style={{ padding: props.noPadding ? "0 0" : undefined }}>
				{props.children}
			</div>
		</div>
	</div>;

};
