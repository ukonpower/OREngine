import style from './index.module.scss';

export const Label: React.FC<{
	title?: string,
	children?: React.ReactNode,
}> = ( props ) => {

	return (
		<div className={style.container}>
			<div className={style.label}>{props.title}</div>
			<div className={style.item}>
				{props.children}
			</div>
		</div>
	);

};
