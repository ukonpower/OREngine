import style from './index.module.scss';

type SelectListItem = {
	label: string,
	onClick?: () => void
}

type SelectListProps = {
	list: SelectListItem[]
}

export const Picker = ( props: SelectListProps ) => {

	return <div className={style.picker}>
		<div className={style.picker_inner}>
			{
				props.list.map( ( item, index ) => {

					return <div className={style.item} key={index} onClick={item.onClick}>{item.label}</div>;

				} )
			}
		</div>
	</div>;

};
