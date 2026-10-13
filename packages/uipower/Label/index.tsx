import style from './index.module.scss';

export const Label: React.FC<{
	title?: React.ReactNode,
	vertical?: boolean,
	children?: React.ReactNode,
	labelAlign?: "left" | "right"
}> = ( props ) => {

	return (
		<div className={style.container} data-vertical={props.vertical}>
			<div className={style.label} style={{ textAlign: props.labelAlign || "left" }}>{props.title}</div>
			<div className={style.item}>
				{props.children}
			</div>
		</div>
	);

};
