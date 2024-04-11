import { useContext } from 'react';

import { Value } from '../../ui/Property/Value';

import style from './index.module.scss';

import { OREngineEditorViewType } from '~/ts/gl/Editor/EditorDataManager';
import { GLCanvas } from '~/ts/gl/React/GLCanvas';
import { EditorContext } from '~/ts/gl/React/useEditor';

export const Screen = () => {

	const { glEditor, reflesh } = useContext( EditorContext );

	const resolutionScale = ( glEditor && glEditor.resolutionScale );
	const resolutionDivideStr = resolutionScale && ( resolutionScale == 1 ? '1' : '1/' + ( 1 / resolutionScale ) ) || '';

	return <div className={style.screen}>
		<div className={style.header}>
			<div className={style.header_right}>
				<div className={style.viewSelect}>
					<Value label='View' selectList={[ "render", "debug" ]} value={glEditor?.viewType || "render"} onChange={( value ) => {

						glEditor && glEditor.setPropValue( "viewType", value as OREngineEditorViewType );

						reflesh && reflesh();

					}}/>
				</div>
				<div className={style.viewSelect}>
					<Value label='Resolution' selectList={[ "1", "1/2", "1/4", "1/8" ]} value={resolutionDivideStr} onChange={( value ) => {

						glEditor && glEditor.setPropValue( "resolutionScale", 1.0 / Number( value.toString().split( '/' )[ 1 ] || "1" ) );


						reflesh && reflesh();

					}}/>
				</div>
			</div>
		</div>
		<div className={style.content}>
			<GLCanvas />
		</div>
	</div>;

};
