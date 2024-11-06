import { useContext } from 'react';

import { Button } from '../../ui/Button';
import { InputSelect } from '../../ui/Input/InputSelect';
import { InputGroup } from '../../ui/InputGroup';
import { MouseMenuContext } from '../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { OREngineProjectData } from '~/ts/gl/OREngine/IO/ProjectSerializer';
import { useOREditor } from '~/tsx/gl/OREditor';
import { useSerializableProps } from '~/tsx/gl/useSerializableProps';
import { ArrowIcon } from '~/tsx/Icon/ArrowIcon';
import { Block } from '~/tsx/ui/Block';


export const ProjectControl = () => {

	const { pushContent, closeAll } = useContext( MouseMenuContext );
	const { editor } = useOREditor();

	const [ projects ] = useSerializableProps<OREngineProjectData[]>( editor, "projects" );
	const [ projectName ] = useSerializableProps<string>( editor, "projectName" );
	const [ openedProject ] = useSerializableProps<string>( editor, "openedProject" );

	const projectList: string[] = projects?.map( ( project ) => project.name ) || [];

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label="Project" accordion >
				<div className={style.row} data-type="top">
					<div className={style.projectSelector}>
						<InputSelect value={openedProject || ''} selectList={projectList} onChange={( value ) => {

							editor.setField( "openedProject", value );

						}}/>
					</div>
					<div className={style.rowItem}>
						<Button onClick={() => {

							if ( pushContent ) {

								pushContent( <>
									<InputGroup title='Rename Project' initialValues={{ name: projectName || "" }} onSubmit={( e ) => {

										editor.setField( "projectName", e.name as string );

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

										editor.setField( "openedProject", e.name as string );

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

							if ( editor && projectName ) {

								if ( window.confirm( "DELETE!!" ) ) {

									editor.projectDelete( projectName );

								}

							}

						}}>Delete</Button>
					</div>
				</div>
				<br/>
				<Button onClick={()=>{

					if ( editor ) {

						editor.projectSave();

					}

				}}>Save</Button>
				<div className={style.export}>
					<Button onClick={()=>{

						if ( editor ) {

							editor.exportCurrentScene().then( () => {

								window.open( `/player`, '_blank' );

							} );

						}

					}} >Export & Play <ArrowIcon /></Button>
				</div>
			</Block>
		</div>
	</div>;

};
