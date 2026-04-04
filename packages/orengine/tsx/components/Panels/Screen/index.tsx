

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
			<div className={style.header_gizmoMode}>
				{( [ "select", "translate", "rotate", "scale" ] as const ).map( ( mode ) => (
					<div
						key={mode}
						className={style.header_gizmoBtn}
						data-active={gizmoMode === mode}
						onClick={() => setGizmoMode && setGizmoMode( mode )}
						title={`${mode} (${mode === 'select' ? 'Q' : mode === 'translate' ? 'W' : mode === 'rotate' ? 'E' : 'R'})`}
					>
						{mode === 'select' ? 'Q' : mode === 'translate' ? 'T' : mode === 'rotate' ? 'R' : 'S'}
					</div>
				) )}
			</div>
			<div className={style.header_right}>
				{apiConnected && (
					<div className={style.header_item}>
						<div className={style.apiStatus} data-primary={apiPrimary}>
							<span className={style.apiStatus_dot} />
							{apiPrimary ? 'API Primary' : 'API Connected'}
							{! apiPrimary && (
								<button className={style.apiStatus_btn} onClick={handleRequestPrimary}>
									Use
								</button>
							)}
						</div>
					</div>
				)}
				{layout.isPC && <div className={style.header_item}>
					<Label title='Render'>
						<Value value={render} onChange={( value ) => {

							if ( setRender ) {

								setRender( value );

							}

						}}/>
					</Label>
				</div>}
				{layout.isPC && <div className={style.header_item}>
					<Label title='View'>
						<Value
							value={viewType}
							format={{ type: "select", list: [ "render", "debug" ] } }
							onChange={( value ) => {

								if ( setViewType ) {

									setViewType( value );

								}

							}}/>
					</Label>
				</div>}
				<div className={style.header_item}>
					<Label title={layout.isPC ? 'Resolution' : 'Res'}>
						<Value
							value={resolutionScale}
							format={{ type: "select", list: new Array( 6 ).fill( 0 ).map( ( _, i ) => {

								const invScale = Math.pow( 2, i );

								const value = 1.0 / invScale;
								const label = value == 1 ? '1' : '1/' + invScale;

								return { value: value, label: label };

							} ) } }
							onChange={( value ) => {

								if ( setResolutionScale ) {

									setResolutionScale( value );

								}

							}}/>
					</Label>
				</div>

				{layout.isPC && <div className={style.header_overlay} ref={overlayRef}>
					<div
						className={style.header_overlayBtn}
						data-active={overlayOpen}
						onClick={() => setOverlayOpen( ! overlayOpen )}
						title="Display Options"
					>
						&#9881;
					</div>
					{overlayOpen && <div className={style.overlay}>
						<div className={style.overlay_item} onClick={() => setShowHelpers && setShowHelpers( ! showHelpers )}>
							<span className={style.overlay_check}>{showHelpers ? '\u2713' : ''}</span>
							Helpers
						</div>
						<div className={style.overlay_item} data-indent="true" onClick={() => setShowEmpty && setShowEmpty( ! showEmpty )}>
							<span className={style.overlay_check}>{showEmpty ? '\u2713' : ''}</span>
							Empty
						</div>
						<div className={style.overlay_item} data-indent="true" onClick={() => setShowCamera && setShowCamera( ! showCamera )}>
							<span className={style.overlay_check}>{showCamera ? '\u2713' : ''}</span>
							Camera
						</div>
						<div className={style.overlay_item} data-indent="true" onClick={() => setShowLight && setShowLight( ! showLight )}>
							<span className={style.overlay_check}>{showLight ? '\u2713' : ''}</span>
							Light
						</div>
						<div className={style.overlay_separator} />
						<div className={style.overlay_item} onClick={() => setShowWireframe && setShowWireframe( ! showWireframe )}>
							<span className={style.overlay_check}>{showWireframe ? '\u2713' : ''}</span>
							Wireframe
						</div>
					</div>}
				</div>}

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
			<div className={style.canvas}>
				<Canvas />
			</div>
			<div className={style.audioView}>
				<AudioView />
			</div>
		</div>
	</div>;

};
