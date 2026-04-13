import React, { useState } from 'react';

import style from './index.module.scss';

type TabProps = {
	title: string;
	children?: React.ReactNode;
};

const Tab = ( props: TabProps ) => {

	return <>
		{props.children}
	</>;

};

type PanelContainerProps = {
	storageKey?: string;
	children?: React.ReactNode;
};

export const PanelContainer = ( props: PanelContainerProps ) => {

	const rawChilds = props.children || [];
	const childs = ( Array.isArray( rawChilds ) ? rawChilds.flat() : [ rawChilds ] ).filter( ( c ): c is React.ReactElement<TabProps> => React.isValidElement( c ) );

	const [ selected, setSelected ] = useState<number>( () => {

		if ( ! props.storageKey ) return 0;

		try {

			const v = localStorage.getItem( props.storageKey );

			if ( v !== null ) {

				const n = parseInt( v, 10 );

				if ( ! isNaN( n ) && n >= 0 ) return n;

			}

		} catch ( _e ) { /* */ }

		return 0;

	} );

	const safeSelected = childs.length > 0 && selected >= childs.length ? 0 : selected;

	const onSelect = ( index: number ) => {

		setSelected( index );

		if ( props.storageKey ) {

			try { localStorage.setItem( props.storageKey, String( index ) ); } catch ( _e ) { /* */ }

		}

	};

	return <div className={style.panelContainer}>
		<div className={style.header}>
			{childs.map( ( child, index ) => {

				return <div key={index} className={style.header_item} onClick={() => onSelect( index )} data-active={index == safeSelected}>
					<p>
						{child.props.title}
					</p>
				</div>;

			} )}
		</div>
		<div className={style.content}>
			{childs[ safeSelected ]}
		</div>
	</div>;

};

PanelContainer.Tab = Tab;
