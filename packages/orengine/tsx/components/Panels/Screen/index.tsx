

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

	const [ render, setRender ] = useSerializableField<boolean>( editor, "enableRender" );
	const [ viewType, setViewType ] = useSerializableField<string>( editor, "viewType" );
	const [ resolutionScale, setResolutionScale ] = useSerializableField<number>( editor, "resolutionScale" );

	return <div className={style.screen}>
		<div className={style.header}>
			<div className={style.header_right}>
				<div className={style.header_item}>
					<Label title='Render'>
						<Value value={render} onChange={( value ) => {

							if ( setRender ) {

								setRender( value );

							}

						}}/>
					</Label>
				</div>
				<div className={style.header_item}>
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
				</div>
				<div className={style.header_item}>
					<Label title='Resolution'>
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
				<div className={style.externalBtn}>
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

				</div>
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
