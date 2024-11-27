import style from './index.module.scss';

export const Label: React.FC<{
	title?: string,
	vertical?: boolean,
	children?: React.ReactNode,
	labelAlign?: "left" | "right"
}> = ( props ) => {

	return (
		<div className={style.container} data-vertical={props.vertical}>
			<div className={style.label} style={{ textAlign: props.labelAlign || "left" }} data-vertical={props.vertical}>{props.title}</div>
			<div className={style.item} data-vertical={props.vertical}>
				{props.children}
			</div>
		</div>
	);

};
