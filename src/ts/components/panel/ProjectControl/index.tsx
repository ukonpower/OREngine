import { useContext } from 'react';

import { EditorContext } from '../../gl/useEditor';
import { Button } from '../../ui/Button';
import { ArrowIcon } from '../../ui/icon/ArrowIcon';
import { InputSelect } from '../../ui/Input/InputSelect';
import { InputGroup } from '../../ui/InputGroup';
import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { MouseMenuContext } from '../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { OREngineProjectData } from '~/ts/gl/IO/ProjectSerializer';


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
				<div className={style.row} data-type="top">
					<div className={style.projectSelector}>

						<InputSelect value={currentProjectName || ''} selectList={projectList} onChange={( value ) => {

							glEditor && glEditor.projectOpen( value as string );

						}}/>
					</div>
					<div className={style.rowItem}>
						<Button onClick={() => {

							pushContent && pushContent( <>
								<InputGroup title='Rename Project' initialValues={{ name: currentProjectName }} onSubmit={( e ) => {

									glEditor && glEditor.setPropValue( "currentProjectName", e.name as string );

									closeAll && closeAll();

									reflesh && reflesh();

								}}/>
							</> );

						}}>Rename</Button>
					</div>
				</div>
				<div className={style.row} data-type="bottom">
					<div className={style.rowItem}>
						<Button onClick={() => {

							pushContent && pushContent( <>
								<InputGroup title='New Project' initialValues={{ name: "NewProject" }} onSubmit={( e ) => {

									glEditor && glEditor.projectOpen( e.name as string );

									closeAll && closeAll();

									reflesh && reflesh();

								}}/>
							</> );

						}}>New</Button>
					</div>
					<div className={style.rowItem} >
						<Button onClick={()=>{

							if ( glEditor ) {

								if ( window.confirm( "DELETE!!" ) ) {

									glEditor.projectDelete( currentProjectName );

								}

							}

						}}>Delete</Button>
					</div>
				</div>
				<br/>
				<Button onClick={()=>{

					if ( glEditor ) {

						glEditor.projectSave();

					}

				}}>Save</Button>
				<div className={style.export}>
					<Button onClick={()=>{

						if ( glEditor ) {

							glEditor.exportCurrentScene().then( () => {

								window.open( `/player`, '_blank' );

							} );

						}

					}} >Export & Play <ArrowIcon /></Button>
				</div>
			</PropertyBlock>
		</div>
	</div>;

};
