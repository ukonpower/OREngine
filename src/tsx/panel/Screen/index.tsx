
import { AudioView } from '../AudioView';

import style from './index.module.scss';

import { useOREngineGUI } from '~/tsx/components/OREngineGUI';
import { GLCanvas } from '~/tsx/components/OREngineGUICanvas';
import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
import { Label } from '~/tsx/ui/Label';
import { Value } from '~/tsx/ui/Value';

export const Screen = () => {

	const { gui } = useOREngineGUI();

	const [ render, setRender ] = useSerializableField<boolean>( gui, "enableRender" );
	const [ viewType, setViewType ] = useSerializableField<string>( gui, "viewType" );
	const [ resolutionScale, setResolutionScale ] = useSerializableField<number>( gui, "resolutionScale" );
	const resolutionDivideStr = resolutionScale !== undefined && ( resolutionScale == 1 ? '1' : '1/' + ( 1 / resolutionScale ) ) || '';

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
							value={resolutionDivideStr}
							format={{ type: "select", list: [ "1", "1/2", "1/4", "1/8", "1/16", "1/32" ] } }
							onChange={( value ) => {

								if ( setResolutionScale ) {

									setResolutionScale( 1.0 / Number( value.toString().split( '/' )[ 1 ] || "1" ) );

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
