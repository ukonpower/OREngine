import style from './index.module.scss';

export type ButtonProps = {
	onClick?: ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
	children?: React.ReactNode;
	type?: "button" | "submit";
}

export const Button = ( props: ButtonProps ) => {

	return <button className={style.button} onClick={( event ) => {

		props.onClick && props.onClick( event );

		event.preventDefault();

	}} type={props.type || "button"} >{
			props.children
		}</button>;

};
