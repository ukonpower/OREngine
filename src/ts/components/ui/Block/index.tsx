import React, { useCallback } from "react";

import { ArrowIcon } from "../icon/ArrowIcon";

import style from './index.module.scss';

type BlockProps = {
	head: React.ReactNode;
	children?: React.ReactNode;
	accordion?: boolean;
};

export const Block = ( props: BlockProps ) => {

	const [ open, setOpen ] = React.useState( ! props.accordion );

	const onClick = useCallback( () => {

		if ( ! props.accordion ) return;

		setOpen( ! open );

	}, [ open, props.accordion ] );

	return <div className={style.block} >
		<div className={style.head} onClick={onClick} data-open={open}>
			{props.accordion && <ArrowIcon open={open}/> }
			{props.head && <span className={style.head_text}>{props.head}</span>}
		</div>
		{ open && <div className={style.content} data-open={open}>
			{props.children}
		</div>}
	</div>;

};
