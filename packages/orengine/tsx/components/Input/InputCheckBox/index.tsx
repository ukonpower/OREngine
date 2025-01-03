

import { CheckIcon } from '../../Icons/Check';

import style from './index.module.scss';

type InputBooleanProps = {
	checked?: boolean
	onChange?: ( checked: boolean ) => void
	disabled?: boolean
	readOnly?: boolean
};

export const InputBoolean = ( { onChange, ...props }: InputBooleanProps ) => {

	return <div className={style.inputBoolean} onClick={( e ) => {

		e.stopPropagation();

	}}>
		<label>
			<input className={style.input} type="checkbox" checked={props.checked} disabled={props.disabled} readOnly={props.readOnly}
				onChange={( e ) => {

					if ( props.readOnly ) return;

					if ( onChange ) {

						onChange( e.target.checked );

					}

				}}
			/>
			<div className={style.check} data-read_only={props.readOnly}>
				{props.checked && <CheckIcon />}
			</div>
		</label>
	</div>;

};
