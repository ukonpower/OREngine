

import { useOREditor } from '../../../hooks/useOREditor';
import { useSerializableField } from '../../../hooks/useSerializableProps';
import { Label } from '../../Label';
import { GLCanvas } from '../../OREngineGUICanvas';
import { Value } from '../../Value';
import { AudioView } from '../AudioView';

import style from './index.module.scss';

export const Screen = () => {

	const { gui } = useOREditor();

	const [ render, setRender ] = useSerializableField<boolean>( gui, "enableRender" );
	const [ viewType, setViewType ] = useSerializableField<string>( gui, "viewType" );
	const [ resolutionScale, setResolutionScale ] = useSerializableField<number>( gui, "resolutionScale" );

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
			</div>
		</div>
		<div className={style.content}>
			<div className={style.canvas}>
				<GLCanvas />
			</div>
			<div className={style.audioView}>
				<AudioView />
			</div>
		</div>
	</div>;

};
