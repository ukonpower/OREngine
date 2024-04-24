import { useCallback, useContext } from 'react';

import { Button } from '../../ui/Button';
import { InputGroup } from '../../ui/InputGroup';
import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { Value } from '../../ui/Property/Value';
import { MouseMenuContext } from '../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { OREngineProjectData } from '~/ts/gl/IO/ProjectSerializer';
import { EditorContext } from '~/ts/gl/React/useEditor';

export const ProjectControl = () => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { glEditor, reflesh } = useContext( EditorContext );
	const data = glEditor?.dataManager;

	const projectList: string[] = [];

	if ( data ) {

		data.projects.forEach( ( project: OREngineProjectData ) => {

			projectList.push( project.setting.name );

		} );

	}

	const currentProjectName = glEditor?.getPropValue( 'currentProjectName' );

	return <div className={style.project}>
		<div className={style.project_inner}>
			<PropertyBlock label="Project" accordion >
				<div className={style.select}>
					<Value label='Project' value={currentProjectName || ''} selectList={projectList} onChange={( value ) => {

						glEditor && glEditor.openProject( value as string );

					}}/>
					<div className={style.rename}>
						<Button onClick={() => {

							pushContent && pushContent( <>
								<InputGroup title='Rename Project' initialValues={{ name: currentProjectName }} onSubmit={( e ) => {

									console.log( e.name );


									glEditor && glEditor.setPropValue( "currentProjectName", e.name as string );

									closeAll && closeAll();

									reflesh && reflesh();

								}}/>
							</> );

						}}>Rename</Button>
					</div>
					<div className={style.new}>
						<Button onClick={() => {

							pushContent && pushContent( <>
								<InputGroup title='New Project' initialValues={{ name: "NewProject" }} onSubmit={( e ) => {

									glEditor && glEditor.openProject( e.name as string );

									closeAll && closeAll();

									reflesh && reflesh();

								}}/>
							</> );

						}}>New</Button>
					</div>
				</div>
				<br/>
				<Button onClick={()=>{

					if ( glEditor ) {

						glEditor.save();

					}

				}}>Save</Button>
				<Button onClick={()=>{

					if ( glEditor ) {

						glEditor.exportCurrentScene();

					}

				}}>Export Scene</Button>
				<br/>
				<br/>
				<Button onClick={()=>{

					location.href = "/player";

				}} >Open Player</Button>
			</PropertyBlock>
		</div>
	</div>;

};
