

import { useCallback, useEffect, useRef, useState } from 'react';

import { useLayout } from '../../../hooks/useLayout';
import { useOREditor } from '../../../hooks/useOREditor';
import { useSerializableField } from '../../../hooks/useSerializableProps';
import { Button } from '../../Button';
import { Canvas } from '../../Canvas';
import { Label } from '../../Label';
import { Value } from '../../Value';
import { AudioView } from '../AudioView';

import style from './index.module.scss';

export const Screen = () => {

	const { editor } = useOREditor();
	const layout = useLayout();

	const [ render, setRender ] = useSerializableField<boolean>( editor, "enableRender" );
	const [ cameraMode, setCameraMode ] = useSerializableField<string>( editor, "cameraMode" );
	const [ viewType, setViewType ] = useSerializableField<string>( editor, "viewType" );
	const [ resolutionScale, setResolutionScale ] = useSerializableField<number>( editor, "resolutionScale" );
	const [ gizmoMode, setGizmoMode ] = useSerializableField<string>( editor, "gizmoMode" );

	const [ showHelpers, setShowHelpers ] = useSerializableField<boolean>( editor, "helpers/show" );
	const [ showEmpty, setShowEmpty ] = useSerializableField<boolean>( editor, "helpers/empty" );
	const [ showCamera, setShowCamera ] = useSerializableField<boolean>( editor, "helpers/camera" );
	const [ showLight, setShowLight ] = useSerializableField<boolean>( editor, "helpers/light" );
	const [ showWireframe, setShowWireframe ] = useSerializableField<boolean>( editor, "helpers/wireframe" );

	const [ apiConnected ] = useSerializableField<boolean>( editor, "apiConnected" );
	const [ apiPrimary ] = useSerializableField<boolean>( editor, "apiPrimary" );

	const handleRequestPrimary = useCallback( () => {

		editor?.requestApiPrimary();

	}, [ editor ] );

	const [ audioViewHeight, setAudioViewHeight ] = useState( 50 );
	const audioViewDragRef = useRef<{ startY: number; startHeight: number } | null>( null );

	const [ overlayOpen, setOverlayOpen ] = useState( false );
	const overlayRef = useRef<HTMLDivElement>( null );

	const handleClickOutside = useCallback( ( e: MouseEvent ) => {

		if ( overlayRef.current && ! overlayRef.current.contains( e.target as Node ) ) {

			setOverlayOpen( false );

		}

	}, [] );

	useEffect( () => {

		if ( overlayOpen ) {

			document.addEventListener( 'pointerdown', handleClickOutside );

		}

		return () => {

			document.removeEventListener( 'pointerdown', handleClickOutside );

		};

	}, [ overlayOpen, handleClickOutside ] );

	return <div className={style.screen}>
		<div className={style.header}>
			<div className={style.header_tabs}>
				{( [ "scene", "preview" ] as const ).map( ( mode ) => (
					<div
						key={mode}
						className={style.header_tab}
						data-active={cameraMode === mode}
						onClick={() => setCameraMode && setCameraMode( mode )}
					>
						{mode.charAt( 0 ).toUpperCase() + mode.slice( 1 )}
					</div>
				) )}
			</div>
			<div className={style.header_right}>
				{apiConnected && (
					<div className={style.header_item}>
						<div className={style.apiStatus} data-primary={apiPrimary} onClick={! apiPrimary ? handleRequestPrimary : undefined} title={apiPrimary ? 'API Primary' : 'API Connected (click to use)'}>
							<span className={style.apiStatus_dot} />
						</div>
					</div>
				)}
				<div className={style.header_item}>
					<Label title='View'>
						<Value
							value={viewType}
							format={{ type: "select", list: [ "render", "debug" ] }}
							onChange={( v ) => setViewType && setViewType( v )}/>
					</Label>
				</div>
				<div className={style.header_item}>
					<Label title='Res'>
						<Value
							value={resolutionScale}
							format={{ type: "select", list: new Array( 6 ).fill( 0 ).map( ( _, i ) => {

								const invScale = Math.pow( 2, i );
								const value = 1.0 / invScale;
								const label = value == 1 ? '1' : '1/' + invScale;

								return { value: value, label: label };

							} ) }}
							onChange={( v ) => setResolutionScale && setResolutionScale( v )}/>
					</Label>
				</div>

				{layout.isPC && <div className={style.externalBtn}>
					<Button onClick={() => {

						editor.openInExternalWindow();

					}}>
						<svg width="32" height="12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_224_2)">
								<path d="M96 0V416H512V0H96ZM472 376H136V40H472V376Z" fill="#aaa"/>
								<path d="M40 472V296V136V96H0V512H416V472H376H40Z" fill="#aaa"/>
								<path d="M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z" fill="#aaa"/>
							</g>
							<defs>
								<clipPath id="clip0_224_2">
									<rect width="512" height="512" fill="white"/>
								</clipPath>
							</defs>
						</svg>

					</Button>

				</div>}
			</div>
		</div>
		<div className={style.content}>
			<div className={style.displayOptions} ref={overlayRef}>
				<div
					className={style.displayOptions_btn}
					data-active={overlayOpen}
					onClick={() => setOverlayOpen( ! overlayOpen )}
					title="Display Options"
				>
					&#9881;
				</div>
				{overlayOpen && <div className={style.overlay}>
					<div className={style.overlay_label}>Rendering</div>
					<div className={style.overlay_field}>
						<Label title='Render'>
							<Value value={render} onChange={( v ) => setRender && setRender( v )}/>
						</Label>
					</div>
					<div className={style.overlay_separator} />
					<div className={style.overlay_label}>Helpers</div>
					<div className={style.overlay_field}>
						<Label title='Show'>
							<Value value={showHelpers} onChange={( v ) => setShowHelpers && setShowHelpers( v )}/>
						</Label>
					</div>
					<div className={style.overlay_field} data-indent="true">
						<Label title='Empty'>
							<Value value={showEmpty} onChange={( v ) => setShowEmpty && setShowEmpty( v )}/>
						</Label>
					</div>
					<div className={style.overlay_field} data-indent="true">
						<Label title='Camera'>
							<Value value={showCamera} onChange={( v ) => setShowCamera && setShowCamera( v )}/>
						</Label>
					</div>
					<div className={style.overlay_field} data-indent="true">
						<Label title='Light'>
							<Value value={showLight} onChange={( v ) => setShowLight && setShowLight( v )}/>
						</Label>
					</div>
					<div className={style.overlay_separator} />
					<div className={style.overlay_field}>
						<Label title='Wireframe'>
							<Value value={showWireframe} onChange={( v ) => setShowWireframe && setShowWireframe( v )}/>
						</Label>
					</div>
				</div>}
			</div>
			<div className={style.gizmoMode}>
				{( [ "select", "translate", "rotate", "scale" ] as const ).map( ( mode ) => (
					<div
						key={mode}
						className={style.gizmoMode_btn}
						data-active={gizmoMode === mode}
						onClick={() => setGizmoMode && setGizmoMode( mode )}
						title={`${mode} (${mode === 'select' ? 'Q' : mode === 'translate' ? 'W' : mode === 'rotate' ? 'E' : 'R'})`}
					>
						{mode === 'select' ? 'Q' : mode === 'translate' ? 'T' : mode === 'rotate' ? 'R' : 'S'}
					</div>
				) )}
			</div>
			<div className={style.canvas}>
				<Canvas />
			</div>
			<div
				className={style.audioViewHandle}
				onPointerDown={( e ) => {

					e.preventDefault();
					e.currentTarget.setPointerCapture( e.pointerId );
					audioViewDragRef.current = { startY: e.clientY, startHeight: audioViewHeight };

				}}
				onPointerMove={( e ) => {

					if ( ! audioViewDragRef.current ) return;

					const delta = audioViewDragRef.current.startY - e.clientY;
					const newHeight = Math.max( 20, Math.min( 400, audioViewDragRef.current.startHeight + delta ) );
					setAudioViewHeight( newHeight );

				}}
				onPointerUp={() => {

					audioViewDragRef.current = null;

				}}
			/>
			<div className={style.audioView} style={{ height: audioViewHeight }}>
				<AudioView />
			</div>
		</div>
	</div>;

};
