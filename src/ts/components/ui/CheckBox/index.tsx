import { CheckIcon } from '../icon/Check';

import style from './index.module.scss';

type CheckBoxProps = {
	checked?: boolean
	onClick?: () => void
};

export const CheckBox = ( props: CheckBoxProps ) => {

	return <div className={style.checkBox} onClick={( e => {

		e.stopPropagation();
		props.onClick && props.onClick();

	} )}>
		{ props.checked && <CheckIcon />}
	</div>;

};
