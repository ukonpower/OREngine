

import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Value } from '../../components/ui/Value';
import { AudioView } from '../AudioView';
import { CameraPad } from '../CameraPad';
import { useUISetting } from '../EditorSettings/hooks/useUISetting';
import { useLayout } from '../Layout/hooks/useLayout';
import { useOREditor } from '../OREditor/hooks/useOREditor';
import { Canvas } from '../SerializableField/components/Canvas';
import { useSerializableField } from '../SerializableField/hooks/useSerializableProps';

import style from './index.module.scss';

export const Screen = () => {

	const { editor } = useOREditor();
	const layout = useLayout();

	const [ render, setRender ] = useSerializableField<boolean>( editor, "enableRender" );
	const [ preview, setPreview ] = useSerializableField<boolean>( editor, "preview" );
	const [ viewType, setViewType ] = useSerializableField<string>( editor, "viewType" );
	const [ resolutionScale, setResolutionScale ] = useSerializableField<number>( editor, "resolutionScale" );
	const [ gizmoMode, setGizmoMode ] = useSerializableField<string>( editor, "gizmoMode" );
	const [ transformOrientation, setTransformOrientation ] = useSerializableField<string>( editor, "transformOrientation" );
	const [ modalStatus ] = useSerializableField<string>( editor, "modalStatus" );

	const [ showHelpers, setShowHelpers ] = useSerializableField<boolean>( editor, "helpers/show" );
	const [ showEmpty, setShowEmpty ] = useSerializableField<boolean>( editor, "helpers/empty" );
	const [ showCamera, setShowCamera ] = useSerializableField<boolean>( editor, "helpers/camera" );
	const [ showLight, setShowLight ] = useSerializableField<boolean>( editor, "helpers/light" );
	const [ showGrid, setShowGrid ] = useSerializableField<boolean>( editor, "helpers/grid" );
	const [ showWireframe, setShowWireframe ] = useSerializableField<boolean>( editor, "helpers/wireframe" );
	const [ showGizmo, setShowGizmo ] = useSerializableField<boolean>( editor, "helpers/gizmo" );
	const [ showOutline, setShowOutline ] = useSerializableField<boolean>( editor, "helpers/outline" );

	const [ showAudioView ] = useUISetting( 'showAudioView' );
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
				<div
					className={style.header_tab}
					data-active={!! preview}
					onClick={() => setPreview && setPreview( ! preview )}
					title="Camera Render"
				>
					<svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M32 144 H336 V368 H32 Z M368 224 L480 152 V360 L368 288 Z"/>
					</svg>
				</div>
			</div>
			<div className={style.header_right}>
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
						<Label title='Grid'>
							<Value value={showGrid} onChange={( v ) => setShowGrid && setShowGrid( v )}/>
						</Label>
					</div>
					<div className={style.overlay_field}>
						<Label title='Wireframe'>
							<Value value={showWireframe} onChange={( v ) => setShowWireframe && setShowWireframe( v )}/>
						</Label>
					</div>
					<div className={style.overlay_field}>
						<Label title='Gizmo'>
							<Value value={showGizmo} onChange={( v ) => setShowGizmo && setShowGizmo( v )}/>
						</Label>
					</div>
					<div className={style.overlay_field}>
						<Label title='Outline'>
							<Value value={showOutline} onChange={( v ) => setShowOutline && setShowOutline( v )}/>
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
						title={mode.charAt( 0 ).toUpperCase() + mode.slice( 1 )}
					>
						{mode === 'select' ? '↖' : mode === 'translate' ? 'T' : mode === 'rotate' ? 'R' : 'S'}
					</div>
				) )}
				<div className={style.gizmoMode_separator} />
				{( [ "global", "local" ] as const ).map( ( orientation ) => (
					<div
						key={orientation}
						className={style.gizmoMode_btn}
						data-active={transformOrientation === orientation}
						onClick={() => setTransformOrientation && setTransformOrientation( orientation )}
						title={orientation.charAt( 0 ).toUpperCase() + orientation.slice( 1 )}
					>
						{orientation === 'global' ? 'G' : 'L'}
					</div>
				) )}
			</div>
			{modalStatus && <div className={style.modalStatus}>{modalStatus}</div>}
			<div className={style.canvas}>
				<Canvas />
			</div>
			{layout.isSP && <CameraPad />}
			{layout.isPC && showAudioView && <>
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
			</>}
		</div>
	</div>;

};
