import { useContext } from 'react';

import { EditorContext } from '../../gl/useEditor';
import { Button } from '../../ui/Button';
import { ArrowIcon } from '../../ui/icon/ArrowIcon';
import { InputSelect } from '../../ui/Input/InputSelect';
import { InputGroup } from '../../ui/InputGroup';
import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { MouseMenuContext } from '../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { OREngineProjectData } from '~/ts/gl/OREngine/IO/ProjectSerializer';
import { useSerializableProps } from '~/tsx/gl/useSerializableProps';


export const ProjectControl = () => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { glEditor } = useContext( EditorContext );

	const [ projects ] = useSerializableProps<OREngineProjectData[]>( glEditor, "projects" );
	const [ projectName ] = useSerializableProps<string>( glEditor, "projectName" );
	const [ openedProject ] = useSerializableProps<string>( glEditor, "openedProject" );

	const projectList: string[] = projects?.map( ( project ) => project.name ) || [];

	return <div className={style.project}>
		<div className={style.project_inner}>
			<PropertyBlock label="Project" accordion >
				<div className={style.row} data-type="top">
					<div className={style.projectSelector}>
						<InputSelect value={openedProject || ''} selectList={projectList} onChange={( value ) => {

							glEditor && glEditor.setPropsValue( "openedProject", value );

						}}/>
					</div>
					<div className={style.rowItem}>
						<Button onClick={() => {

							pushContent && pushContent( <>
								<InputGroup title='Rename Project' initialValues={{ name: projectName || "" }} onSubmit={( e ) => {

									glEditor && glEditor.setPropsValue( "projectName", e.name as string );

									closeAll && closeAll();

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

									glEditor && glEditor.setPropsValue( "openedProject", e.name as string );

									closeAll && closeAll();

								}}/>
							</> );

						}}>New</Button>
					</div>
					<div className={style.rowItem} >
						<Button onClick={()=>{

							if ( glEditor && projectName ) {

								if ( window.confirm( "DELETE!!" ) ) {

									glEditor.projectDelete( projectName );

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
