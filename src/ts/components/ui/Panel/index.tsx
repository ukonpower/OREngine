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
		{! props.noHeader && <div className={style.header}>
			<div className={style.header_title}>
				{props.title}
			</div>
		</div>}
		<div className={style.content} style={{ padding: props.noPadding ? "0 0" : undefined }}>
			{props.children}
		</div>
	</div>;

};
