import React, { useCallback } from "react";

import { ArrowIcon } from "../Icons/ArrowIcon";

import style from './index.module.scss';


type BlockProps = {
	label: React.ReactNode;
	children?: React.ReactNode;
	accordion?: boolean;
	noMargin?: boolean
	defaultClose?: boolean
	bg?: boolean | string
	noIndent?: boolean
};

export const Block = ( props: BlockProps ) => {

	const [ open, setOpen ] = React.useState( ! props.defaultClose );

	const onClick = useCallback( () => {

		if ( props.accordion !== true ) return;

		setOpen( ! open );

	}, [ open, props.accordion ] );

	const bgCol = props.bg && typeof props.bg === 'string' && props.bg || undefined;

	return <div className={style.block} data-bg={props.bg !== undefined} data-nomargin={props.noMargin} data-no_indent={props.noIndent} style={{ backgroundColor: bgCol }}>
		<div className={style.head} data-accordion={props.accordion} data-open={open}>
			{props.accordion && <div className={style.head_icon} onClick={onClick}><ArrowIcon open={open}/></div> }
			{props.label && <span className={style.head_text}>{props.label}</span>}
		</div>
		{ open && <div className={style.content} data-open={open} data-no_indent={props.noIndent}>
			{props.children}
		</div>}
	</div>;

};
