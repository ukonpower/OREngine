import React, { useCallback } from "react";

import { ArrowIcon } from "../../icon/ArrowIcon";

import style from './index.module.scss';

type BlockProps = {
	label: React.ReactNode;
	children?: React.ReactNode;
	accordion?: boolean;
	noMargin?: boolean
	defaultClose?: boolean
	bg?: boolean
};

export const PropertyBlock = ( props: BlockProps ) => {

	const [ open, setOpen ] = React.useState( ! props.defaultClose );

	const onClick = useCallback( () => {

		if ( props.accordion !== true ) return;

		setOpen( ! open );

	}, [ open, props.accordion ] );

	return <div className={style.block} data-bg={props.bg} style={{ margin: props.noMargin ? '0 0' : undefined }}>
		<div className={style.head} onClick={onClick} data-accordion={props.accordion} data-open={open}>
			{props.accordion && <div className={style.head_icon}><ArrowIcon open={open}/></div> }
			{props.label && <span className={style.head_text}>{props.label}</span>}
		</div>
		{ open && <div className={style.content} data-open={open}>
			{props.children}
		</div>}
	</div>;

};
