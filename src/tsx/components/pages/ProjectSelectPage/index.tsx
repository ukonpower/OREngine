import React, { useEffect, useRef, useState } from "react";

import style from './index.module.scss';

type Props = {
	onSelectProject: ( name: string ) => void;
};

type EditingState = {
	project: string;
	mode: 'rename' | 'duplicate';
	value: string;
};

export const ProjectSelectPage: React.FC<Props> = ( { onSelectProject } ) => {

	const [ projects, setProjects ] = useState<string[]>( [] );
	const [ newName, setNewName ] = useState( '' );
	const [ loading, setLoading ] = useState( true );
	const [ menuOpen, setMenuOpen ] = useState<string | null>( null );
	const [ editing, setEditing ] = useState<EditingState | null>( null );
	const menuRef = useRef<HTMLDivElement>( null );
	const escapePressedRef = useRef( false );
	const committingRef = useRef( false );

	const fetchProjects = () => {

		fetch( '/api/projects' )
			.then( r => r.json() )
			.then( setProjects )
			.finally( () => setLoading( false ) );

	};

	useEffect( () => {

		fetchProjects();

	}, [] );

	useEffect( () => {

		if ( ! menuOpen ) return;

		const handleClick = ( e: MouseEvent ) => {

			if ( menuRef.current && ! menuRef.current.contains( e.target as Node ) ) {

				setMenuOpen( null );

			}

		};

		document.addEventListener( 'mousedown', handleClick );

		return () => document.removeEventListener( 'mousedown', handleClick );

	}, [ menuOpen ] );

	const selectProject = ( name: string ) => {

		onSelectProject( name );

	};

	const createProject = async () => {

		const name = newName.trim();

		if ( ! name ) return;

		const res = await fetch( '/api/projects', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { name } ),
		} );

		if ( res.ok ) {

			setNewName( '' );
			selectProject( name );

		}

	};

	const deleteProject = async ( name: string ) => {

		if ( ! confirm( `Delete project "${name}"?` ) ) return;

		const res = await fetch( `/api/projects/${encodeURIComponent( name )}`, { method: 'DELETE' } );

		if ( res.ok ) {

			fetchProjects();

		} else {

			const data = await res.json();
			alert( data.error );

		}

		setMenuOpen( null );

	};

	const renameProject = async ( oldName: string, newName: string ) => {

		const trimmed = newName.trim();

		if ( ! trimmed || trimmed === oldName ) return;

		const res = await fetch( `/api/projects/${encodeURIComponent( oldName )}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { newName: trimmed } ),
		} );

		if ( res.ok ) {

			fetchProjects();

		} else {

			const data = await res.json();
			alert( data.error );

		}

	};

	const duplicateProject = async ( name: string, newName: string ) => {

		const trimmed = newName.trim();

		if ( ! trimmed ) return;

		const res = await fetch( `/api/projects/${encodeURIComponent( name )}/duplicate`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { newName: trimmed } ),
		} );

		if ( res.ok ) {

			fetchProjects();

		} else {

			const data = await res.json();
			alert( data.error );

		}

	};

	const startEdit = ( project: string, mode: 'rename' | 'duplicate' ) => {

		setMenuOpen( null );
		setEditing( {
			project,
			mode,
			value: mode === 'rename' ? project : project + '_copy',
		} );

	};

	const commitEdit = async () => {

		if ( ! editing || committingRef.current ) return;

		committingRef.current = true;

		if ( editing.mode === 'rename' ) {

			await renameProject( editing.project, editing.value );

		} else {

			await duplicateProject( editing.project, editing.value );

		}

		setEditing( null );
		committingRef.current = false;

	};

	const cancelEdit = () => {

		setEditing( null );

	};

	const onKeyDown = ( e: React.KeyboardEvent ) => {

		if ( e.key === 'Enter' ) {

			createProject();

		}

	};

	if ( loading ) {

		return <div className={style.container}>
			<div className={style.inner}>
				<div className={style.loading}>Loading...</div>
			</div>
		</div>;

	}

	return (
		<div className={style.container}>
			<div className={style.inner}>
				<h1 className={style.title}>OREngine</h1>
				<div className={style.section}>
					<div className={style.sectionTitle}>Projects</div>
					<div className={style.projectList}>
						{projects.map( project => (
						<div key={project} className={style.projectItem}>
							{editing?.project === project ? (
								<input
									className={style.renameInput}
									value={editing.value}
									onChange={e => setEditing( { ...editing, value: e.target.value } )}
									onKeyDown={e => {

										if ( e.key === 'Enter' ) e.currentTarget.blur();
										if ( e.key === 'Escape' ) {

											escapePressedRef.current = true;
											e.currentTarget.blur();

										}

									}}
									onBlur={() => {

										if ( escapePressedRef.current ) {

											escapePressedRef.current = false;
											cancelEdit();
											return;

										}

										commitEdit();

									}}
									autoFocus
									placeholder={editing.mode === 'duplicate' ? 'New name' : undefined}
								/>
							) : (
								<>
									<span className={style.projectName} onClick={() => selectProject( project )}>{project}</span>
									<button className={style.menuButton} onClick={( e ) => {

										e.stopPropagation();
										setMenuOpen( menuOpen === project ? null : project );

									}}>...</button>
								</>
							)}
							{menuOpen === project && (
								<div className={style.menu} ref={menuRef}>
									<div className={style.menuItem} onClick={() => startEdit( project, 'rename' )}>Rename</div>
									<div className={style.menuItem} onClick={() => startEdit( project, 'duplicate' )}>Duplicate</div>
									<div className={style.menuItemDanger} onClick={() => deleteProject( project )}>Delete</div>
								</div>
							)}
						</div>
					) )}
						{projects.length === 0 && (
							<div className={style.empty}>No projects</div>
						)}
					</div>
				</div>
				<div className={style.section}>
					<div className={style.sectionTitle}>New Project</div>
					<div className={style.createForm}>
						<input
							className={style.input}
							value={newName}
							onChange={e => setNewName( e.target.value )}
							onKeyDown={onKeyDown}
							placeholder="Project name"
						/>
						<button className={style.createButton} onClick={createProject}>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);

};
