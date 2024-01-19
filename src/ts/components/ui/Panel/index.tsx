import style from './index.module.scss';

export type PanelProps = {
	title?: string;
	children?: React.ReactNode;
}

export const Panel = ( props: PanelProps ) => {

	return <div className={style.panel}>
		<div className={style.header}>
			<div className={style.header_title}>
				{props.title || 'Panel'}
			</div>
		</div>
		<div className={style.content}>
			{props.children}
		</div>
	</div>;

};
