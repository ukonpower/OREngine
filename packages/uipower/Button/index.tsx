import style from './index.module.scss';

export type ButtonProps = {
	onClick?: ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
	children?: React.ReactNode;
	type?: "button" | "submit";
	disabled?: boolean;
	// トグル・選択肢の中で選ばれている見た目にする
	active?: boolean;
	// アイコンだけを入れる正方形のボタンにする
	square?: boolean;
	title?: string;
}

export const Button = ( props: ButtonProps ) => {

	return <button className={style.button} data-active={props.active} data-square={props.square} title={props.title} onClick={( event ) => {

		if ( props.onClick ) {

			props.onClick( event );

		}

		event.preventDefault();

	}} type={props.type || "button"} disabled={props.disabled} >{
			props.children
		}</button>;

};
