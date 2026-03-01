import React, { useEffect, useRef, useState } from "react";

import style from './index.module.scss';

type Props = {
	onSelectProject: ( name: string ) => void;
};

export const ProjectSelectPage: React.FC<Props> = ( { onSelectProject } ) => {

	const [ projects, setProjects ] = useState<string[]>( [] );
	const [ newName, setNewName ] = useState( '' );
	const [ loading, setLoading ] = useState( true );
	const [ menuOpen, setMenuOpen ] = useState<string | null>( null );
	const [ renaming, setRenaming ] = useState<string | null>( null );
	const [ renameValue, setRenameValue ] = useState( '' );
	const [ duplicating, setDuplicating ] = useState<string | null>( null );
	const [ duplicateValue, setDuplicateValue ] = useState( '' );
	const menuRef = useRef<HTMLDivElement>( null );

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

	const selectProject = async ( name: string ) => {

		const waitForReady = new Promise<void>( ( resolve ) => {

			if ( import.meta.hot ) {

				const handler = () => {

					resolve();
					import.meta.hot!.off( 'project-changed', handler );

				};

				import.meta.hot.on( 'project-changed', handler );
				setTimeout( resolve, 3000 );

			} else {

				resolve();

			}

		} );

		await fetch( '/api/projects/active', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { name } ),
		} );

		await waitForReady;

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

		if ( ! trimmed || trimmed === oldName ) {

			setRenaming( null );
			return;

		}

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

		setRenaming( null );

	};

	const duplicateProject = async ( name: string, newName: string ) => {

		const trimmed = newName.trim();

		if ( ! trimmed ) {

			setDuplicating( null );
			return;

		}

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

		setDuplicating( null );

	};

	const startRename = ( name: string ) => {

		setMenuOpen( null );
		setRenaming( name );
		setRenameValue( name );

	};

	const startDuplicate = ( name: string ) => {

		setMenuOpen( null );
		setDuplicating( name );
		setDuplicateValue( name + '_copy' );

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
							{renaming === project ? (
								<input
									className={style.renameInput}
									value={renameValue}
									onChange={e => setRenameValue( e.target.value )}
									onKeyDown={e => {

										if ( e.key === 'Enter' ) renameProject( project, renameValue );
										if ( e.key === 'Escape' ) setRenaming( null );

									}}
									onBlur={() => setRenaming( null )}
									autoFocus
								/>
							) : duplicating === project ? (
								<input
									className={style.renameInput}
									value={duplicateValue}
									onChange={e => setDuplicateValue( e.target.value )}
									onKeyDown={e => {

										if ( e.key === 'Enter' ) duplicateProject( project, duplicateValue );
										if ( e.key === 'Escape' ) setDuplicating( null );

									}}
									onBlur={() => setDuplicating( null )}
									autoFocus
									placeholder="New name"
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
									<div className={style.menuItem} onClick={() => startRename( project )}>Rename</div>
									<div className={style.menuItem} onClick={() => startDuplicate( project )}>Duplicate</div>
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
