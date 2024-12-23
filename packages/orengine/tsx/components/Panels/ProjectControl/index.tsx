import { useContext } from 'react';

import { OREngineProjectData } from '../../../../ts/Engine/IO/ProjectSerializer';
import { useSerializableField } from '../../../../tsx/hooks/useSerializableProps';
import { useOREditor } from '../../../hooks/useOREditor';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { ArrowIcon } from '../../Icons/ArrowIcon';
import { InputSelect } from '../../Input/InputSelect';
import { InputGroup } from '../../InputGroup';
import { MouseMenuContext } from '../../MouseMenu/useMouseMenu';

import style from './index.module.scss';


export const ProjectControl = () => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { gui } = useOREditor();

	const [ projects ] = useSerializableField<OREngineProjectData[]>( gui, "projects" );
	const [ projectName ] = useSerializableField<string>( gui, "projectName" );
	const [ openedProject ] = useSerializableField<string>( gui, "openedProject" );

	const projectList: string[] = projects?.map( ( project ) => project.name ) || [];

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label="Project" accordion >
				<div className={style.row} data-type="top">
					<div className={style.projectSelector}>
						<InputSelect value={openedProject || ''} selectList={projectList} onChange={( value ) => {

							gui.setField( "openedProject", value );

						}}/>
					</div>
					<div className={style.rowItem}>
						<Button onClick={() => {

							if ( pushContent ) {

								pushContent( <>
									<InputGroup title='Rename Project' initialValues={{ name: projectName || "" }} onSubmit={( e ) => {

										gui.setField( "projectName", e.name as string );

										if ( closeAll ) {

											closeAll();

										}

									}}/>
								</> );

							}


						}}>Rename</Button>
					</div>
				</div>
				<div className={style.row} data-type="bottom">
					<div className={style.rowItem}>
						<Button onClick={() => {

							if ( pushContent ) {

								pushContent( <>
									<InputGroup title='New Project' initialValues={{ name: "NewProject" }} onSubmit={( e ) => {

										gui.setField( "openedProject", e.name as string );

										if ( closeAll ) {

											closeAll();

										}

									}}/>
								</> );

							}

						}}>New</Button>
					</div>
					<div className={style.rowItem} >
						<Button onClick={()=>{

							if ( gui && projectName ) {

								if ( window.confirm( "DELETE!!" ) ) {

									gui.projectDelete( projectName );

								}

							}

						}}>Delete</Button>
					</div>
				</div>
				<br/>
				<Button onClick={()=>{

					if ( gui ) {

						gui.projectSave();

					}

				}}>Save</Button>
				<div className={style.export}>
					<Button onClick={()=>{

						if ( gui ) {

							gui.exportCurrentScene().then( () => {

								window.open( `/player`, '_blank' );

							} );

						}

					}} >Export & Play <ArrowIcon /></Button>
				</div>
			</Block>
		</div>
	</div>;

};
