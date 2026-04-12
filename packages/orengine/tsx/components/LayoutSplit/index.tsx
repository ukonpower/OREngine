import React, { useCallback, useEffect, useRef, useState } from 'react';

import style from './index.module.scss';

type LayoutSplitItemProps = {
	flex?: number;
	size?: number | string;
	minSize?: number;
	overflow?: boolean;
	padding?: boolean;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

type InternalItemProps = LayoutSplitItemProps & {
	_resolvedSize?: number | null;
};

const Item = ( props: InternalItemProps ) => {

	const itemStyle: React.CSSProperties = { ...props.style };
	const override = props._resolvedSize;

	if ( typeof override === "number" ) {

		itemStyle.flex = `0 0 ${ override }px`;

	} else if ( props.size !== undefined ) {

		itemStyle.flexShrink = 0;
		itemStyle.flexGrow = 0;
		itemStyle.flexBasis = typeof props.size === "number" ? `${ props.size }px` : props.size;

	} else {

		itemStyle.flex = props.flex ?? 1;

	}

	if ( props.minSize !== undefined ) {

		itemStyle.minWidth = `${ props.minSize }px`;
		itemStyle.minHeight = `${ props.minSize }px`;

	}

	if ( props.overflow ) {

		itemStyle.overflow = 'auto';

	}

	const content = props.padding
		? <div className={style.item_inner}>{props.children}</div>
		: props.children;

	return <div className={style.item} style={itemStyle}>
		{content}
	</div>;

};

type LayoutSplitProps = {
	direction?: "horizontal" | "vertical";
	storageKey?: string;
	splitterSize?: number;
	enableTouch?: boolean;
	children?: React.ReactNode;
};

const loadFromStorage = ( storageKey: string | undefined, expectedLength: number ): ( number | null )[] | null => {

	if ( ! storageKey ) return null;

	try {

		const raw = localStorage.getItem( storageKey );
		if ( ! raw ) return null;

		const parsed = JSON.parse( raw );
		if ( ! Array.isArray( parsed ) || parsed.length !== expectedLength ) return null;

		return parsed.map( ( v ) => ( typeof v === "number" ? v : null ) );

	} catch ( _e ) {

		return null;

	}

};

export const LayoutSplit = ( props: LayoutSplitProps ) => {

	const direction = props.direction || "horizontal";
	const splitterSize = props.splitterSize ?? 4;
	const enableTouch = props.enableTouch !== false;
	const storageKey = props.storageKey;

	const items = React.Children.toArray( props.children ).filter(
		( c ): c is React.ReactElement<LayoutSplitItemProps> => React.isValidElement( c )
	);

	const [ overrideSizes, setOverrideSizes ] = useState<( number | null )[]>( () =>
		loadFromStorage( storageKey, items.length ) ?? new Array( items.length ).fill( null )
	);
	const overrideSizesRef = useRef<( number | null )[]>( overrideSizes );
	overrideSizesRef.current = overrideSizes;

	const [ draggingIndex, setDraggingIndex ] = useState<number | null>( null );
	const containerRef = useRef<HTMLDivElement>( null );

	useEffect( () => {

		if ( overrideSizesRef.current.length !== items.length ) {

			const restored = loadFromStorage( storageKey, items.length );
			const next = restored ?? new Array( items.length ).fill( null );
			overrideSizesRef.current = next;
			setOverrideSizes( next );

		}

	}, [ items.length, storageKey ] );

	const handleSplitterPointerDown = useCallback( ( event: React.MouseEvent | React.TouchEvent, splitterIndex: number ) => {

		event.preventDefault();
		setDraggingIndex( splitterIndex );

		const container = containerRef.current;
		if ( ! container ) return;

		const isTouchStart = 'touches' in event;
		const startPos = isTouchStart
			? ( direction === "horizontal" ? event.touches[ 0 ].clientX : event.touches[ 0 ].clientY )
			: ( direction === "horizontal" ? event.clientX : event.clientY );

		const paneEls = Array.from( container.children ).filter(
			( c ): c is HTMLElement => c instanceof HTMLElement && c.classList.contains( style.item )
		);

		const pixelSizes = paneEls.map( ( el ) =>
			direction === "horizontal" ? el.clientWidth : el.clientHeight
		);

		const leftEl = paneEls[ splitterIndex ];
		const rightEl = paneEls[ splitterIndex + 1 ];
		if ( ! leftEl || ! rightEl ) return;

		const leftMin = items[ splitterIndex ].props.minSize ?? 50;
		const rightMin = items[ splitterIndex + 1 ].props.minSize ?? 50;
		const total = pixelSizes[ splitterIndex ] + pixelSizes[ splitterIndex + 1 ];

		let rafId: number | null = null;
		let pendingLeft = pixelSizes[ splitterIndex ];
		let pendingRight = pixelSizes[ splitterIndex + 1 ];

		const applyPaneStyle = ( el: HTMLElement, px: number ) => {

			el.style.flex = `0 0 ${ px }px`;
			if ( direction === "horizontal" ) {

				el.style.width = `${ px }px`;

			} else {

				el.style.height = `${ px }px`;

			}

		};

		const onMove = ( ev: MouseEvent | TouchEvent ) => {

			const isTouchMove = 'touches' in ev;
			const cur = isTouchMove
				? ( direction === "horizontal" ? ev.touches[ 0 ].clientX : ev.touches[ 0 ].clientY )
				: ( direction === "horizontal" ? ev.clientX : ev.clientY );
			const delta = cur - startPos;

			let nextLeft = pixelSizes[ splitterIndex ] + delta;
			let nextRight = pixelSizes[ splitterIndex + 1 ] - delta;

			if ( nextLeft < leftMin ) {

				nextLeft = leftMin;
				nextRight = total - leftMin;

			}

			if ( nextRight < rightMin ) {

				nextRight = rightMin;
				nextLeft = total - rightMin;

			}

			pendingLeft = nextLeft;
			pendingRight = nextRight;

			if ( rafId === null ) {

				rafId = requestAnimationFrame( () => {

					rafId = null;
					applyPaneStyle( leftEl, pendingLeft );
					applyPaneStyle( rightEl, pendingRight );

				} );

			}

		};

		const onUp = () => {

			if ( rafId !== null ) {

				cancelAnimationFrame( rafId );
				rafId = null;

			}

			window.removeEventListener( 'mousemove', onMove );
			window.removeEventListener( 'mouseup', onUp );
			window.removeEventListener( 'touchmove', onMove );
			window.removeEventListener( 'touchend', onUp );

			setDraggingIndex( null );

			const finalized = [ ...overrideSizesRef.current ];
			finalized[ splitterIndex ] = pendingLeft;
			finalized[ splitterIndex + 1 ] = pendingRight;
			overrideSizesRef.current = finalized;
			setOverrideSizes( finalized );

			if ( storageKey ) {

				try {

					localStorage.setItem( storageKey, JSON.stringify( finalized ) );

				} catch ( _err ) {

					// quota等の例外は握りつぶす
				}

			}

		};

		window.addEventListener( 'mousemove', onMove );
		window.addEventListener( 'mouseup', onUp );

		if ( enableTouch ) {

			window.addEventListener( 'touchmove', onMove, { passive: false } );
			window.addEventListener( 'touchend', onUp );

		}

	}, [ direction, items, storageKey, enableTouch ] );

	return (
		<div
			ref={containerRef}
			className={style.layout}
			data-direction={direction}
		>
			{items.map( ( item, index ) => {

				const isLast = index === items.length - 1;
				const override = overrideSizes[ index ] ?? null;

				const splitterClassName = [
					style.splitter,
					style[ direction ],
					draggingIndex === index ? style.dragging : '',
				].filter( Boolean ).join( ' ' );

				const splitterStyle: React.CSSProperties = direction === "horizontal"
					? { width: `${ splitterSize }px` }
					: { height: `${ splitterSize }px` };

				return (
					<React.Fragment key={index}>
						<Item {...item.props} _resolvedSize={override} />
						{ ! isLast && (
							<div
								className={splitterClassName}
								style={splitterStyle}
								onMouseDown={( e ) => handleSplitterPointerDown( e, index )}
								onTouchStart={enableTouch ? ( e ) => handleSplitterPointerDown( e, index ) : undefined}
							/>
						)}
					</React.Fragment>
				);

			} )}
		</div>
	);

};

LayoutSplit.Item = Item as ( props: LayoutSplitItemProps ) => React.ReactElement;
