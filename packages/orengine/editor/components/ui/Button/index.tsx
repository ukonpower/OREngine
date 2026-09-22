import style from './index.module.scss';

export type ButtonProps = {
	onClick?: ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
	children?: React.ReactNode;
	type?: "button" | "submit";
	disabled?: boolean;
}

export const Button = ( props: ButtonProps ) => {

	return <button className={style.button} onClick={( event ) => {

		if ( props.onClick ) {

			props.onClick( event );

		}

		event.preventDefault();

	}} type={props.type || "button"} disabled={props.disabled} >{
			props.children
		}</button>;

};
