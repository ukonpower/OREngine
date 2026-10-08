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

	// 見出しのクリックでアコーディオンを開閉する
	const onClick = useCallback( ( e: React.MouseEvent<HTMLDivElement> ) => {

		if ( props.accordion !== true ) return;

		// ラベル内の操作要素のクリックでは開閉しない
		const interactive = ( e.target as HTMLElement ).closest( 'button, input, select, textarea, a, label' );

		if ( interactive && e.currentTarget.contains( interactive ) ) return;

		setOpen( ! open );

	}, [ open, props.accordion ] );

	const bgCol = props.bg && typeof props.bg === 'string' && props.bg || undefined;

	return <div className={style.block} data-bg={props.bg !== undefined} data-nomargin={props.noMargin} data-no_indent={props.noIndent} style={{ backgroundColor: bgCol }}>
		<div className={style.head} data-accordion={props.accordion} data-open={open} onClick={onClick}>
			{props.accordion && <div className={style.head_icon}><ArrowIcon open={open}/></div> }
			{props.label && <span className={style.head_text}>{props.label}</span>}
		</div>
		{ open && <div className={style.content} data-open={open} data-no_indent={props.noIndent}>
			{props.children}
		</div>}
	</div>;

};
