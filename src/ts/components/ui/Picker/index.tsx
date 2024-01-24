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
		{
			props.list.map( ( item, index ) => {

				return <div className={style.item} key={index} onClick={item.onClick}>{item.label}</div>;

			} )
		}
	</div>;

};
