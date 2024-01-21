import React, { useCallback } from "react";

import { ArrowIcon } from "../../icon/ArrowIcon";

import style from './index.module.scss';

type BlockProps = {
	head: React.ReactNode;
	children?: React.ReactNode;
	accordion?: {
		open?: boolean
	} | boolean;
	bg?: boolean
};

export const Block = ( props: BlockProps ) => {

	const [ open, setOpen ] = React.useState( ! props.accordion || ( props.accordion && typeof props.accordion !== "boolean" ) );

	const onClick = useCallback( () => {

		if ( props.accordion === undefined ) return;

		setOpen( ! open );

	}, [ open, props.accordion ] );

	return <div className={style.block} data-bg={props.bg}>
		<div className={style.head} onClick={onClick} data-accordion={props.accordion} data-open={open}>
			{props.accordion && <div className={style.head_icon}><ArrowIcon open={open}/></div> }
			{props.head && <span className={style.head_text}>{props.head}</span>}
		</div>
		{ open && <div className={style.content} data-open={open}>
			{props.children}
		</div>}
	</div>;

};
