import style from './index.module.scss';

type SelectListItem = {
	label: string,
	onClick?: () => void
}

type SelectListProps = {
	label?: string
	list: SelectListItem[]
	noBg?: boolean
}

export const Picker = ( props: SelectListProps ) => {

	return <div className={style.picker} data-no_bg={props.noBg}>
		{
			props.label && <div className={style.picker_label}>{props.label}</div>
		}
		<div className={style.picker_list}>
			<div className={style.picker_list_inner}>
				{
					props.list.map( ( item, index ) => {

						return <div className={style.item} key={index} onClick={item.onClick}>{item.label}</div>;

					} )
				}
			</div>
		</div>
	</div>;

};
