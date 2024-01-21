import { CheckIcon } from '../icon/Check';

import style from './index.module.scss';

type CheckBoxProps = {
	checked?: boolean
	onChange?: ( checked: boolean ) => void
};

export const CheckBox = ( props: CheckBoxProps ) => {

	return <div className={style.checkBox} onClick={( e => {

		props.onChange && props.onChange( ! props.checked );
		e.stopPropagation();

	} )}>
		{ props.checked && <CheckIcon />}
	</div>;

};
