import { useContext } from 'react';

import { GLCanvas } from '../../gl/GLCanvas';
import { EditorContext } from '../../gl/useEditor';
import { Value } from '../../ui/Property/Value';
import { AudioView } from '../AudioView';

import style from './index.module.scss';

import { OREngineEditorViewType } from '~/ts/gl/Editor/EditorDataManager';

export const Screen = () => {

	const { glEditor, reflesh } = useContext( EditorContext );

	const editorProps = glEditor?.getPropsSerialized() || {};

	// resolution

	const resolutionScale = editorProps[ "resolutionScale" ];
	const resolutionDivideStr = resolutionScale && ( resolutionScale == 1 ? '1' : '1/' + ( 1 / resolutionScale ) ) || '';

	// viewType

	const viewType = editorProps[ "viewType" ] || "render";

	// render

	const render = editorProps[ "enableRender" ];

	return <div className={style.screen}>
		<div className={style.header}>
			<div className={style.header_right}>
				<div className={style.header_item}>
					<Value label='Render' value={render} onChange={( value ) => {

						glEditor && glEditor.setPropValue( "enableRender", value as OREngineEditorViewType );

						reflesh && reflesh();

					}}/>
				</div>
				<div className={style.item}>
					<Value label='View' selectList={[ "render", "debug" ]} value={viewType} onChange={( value ) => {

						glEditor && glEditor.setPropValue( "viewType", value as OREngineEditorViewType );

						reflesh && reflesh();

					}}/>
				</div>
				<div className={style.item}>
					<Value label='Resolution' selectList={[ "1", "1/2", "1/4", "1/8" ]} value={resolutionDivideStr} onChange={( value ) => {

						glEditor && glEditor.setPropValue( "resolutionScale", 1.0 / Number( value.toString().split( '/' )[ 1 ] || "1" ) );


						reflesh && reflesh();

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
