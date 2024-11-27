
import { AudioView } from '../AudioView';

import style from './index.module.scss';

import { useOREngineGUI } from '~/tsx/components/OREngineGUI';
import { GLCanvas } from '~/tsx/components/OREngineGUICanvas';
import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
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
					<Value label='Render' value={render} onChange={( value ) => {

						if ( setRender ) {

							setRender( value );

						}

					}}/>
				</div>
				<div className={style.item}>
					<Value label='View' selectList={[ "render", "debug" ]} value={viewType} onChange={( value ) => {

						if ( setViewType ) {

							setViewType( value );

						}

					}}/>
				</div>
				<div className={style.item}>
					<Value label='Resolution' selectList={[ "1", "1/2", "1/4", "1/8", "1/16", "1/32" ]} value={resolutionDivideStr} onChange={( value ) => {

						if ( setResolutionScale ) {

							setResolutionScale( 1.0 / Number( value.toString().split( '/' )[ 1 ] || "1" ) );

						}

					}}/>
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
