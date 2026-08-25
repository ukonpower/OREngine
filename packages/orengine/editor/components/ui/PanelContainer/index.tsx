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

export type PanelContainerTab = {
	id: string;
	title: string;
	content: React.ReactNode;
};

type PanelContainerProps = {
	storageKey?: string;
	defaultTabTitle?: string;
	children?: React.ReactNode;
	// データ駆動モード。指定時はタブ状態の持ち主が親（レイアウトツリー）になり、children は使わない
	tabs?: PanelContainerTab[];
	active?: string;
	onSelect?: ( id: string ) => void;
	onTabContextMenu?: ( id: string, event: React.MouseEvent ) => void;
	// タブのドラッグ開始検知用（D&D 自体の判定・描画は親が持つ）
	onTabPointerDown?: ( id: string, event: React.PointerEvent ) => void;
	// タブ追加ボタン（ヘッダー右端の「+」）。指定時のみ表示する
	onAddClick?: () => void;
};

export const PanelContainer = ( props: PanelContainerProps ) => {

	const rawChilds = props.children || [];
	const childs = ( Array.isArray( rawChilds ) ? rawChilds.flat() : [ rawChilds ] ).filter( ( c ): c is React.ReactElement<TabProps> => React.isValidElement( c ) );

	const [ selected, setSelected ] = useState<number>( () => {

		if ( props.storageKey ) {

			try {

				const v = localStorage.getItem( props.storageKey );

				if ( v !== null ) {

					const n = parseInt( v, 10 );

					if ( ! isNaN( n ) && n >= 0 ) return n;

				}

			} catch ( _e ) { /* */ }

		}

		if ( props.defaultTabTitle ) {

			const idx = childs.findIndex( ( c ) => c.props.title === props.defaultTabTitle );
			if ( idx >= 0 ) return idx;

		}

		return 0;

	} );

	const safeSelected = childs.length > 0 && selected >= childs.length ? 0 : selected;

	if ( props.tabs ) {

		const activeTab = props.tabs.find( ( tab ) => tab.id === props.active ) ?? props.tabs[ 0 ];

		return <div className={style.panelContainer}>
			<div className={style.header} data-panel-tab-header="">
				{props.tabs.map( ( tab ) => {

					return <div key={tab.id} className={style.header_item} onClick={() => props.onSelect?.( tab.id )} onContextMenu={( e ) => props.onTabContextMenu?.( tab.id, e )} onPointerDown={( e ) => props.onTabPointerDown?.( tab.id, e )} data-active={tab.id === activeTab?.id} data-panel-tab-id={tab.id}>
						<p>
							{tab.title}
						</p>
					</div>;

				} )}
				{props.onAddClick && <div className={style.header_add} onClick={props.onAddClick}>+</div>}
			</div>
			<div className={style.content} data-panel-content="">
				{activeTab?.content}
			</div>
		</div>;

	}

	const onSelect = ( index: number ) => {

		setSelected( index );

		if ( props.storageKey ) {

			try {

				localStorage.setItem( props.storageKey, String( index ) );

			} catch ( _e ) { /* */ }

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
