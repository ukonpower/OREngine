import style from './index.module.scss';

export type ButtonProps = {
	onClick?: ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
	children?: React.ReactNode;
}

export const Button = ( props: ButtonProps ) => {

	return <button className={style.button} onClick={props.onClick} >{
		props.children
	}</button>;

};
