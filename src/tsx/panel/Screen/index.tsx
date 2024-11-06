import { useContext } from 'react';

import { GLCanvas } from '../../gl/GLCanvas';
import { EditorContext } from '../../gl/useEditor';
import { AudioView } from '../AudioView';

import style from './index.module.scss';

import { useSerializableProps } from '~/tsx/gl/useSerializableProps';
import { Value } from '~/tsx/ui/Value';


export const Screen = () => {

	const { glEditor } = useContext( EditorContext );

	const [ render, setRender ] = useSerializableProps<boolean>( glEditor, "enableRender" );
	const [ viewType, setViewType ] = useSerializableProps<string>( glEditor, "viewType" );
	const [ resolutionScale, setResolutionScale ] = useSerializableProps<number>( glEditor, "resolutionScale" );
	const resolutionDivideStr = resolutionScale !== undefined && ( resolutionScale == 1 ? '1' : '1/' + ( 1 / resolutionScale ) ) || '';

	return <div className={style.screen}>
		<div className={style.header}>
			<div className={style.header_right}>
				<div className={style.header_item}>
					<Value label='Render' value={render} onChange={( value ) => {

						setRender && setRender( value );

					}}/>
				</div>
				<div className={style.item}>
					<Value label='View' selectList={[ "render", "debug" ]} value={viewType} onChange={( value ) => {

						setViewType && setViewType( value );

					}}/>
				</div>
				<div className={style.item}>
					<Value label='Resolution' selectList={[ "1", "1/2", "1/4", "1/8", "1/16", "1/32" ]} value={resolutionDivideStr} onChange={( value ) => {

						setResolutionScale && setResolutionScale( 1.0 / Number( value.toString().split( '/' )[ 1 ] || "1" ) );

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
